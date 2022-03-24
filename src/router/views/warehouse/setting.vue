<script>
import axios from "axios";
import Layout from "../../layouts/main";
import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
// import PageHeader from '@/components/page-header'

/**
 * Products-order component
 */
export default {
  page: {
    title: "Warehouse List",
  },
  components: {
    Layout,
  },
  computed: {
    formTitle() {
      return this.editedWarehouseIndex === -1
        ? "Add Warehouse"
        : "Edit Warehouse";
    },
      unitFormTitle() {
      return this.editedUnitIndex === -1
        ? "Add Unit"
        : "Edit Unit";
    },
    productModalTitle() {
      return this.editedProductIndex === -1 ? "Add Product" : "Edit Product";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  data() {
    return {
      snackbarText: null,
      color: "default",
      valid: true,
      validProduct: true,
      name: "",
      productName: "",
      productUnit: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      dialogUnits: false,
      dialogDeleteUnihts: false,
      dialog: false,
      dialogDelete: false,
      dialogDeleteProduct: false,
      editedWarehouseIndex: -1,
      editedUnitIndex: -1,
      editedProductIndex: -1,
      productSearch: "",
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headersUnits:[
        { text: "Name", align: "start", value: "name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Status", value: "status_key" },
        { text: "branch_id", value: "branch_id" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      productHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      productList: [],
      desserts: [],
      unitsList: [],
      snackbar: false,
      text: "",
      TOKEN: null,
      branchList: [],
      machineValue: null,
      showAddAlert: false,
      alertText: null,
      showProductModal: false,

      typesubmit: false,
      typeform: {
        name: null,
        branch_id: null,
      },

      filterWarehouse: null,
      warehouseList: [],
    };
  },
  validations: {
    typeform: {
      name: { required },
    },
  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;

    this.TOKEN = this.loggedUser.token;
    this.productslist();
    var bodyFormData = new FormData();
    bodyFormData.set("status", 1);
    axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/warehouse-list",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
        data: bodyFormData,
      })
      .then((response) => {
        this.warehouseList = response.data;
      });

    axios
      .request({
        method: "post",
        url: this.$hostname + "poses/branch-list",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.branchList = response.data.data;
        // eslint-disable-next-line no-console
        console.log(this.branchList);
      });

    axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/warehouse-unit",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.unitsList = response.data;
      });
  },
  methods: {
    deleteProduct(item) {
      
// eslint-disable-next-line no-console
console.log(item)
      this.dialogDeleteProduct = true;
    },
    productslist() {
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/products-list",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
        })
        .then((response) => {
          this.productList = response.data;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getColor(status_key) {
      if (status_key == "active") return "green";
      else if (status_key == "Passive") return "orange";
      else return "red";
    },
    editItem(item) {
      this.name = item.name;
      this.select = parseInt(item.branch_id);
      this.editedWarehouseIndex = item.id;
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedWarehouseIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedWarehouseIndex, 1);
      this.closeDelete();
    },
    deleteProductConfirm() {
      this.productslist();
        this.color = "success";
              this.snackbarText = "deleted";
              this.snackbar = true;
      this.closeDeleteProduct()
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.editedWarehouseIndex = -1;
    },
    closeAddproduct() {
      this.showProductModal = false;
      this.$refs.productForm.reset();
      this.editedProductIndex = -1;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedWarehouseIndex = -1;
      });
    },
    
    closeDeleteProduct() {
      this.dialogDeleteProduct = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedWarehouseIndex = -1;
      });
    },

    saveWarehouse() {
      if (this.$refs.form.validate()) {
        if (this.editedWarehouseIndex > 0) {
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/warehouse-edit",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: {
                id: parseInt(this.editedWarehouseIndex),
                name: this.name,
                branch_id: parseInt(this.select),
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.close();
              axios
                .request({
                  method: "post",
                  url: this.$hostname + "warehouses/warehouse-list",
                  headers: {
                    Authorization: "Bearer " + this.TOKEN,
                  },
                })
                .then((response) => {
                  this.warehouseList = response.data;
                });
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
              this.close();
            });
        } else {
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/warehouse-create",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: {
                id: parseInt(this.editedWarehouseIndex),
                name: this.name,
                branch_id: parseInt(this.select),
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.close();
              axios
                .request({
                  method: "post",
                  url: this.$hostname + "warehouses/warehouse-list",
                  headers: {
                    Authorization: "Bearer " + this.TOKEN,
                  },
                })
                .then((response) => {
                  this.warehouseList = response.data;
                });
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }
      }
      if (this.editedWarehouseIndex > -1) {
        Object.assign(
          this.desserts[this.editedWarehouseIndex],
          this.editedItem
        );
      } else {
        this.desserts.push(this.editedItem);
      }
      //  this.close();
    },
    saveProduct() {
      if (this.$refs.productForm.validate()) {
        if (this.editedProductIndex > 0) {
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/warehouse-edit",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: {
                id: parseInt(this.editedWarehouseIndex),
                name: this.name,
                branch_id: parseInt(this.select),
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.close();
              this.productslist();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        } else {
          var bodyFormData = new FormData();
          bodyFormData.set("name", this.productName);
          bodyFormData.set("unit", this.productUnit);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/product-create",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormData,
            })
            .then((response) => {
              this.successmsg("asdasdas","success")
              this.closeAddproduct();
              this.productslist();
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
            })
            .catch((error) => {
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }
      }
      if (this.editedWarehouseIndex > -1) {
        Object.assign(
          this.desserts[this.editedWarehouseIndex],
          this.editedItem
        );
      } else {
        this.desserts.push(this.editedItem);
      }
      //  this.close();
    },

    successmsg(text, variant) {
      Swal.fire({
        position: "center",
        icon: variant,
        title: text,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
};
</script>

<template>
  <v-app>
    <Layout>
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>Warehouse</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="warehouseList"
              :items-per-page="10"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="800">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        class="text-capitalize"
                        elevation="0"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span
                          class="bx bx-plus font-size-16 align-middle me-2"
                        ></span
                        >add
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <hr />
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                dense
                                v-model="name"
                                :rules="nameRules"
                                label="Name"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-autocomplete
                                v-model="select"
                                :items="branchList"
                                item-text="name"
                                item-value="id"
                                dense
                                clearable
                                :rules="[(v) => !!v || 'Item is required']"
                                label="Select Branch"
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <hr />
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="success me-2"
                          elevation="0"
                          @click="saveWarehouse"
                          small
                          class="white--text text-capitalize"
                        >
                          <i class="bx bx-save"></i> Save
                        </v-btn>

                        <v-btn
                          color="red"
                          small
                          elevation="0"
                          class="white--text text-capitalize"
                          @click="close"
                        >
                          <i class="bx bx-x-circle"></i> Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteItemConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeDelete"
                        >
                          <i class="bx bx-x-circle"></i>Cancel</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.status_key`]="{ item }">
                <span
                  class="badge rounded-pill font-size-12"
                  :class="
                    item.status == 1
                      ? 'badge-soft-success'
                      : 'badge-soft-danger'
                  "
                >
                  {{ item.status_key }}
                </span>
              </template>
              <template c v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Products</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-title>
              <v-text-field
                v-model="productSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <b-button
                size="sm"
                variant="outline-primary"
                @click="showProductModal = true"
              >
                <i class="bx bx-plus font-size-16 align-middle me-2"></i>
                Add
              </b-button>
            </v-card-title>
            <v-data-table
              dense
              :headers="productHeaders"
              :items="productList"
              :items-per-page="10"
              :search="productSearch"
            >
              <template c v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Units</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headersUnits"
              :items="unitsList"
              :items-per-page="10"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialogUnits" max-width="800">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        class="text-capitalize"
                        elevation="0"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span
                          class="bx bx-plus font-size-16 align-middle me-2"
                        ></span
                        >add
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ unitFormTitle }}</span>
                      </v-card-title>
                      <hr />
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                dense
                                v-model="name"
                                :rules="nameRules"
                                label="Name"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-autocomplete
                                v-model="select"
                                :items="branchList"
                                item-text="name"
                                item-value="id"
                                dense
                                clearable
                                :rules="[(v) => !!v || 'Item is required']"
                                label="Select Branch"
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <hr />
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="success me-2"
                          elevation="0"
                          @click="saveWarehouse"
                          small
                          class="white--text text-capitalize"
                        >
                          <i class="bx bx-save"></i> Save
                        </v-btn>

                        <v-btn
                          color="red"
                          small
                          elevation="0"
                          class="white--text text-capitalize"
                          @click="close"
                        >
                          <i class="bx bx-x-circle"></i> Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDeleteUnihts" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteItemConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeDelete"
                        >
                          <i class="bx bx-x-circle"></i>Cancel</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.status_key`]="{ item }">
                <span
                  class="badge rounded-pill font-size-12"
                  :class="
                    item.status == 1
                      ? 'badge-soft-success'
                      : 'badge-soft-danger'
                  "
                >
                  {{ item.status_key }}
                </span>
              </template>
              <template c v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-dialog v-model="showProductModal" max-width="800">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ productModalTitle }}</span>
          </v-card-title>
          <hr />
          <v-card-text>
            <v-form ref="productForm" v-model="validProduct" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    dense
                    v-model="productName"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="productUnit"
                    :items="unitsList"
                    item-text="name"
                    item-value="id"
                    required
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Select Unit"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <hr />
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="success me-2"
              elevation="0"
              @click="saveProduct"
              small
              class="white--text text-capitalize"
            >
              <i class="bx bx-save"></i> Save
            </v-btn>

            <v-btn
              elevation="0"
              color="red"
              small
              class="white--text text-capitalize"
              @click="saveProduct"
            >
              <i class="bx bx-x-circle"></i> Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
       <v-dialog v-model="dialogDeleteProduct" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteProductConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeDeleteProduct"
                        >
                          <i class="bx bx-x-circle"></i>Cancel</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
      <v-snackbar v-model="snackbar" :color="color" elevation="5">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </Layout>
  </v-app>
</template>
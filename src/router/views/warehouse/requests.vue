<script>
import axios from "axios";
import Layout from "../../layouts/main";
import requesModal from "./components/request.vue";
import { newRequest } from "../../../firebase";

//import Swal from "sweetalert2";
// import PageHeader from '@/components/page-header'

/**
 * Products-order component
 */
export default {
  firebase: {
    newRequestList: newRequest,
    count: [{ id: 0 }],
  },
  page: {
    title: "Manage Warehouse",
  },
  components: {
    Layout,
    requesModal,
  },
  computed: {},

  watch: {
    newRequestList: function () {
            var newRequestListArray = Object.values(this.newRequestList);
      // eslint-disable-next-line no-console
         console.log(newRequestListArray[0]["gldani"]);
      var t = newRequestListArray.filter((rqst) => {
        
        return (
          rqst.warehouse_id == this.warehouseId &&
          rqst.function == "receiveRequest"
        );
      });
      var p = newRequestListArray.filter((rqst) => {
        return (
          rqst.warehouse_id == this.warehouseId && rqst.function == "newRequest"
        );
      });
      if (t.length > 0) this.sentRequests();
      if (p.length > 0) this.receiveRequests();
    },
    seletedReceiveProductsItems: function () {
      this.showAcceptRecieveProductsBtn =
        this.seletedReceiveProductsItems.length > 0 ? true : false;
    },
    seletedReceiveItems: function () {
      this.showAcceptBtn = this.seletedReceiveItems.length > 0 ? true : false;
    },
    seletedSentProducts: function () {
      this.showSentProductActiontBtn =
        this.seletedSentProducts.length > 0 ? true : false;
    },
  },
  data() {
    return {
      showAcceptRecieveProductsBtn:false,
      seletedReceiveProductsItems: null,
      showRecieveProductsModal:false,
      newRequestList: [],
      sentProductsList: [],
      seletedSentProducts: [],
      sentProductsSearch: null,
      showAcceptListModal: false,
      showAcceptBtn: false,
      showSentProductActiontBtn: false,
      showSentProductModal: false,
      seletedReceiveItems: [],
      sendRequestModal: false,
      editSentProductsModal: false,
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      supplyMinQty: null,
      warehouseId: null,
      supplyModal: false,
      supplyId: null,
      supplyQty: null,
      recieveProductList: [],
      supplyList: [],
      suppliesSearch: "",
      supplyHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false, align: "end" },
      ],
      pendingRequestList: [],
      requestSearch: "",
      recieveProductSearch: "",
      requestHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "quantity", value: "sum" },
        { text: "status", value: "status" },
        { text: "Warehouse", value: "to_warehouse_name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      recieveProductHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "Requested Qty", value: "quanunit" },
        { text: "Sent Qty", value: "sent_quantity" },
        { text: "status", value: "status" },
        { text: "Warehouse", value: "to_warehouse_name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      
      receiveRequestList: [],
      receiveRequestSearch: "",
      receiveRequestHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "Requested Qty", value: "quantity" },
        { text: "Sent Qty", value: "sent_quantity" },
        { text: "status", value: "status" },
        { text: "Warehouse", value: "to_warehouse_name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      productList: [],
      tab: null,
      nameRules: [(v) => !!v || " required"],
    };
  },

  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
    this.sentRequests();
    this.getSupplyList();
    this.productslist();
    this.receiveRequests();
  },
  methods: {
    rejectRequestSingle(id) {
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/void-request",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: {
            requests: [{ id: id }],
          },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data;
          this.snackbar = true;
          this.sentRequests();
          this.receiveRequests();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          this.color = "warning";
          this.snackbarText = error.response.data.error;
          this.snackbar = true;
        });
    },
    rejectRequest() {
      var k = [];
      this.seletedReceiveItems.forEach(function (item) {
        // eslint-disable-next-line no-console
        k.push({ id: item.id });
      });

      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/void-request",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: {
            requests: k,
          },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data;
          this.snackbar = true;
          this.getSupplyList();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          this.color = "warning";
          this.snackbarText = error.response.data.error;
          this.snackbar = true;
        });
    },
    acceptRecieveRequest(item) {
      this.seletedReceiveItems = [item];
      this.showAcceptListModal = true;
    },
    acceptRecieveProductsSingle(item){
      this.seletedReceiveProductsItems = [item]
       this.showRecieveProductsModal = true;
    },
    acceptRecieveProducts(){
        var k = [];
      this.seletedReceiveProductsItems.forEach(function (item) {
        // eslint-disable-next-line no-console
        k.push({ id: item.id, quantity: item.quantity });
      });
   axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/recieve-request",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: {
            requests: k,
          },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data;
          this.snackbar = true;
          this.getSupplyList();
          this.receiveRequests();
          this.sentRequests();
        });

    },
    acceptRequest() {
      var k = [];
      this.seletedReceiveItems.forEach(function (item) {
        // eslint-disable-next-line no-console
        k.push({ id: item.id, quantity: item.quantity });
      });

      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/accept-request",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: {
            requests: k,
          },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data;
          this.snackbar = true;
          this.getSupplyList();
        });
    },
    editSentRequest() {
      var k = [];
      this.sentProductsList.forEach(function (item) {
        // eslint-disable-next-line no-console
        k.push({ id: item.id, quantity: item.quantity });
      });

      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/sender-update-accepted-request",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: {
            requests: k,
          },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data;
          this.snackbar = true;
          this.getSupplyList();
          this.receiveRequests();
          this.sentRequests();
        });
    },
    editSentProductSingle(item) {
      this.seletedSentProducts = [item];
      this.editSentProductsModal = true;
    },

    onClearClicked(key) {
      this.seletedReceiveItems.splice(key, 1);
    },
    addSupply() {
      if (this.$refs.supplyForm.validate()) {
        axios
          .request({
            method: "post",
            url: this.$hostname + "warehouses/add-supply",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              product_id: this.supplyId,
              warehouse_id: this.warehouseId,
              quantity: this.supplyQty,
              minQuantity:this.supplyMinQty
            },
          })
          .then((response) => {
            this.supplyModal = false;
            this.color = "success";
            this.snackbarText = response.data;
            this.snackbar = true;
            this.getSupplyList();
          });
      }
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
    getSupplyList() {
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/supplies-list",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          this.supplyList = response.data;
          this.supplyList.forEach((x) => {
            x.selected = false;
          });
        });
    },
    sentRequests() {
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/sent-requests",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          this.pendingRequestList = response.data.filter((rqst) => {
            return rqst.status == 1;
          });

          this.recieveProductList = response.data.filter((rqst) => {
            return rqst.status == 2;
          });
        });
    },
    asd() {
      setTimeout(() => {
        this.sendRequestModal = false;
      }, 4000);

      this.receiveRequests();
      this.sentRequests();
    },
    receiveRequests() {
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/receive-requests",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          this.receiveRequestList = response.data.filter((x) => {
            return x.status == 1;
          });
          this.sentProductsList = response.data.filter((x) => {
            return x.status == 2;
          });
        });
    },
    cancelSupply() {
      this.supplyModal = false;
      this.$refs.supplyForm.reset();
    },
  },
};
</script>

<template>
  <Layout>
    <v-dialog v-model="sendRequestModal" max-width="1100">
      <requesModal :token="TOKEN" :method="asd" />
    </v-dialog>

    <v-card elevation="1" class="bg-primary">
      <v-tabs v-model="tab" light grow>
        <v-tab> Supplies list</v-tab>
        <v-tab> Received product</v-tab>
        <v-tab> Sent requests</v-tab>
        <v-tab> Received requests</v-tab>
        <v-tab> Sent Products</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-card-title class="pl-0">
                <v-text-field
                  class="col-4 pl-0"
                  clearable
                  dense
                  v-model="suppliesSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="supplyModal = true"
                >
                  <i class="bx bx-plus font-size-16 align-middle me-2"></i>
                  Add supply
                </b-button>
              </v-card-title>
              <v-data-table
                dense
                :headers="supplyHeaders"
                :items="supplyList"
                :items-per-page="10"
                :search="suppliesSearch"
              >
                <template v-slot:[`item.quantity`]="{ item }">
                  <span
                    class="badge rounded-pill font-size-12"
                    :class="
                      item.quantity > 10
                        ? 'badge-soft-success'
                        : 'badge-soft-danger'
                    "
                  >
                    {{ item.quantity }} {{ item.unit }}
                  </span>
                </template>
                <template c v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="orange">
                          <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Edit supply</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="green">
                          <v-icon small @click="deleteProduct(item)">
                            mdi-eye
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Hide supply</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-card-title>
                <v-text-field
                  dense
                  class="col-4 pl-0"
                  v-model="recieveProductSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-data-table
                dense
                show-select
                :headers="recieveProductHeaders"
                :items="recieveProductList"
                :items-per-page="10"
                :search="recieveProductSearch"
                v-model="seletedReceiveProductsItems"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <span
                    class="badge rounded-pill font-size-12"
                    :class="
                      item.status == 2
                        ? 'badge-soft-success'
                        : 'badge-soft-danger'
                    "
                  >
                    {{ item.status == 1 ? "Pending" : "accepted" }}
                  </span>
                </template>
                <template c v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon color="success">
                          <v-icon
                            small
                            class="mr-2"
                            @click="acceptRecieveProductsSingle(item)"
                          >
                            mdi-check-circle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Accept Request</span>
                  </v-tooltip>
                </template>
              </v-data-table>
              <div
                class="table-footer-prepend d-flex align-center"
                v-if="showAcceptRecieveProductsBtn"
              >
                <b-button
                  size="sm"
                  class="success"
                  @click="showRecieveProductsModal = true"
                >
                  <i
                    class="bx bx-check-double font-size-16 align-middle me-2"
                  ></i>
                  Accept
                </b-button>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-card-title>
                <v-text-field
                  dense
                  class="col-4 pl-0"
                  v-model="requestSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="sendRequestModal = true"
                >
                  <i class="bx bx-plus font-size-16 align-middle me-2"></i>
                  Send Request
                </b-button>
              </v-card-title>
              <v-data-table
                dense
                :headers="requestHeaders"
                :items="pendingRequestList"
                :items-per-page="10"
                :search="requestSearch"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <span
                    class="badge rounded-pill font-size-12"
                    :class="
                      item.status == 2
                        ? 'badge-soft-success'
                        : 'badge-soft-danger'
                    "
                  >
                    {{ item.status == 1 ? "Pending" : "accepted" }}
                  </span>
                </template>
                <template c v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="error">
                          <v-icon
                            small
                            class="mr-2"
                            @click="rejectRequestSingle(item.id)"
                          >
                            mdi-close-circle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Reject Request</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-card-title>
                <v-text-field
                  dense
                  class="col-4 pl-0"
                  v-model="receiveRequestSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="showProductModal = true"
                >
                  <i class="bx bx-plus font-size-16 align-middle me-2"></i>
                  Received Request
                </b-button>
              </v-card-title>
              <v-data-table
                dense
                show-select
                :headers="receiveRequestHeaders"
                :items="receiveRequestList"
                :items-per-page="10"
                :search="receiveRequestSearch"
                v-model="seletedReceiveItems"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <span
                    class="badge rounded-pill font-size-12"
                    :class="
                      item.status == 2
                        ? 'badge-soft-success'
                        : 'badge-soft-danger'
                    "
                  >
                    {{ item.status == 1 ? "Pending" : "accepted" }}
                  </span>
                </template>

                <template c v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon color="success">
                          <v-icon
                            small
                            class="mr-2"
                            @click="acceptRecieveRequest(item)"
                          >
                            mdi-check-circle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Accept Request</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small color="error">
                          <v-icon
                            small
                            class="mr-2"
                            @click="rejectRequestSingle(item.id)"
                          >
                            mdi-close-circle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Reject Request</span>
                  </v-tooltip>
                </template>
              </v-data-table>
              <div
                class="table-footer-prepend d-flex align-center"
                v-if="showAcceptBtn"
              >
                <b-button
                  size="sm"
                  class="success"
                  @click="showAcceptListModal = true"
                >
                  <i
                    class="bx bx-check-double font-size-16 align-middle me-2"
                  ></i>
                  Accept
                </b-button>
                <b-button size="sm" class="error ml-2" @click="rejectRequest()">
                  <i class="bx bx-x font-size-16 align-middle me-2"></i>
                  Reject
                </b-button>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-card-title>
                <v-text-field
                  dense
                  class="col-4 pl-0"
                  v-model="sentProductsSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-data-table
                dense
                show-select
                :headers="receiveRequestHeaders"
                :items="sentProductsList"
                :items-per-page="10"
                :search="sentProductsSearch"
                v-model="seletedSentProducts"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <span
                    class="badge rounded-pill font-size-12"
                    :class="
                      item.status == 2
                        ? 'badge-soft-success'
                        : 'badge-soft-danger'
                    "
                  >
                    {{ item.status == 1 ? "Pending" : "accepted" }}
                  </span>
                </template>

                <template c v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon color="warning">
                          <v-icon
                            small
                            class="mr-2"
                            @click="editSentProductSingle(item)"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small color="error">
                          <v-icon
                            small
                            class="mr-2"
                            @click="cancelSendProductSingle(item.id)"
                          >
                            mdi-close-circle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Cancel</span>
                  </v-tooltip>
                </template>
              </v-data-table>
              <div
                class="table-footer-prepend d-flex align-center"
                v-if="showSentProductActiontBtn"
              >
                <b-button
                  size="sm"
                  class="warning"
                  @click="editSentProductsModal = true"
                >
                  <i class="bx bx-pencil font-size-16 align-middle me-2"></i>
                  Edit
                </b-button>
                <b-button
                  size="sm"
                  class="error ml-2"
                  @click="canselSendProductRequest()"
                >
                  <i class="bx bx-x font-size-16 align-middle me-2"></i>
                  Cancel
                </b-button>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="supplyModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Add supply</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="supplyModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="supplyForm" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-autocomplete
                  v-model="supplyId"
                  :items="productList"
                  item-text="name"
                  item-value="id"
                  dense
                  clearable
                  :rules="[(v) => !!v || 'Supply is required']"
                  label="Select Product"
                ></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  dense
                  v-model="supplyQty"
                  :rules="[(v) => !!v || 'Quantity is required']"
                  label="Quantity"
                  required
               
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  dense
                  v-model="supplyMinQty"
                  :rules="[(v) => !!v || 'Minimum Quantity is required']"
                  label="Minimum amount"
                  required
                ></v-text-field>
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
            @click="addSupply"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-save"></i> add
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="cancelSupply"
          >
            <i class="bx bx-x-circle"></i> Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showAcceptListModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Send this items?</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="showAcceptListModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col
              cols="4"
              v-for="(pv, key) in seletedReceiveItems"
              :key="pv.id"
            >
              <v-text-field
                class=""
                clearable
                @click:clear="onClearClicked(key)"
                dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
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
            @click="acceptRequest"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>
          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="showAcceptListModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRecieveProductsModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Receive this items?</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn
              @click="showRecieveProductsModal = false"
              icon
              small
              color="gray"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col
              cols="4"
              v-for="pv in seletedReceiveProductsItems"
              :key="pv.id"
            >
              <v-text-field
                class=""
                clearable
               dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
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
            @click="acceptRecieveProducts"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="showRecieveProductsModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editSentProductsModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Edit sent products</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn
              @click="editSentProductsModal = false"
              icon
              small
              color="gray"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col cols="4" v-for="pv in sentProductsList" :key="pv.id">
              <v-text-field
                class=""
                clearable
                dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
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
            @click="editSentRequest"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="editSentProductsModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
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
</template>
<style>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>
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
      categoryFormTitle() {
      return this.editedCatIndex === -1
        ? "Add Product Category"
        : "Edit Product Category";
    },
      typeFormTitle() {
      return this.editedTypeIndex === -1
        ? "Add Category"
        : "Edit Category";
    },
    productModalTitle() {
      return this.editedProductIndex === -1 ? "Add Product" : "Edit Product";
    },
  },

  watch: {
    productUnit(val){
      this.unitsList.forEach(x => {
        if(x.id == val){
          this.appendUnitTemp = x.name;
        }
      });
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  data() {
    return {
      appendUnitTemp: '',
      portionSize: 0,
      productValues: [],
      typesList: [],
      isWarehouseEdited: false,
      snackbarText: null,
      color: "default",
      valid: true,
      validProduct: true,
      name: "",
      productName: "",
      productUnit: "",
      productCategory: "",
      productType: "",
      categoryName: '',
      typeName: '',
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      selectedCategory: "",
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      catStatus: -1,
      typeStatus: -1,
      dialogUnits: false,
      dialogCategories: false,
      dialogType: false,
      dialogDeleteUnits: false,
      dialog: false,
      dialogDelete: false,
      dialogDeleteProduct: false,
      dialogDeleteCategories: false,
      dialogDeleteTypes: false,
      unitName: "",
      editedWarehouseIndex: -1,
      editedUnitIndex: -1,
      editedCatIndex: -1, 
      editedTypeIndex: -1, 
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
      categoriesHeaders:[
        { text: "Name", align: "start", value: "name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Status", value: "status_key" },
        { text: "Branch", value: "branch_name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      productHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Category", value: "category_name", align: "end", sortable: false },
        { text: "Product Cateogry", value: "product_category_name", align: "end", sortable: false },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],
      productList: [],
      desserts: [],
      unitsList: [],
      categoriesList: [],
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
    this.getWarehouseList();
    this.getUnits();
    this.getBranch();
    this.getCategories();
    this.getTypes();
   
     
  },
  methods: {
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
        })
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getBranch(){
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
    },
    getColor(status_key) {
      if (status_key == "active") return "green";
      else if (status_key == "Passive") return "orange";
      else return "red";
    },
    getUnits(){
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
    getCategories(){
      axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/products-category-list",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.categoriesList = response.data;
      });
    },
    getTypes(){
      axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/category-list",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.typesList = response.data;
      });
    },
    editItem(item) {
      this.isWarehouseEdited = true;
      this.name = item.name;
      this.select = parseInt(item.branch_id);
      this.editedWarehouseIndex = item.id;
      this.dialog = true;
    },
    editProduct(item) {
       const m = this.unitsList.filter((rqs) => {
            return rqs.name == item.unit;
          });
  
      
      this.productName = item.name;
      this.productType = parseInt(item.category_id);
      this.productUnit = parseInt(m.length>0?m[0].id:"");
      this.productCategory = parseInt(item.products_category_id);
      this.editedProductIndex = item.id;
      this.showProductModal = true;
    },
    deleteProduct(item) {
      // eslint-disable-next-line no-console
      console.log(item)
      this.productName = item.name;
      this.productUnit = item.unit;
      this.productType = parseInt(item.category_id);
      this.productCategory = parseInt(item.products_category_id);
      this.editedProductIndex = parseInt(item.id);
      this.dialogDeleteProduct = true;
    },
    editUnit(item) {
      this.name = item.name;
      this.productUnit = parseInt(item.unit);
      this.productCategory = item.products_category_id;
      this.editedUnitIndex = item.id;
      this.dialogUnits = true;
      
    },
    deleteUnit(item) {
      // eslint-disable-next-line no-console
      console.log(item)
      this.unitName = item.name;
      this.productUnit = item.unit;
      this.productCategory = parseInt(item.products_category_id);
      this.editedUnitIndex = parseInt(item.id);
      this.dialogDeleteUnits = true;
    },
    deleteItem(item) {
      this.editedWarehouseIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    editCategory(item) {
      this.categoryName = item.name;
      this.selectedCategory = item.id;
      this.catStatus = item.status;
      this.editedCatIndex = item.id;
      this.dialogCategories = true;
    },
    editType(item) {
  
      this.typeName = item.name;
      // this.selectedCategory = item.id;
      this.catStatus = item.status;
      this.editedTypeIndex = item.id;
      this.dialogType = true;
    },
    deleteCategory(item) {
      this.editedCatIndex = item.id;
      this.categoryName = item.name;
      this.dialogDeleteCategories = true;
    },
    deleteType(item) {
      this.editedTypeIndex = item.id;
      this.typeName = item.name;
      this.dialogDeleteTypes = true;
    },
    deleteCatConfirm() {

      if (this.editedCatIndex > 0) {
          var bodyFormDataNew = new FormData();
          bodyFormDataNew.set("id", parseInt(this.editedCatIndex));
          bodyFormDataNew.set("name", this.categoryName);
          bodyFormDataNew.set("status", 4);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/add-products-category",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormDataNew,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.getCategories();
              this.closeCatDelete();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }
    },
    deleteTypeConfirm() {

      if (this.editedTypeIndex > 0) {
          var bodyFormDataNew = new FormData();
          bodyFormDataNew.set("id", parseInt(this.editedTypeIndex));
          bodyFormDataNew.set("name", this.typeName);
          bodyFormDataNew.set("status", 4);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/create-category",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormDataNew,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.getCategories();
              this.closeCatDelete();
              this.closeTypeDelete();
              this.getTypes();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }
    },
   
    deleteItemConfirm() {
      this.desserts.splice(this.editedWarehouseIndex, 1);
      this.closeDelete();
    },
    deleteProductConfirm() {
        if (this.editedProductIndex > 0) {
          var bodyFormDataNew = new FormData();

          bodyFormDataNew.set("id", parseInt(this.editedProductIndex));
          bodyFormDataNew.set("name", this.productName);
          bodyFormDataNew.set("category_id", this.productType);
          bodyFormDataNew.set("unit", this.productUnit);
          bodyFormDataNew.set("products_category_id", this.productCategory);
          bodyFormDataNew.set("status", 4);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/product-create",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormDataNew,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeAddproduct();
              this.productslist();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }

      //  this.close();
      this.productslist();
      this.closeDeleteProduct()
    },
    deleteUnitConfirm() {
        if (this.editedUnitIndex > 0) {
          var bodyFormDataNew = new FormData();

          bodyFormDataNew.set("id", parseInt(this.editedUnitIndex));
          bodyFormDataNew.set("name", this.unitName);
          bodyFormDataNew.set("status", 4);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/create-unit",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormDataNew,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeDeleteUnit();
              this.getUnits();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }

      //  this.close();
      this.productslist();
      this.closeDeleteProduct()
    },
    close() {
      this.dialog = false;
      this.isWarehouseEdited = false;
      this.$refs.form.reset();
      this.editedWarehouseIndex = -1;
    },
    closeCategory() {
      this.dialogCategories = false;
      this.$refs.form.reset();
    },
    closeType() {
      this.editedTypeIndex = -1;
      this.dialogType = false;
      this.$refs.form.reset();
    },
    closeUnits() {
      this.dialogUnits = false;
      this.$refs.form.reset();
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
    closeDeleteUnit() {
      this.dialogDeleteUnits = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedUnitIndex = -1;
      });
    },
    closeCatDelete() {
      this.dialogDeleteCategories = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedCatIndex = -1;
      });
    },
    closeTypeDelete() {
      this.dialogDeleteTypes = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedTypeIndex = -1;
      });
    },
    
    closeDeleteProduct() {
      this.dialogDeleteProduct = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedProductIndex = -1;
      });
    },

    saveWarehouse() {
      if (this.$refs.form.validate()) {
        if (this.editedWarehouseIndex > 0) {
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
                status: 1,
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.close();
              this.getWarehouseList();
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
              this.getWarehouseList();
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
    saveUnit() {
      if (this.$refs.form.validate()) {
        if (this.editedUnitIndex > 0) {
          var editForm = new FormData();

          editForm.set("id", parseInt(this.editedUnitIndex));
          editForm.set("name", this.name);
          editForm.set("status", 1);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/create-unit",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: editForm
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeUnits();
              this.getUnits();
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
              this.getUnits();
              this.closeUnits();
            });
        } else {
          var createForm = new FormData();

          createForm.set("name", this.name);
          createForm.set("status", 1);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/create-unit",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: createForm,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeUnits();
              this.getUnits();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
              this.getUnits();
              this.closeUnits();
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
    getWarehouseList() {
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
    },
    saveType(){
      if (this.$refs.form.validate()) {
        if (this.editedTypeIndex > 0) {
          axios
              .request({
                method: "post",
                url: this.$hostname + "warehouses/create-category",
                headers: {
                  Authorization: "Bearer " + this.TOKEN,
                },
                data: {
                  id: this.editedTypeIndex,
                  name: this.typeName,
                  status: this.typeStatus,
                },
              })
              .then((response) => {
                this.color = "success";
                this.snackbarText = response.data.data;
                this.snackbar = true;
                this.closeType();
                this.getTypes();
                this.productslist();
                //  this.successmsg(response.data, "success");
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                this.color = "warning";
                this.snackbarText = error.response.data.error;
                this.snackbar = true;
                this.closeType();
              });
        } else {
          axios
              .request({
                method: "post",
                url: this.$hostname + "warehouses/create-category",
                headers: {
                  Authorization: "Bearer " + this.TOKEN,
                },
                data: {
                  id: '',
                  name: this.typeName,
                  status: '',
                },
              })
              .then((response) => {
                this.color = "success";
                this.snackbarText = response.data.data;
                this.snackbar = true;
                this.closeType();
                this.getTypes();
                this.productslist();
                //  this.successmsg(response.data, "success");
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                this.color = "warning";
                this.snackbarText = error.response.data.error;
                this.snackbar = true;
                this.closeType();
              });
        }
      }
    },
    saveCategory() {
      if (this.$refs.form.validate()) {
        if (this.editedCatIndex > 0) {
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/add-products-category",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: {
                id: parseInt(this.editedCatIndex),
                name: this.categoryName,
                status: this.catStatus,
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeCategory();
              this.getCategories();
              this.productslist();
              //  this.successmsg(response.data, "success");
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
              this.closeCategory();
            });
        } else {
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/add-products-category",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: {
                name: this.categoryName,
                branch_id: parseInt(this.select),
              },
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeCategory();
              this.getCategories();
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              this.color = "warning";
              this.snackbarText = error.response.data.error;
              this.snackbar = true;
            });
        }
      }
      if (this.editedCatIndex > -1) {
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
          var bodyFormDataNew = new FormData();

          bodyFormDataNew.set("id", parseInt(this.editedProductIndex));
          bodyFormDataNew.set("name", this.productName);
          bodyFormDataNew.set("unit", this.productUnit);
          bodyFormDataNew.set("category_id", this.productType);
          bodyFormDataNew.set("products_category_id", this.productCategory);
          bodyFormDataNew.set("status", 1);
          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/product-create",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: bodyFormDataNew,
            })
            .then((response) => {
              this.color = "success";
              this.snackbarText = response.data.data;
              this.snackbar = true;
              this.closeAddproduct();
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
          // var bodyFormData = new FormData();
          var recipe = [];
          var tempObj = {};
          if(this.productType == 2){
            this.productValues.forEach(x => {
              tempObj.product_id = x.id;
              tempObj.qty = x.recipeAmount;
              recipe.push(tempObj);
              tempObj = {};
            });
          }
          // bodyFormData.set("name", this.productName);
          // bodyFormData.set("unit", this.productUnit);
          // bodyFormData.set("products_category_id", this.productCategory);
          // bodyFormData.set("category_id", this.productType);
          // bodyFormData.set("recipe", recipe);


          axios
            .request({
              method: "post",
              url: this.$hostname + "warehouses/product-create",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
              data: { "products_category_id": this.productCategory, 'category_id': this.productType, 'name': this.productName, 'unit': this.productUnit, 'recipe': recipe },
            })
            .then((response) => {
              this.successmsg(response.data.data,"success")
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
                            <v-col cols="6" v-if="!isWarehouseEdited">
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
                    item.status_key == 'active'
                      ? 'badge-soft-success'
                      : 'badge-soft-danger'
                  "
                >
                  {{ item.status_key }}
                </span>
              </template>
              <template  v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
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
              <template  v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editProduct(item)">
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
                          @click="saveUnit"
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
                          @click="closeUnits"
                        >
                          <i class="bx bx-x-circle"></i> Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDeleteUnits" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        unit?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteUnitConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeDeleteUnit"
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
              <template  v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editUnit(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteUnit(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Product Category</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="categoriesHeaders"
              :items="categoriesList"
              :items-per-page="10"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialogCategories" max-width="800">
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
                        <span class="text-h5">{{ categoryFormTitle }}</span>
                      </v-card-title>
                      <hr />
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                dense
                                v-model="categoryName"
                                :rules="nameRules"
                                label="Name"
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
                          @click="saveCategory"
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
                          @click="closeCategory"
                        >
                          <i class="bx bx-x-circle"></i> Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDeleteCategories" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        category?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteCatConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeCatDelete"
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
              <template  v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editCategory(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteCategory(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        
        <!-- PRODUCT TYPE -->
        <v-expansion-panel>
          <v-expansion-panel-header>Categories</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="categoriesHeaders"
              :items="typesList"
              :items-per-page="10"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialogType" max-width="800">
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
                        <span class="text-h5">{{ typeFormTitle }}</span>
                      </v-card-title>
                      <hr />
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                dense
                                v-model="typeName"
                                :rules="nameRules"
                                label="Name"
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
                          @click="saveType"
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
                          @click="closeType"
                        >
                          <i class="bx bx-x-circle"></i> Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDeleteTypes" max-width="500">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        category?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          elevation="0"
                          color="success"
                          small
                          @click="deleteTypeConfirm"
                        >
                          <i class="bx bx-save"></i> Yes</v-btn
                        >
                        <v-btn
                          elevation="0"
                          color="error"
                          small
                          @click="closeTypeDelete"
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
              <template  v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editType(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteType(item)"> mdi-delete </v-icon>
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
                <v-col cols="3">
                  <v-text-field
                    dense
                    v-model="productName"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="productUnit"
                    :items="unitsList"
                    item-text="name"
                    item-value="id"
                    required
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Unit is required']"
                    label="Select Unit"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="productCategory"
                    :items="categoriesList"
                    item-text="name"
                    item-value="id"
                    required
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Category is required']"
                    label="Select Category"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="3">
                  <v-autocomplete
                    v-model="productType"
                    :items="typesList"
                    item-text="name"
                    item-value="id"
                    required
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Product type is required']"
                    label="Select Product Type"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row v-if="productType == 2">
              <v-col cols="8">
                <v-autocomplete
                  v-model="productValues"
                  :items="productList"
                  item-text="name"
                  label="Choose product"
                  return-object
                  hide-selected
                  clearable
                  chips
                  small-chips
                  deletable-chips
                  multiple
                ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  class="my-5"
                  clearable
                  dense
                  v-model="portionSize"
                  :append-icon="appendUnitTemp"
                  :label="'Enter Portion Size'"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="3" v-for="pv in productValues" :key="pv.id">
                  <v-text-field
                    class=""
                    clearable
                    dense
                    v-model="pv.recipeAmount"
                    :append-icon="pv.unit"
                    :label="'Enter ' + pv.name + ' quantity'"
                  ></v-text-field>
                </v-col>
              </v-row>
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
              @click="closeAddproduct"
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
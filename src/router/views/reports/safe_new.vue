<style>
 @import "../../../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

 .disablegrid {
        /* pointer-events: none;
        opacity: 0.4; */
        display: none;
    }
    .wrapper {
        cursor: not-allowed;
    }
</style>
<script>
import axios from 'axios'
// import excel from 'vue-excel-export'
import Layout from '../../layouts/main'
import moment from "moment";
import DatePicker from "vue2-datepicker";


import { GridPlugin, Toolbar, ExcelExport } from "@syncfusion/ej2-vue-grids";


import appConfig from "@/app.config";
import Vue from 'vue'

// Vue.use(excel);

Vue.use(GridPlugin);

/**
 * Products-order component
 */
export default {
   page: {
    title: "Safe",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, DatePicker },
  computed: {

    rows() {
      return this.ordersList.length;
    },
  },
  data() {
    
    return {
      date: [
        moment(new Date()).format("YYYY-MM-DD"),
        moment(new Date()).format("YYYY-MM-DD"),
      ],
      TOKEN: null,
      loader: false,
      excelTitle: "Ronny's",
      suppliesSearch: "",
      toolbarOptions: ['ExcelExport'],
      fromDate: String(new Date()),
      // toDate: String(new Date()),
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      totalRows: 1,
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      supplyHeaders: [
        {
          value: "id",
          text: "ID",
          sortable: true,
        },
        {
          value: "order_id",
          text: "Order ID",
          sortable: true,
        },
        {
          value: "name",
          text: "POS",
          sortable: true,
        },
        {
          value: "branch_name",
          text: "branch",
          sortable: true,
        },
        {
          value: "payment_method",
          text: "Payment",
          sortable: true,
        },
        {
          value: "amount",
          text: "Amount",
          sortable: true,
        },
        {
          value: "created_at",
          text: "Date",
          sortable: true,
        },
        
      ],
      nameRules: [(v) => !!v || " required"],
      items: [
        {
          text: "Tables",
          href: "/",
        },
        {
          text: "Advanced",
          active: true,
        },
      ],
      toDate: null,
      branch: null,
      selectedBranch: null,
      branchURL: "http://new.ronnys.info/?r=v1/reporting/safe-detail",
      modalItem: {},
      modalShow: false,
      showAlert: false,
      alertText: '',
      orderStatuses: [],
      exportData: [],
      branchOptions: [
        { value: "2", text: "Saburtalo" },
        { value: "3", text: "Vake" },
        { value: "1", text: "Digomi" },
        { value: "4", text: "Gldani" },
      ],
      json_fields: {
        "ID": "id",
        "Order ID": "order_id",
        "Pos": "name",
        "Branch": "branch_name",
        "Payment": "payment_method",
        "Amount": "amount",
        "Date":"created_at"
      },
      loggedUser: {},
      ordersList: [],
      json_data: [],
      supplyList: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      ordersListOld: [],
      title: 'Safe Details',
      status: "1,2,3,4,5,6,7,8,9,10",
      infoModal: {
        id: 'info-modal',
        order_id: '',
        discount: '',
        discountName: '',
        discountType: '',
        customer: '',
        items: [],
        totalPrice: '',
        discPrice: '',
        totalDue: '',
      }
    }
  },
  watch: {
    selectedBranch(val){
      this.changeBranch(val);
    },
    
  },
  mounted() {
    this.fromDate = this.formatDate(this.fromDate);
    // this.toDate = this.formatDate(this.toDate);

    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "poses/order-statuses",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.orderStatuses = response.data.data
      });

    this.getReport()

  },
  //   EXCEL EXPORT CODE
  provide: {
    grid: [Toolbar, ExcelExport]
  },
  //   END OF EXCEL EXPORT CODE
  methods: {
    updateRegion(event) {
      if(event ==1)
        this.exportName = "Digomi" 
      if(event ==2)
        this.exportName = "Saburtalo"
      if(event ==3)
        this.exportName = "Vake" 
      if(event ==4)
        this.exportName = "Gldani"
      
      this.exportName += " - "+this.date
      
    },
    getReport() {
      
      if (this.$refs.searchForm.validate()) {
        this.loader = true;
        this.json_data = this.supplyList = [];

        axios
          .request({
            method: "post",
            url: this.branchURL,
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              day: this.date,
              branch: this.branch
            },
          })
          .then((response) => {
            this.loader = false;
            // eslint-disable-next-line no-console
            this.json_data = this.supplyList = response.data.data;
            this.supplyList.forEach((x) => {
              x.selected = false;
            });
          });
      }
    },
    // EXCEL EXPORT METHODS
     btnClick() {
      if (this.$refs.Grid.$el.classList.contains('disablegrid')) {
          // this.$refs.Grid.$el.classList.remove('disablegrid');
          // document.getElementById("GridParent").classList.remove('wrapper');
      }
      else {
          this.$refs.Grid.$el.classList.add('disablegrid');
          document.getElementById("GridParent").classList.add('wrapper');
      }
    },
      toolbarClick: function() {
        //  if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
            let excelExportProperties = {
                header: {
                    headerRows: 7,
                    rows: [
                        { cells: [{ colSpan: 4, value: this.excelTitle, style: { fontColor: '#000000', fontSize: 32, hAlign: 'Center', bold: true, } }] },
                        { cells: [{ colSpan: 4, value: "Branch: " + this.selectedBranch, style: { fontColor: '#000000', fontSize: 15, hAlign: 'Center', bold: true, } }] },
                        { cells: [{ colSpan: 4, value: "Safe", style: { fontColor: '#000000', fontSize: 15, hAlign: 'Center', bold: true, } }] },
                        { cells: [{ colSpan: 4, value: "Date: " + this.fromDate + " - " + this.toDate, style: { fontColor: '#000000', fontSize: 15, hAlign: 'Center', bold: true, } }] },
                    ]
                },
                footer: {
                    footerRows: 4,
                    rows: [
                        { cells: [{ colSpan: 4, value: "Ronny's", style: { hAlign: 'Center', bold: true } }] },
                        // { cells: [{ colSpan: 4, value: "!Visit Again!", style: { hAlign: 'Center', bold: true } }] }
                    ]
                }
            };
            this.$refs.Grid.excelExport(excelExportProperties);
        // }
    },
    // END OF EXCEL EXPORT METHODS
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.order_id = item.id;
        this.infoModal.discountName = item.order_data.discountName;
        this.infoModal.discount = item.order_data.discount;
        this.infoModal.customer = item.order_data.customer.name;
        this.infoModal.items = item.order_data.items;
        this.infoModal.totalPrice = item.order_data.totalPrice;
        this.infoModal.discPrice = item.order_data.discPrice;
        this.infoModal.totalDue = item.order_data.totalDue;
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
    },
    changeBranch(branch){
      if(branch == 'saburtalo'){
        this.branchURL =  this.$hostSaburtalo;
      } 
      else if(branch == 'vake'){
        this.branchURL =  this.$hostVake;
      } 
      else if(branch == 'digomi'){
        this.branchURL =  this.$hostDigomi;
      } 
      else if(branch == 'gldani'){
        this.branchURL =  this.$hostGldani;
      } 
    },
  },
}
</script>

<template>
<div>
  <Layout>
    <v-card>
      <v-form ref="searchForm" lazy-validation>
        <v-row>
          <v-col cols="4" class="ml-2">
            <date-picker
              v-model="date"
              type="date"
              value-type="YYYY-MM-DD"
              format="YYYY-MM-DD"
              range
              placeholder="Select date"
              :rules="nameRules"
            ></date-picker>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              clearable
              v-model="branch"
              :items="branchOptions"
              @change="(event) => updateRegion(event)"
              dense
              label="Select branch"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" elevation="0" @click="getReport()">
              <v-icon small> mdi-magnify </v-icon>
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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
          <export-excel
            v-if="json_data.length > 0"
            class="btn btn-success"
            :data="json_data"
            :fields="json_fields"
            worksheet="Worksheet"
            :name="exportName"
          >
            <i class="mdi mdi-download"> Export </i>
          </export-excel>
        </v-card-title>
        <v-data-table
          dense
          :loading="loader"
          loading-text="Loading... Please wait"
          :headers="supplyHeaders"
          :items="supplyList"
          :items-per-page="10"
          :search="suppliesSearch"
        >
          <template v-slot:[`item.quantity`]="{ item }">
            {{ item.quantity }} {{ item.size }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" elevation="5">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </Layout>
  </div>
</template>

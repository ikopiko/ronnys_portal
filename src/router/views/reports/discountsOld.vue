<script>
import axios from 'axios'
import excel from 'vue-excel-export'
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import { GridPlugin, Toolbar, ExcelExport } from "@syncfusion/ej2-vue-grids";


import Transaction from './transaction'
import appConfig from "@/app.config";
import Vue from 'vue'

Vue.use(excel);

Vue.use(GridPlugin);

/**
 * Products-order component
 */
export default {
   page: {
    title: "Discounts",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, Transaction },
  data() {
    return {
      excelTitle: "Ronny's",
      toolbarOptions: ['ExcelExport'],
      fromDate: String(new Date()),
      // toDate: String(new Date()),
      toDate: null,
      selectedBranch: null,
      branchURL: null,
      showAlert: false,
      alertText: '',
      orderStatuses: [],
      exportData: [],
      branchOptions: [
        { value: null, text: 'Select Branch'},
        { value: 'saburtalo', text: 'Saburtalo'},
        { value: 'vake', text: 'Vake'},
        { value: 'digomi', text: 'Digomi'},
        { value: 'gldani', text: 'Gldani'},
      ],
      loggedUser: {},
      discountedOrders: [],
      discountedOrdersOld: [],
      title: 'Dicsounted Orders',
      items: [
        {
          text: 'Ecommerce',
          href: '/',
        },
        {
          text: 'Orders',
          active: true,
        },
      ],
      searchVal: null,
    }
  },
  watch: {
    selectedBranch(val){
      this.changeBranch(val);
    },
    searchVal(val){
      if(val.length ==0){
        val = null;
        this.discountedOrders = this.discountedOrdersOld;
      }
      else {
        
        // this.discountedOrdersOld = this.discountedOrders;
        this.discountedOrders = [];
        this.discountedOrdersOld.forEach((x) =>  {
         if(String(x.id).includes(val)){
           if(this.discountedOrders.length == 0)
            this.discountedOrders = [];
           
           this.discountedOrders.push(x);

         }
        //  if(String(x.order_data.customer.name).includes(val)){
        //    if(this.discountedOrders.length == 0)
        //     this.discountedOrders = [];
           
        //    this.discountedOrders.push(x);

        //  }
         if(String(x.order_data.discountName).toLowerCase().includes(val.toLowerCase()) || String(x.order_data.customer.name).toLowerCase().includes(val.toLowerCase())){
           if(this.discountedOrders.length == 0)
            this.discountedOrders = [];
           
           this.discountedOrders.push(x);

         }
        })
      }
      
    },
  },
  //   EXCEL EXPORT CODE
  provide: {
    grid: [Toolbar, ExcelExport]
  },
  //   END OF EXCEL EXPORT CODE
  mounted() {
    this.fromDate = this.formatDate(this.fromDate);
    // this.toDate = this.formatDate(this.toDate);
    this.loggedUser = this.$store.state.authfack.user;

    const TOKEN = this.loggedUser.token;

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "poses/order-statuses",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.orderStatuses = response.data.data
      });
  },
  methods: {
    // EXPORT METHODS
     btnClick() {
      if (this.$refs.Grid.$el.classList.contains('disablegrid')) {
          this.$refs.Grid.$el.classList.remove('disablegrid');
          document.getElementById("GridParent").classList.remove('wrapper');
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
                        { cells: [{ colSpan: 4, value: "Discounts", style: { fontColor: '#000000', fontSize: 15, hAlign: 'Center', bold: true, } }] },
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
    // END OF EXPORT METHODS
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
    updateDiscountOrders(){
      var date
      if(this.toDate == null) {
        date = this.fromDate + " to " + this.fromDate
      }
      else {
        date = this.fromDate + " to " + this.toDate
      }
      if(this.selectedBranch == null){
        this.showAlert = true;
        this.alertText = "Select Branch to continue...";
      } else {

      const TOKEN = this.loggedUser.token;

      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);
      bodyUpdate.set("branch",this.selectedBranch)

      axios
        .request({
          method: "post",
          url:
            "http://new.ronnys.info/?r=v1/manager/discounted-orders",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.discountedOrders = response.data.data;
            this.discountedOrdersOld = response.data.data;
            this.exportData = [];

            this.discountedOrders.forEach(x => {
              x.id = String(x.id);
            var index = x.status - 1;
            x.statusName = this.orderStatuses[index].status_name;
            if(x.order_data.discountName == 'Diplomat'){
              x.order_data.discPrice = x.order_data.totalPrice - x.order_data.totalPrice / 1.18;
              x.order_data.discType = '%';
              
            }
            else if(x.order_data.discountName == 'Manager' && x.order_data.discountAmount == true){
              x.order_data.discPrice = x.order_data.discount;
              x.order_data.discType = 'GEL';
            }
            else {
              x.order_data.discPrice = ((x.order_data.totalPrice / 100) * x.order_data.discount).toFixed(2);
              x.order_data.discType = '%';
            }
            x.order_data.totalDue = (x.order_data.totalPrice - x.order_data.discPrice).toFixed(2);

            var excelObject = {};
            

            excelObject.id = x.id;
            excelObject.name = x.order_data.customer.name;
            excelObject.totalPrice = x.order_data.totalPrice;
            excelObject.discountType = x.order_data.discountName;
            excelObject.discount = x.order_data.discount + " " + x.order_data.discType;
            excelObject.amount = x.order_data.discPrice;
            excelObject.totalDue = x.order_data.totalDue;
            excelObject.comment = x.order_data.managerComment;
            excelObject.payment = x.order_data.paymentType;
            excelObject.status = x.statusName;
            excelObject.date = x.finish_date;

            this.exportData.push(excelObject);

        });

        });
      }
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <b-alert v-model="showAlert" dismissible variant="danger">{{ alertText }}</b-alert>
            </div>
            <div class="row mb-2">
              <div class="col-sm-2">
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <input type="text" v-model="searchVal" class="form-control" placeholder="Search..." />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <b-form-select v-model="selectedBranch" class="form-control" :options="branchOptions"></b-form-select>
              </div>
              <!-- end col-->
            </div>
              <!-- end col-->
                <div class="row mb-2">
                  <div class="col-sm-4">
                    <div>
                      <label for="example-input">From</label>
                      <b-input-group class="mb-3">
                        <b-form-input
                          id="example-input"
                          v-model="fromDate"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          autocomplete="off"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-form-datepicker
                            v-model="fromDate"
                            button-only
                            right
                            locale="en-US"
                            aria-controls="example-input"
                          ></b-form-datepicker>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                </div>
                  <div class="col-sm-4">
                    <div>
                      <label for="example-input">To</label>
                      <b-input-group class="mb-3">
                        <b-form-input
                          id="example-input"
                          v-model="toDate"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          autocomplete="off"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-form-datepicker
                            v-model="toDate"
                            button-only
                            right
                            locale="en-US"
                            aria-controls="example-input"
                          ></b-form-datepicker>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                </div>
                  <div class="col-sm-4 mt-4">
                    <b-button variant="success" @click="updateDiscountOrders(), btnClick()">
                      <i
                        class="bx bx-check-double font-size-16 align-middle me-2"
                      ></i>
                      Search
                    </b-button>
                    <!-- EXCEL EXPORT CODE -->
                    <b-button variant="primary" class="mx-2" v-if="exportData.length != 0">
                    
                    <div id="app">
                      <!-- <ejs-button  iconCss="e-icons e-play-icon" cssClass="e-flat" :isPrimary="true" :isToggle="true" @click="btnClick">Enable/Disable Grid</ejs-button> -->
                      <ejs-button  iconCss="e-icons e-play-icon" cssClass="e-flat" :isPrimary="true" :isToggle="true" @click="toolbarClick">Excel Export</ejs-button>
                      <ejs-grid ref='Grid' id='Grid' :dataSource='exportData'  :toolbar='toolbarOptions' height='270px' :allowPaging='true' :allowExcelExport='true' :toolbarClick='toolbarClick'>
                          <e-columns>
                              <e-column field="id" headerText="Order ID" ></e-column>
                              <e-column field="name" headerText="Customer Name"></e-column>
                              <e-column field="totalPrice" headerText="Total Price" ></e-column>
                              <e-column field="discountType" headerText="Discount Type"></e-column>
                              <e-column field="discount" headerText="Discount"></e-column>
                              <e-column field="amount" headerText="Amount" ></e-column>
                              <e-column field="totalDue" headerText="Total Due"></e-column>
                              <e-column field="comment" headerText="Comment"></e-column>
                              <e-column field="payment" headerText="Payment" ></e-column>
                              <e-column field="woltCode" headerText="Wolt Code"></e-column>
                              <e-column field="status" headerText="Status"></e-column>
                              <e-column field="date" headerText="Date"></e-column>
                          </e-columns>
                      </ejs-grid>
                  </div>

                    </b-button>

                    <b-button variant="primary" class="mx-2 hidden disablegrid" v-if="exportData.length == 0">
                    
                    <div id="app">
                      <!-- <ejs-button  iconCss="e-icons e-play-icon" cssClass="e-flat" :isPrimary="true" :isToggle="true" @click="btnClick">Enable/Disable Grid</ejs-button> -->
                      <ejs-button  iconCss="e-icons e-play-icon" cssClass="e-flat" :isPrimary="true" :isToggle="true" @click="toolbarClick">Excel Export</ejs-button>
                      <ejs-grid ref='Grid' id='Grid' :dataSource='exportData'  :toolbar='toolbarOptions' height='270px' :allowPaging='true' :allowExcelExport='true' :toolbarClick='toolbarClick'>
                          <e-columns>
                              <e-column field="id" headerText="Order ID" ></e-column>
                              <e-column field="deliveryMethod" headerText="delivery Method"></e-column>
                              <e-column field="name" headerText="Customer Name"></e-column>
                              <e-column field="totalPrice" headerText="Total Price" ></e-column>
                              <e-column field="discountType" headerText="Discount Type"></e-column>
                              <e-column field="discount" headerText="Discount"></e-column>
                              <e-column field="amount" headerText="Amount" ></e-column>
                              <e-column field="totalDue" headerText="Total Due"></e-column>
                              <e-column field="comment" headerText="Comment"></e-column>
                              <e-column field="payment" headerText="Payment" ></e-column>
                              <e-column field="woltCode" headerText="Wolt Code"></e-column>
                              <e-column field="status" headerText="Status"></e-column>
                              <e-column field="date" headerText="Date"></e-column>
                          </e-columns>
                      </ejs-grid>
                  </div>

                    </b-button>
                  </div>
                <!-- end col-->
              </div>
            </div>
            <!-- Table data -->
            <Transaction :transactions="discountedOrders" />
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    <!-- end row -->
  </Layout>
</template>
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
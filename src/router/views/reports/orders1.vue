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
import PageHeader from '@/components/page-header'

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
    title: "Orders",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  computed: {

    rows() {
      return this.ordersList.length;
    },
  },
  data() {
    return {
      excelTitle: "Ronny's",
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
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "order_data.deliveryMethod",
          label: "Order Type",
          sortable: true,
        },
        {
          key: "order_data.customer.code",
          label: "Wolt Code",
          sortable: true,
        },
        {
          key: "order_data.customer.name",
          label: "Customer Name",
          sortable: true,
        },
        {
          key: "statusName",
          label: "Status",
          sortable: true,
        },
        {
          key: "order_data.totalPrice",
          label: "Total Price",
          sortable: true,
        },
        {
          key: "order_data.totalDue",
          label: "Total Due",
          sortable: true,
        },
        {
          key: "finish_date",
          labelr: "Date",
          sortable: true,
        },
        { key: 'actions', label: 'Actions' }
        
        
      ],
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
      selectedBranch: null,
      branchURL: null,
      modalItem: {},
      modalShow: false,
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
      ordersList: [],
      ordersListOld: [],
      title: 'Order List',
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
  //   EXCEL EXPORT CODE
  provide: {
    grid: [Toolbar, ExcelExport]
  },
  //   END OF EXCEL EXPORT CODE
  methods: {
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
                        { cells: [{ colSpan: 4, value: "Orders list", style: { fontColor: '#000000', fontSize: 15, hAlign: 'Center', bold: true, } }] },
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
    updateList(){
      // eslint-disable-next-line no-console

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
      bodyUpdate.set("status_key", this.status);
      bodyUpdate.set("branch",this.selectedBranch)

      axios
        .request({
          method: "post",
          url:
            "http://posapi.ronnyspizza.grena.ge/rest/web/index.php?r=v1/orders/list-reporting",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.ordersList = response.data.data;
            this.ordersListOld = response.data.data;
            this.exportData = [];

            this.ordersList.forEach(x => {
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
            excelObject.deliveryMethod = x.order_data.deliveryType;
            excelObject.name = x.order_data.customer.name;
            excelObject.totalPrice = x.order_data.totalPrice;
            excelObject.discountType = x.order_data.discountName;
            excelObject.discount = x.order_data.discount + " " + x.order_data.discType;
            excelObject.amount = x.order_data.discPrice;
            excelObject.totalDue = x.order_data.totalDue;
            excelObject.comment = x.order_data.managerComment;
            excelObject.payment = x.order_data.paymentType+"  "+(x.opay_status != null ?x.opay_status:"");
            excelObject.woltCode = x.order_data.customer.code;
            excelObject.status = x.statusName;
            excelObject.date = x.finish_date;

            this.exportData.push(excelObject);

        });

        });

        // this.btnClick();
        
      }
    },
  },
}
</script>

<template>
<div>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" data-app>
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
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                    ></b-form-input>
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
                    <b-button variant="success" @click="updateList(), btnClick()">
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
                              <e-column field="deliveryMethod" headerText="delivery Method"></e-column>
                              <e-column field="name" headerText="Customer Name"></e-column>
                              <e-column field="totalPrice" headerText="Total Price" ></e-column>
                              <e-column field="discountType" headerText="Discount Type"></e-column>
                              <e-column field="Discount" headerText="Discount"></e-column>
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
                              <e-column field="name" headerText="Customer Name"></e-column>
                              <e-column field="totalDue" headerText="Total Due"></e-column>
                              <e-column field="id" headerText="Order ID" ></e-column>
                              <e-column field="name" headerText="Customer Name"></e-column>
                              <e-column field="totalDue" headerText="Total Due"></e-column>
                          </e-columns>
                      </ejs-grid>
                  </div>

                    </b-button>
                    <!-- END OF EXCEL EXPORT CODE -->
                  </div>
                <!-- end col-->
              </div>
            </div>
            <div class="table-responsive mb-0" style="min-height: 300px;">
              <b-table
                class="datatables"
                :items="ordersList"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
              <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                  Info modal
                </b-button>
              </template>
              </b-table>
            </div>
          </div>
          <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      class="form-select form-select-sm"
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>

          <!-- end card-body -->
        </div>

      
        <!-- end card -->
      </div>
      <!-- end col -->
    <!-- end row -->
    
    <b-modal :id="infoModal.id" :title="infoModal.order_id" ok-only >

      <p class="mb-2">
        Product id:
        <span class="text-primary">{{ infoModal.order_id }}</span>
      </p>
      <p class="mb-2">
        Discount Type:
        <span class="text-primary">{{ infoModal.discountName }}</span>
      </p>
      <p class="mb-2">
        Discount:
        <span class="text-primary">- {{ infoModal.discount }} {{ infoModal.discType }}</span>
      </p>
      <p class="mb-4">
        Customer Name:
        <span class="text-primary">{{ infoModal.customer }}</span>
      </p>
      <div class="table-responsive">
        <table class="table table-centered table-nowrap">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product QTY</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in infoModal.items" :key="index">
              <td>
                <div>
                  <h5 class="text-truncate font-size-14">
                    {{ item.size }} {{ item.name }}
                  </h5>
                  <p class="text-muted mb-0">GEL {{ item.price }} x {{ item.qty }}</p>
                </div>
              </td>
              <td>
                X {{ item.qty }}
              </td>
              <td>{{ item.price * item.qty }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-end">Sub Total:</h6>
              </td>
              <td>{{ infoModal.totalPrice }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-end">Discount:</h6>
              </td>
              <td>{{ infoModal.discPrice }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <h6 class="m-0 text-end">Total Due:</h6>
              </td>
              <td>{{ infoModal.totalDue }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </b-modal>
  </Layout>
  <!-- <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="modalShow"
      >
        
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="modalShow = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog> -->
  </div>
</template>

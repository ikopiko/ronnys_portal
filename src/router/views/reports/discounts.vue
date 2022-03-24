<script>
import axios from 'axios'
import excel from 'vue-excel-export'
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'


import Transaction from './transaction'
import appConfig from "@/app.config";
import Vue from 'vue'

Vue.use(excel);

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
        this.branchURL = 'http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'vake'){
        this.branchURL = 'http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'digomi'){
        this.branchURL = 'http://109.172.176.98:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'gldani'){
        this.branchURL = 'http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/';
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

      axios
        .request({
          method: "post",
          url:
            this.branchURL + "manager/discounted-orders",
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
                    <b-button variant="success" @click="updateDiscountOrders()">
                      <i
                        class="bx bx-check-double font-size-16 align-middle me-2"
                      ></i>
                      Search
                    </b-button>
                    <b-button variant="primary" class="mx-2" v-if="exportData.length != 0">
                    <export-excel
                        :data  = "exportData"
                        :name = "'discounts.xls'">
                        Export data to Excel
                        <i class="bx bx-download"></i>
                    </export-excel>
                    </b-button>
                  </div>
                <!-- end col-->
              </div>
            </div>
            <!-- Table data -->
            <Transaction :transactions="discountedOrders" />
            <!-- <ul class="pagination pagination-rounded justify-content-end mb-2">
              <li class="page-item disabled">
                <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                  <i class="mdi mdi-chevron-left"></i>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="javascript: void(0);">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript: void(0);">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript: void(0);">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript: void(0);">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript: void(0);">5</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript: void(0);" aria-label="Next">
                  <i class="mdi mdi-chevron-right"></i>
                </a>
              </li>
            </ul> -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    <!-- end row -->
  </Layout>
</template>

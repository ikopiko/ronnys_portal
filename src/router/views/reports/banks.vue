<script>
import axios from 'axios'
import excel from 'vue-excel-export'
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'


import appConfig from "@/app.config";
import Vue from 'vue'

Vue.use(excel);

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
          key: "order_id",
          label: "Order ID",
          sortable: true,
        },
        {
          key: "name",
          label: "POS",
          sortable: true,
        },
        {
          key: "payment_method",
          label: "Payment",
          sortable: true,
        },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Date",
          sortable: true,
        },
        
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
      title: 'Banks Details',
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
  methods: {
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
        this.branchURL = 'http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'vake'){
        this.branchURL = 'http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'digomi'){
        this.branchURL = 'http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/';
      } 
      else if(branch == 'gldani'){
        this.branchURL = 'http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/';
      } 
    },
    updateList(){
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

    //   var bodyUpdate = new FormData();
    //   bodyUpdate.set("day", dateString);

    //   axios
    //     .request({
    //       method: "post",
    //       url:
    //         this.$hostname + "poses/poses-detail",
    //       headers: {
    //         Authorization: "Bearer " + TOKEN,
    //       },
    //       data: bodyUpdate,
    //     })
    //     .then((response) => {
    //         this.ordersList = response.data.data;
    //         this.ordersList.forEach(x => {
    //           const date = new Date(x.created_at);
    //           //x.created_time = date.getUTCFullYear() + "-" + date.getHours() + ":" + date.getMinutes();

    //           if(x.amount < 0 && x.action != 'New order'){
    //             x.payment_method = 'Drop balance';
    //           }
    //         }
    //     }
        
      var bodyUpdate = new FormData();
      bodyUpdate.set("day", date);

      axios
        .request({
          method: "post",
          url:
            this.branchURL + "poses/poses-detail",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          data: bodyUpdate,
        })
        .then((response) => {
            this.ordersList = response.data.data;

          this.ordersList.forEach(x => {

            var excelObject = {};
            
            excelObject.id = x.id;
            excelObject.name = x.name;
            excelObject.amount = x.amount;
            excelObject.method = x.payment_method;
            excelObject.pos_id = x.pos_id;
            excelObject.user_id = x.user_id;
            excelObject.created_at = x.created_at;

            this.exportData.push(excelObject);
          });
        });
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
                    <b-button variant="success" @click="updateList()">
                      <i
                        class="bx bx-check-double font-size-16 align-middle me-2"
                      ></i>
                      Search
                    </b-button>
                    <b-button variant="primary" class="mx-2" v-if="exportData.length != 0">
                    <export-excel
                        :data  = "exportData"
                        :name = "'banks.xls'">
                        Export data to Excel
                        <i class="bx bx-download"></i>
                    </export-excel>
                    </b-button>
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
  </Layout>
  </div>
</template>

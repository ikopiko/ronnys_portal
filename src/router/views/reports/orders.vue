`<script>
import axios from "axios";
import Layout from "../../layouts/main";
import DatePicker from "vue2-datepicker";
import excel from "vue-excel-export";
import Vue from "vue";
import moment from "moment";
Vue.use(excel);
export default {
  page: {
    title: "Sales Report",
  },
  components: {
    Layout,
    DatePicker,
  },
  computed: {},
  data() {
    return {
      modalTotalPrice:null,
      modalDiscount:null,
      modalTotalDue:null,
      order_data:[],
      modalProductId:null,
      modalDiscType:null,
      modalDisc:null,
      modalCustomer: null,
      orderStatuses: [],
      status: "1,2,3,4,5,6,7,8,9,10",
      detailModal: false,
      date: [
        moment(new Date()).format("YYYY-MM-DD"),
        moment(new Date()).format("YYYY-MM-DD"),
      ],
      branch: null,
      validSearch: true,
      loader: false,
      exportName:"All - "+ moment(new Date()).format("YYYY-MM-DD"),
      json_data: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      selectedBranch: null,
      branchOptions: [
        { value: "Saburtalo", text: "Saburtalo" },
        { value: "Vake", text: "Vake" },
        { value: "Digomi", text: "Digomi" },
        { value: "Gldani", text: "Gldani" },
      ],
      warehouseId: null,
      supplyList: [],
      suppliesSearch: "",
      branchURL: null,
      json_fields: {
        "Order ID": "id",
        "delivery": "order_data.deliveryMethod",
        "Customer Name": "order_data.customer.name",
        "Total price": "order_data.totalPrice",
        "Type":"order_data.discountName",
        "Amount": "order_data.newdiscount",
        "Split cash": "order_data.splitCash",
        "Split card": "order_data.splitCard",
        "Total due": "order_data.discounted",
        "Comment":"order_data.managerComment",
        "Method":"order_data.paymentType",
        "Wolt Code":"order_data.customer.code",
        "Branch": "branch",
        "status": "statusName",
        "Date": "finish_date",
     
     },
      supplyHeaders: [
        {
          value: "id",
          text: "Order ID",
          sortable: true,
        },
           {
          value: "order_data.deliveryMethod",
          text: "Order Type",
          sortable: true,
        },
        {
          value: "order_data.customer.code",
          text: "Wolt Code",
          sortable: true,
        },
        {
          value: "order_data.customer.name",
          text: "Customer Name",
          sortable: true,
        },
                {
          value: "status",
          text: "Status",
          sortable: true,
        },
        {
          value: "order_data.totalPrice",
          text: "Total Price",
          sortable: true,
        },
        {
          value: "order_data.totalDue",
          text: "Total Due",
          sortable: true,
        },
       
        {
          value: "finish_date",
          text: "Finish Date",
          sortable: true,
        },
                 {
          value: "branch",
          text: "Branch",
          sortable: true,
        },
          {
          value: "actions",
          text: "Details",
          sortable: true,
        },
       
      ],
      nameRules: [(v) => !!v || " required"],
    };
  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;

  axios
      .request({
        method: "post",
        url:
          this.$hostname + "poses/order-statuses",
        headers: {
          Authorization: "Bearer " + this.TOKEN
        },
      })
      .then((response) => {
        this.orderStatuses = response.data.data
      });

    this.getReport()
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    showDetail(item){
      this.modalProductId = item.id
      this.modalDiscType  = item.order_data.discountName
      this.modalDisc = item.order_data.discount+this.discount(item,"discname")
      this.modalCustomer =item.order_data.customer.name
      // eslint-disable-next-line no-console
      console.log(item.order_data.items)
      this.order_data = item.order_data.items
      this.modalTotalPrice = item.order_data.totalPrice
      this.modalDiscount =  this.discount(item,"discounted")
      this.modalTotalDue = this.discount(item,"totalDue")
      this.detailModal = true
    },
    
    discount(item, ident){
        if(ident == "discname") {
          if(item.order_data.discountName=="Diplomat")
            return '%'
          else if(item.order_data.discountName=="Manager" && item.order_data.discountAmount == true)
          return "GEL"
          else return "%"
          } else if(ident == "discounted") {
              if(item.order_data.discountName=="Diplomat")
                 return (item.order_data.totalPrice - item.order_data.totalPrice / 1.18).toFixed(2)
          else if(item.order_data.discountName=="Manager" && item.order_data.discountAmount == true)
          return  item.order_data.discount;
          else 
          return ((item.order_data.totalPrice / 100) * item.order_data.discount).toFixed(2)
          } else if(ident == "totalDue") {
            if(item.order_data.discountName=="Diplomat")
              return  (item.order_data.totalPrice-(item.order_data.totalPrice - item.order_data.totalPrice / 1.18)).toFixed(2);
            else if(item.order_data.discountName=="Manager" && item.order_data.discountAmount == true)
            return (item.order_data.totalPrice - item.order_data.discount).toFixed(2)
            else 
          return  (item.order_data.totalPrice-((item.order_data.totalPrice / 100) * item.order_data.discount)).toFixed(2)
                
          }
    },
    getReport() {
      
      if (this.$refs.searchForm.validate()) {
        this.loader = true;
        this.json_data = []; 
        this.supplyList = [];

        // this.branchURL = "http://new.ronnys.info/?r=v1/reporting/list-reporting"
        axios
          .request({
            method: "post",
            url: this.$hostname + "reporting/list-reporting",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              day: this.date,
              status_key: this.status,
              branch: this.branch
            },
          })
          .then((response) => {
            this.loader = false;
            // eslint-disable-next-line no-console
            this.supplyList = this.json_data = response.data.data
           
            this.supplyList.forEach((x) => {
              x.order_data.paymentType = x.order_data.paymentType+"  "+(x.opay_status != null ?x.opay_status:"");
              x.order_data.newdiscount = x.order_data.discount+this.discount(x, "discname");
              x.order_data.discounted = this.discount(x,"discounted");
              x.order_data.totalDue = this.discount(x, "totalDue");
              x.statusName =  this.orderStatuses[x.status-1].status_name 
            });
          
          });
      }
    },
    updateRegion(event) {
      this.exportName =event+ " - "+this.date
      
    }
  },
};
</script>

<template>
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
              @change="(event) => updateRegion(event, index)"
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
          <template v-slot:[`item.status`]="{ item }">
             <span
                class="badge badge-pill  badge-soft-success"
                :class="{
                  
                  'badge-soft-warning ': `${item.status}` != 7,
                }"
                >{{item.statusName}}</span>
        
          </template>
           
              
         
            <template  v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon color="primary">
                          <v-icon small @click="showDetail(item)">
                            mdi-eye
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>View Details</span>
                  </v-tooltip>
              
              
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
       
       <v-dialog v-model="detailModal" max-width="600">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Order Detail</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="detailModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="supplyForm" lazy-validation>
            <v-row>
              <div>Order id: <span class="font-size-15 font-weight-bold text-muted">{{modalProductId}}</span></div>
              <div>Discount Type: <span class="font-size-15 font-weight-bold text-muted">{{modalDiscType}}</span></div>
                <div>Discount: <span class="font-size-15 font-weight-bold text-muted">{{modalDisc}}</span></div>
                <div>Customer Name: <span class="font-size-15 font-weight-bold text-muted">{{modalCustomer}}</span></div>
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
                      <tr v-for="(item, index) in order_data" :key="index">
                      <td>
                        <div>
                          <div class="font-size-15 font-weight-bold text-muted">
                            {{ item.size }} {{ item.name }}
                          </div>
                          <span class="text-muted font-size-14 mb-0">GEL {{ item.price }} x {{ item.qty }}</span>
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
                      <td class="font-size-15 font-weight-bold text-muted">{{modalTotalPrice}}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h6 class="m-0 text-end">Discount:</h6> 
                      </td>
                      <td class="font-size-15 font-weight-bold text-muted">{{modalDiscount}}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h6 class="m-0 text-end">Total Due:</h6>
                      </td>
                      <td class="font-size-15 font-weight-bold text-muted">{{modalTotalDue}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>



                
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
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="detailModal = false"
          >
            <i class="bx bx-x-circle"></i> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Layout>
</template>

<style>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>`
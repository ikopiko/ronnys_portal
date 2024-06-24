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
    title: "Timetable Report",
  },
  components: {
    Layout,
    DatePicker,
  },
  computed: {},
  data() {
    return {
      sheet: false,
      errorText: '',
      detailedInfoModal: false,
      detailedInfo: [],
      dateString: '',
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
      branchID: '',
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
        { value: 2, text: "Saburtalo", id: 2 },
        { value: 3, text: "Vake", id: 3 },
        { value: 1, text: "Digomi", id: 1 },
        { value: 4, text: "Gldani", id: 4 },
        { value: 5, text: "Avlabari", id: 5 }
      ],
      warehouseId: null,
      tabelList: [],
      suppliesSearch: "",
      branchURL: null,
      json_fields: {
        "Branch Name": "branch_name",
        "Username": "user_name",
        "Start Work": "startwork",
        "End Work": "endwork",
        "Work Time":"worktime",
        "Start Break": "startbreak",
        "End Break": "endbreak",
        "Break Time": "breaktime",
        "Break Over": "breackover",
        "Comment":"comment",
        "Created At": "created_at",
     
     },
      supplyHeaders: [
        {
          value: "branch_name",
          text: "Branch Name",
          sortable: true,
        },
           {
          value: "user_name",
          text: "Username",
          sortable: true,
        },
        {
          value: "startwork",
          text: "Start Work",
          sortable: true,
        },
        {
          value: "endwork",
          text: "End Work",
          sortable: true,
        },
        {
          value: "workHours",
          text: "Work Time",
          sortable: true,
        },
        {
          value: "startbreak",
          text: "Start break",
          sortable: true,
        },
        {
          value: "endbreak",
          text: "End Break",
          sortable: true,
        },
       
        {
          value: "breaktime",
          text: "Break Time",
          sortable: true,
        },
          {
          value: "breackover",
          text: "Break Over",
          sortable: true,
        },
                 {
          value: "comment",
          text: "Comment",
          sortable: true,
        },
          {
          value: "created_at",
          text: "Created At",
          sortable: true,
        },
        { text: "Actions", value: "actions", align: "end", sortable: false },
       
      ],
      nameRules: [(v) => !!v || " required"],
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      var role = vm.$store.state.authfack.user.role;
       if (role == "admin" || role == "financialManager" || role == "operationalManager"
        || role == "branchManager" || role == "hrManager") {
         vm.$router.push({path: "/reports/timetable"}).catch(()=>{});
       }
       else {
         vm.$router.push({path: "/"}).catch(()=>{});
       }
    });
  },
  mounted() {
    this.formatRange(this.date);
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;

    this.getReport()
  },
  watch: {
    date(val){
        this.formatRange(val);
        this.getReport();
    },
  },
  methods: {
    editItemFinish(item){
      if(item.comment != ''){
        const TOKEN = this.loggedUser.token;
        var bodyFormData = new FormData();
        bodyFormData.set("id", item.id);
        bodyFormData.set("start_date", item.start_date);
        bodyFormData.set("comment", "BLA");
        // bodyFormData.set("order_id", this.order.orderId);
        axios
          .request({
            method: "post",
            url:
              this.$hostname + "tabel/edit",
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData,
          })
          .then((response) => {
            // this.getList(this.selectedTabel);
            this.errorText = response.data.data;
            this.sheet = true;
            this.getReport();
            this.$forceUpdate();
          });

      } else {
        this.errorText = "Comment is a must for editing tabel item";
        this.sheet = true;
      }

  },
    formatDate(val){
      // alert(this.isEmpty(val));
      if(val != ''){
          
        var date = new Date(val);

        // Hours part from the timestamp
        var hours = date.getHours();

        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return(formattedTime);
      } else {
        // alert("Empty");
      }

    },
    isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
    formatRange(val){
        this.dateString = val[0]+ ", "+ val[1];
    },
     sumField(key) {
        const sum =  this.tabelList.reduce((a, b) => a*1 + (b[key]*1 || 0), 0)
        return sum.toFixed(2)
    },
    toogleDetailedModal() {
      this.detailedInfoModal = !this.detailedInfoModal;
    },

    showDetail(item){
      // this.detailedInfo = item;
        var bodyFormData = new FormData();
        bodyFormData.set("id", item.id);
        axios
          .request({
            method: "post",
            url: this.$hostname + "tabel/list",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
             id: item.id,

            },
          })
          .then((response) => {
            // eslint-disable-next-line no-console
            this.detailedInfo = response.data.data;
            this.toogleDetailedModal();
            });
    },
    
     discount(item, ident){
        if(ident == "discname") {
          if(item.discountName=="Diplomat")
            return '%'
          else if(item.discountName=="Manager" && item.discountAmount == true)
          return "GEL"
          else return "%"
          } else if(ident == "discounted") {
              if(item.discountName=="Diplomat")
                 return (item.totalPrice - item.totalPrice / 1.18).toFixed(2)
          else if(item.discountName=="Manager" && item.discountAmount == true)
          return  item.discount;
          else 
          return ((item.totalPrice / 100) * item.discount).toFixed(2)
          } else if(ident == "totalDue") {
            if(item.discountName=="Diplomat")
              return  (item.totalPrice-(item.totalPrice - item.totalPrice / 1.18)).toFixed(2);
            else if(item.discountName=="Manager" && item.discountAmount == true)
            return (item.totalPrice - item.discount).toFixed(2)
            else 
          return  (item.totalPrice-((item.totalPrice / 100) * item.discount)).toFixed(2)
                
          }
    },
    getReport() {
      
      if (this.$refs.searchForm.validate()) {
        this.loader = true;
        this.json_data = []; 
        this.tabelList = [];

        // this.branchURL = "http://posapi.ronnyspizza.grena.ge/rest/web/index.php?r=v1/reporting/list-reporting"
        // this.branchURL = "http://new.ronnys.info/?r=v1/reporting/list-reporting"
        axios
          .request({
            method: "post",
            url: this.$hostname + "tabel/historyportal",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              date: this.dateString,
              branch_id: this.branchID,
            },
          })
          .then((response) => {
            this.loader = false;
            // eslint-disable-next-line no-console
            this.tabelList = this.json_data = response.data.data;
            
            // this.tabelList.forEach(x => {
            //   x.workHours = (Number(x.worktime) / 60).toFixed(2);
            //   x.startwork = this.formatDate(Number(x.startwork));
            //   x.endwork = this.formatDate(Number(x.endwork));
            //   x.endbreak = this.formatDate(Number(x.endbreak));
            //   x.startbreak = this.formatDate(Number(x.startbreak));
            // });

          
          });
      }
    },
    updateBranch() {
      
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
              v-model="branchID"
              :items="branchOptions"
              @change="updateBranch(branch)"
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
          :items="tabelList"
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
                    <v-btn icon color="primary" v-if="item.endwork == ''" class="inactive">
                      <v-icon small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn icon color="primary" v-else>
                      <v-icon small @click="showDetail(item)">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </span>
                </template>
                <span>Edit Info</span>
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

    <v-dialog
        v-model="detailedInfoModal"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Timeclock Details</span>
            <export-excel
              class="btn btn-success"
              :data="detailedInfo"
              :fields="json_fields"
              worksheet="Worksheet"
            >
              <i class="mdi mdi-download"> Excel Export </i>
            </export-excel>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Select Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="10">

                <template>
                  <v-simple-table height="300px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            State
                          </th>
                          <th class="text-left">
                            Start Date
                          </th>
                          <th class="text-left">
                            Comment
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in detailedInfo" :key="index">
                          <td>{{ item.user_name }}</td>
                          <td>{{ item.state }}</td>
                          <td>
                          <!-- <input type="text" class="form-control" :value="item.start_date" :v-model="item.start_date"> -->
                          <input type="text" class="form-control" v-model="item.start_date" placeholder="edit me" @keypress="isNumber($event)" />
                          </td>
                          <td><input type="text" class="form-control" placeholder="Comment" v-model="item.comment"></td>
                          <td><v-btn @click="editItemFinish(item)">Edit Item</v-btn></td>
                        </tr>
                        <tr><td>
                          <v-btn @click="detailedInfoModal = false">Close</v-btn>
                        </td></tr>
                      </tbody>
                      
                    </template>
                  </v-simple-table>
                </template>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-bottom-sheet v-model="sheet">
          <v-sheet
            class="text-center"
            height="200px"
          >
            <v-btn
              class="mt-6"
              text
              color="red"
              @click="sheet = !sheet"
            >
              close
            </v-btn>
            <div class="py-3">
              <h1>
                {{ errorText }}
              </h1>
            </div>
          </v-sheet>
        </v-bottom-sheet>
  </Layout>
</template>

<style>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
.inactive {
  opacity: 0.5;
  pointer-events: none;
} 
</style>
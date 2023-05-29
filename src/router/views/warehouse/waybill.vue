<script>
import axios from "axios";
import Layout from "../../layouts/main";
import DatePicker from "vue2-datepicker";
import moment from "moment";


//import Swal from "sweetalert2";
// import PageHeader from '@/components/page-header'

/**
 * Products-order component
 */
export default {

  page: {
    title: "Waybill",
  },
  components: {
      DatePicker,
    Layout,
  },
  computed: {
  

  },
  data() {
    return {
      waybillType:[],
      isconfirmed:{0:"მისაღები",1:"მიღებული","-1":"უარყოფილი"},
      lastday:new Date(),
       date: [],
      loader:false,
      waybillModal:false,
      selectedItem: {},
      showAcceptRecieveProductsBtn: false,
      seletedwaybill: null,
      waybillDetail: null,
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      warehouseId: null,
      waybillList: [],
      waybillSearch: "",
      waybillGoodsList: [],
      waybillHeaders: [
        { text: "WAYBILL NUMBER", align: "start", value: "WAYBILL_NUMBER" },
      { text: "STATUS", value: "STATUS" },

     { text: "IS CONFIRMED", align: "start", value: "IS_CONFIRMED" },
             { text: "TYPE", value: "TYPE" },
        { text: "SELLER_NAME", value: "SELLER_NAME" },
        { text: "AMOUNT", value: "FULL_AMOUNT" },
        { text: "DRIVER", value: "DRIVER_NAME" },
        { text: "CAR_NUMBER", value: "CAR_NUMBER" },
        { text: "START_ADDRESS", value: "START_ADDRESS" },
        { text: "END_ADDRESS", value: "END_ADDRESS" },
      
        { text: "ACTIVATE_DATE", value: "ACTIVATE_DATE" },
  { text: "WAYBILL_COMMENT", value: "WAYBILL_COMMENT" },
      
      ],
      waybillDetailHeader:[
         { text: "W_NAME", align: "start", value: "W_NAME" },
         { text: "QUANTITY", align: "start", value: "QUANTITY" },
         { text: "Barcode", align: "start", value: "BAR_CODE" },
         { text: "PRICE", align: "start", value: "PRICE" },
         { text: "AMOUNT", align: "start", value: "AMOUNT" },
      ],
      nameRules: [(v) => !!v || " required"],
    };
  },

  mounted() {
    this.lastday.setDate(this.lastday.getDate() -1)
    this.date = [ moment(this.lastday).format("YYYY-MM-DD"),
        moment(new Date()).format("YYYY-MM-DD"),]
   ;
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
    this.getwaybillTypes();
    this.getwaybillList();
    
  },
  methods: {
    getwaybillTypes(){
      
       axios
        .request({
          method: "post",
          url: this.$hostname + "rs/get-waybill-types",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
        })
        .then((response) => {

        
          response.data.forEach(x => {
          
              // eslint-disable-next-line no-console
              this.waybillType[x.ID] = x.NAME          
          });
           // eslint-disable-next-line no-console
           //console.log(this.waybillType)
          // this.waybillList = response.data.filter((rqst) => {
          //   return rqst.status == 1;
          // });
        });
  
    },
    // eslint-disable-next-line no-unused-vars
    rowClick(item, row) {
      // eslint-disable-next-line no-console

    this.selectedItem = item;
     this.waybillModal = true
           var bodyFormData = new FormData();
      bodyFormData.set("waybill_id", item.ID);
      axios
        .request({
          method: "post",
          url: this.$hostname + "rs/waybills-detail",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
           // eslint-disable-next-line no-console
 
           this.waybillGoodsList = response.data.GOODS.length?response.data.GOODS:[response.data.GOODS];
           // eslint-disable-next-line no-console
           console.log(response)
          // this.waybillList = response.data.filter((rqst) => {
          //   return rqst.status == 1;
          // });
        });
    },

    getwaybillList() {
      this.loader = true
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
      bodyFormData.set("day", this.date);
      axios
        .request({
          method: "post",
          url: this.$hostname + "rs/waybills",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          this.loader = false
          var temp = response.data;
          var temp2 = [];

          temp.forEach(x => {
          
              temp2.push(x);
          
          });
           this.waybillList = temp2;
          // this.waybillList = response.data.filter((rqst) => {
          //   return rqst.status == 1;
          // });
        });
    },
   
  },
};
</script>

<template>
  <Layout>
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
          <v-col cols="2">
            <v-btn color="primary" elevation="0" @click="getwaybillList()">
              <v-icon small> mdi-magnify </v-icon>
              Search
            </v-btn>
          </v-col>
    </v-row>
    <v-card>
      <v-card-text>
        <v-card-title>
          <v-text-field
            dense
            class="col-4 pl-0"
            v-model="waybillSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
             
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
         :loading="loader"
          dense
          show-select
          :headers="waybillHeaders"
          :items="waybillList"
          :items-per-page="10"
          :search="waybillSearch"
           @click:row="rowClick"
        >
        <template v-slot:[`item.STATUS`]="{ item }">
          {{item.STATUS==1?'აქტიური':'დასრულებული'}}
        </template>
        <template v-slot:[`item.IS_CONFIRMED`]="{ item }">
          {{ isconfirmed[item.IS_CONFIRMED]}}
        </template>
             <template v-slot:[`item.TYPE`]="{ item }">
          {{ waybillType[item.TYPE]}}
        </template>

        </v-data-table>
      </v-card-text>
    </v-card>
    
    <v-dialog v-model="waybillModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Waybill Detail</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="waybillModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="supplyForm" lazy-validation>
            <v-row>
              <v-col cols="12">
                  <v-data-table
          dense
        
          :headers="waybillDetailHeader"
          :items="waybillGoodsList"
          :items-per-page="10"

        >
        
        </v-data-table>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
     
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
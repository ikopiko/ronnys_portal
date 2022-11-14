<script>
import axios from "axios";
import Layout from "../../layouts/main";


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
    Layout,
  },
  computed: {},
  data() {
    return {
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
        { text: "SELLER_NAME", value: "SELLER_NAME" },
        { text: "IS CONFIRMED", align: "start", value: "IS_CONFIRMED" },
        { text: "ACTIVATE_DATE", value: "ACTIVATE_DATE" },
      
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
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
    this.getwaybillList();
  },
  methods: {
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
           console.log(response.data)
          // this.waybillList = response.data.filter((rqst) => {
          //   return rqst.status == 1;
          // });
        });
    },

    getwaybillList() {
      this.loader = true
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
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
            if(x.IS_CONFIRMED == 0){
              temp2.push(x);
            }
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
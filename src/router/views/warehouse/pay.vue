<script>
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
      waybillModal:false,
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
        { text: "ACTIVATE_DATE", value: "ACTIVATE_DATE" },
      
      ],
      waybillDetailHeader:[
         { text: "W_NAME", align: "start", value: "W_NAME" },
         { text: "QUANTITY", align: "start", value: "QUANTITY" },
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
   // this.getwaybillList();
  },
  methods: {


    getwaybillList() {

 var username = '11121';
    var password = '42d8894e6b0d7358789aef7ee52afc4a'

    const token = `${username}:${password}`;
    // eslint-disable-next-line no-unused-vars
    const encodedToken = Buffer.from(token).toString('base64');

   var axios = require('axios');

var qs = require('qs');
var data = qs.stringify({
  'grant_type': 'client_credentials' 
});

delete axios.defaults.headers.common["authorization"];


var config = {
  method: 'post',
  url: 'https://ipay.ge/opay/api/v1/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
      },
    
  auth: {
  username: '11121',
  password: '42d8894e6b0d7358789aef7ee52afc4a'
},

  data : data
};

axios(config)
.then(function (response) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});


    },
   
  },
};
</script>

<template>
  <Layout>
   <b-btn active @click="getwaybillList">asdads</b-btn>
 





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
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
      date: [
        moment(new Date()).format("YYYY-MM-DD"),
        moment(new Date()).format("YYYY-MM-DD"),
      ],
      branch: null,
      validSearch: true,
      loader: false,
      exportName:"All",
      json_data: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      selectedBranch: null,
      branchOptions: [
        { value: "2", text: "Saburtalo" },
        { value: "3", text: "Vake" },
        { value: "1", text: "Digomi" },
        { value: "4", text: "Gldani" },
      ],
      warehouseId: null,
      supplyList: [],
      suppliesSearch: "",
      branchURL: null,
      json_fields: {
        "Amount": "amount",
        "Action": "payment",
        "Pos": "pos_name",
        "Driver":"driver_name",
        "Manager":"user_name",
        "Comment":"comment",
        "Branch": "branch_name",
        "Date":"created_at"
      },
      supplyHeaders: [
        {
          value: "amount",
          text: "Amount",
          sortable: true,
        },
        {
          value: "payment",
          text: "Action",
          sortable: true,
        },
        {
          value: "pos_name",
          text: "POS",
          sortable: true,
        },
        {
          value: "driver_name",
          text: "Driver",
          sortable: true,
        },
        {
          value: "user_name",
          text: "Manager",
          sortable: true,
        },
        {
          value: "comment",
          text: "Comment",
          sortable: true,

        },
        {
          value: "branch_name",
          text: "Branch",
          sortable: true,
        },
  {
          value: "created_at",
          text: "Date",
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
    this.getReport()
  },
  methods: {
    getReport() {
      
      if (this.$refs.searchForm.validate()) {
        this.loader = true;
        this.json_data = this.supplyList = [];

        this.branchURL = "http://posapi.ronnyspizza.grena.ge/rest/web/index.php?r=v1/reporting/safe-detail"
        axios
          .request({
            method: "post",
            url: this.branchURL + "",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              day: this.date,
              branch_id: this.branch
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
</template>
<style>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>`
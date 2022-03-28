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
      json_fields: {
        Name: "name",
        Quantity: "quantity",
        Size: "size",
        Price: "price",
        "Category name":"category_name"
      },
      json_data: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      selectedBranch: null,

      branchOptions: [
        { value: "saburtalo", text: "Saburtalo" },
        { value: "vake", text: "Vake" },
        { value: "digomi", text: "Digomi" },
        { value: "gldani", text: "Gldani" },
      ],
      warehouseId: null,
      supplyList: [],
      suppliesSearch: "",
      branchURL: null,
      supplyHeaders: [
        { text: "Name", align: "start", value: "name" },
        { text: "quantity", align: "start", value: "quantity" },
        { text: "Price", align: "start", value: "price" },
        { text: "Category name", align: "start", value: "category_name" },
        
      ],

      nameRules: [(v) => !!v || " required"],
    };
  },

  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
  },
  methods: {
    getReport() {
      if (this.$refs.searchForm.validate()) {
        this.loader = true;

        this.json_data = this.supplyList = [];

        if (this.branch == "saburtalo") {
          this.branchURL =
            "http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/";
        } else if (this.branch == "vake") {
          this.branchURL =
            "http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/";
        } else if (this.branch == "digomi") {
          this.branchURL =
            "http://109.172.176.98:8082/ronny/rest/web/index.php?r=v1/";
        } else if (this.branch == "gldani") {
          this.branchURL =
            "http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/";
        }

        axios
          .request({
            method: "post",
            url: this.branchURL + "reporting/sales-report",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              date: this.date,
            },
          })
          .then((response) => {
            this.loader = false;
            // eslint-disable-next-line no-console
            this.json_data = this.supplyList = response.data;
            this.supplyList.forEach((x) => {
              x.selected = false;
            });
          });
      }
    },
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
              dense
              :rules="nameRules"
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
            name="Sale report.xls"
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
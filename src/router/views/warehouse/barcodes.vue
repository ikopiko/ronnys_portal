<script>
import axios from "axios";
import Layout from "../../layouts/main";


export default {
  page: {
    title: "barcodes",
  },
  components: {
    Layout,
  },
  computed: {},
  data() {
    return {
      loader: false,
      barcodesModal: false,
      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
      warehouseId: null,
      barcodesList: [],
      barcodesSearch: "",
      barcodesHeaders: [
        { text: "Code", align: "start", value: "CODE" },
        { text: "Name", align: "start", value: "NAME" },
        { text: "Unit", value: "UNIT_TXT" },
      ]
    };
  },

  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
    this.getbarcodesList();
  },
  methods: {
    getbarcodesList() {
      this.loader = true;
      var bodyFormData = new FormData();
      axios
        .request({
          method: "post",
          url: this.$hostname + "rs/barcodes",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
        
          this.loader = false;
        
        this.barcodesList = response.data.length ==0?[]:response.data[1]?response.data:[response.data]
     
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
            class="col-2 pl-0"
            v-model="barcodesSearch"
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
        
          :headers="barcodesHeaders"
          :items="barcodesList"
          :items-per-page="10"
          :search="barcodesSearch"
          @click:row="rowClick"
        >
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
</style>
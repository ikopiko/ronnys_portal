<script>
import axios from "axios";
import Layout from "../../layouts/main";
import { newRequest } from "../../../firebase";

//import Swal from "sweetalert2";
// import PageHeader from '@/components/page-header'

/**
 * Products-order component
 */
export default {
  firebase: {
    newRequestList: newRequest,
    count: [{ id: 0 }],
  },
  page: {
    title: "Manage Warehouse",
  },
  components: {
    Layout,
  },
  computed: {},

  watch: {
    newRequestList: function () {
      var newRequestListArray = Object.values(this.newRequestList);
      var t = newRequestListArray.filter((rqst) => {
        return (
          rqst.warehouse_id == this.warehouseId &&
          rqst.function == "receiveRequest"
        );
      });
      var p = newRequestListArray.filter((rqst) => {
        return (
          rqst.warehouse_id == this.warehouseId && rqst.function == "newRequest"
        );
      });
      if (t.length > 0) this.sentRequests();
      if (p.length > 0) this.receiveRequests();
    },
    seletedticket: function () {
      this.showAcceptRecieveProductsBtn =
        this.seletedticket.length > 0 ? true : false;
    },
    seletedReceiveItems: function () {
      this.showAcceptBtn = this.seletedReceiveItems.length > 0 ? true : false;
    },
    seletedSentProducts: function () {
      this.showSentProductActiontBtn =
        this.seletedSentProducts.length > 0 ? true : false;
    },
  },
  data() {
    return {
      showAcceptRecieveProductsBtn: false,
      seletedticket: null,

      snackbar: false,
      color: "default",
      snackbarText: null,
      TOKEN: null,
     
      warehouseId: null,

      ticketList: [],
      ticketSearch: "",
      ticketHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "Recieved Qty", value: "recieved_quantity" },
        { text: "Sent Qty", value: "sent_quantity" },
        { text: "To Warehouse", value: "to_warehouse_name" },
        { text: "From Warehouse", value: "from_warehouse_name" },
        { text: "Actions", value: "actions", align: "end", sortable: false },
      ],


      productList: [],
      tab: null,
      nameRules: [(v) => !!v || " required"],
    };
  },

  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;
    this.getTicketList();
  },
  methods: {


    getTicketList() {
      var bodyFormData = new FormData();
      bodyFormData.set("warehouse_id", this.warehouseId);
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/get-tickets",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
          data: bodyFormData,
        })
        .then((response) => {
          this.ticketList = response.data.filter((rqst) => {
            return rqst.status == 1;
          });
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
            v-model="ticketSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          dense
          show-select
          :headers="ticketHeaders"
          :items="ticketList"
          :items-per-page="10"
          :search="ticketSearch"
          v-model="seletedticket"
        >

          <template c v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn icon color="success">
                    <v-icon
                      small
                      class="mr-2"
                      @click="acceptRecieveProductsSingle(item)"
                    >
                      mdi-check-circle
                    </v-icon>
                  </v-btn>
                </span>
              </template>
              <span>Accept Request</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <div
          class="table-footer-prepend d-flex align-center"
          v-if="showAcceptRecieveProductsBtn"
        >
          <b-button
            size="sm"
            class="success"
            @click="showRecieveProductsModal = true"
          >
            <i class="bx bx-check-double font-size-16 align-middle me-2"></i>
            Accept
          </b-button>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="supplyModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Add supply</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="supplyModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="supplyForm" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-autocomplete
                  v-model="supplyId"
                  :items="productList"
                  item-text="name"
                  item-value="id"
                  dense
                  clearable
                  :rules="[(v) => !!v || 'Supply is required']"
                  label="Select Product"
                ></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  dense
                  v-model="supplyQty"
                  :rules="[(v) => !!v || 'Quantity is required']"
                  label="Quantity"
                  required
                  :suffix="supplyMinQty"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  dense
                  :rules="[(v) => !!v || 'Minimum Quantity is required']"
                  label="Minimum amount"
                  required
                ></v-text-field>
              </v-col>
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
            color="success me-2"
            elevation="0"
            @click="addSupply"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-save"></i> add
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="cancelSupply"
          >
            <i class="bx bx-x-circle"></i> Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showAcceptListModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Send this items?</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="showAcceptListModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col
              cols="4"
              v-for="(pv, key) in seletedReceiveItems"
              :key="pv.id"
            >
              <v-text-field
                class=""
                clearable
                @click:clear="onClearClicked(key)"
                dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <hr />
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success me-2"
            elevation="0"
            @click="acceptRequest"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>
          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="showAcceptListModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRecieveProductsModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Receive this items?</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn
              @click="showRecieveProductsModal = false"
              icon
              small
              color="gray"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col
              cols="4"
              v-for="pv in seletedticket"
              :key="pv.id"
            >
              <v-text-field
                class=""
                clearable
                dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <hr />
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="success me-2"
            elevation="0"
            @click="acceptRecieveProducts"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="showRecieveProductsModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editSentProductsModal" max-width="800">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Edit sent products</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn
              @click="editSentProductsModal = false"
              icon
              small
              color="gray"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-row>
            <v-col cols="4" v-for="pv in sentProductsList" :key="pv.id">
              <v-text-field
                class=""
                clearable
                dense
                v-model="pv.quantity"
                :append-icon="pv.unit"
                :label="'Enter ' + pv.product_name + ' quantity'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <hr />
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="success me-2"
            elevation="0"
            @click="editSentRequest"
            small
            class="white--text text-capitalize"
          >
            <i class="bx bx-check"></i> Yes
          </v-btn>

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="editSentProductsModal = false"
          >
            <i class="bx bx-x"></i> No
          </v-btn>
        </v-card-actions>
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
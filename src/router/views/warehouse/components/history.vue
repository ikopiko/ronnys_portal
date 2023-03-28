<template>
    <div>
      <v-snackbar v-model="snackbar" :color="color" elevation="5">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6">{{ product.product_name }} Supply  History List</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="closeModal" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>
  
        <hr />
        <v-card-text>
            <v-data-table
                dense
                :headers="dataHeaders"
                :items="responseData"
                :items-per-page="10"
                :search="dataSearch"
                v-model="selectedItem"
              >
              <template v-slot:[`item.actions`]="{ item }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="red">
                          <v-icon small @click="deleteSupply(item)">
                            mdi-recycle
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Delete Supply</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="green">
                          <v-icon small @click="editSupply(item)">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Edit Supply</span>
                  </v-tooltip>
                </template>
              </v-data-table>
        </v-card-text>
        <hr />
        <v-card-text v-if="semiActive">
            <v-row>
                <v-text-field
                  class=""
                  clearable
                  dense
                  v-model="product.quantity"
                  :label="'Portion Amount'"
                ></v-text-field>
            </v-row>
            <v-row>
            <span class="text-h6" style="color:black"> Edit Semi-Finished Product</span>
              <v-col cols="3" v-for="pv in semiItems" :key="pv.id">
                <v-text-field
                  class=""
                  clearable
                  dense
                  :rules="[(v) => !!v || 'Supply is required']"
                  v-model="pv.quantity"
                  :label="'Enter ' + pv.product_name + ' quantity'"
                ></v-text-field>

                <div>
                  Amount By Repice: {{ (pv.quantity * product.quantity) }}
                </div>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            color="success me-2"
            elevation="0"
            small
            class="white--text text-capitalize"
            @click="alert('ADD');"
          >
            <i class="bx bx-save"></i> add
          </v-btn>
  
          <v-btn
            elevation="0"
            color="red"
            small
            @click="closeModal"
            class="white--text text-capitalize"
          >
            <i class="bx bx-x-circle"></i> Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <style >
  .v-input__icon--append .v-icon {
    font-size: 16px;
  }
  </style>


<script>
import axios from "axios";
export default {
  props: {
    token: {
      type: String,
    },
    product: {
      type: Object,
    },
    method: { type: Function },
  },

  data() {
    return {
      dataHeaders: [
        { text: "Name", align: "start", value: "product_name" },
        { text: "From Warehouse", value: "from_warehouse_name" },
        { text: "To Warehouse", value: "to_warehouse_name" },
        { text: "Quantity", value: "quantity" },
        { text: "Unit", value: "unit" },
        { text: "Actions", value: "actions", sortable: false, align: "end" },
      ],
      dataSearch: '',
      semiActive: false,
      selectedItem: {},
      responseData: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      semiItems: [],
      modal: false,
    };
  },
  watch:{
    product(val){
        this.getData(val.product_id);
    },
  },
  mounted() {
    this.getData(this.product.product_id);
  },
  methods: {
    editSupply(item){
        this.getSemiItems(item);
        
    },
    deleteSupply(item){
        alert('Delete ' + item.id);
    },
    getData(id){
        axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/supplies-detail",
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            product_id: id
          },
        })
        .then((response) => {
          this.responseData = response.data

          this.responseData.forEach(x => {
            x.unit = this.product.unit;
          });
        });
    },
    getSemiItems(item){
        axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/semifinished-supplies-detail",
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            id: item.id
          },
        })
        .then((response) => {
          this.semiItems = response.data;
          this.semiActive = true;
        });
    },
    isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();         
        } else {
            var temp = this.wasteAmount + evt.key;
            if(Number(temp) <= Number(this.product.quantity)){
                return true;
            } else {
                evt.preventDefault();
            }
        }        
    },
    closeModal(){
      this.semiActive = false;
      this.$emit('closeModal');
    },
  },
};
</script>
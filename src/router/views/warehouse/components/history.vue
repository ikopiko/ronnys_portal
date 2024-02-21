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
      sortBy: 'id',
      sortDesc: true,
      deleteItemDialog: false,
      tempQty: '',
      tempItem: {},
      supplyItems: [],
      dataHeaders: [
        { text: "created", align: "start", value: "created_at" },
        { text: "Name", align: "start", value: "product_name" },
        { text: "From Warehouse", value: "from_warehouse_name" },
        { text: "To Warehouse", value: "to_warehouse_name" },
        { text: "Quantity", value: "quantity" },
        { text: "Unit", value: "unit" },
        { text: "Overspent", value: "overspent" },
        { text: "Action", value: "action" },
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
        this.tempQty = item.quantity;
        this.tempItem = item;
    },
    supplyDone(){
      if(this.tempItem.products_category_id == 2){
          this.semiItems.forEach(x => {
            var temp_obj = {};

              temp_obj.product_id = x.id;
              temp_obj.quantity = x.batchQuantity;
              temp_obj.default_quantity = x.quantity * this.tempQty;

            this.supplyItems.push(temp_obj);
            this.temp_obj = {};
          })
          this.supplyQty = this.portionQty;
        } else {
          this.supplyItems = {};
        }
        axios
          .request({
            method: "post",
            url: this.$hostname + "warehouses/update-supply",
            headers: {
              Authorization: "Bearer " + this.token,
            },
            data: {
              id: this.tempItem.id,
              supply_id: this.tempItem.supplie_id,
              action: 'update',
              quantity: this.tempQty,
              items : this.supplyItems
            },
          })
          .then((response) => {
             this.historyProducteModal = false;
            this.color = "success";
            this.semiActive = false;
            this.snackbarText = response.data.data;
            this.snackbar = true;
            this.getData(this.product.product_id);
            setTimeout(() => {
            this.$emit('closeModal');
            }, 2000);
          });
    },
    deleteSupply(item){
      this.tempItem = item;
  
      this.deleteItemDialog = true;
    },
    confirmDeleteSupply(){
      axios
        .request({
        method: "post",
        url: this.$hostname + "warehouses/delete-supply",
        headers: {
          Authorization: "Bearer " + this.token,
        },
        data: {
          id: this.tempItem.id,
          action: 'delete',
          quantity: this.supplyQty,
          items : {}
        },
      })
      .then((response) => {
     
     
        this.deleteItemDialog = false;
        this.color = "success";
        this.snackbarText = response.data.data;
        this.snackbar = true;
        this.getData(this.product.product_id);
           setTimeout(() => {
            this.$emit('closeModal');
            }, 2000);
      });
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
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                :headers="dataHeaders"
                :items="responseData"
                :items-per-page="10"
                :search="dataSearch"
                v-model="selectedItem"
              >
              <template v-slot:[`item.overspent`]="{ item }">
                  <v-tooltip top v-if="item.overspend == 1">
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="red">
                          <v-icon small>
                            mdi-alert
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Recipe Overspent</span>
                  </v-tooltip>
                  <v-tooltip top v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="green">
                          <v-icon small>
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Correct Recipe</span>
                  </v-tooltip>
                </template>
              <template v-slot:[`item.actions`]="{ item }" >
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }" v-if="responseData.length>0 && item.id==responseData[responseData.length-1].id && item.action!='Delete' ">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="red">
                          <v-icon small @click="deleteSupply(item)">
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Delete Supply</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }" v-if="responseData.length>0 && item.id==responseData[responseData.length-1].id && item.action!='Delete'">
                      <span v-bind="attrs" v-on="on">
                        <v-btn icon x-small class="ma-2" color="green">
                          <v-icon small @click="editSupply(item)">
                            mdi-pencil 
                          </v-icon>
                        </v-btn>
                      </span>
                    </template>
                    <span>Edit Supply {{item.id}}</span>
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
                  v-model="tempQty"
                  :label="'Amount'"
                ></v-text-field>
            </v-row>
            <v-row>
            <!-- <span class="text-h6" style="color:black"> Edit Semi-Finished Product</span>
              <v-col cols="3" v-for="pv in semiItems" :key="pv.id">
                <v-text-field
                  class=""
                  clearable
                  dense
                  :rules="[(v) => !!v || 'Supply is required']"
                  v-model="pv.batchQuantity"
                  :label="'Enter ' + pv.product_name + ' quantity'"
                ></v-text-field>
                <div>
                  Amount By Repice: {{ (pv.quantity * tempQty) }}
                </div>
              </v-col> -->
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn v-if="semiActive"
            color="success me-2"
            elevation="0"
            small
            class="white--text text-capitalize"
            @click="supplyDone()"
          >
            <i class="bx bx-save"></i> add
          </v-btn>
  
          <v-btn v-if="semiActive"
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

      <v-dialog
        v-model="deleteItemDialog"
        width="400px"
      >
        <v-card  >
          <v-card-title>
            <span>Are you sure to delete supply?</span>
          </v-card-title>
          
          <v-card-actions class="justify-center">
            <v-btn
              color="success"
              variant="text"
              class="text-capitalize"
              @click="confirmDeleteSupply" small>
               <i class="bx bx-check"></i> Confirm
            </v-btn>
            <v-btn
            class="text-capitalize"
              color="error"
              variant="text"
              @click="deleteItemDialog = false" small
            >
             <i class="bx bx-x-circle"></i>  Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <style >
  .v-input__icon--append .v-icon {
    font-size: 16px;
  }
  </style>
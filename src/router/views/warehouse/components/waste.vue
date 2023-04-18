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
      responseData: {},
      wasteAmount: 0,
      wasteComment: '',
      sendProductLis: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      request: [],
      productValues: [],
      productToWaste: {},
      branchValue: "",
      branchList: [],
      productList: [],
      modal: false,
    };
  },
  mounted() {
    
  },
  methods: {
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
      this.$emit('closeModal');
    },
    wasteProduct() {
      this.productToWaste.product_id = this.product.product_id;
      this.productToWaste.qty = Number(this.wasteAmount);
      this.productToWaste.comment = this.wasteComment;

      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/add-waste",
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: { items: this.productToWaste },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data.data;
          this.snackbar = true;
          this.responseData = response;
          this.wasteAmount = 0;
          this.wasteComment = '';
          this.closeModal();
        });
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
        <span class="text-h6"> Waste Product</span>
        <v-spacer></v-spacer>
        <v-card-actions class="justify-end">
          <v-btn @click="closeModal" icon small color="gray">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-toolbar>

      <hr />
      <v-card-text>
        <v-form ref="supplyForm" lazy-validation>
          <v-row>
            <v-col cols="6">
                <div style="font-size: 22px">
                    Waste: {{  product.product_name }}
                    <br />
                    Total Quantity: {{ product.quantity }}
                </div>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    class=""
                    clearable
                    dense
                    v-model="wasteAmount"
                    @keypress="isNumber($event)"
                    :append-icon="product.unit"
                    label="Enter amount of waste"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-text-field
                    v-model="wasteComment"
                    label="Comment for waste"
                    clearable
                    dense
                >
                </v-text-field>
              </v-row>
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
          small
          class="white--text text-capitalize"
          @click="wasteProduct"
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

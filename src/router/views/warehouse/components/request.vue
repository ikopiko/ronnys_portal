<script>
import axios from "axios";
export default {
  props: {
    token: {
      type: String,
    },
    method: { type: Function },
  },

  data() {
    return {
      sendProductLis: [],
      snackbar: false,
      color: "default",
      snackbarText: null,
      request: [],
      productValues: [],
      branchValue: "",
      branchList: [],
      productList: [],
      modal: false,
    };
  },
  mounted() {
    axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/products-list",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.productList = response.data;
        this.productList.forEach((x) => {
          x.selected = false;
          x.newQnty = null;
        });
      });
    axios
      .request({
        method: "post",
        url: this.$hostname + "warehouses/warehouse-list",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.branchList = response.data;
      });
  },
  methods: {
    closeModal(){
      this.productValues = [];
      this.branchValue = "";
      this.$emit('closeModal');
    },
    test() {
      this.productValues.forEach((x) => {
        var req = {
          product_id: x.id,
          quantity: x.newQnty,
        };
        this.request.push(req);
      });
      axios
        .request({
          method: "post",
          url: this.$hostname + "warehouses/send-request",
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: { supplies: this.request, warehouse_id: this.branchValue },
        })
        .then((response) => {
          this.color = "success";
          this.snackbarText = response.data.data;
          this.snackbar = true;
          this.responseData = response;
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
        <span class="text-h6"> Send request</span>
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
            <v-col cols="8">
              <v-autocomplete
                v-model="productValues"
                :items="productList"
                item-text="name"
                label="Choose product"
                return-object
                hide-selected
                clearable
                chips
                small-chips
                deletable-chips
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="branchValue"
                :items="branchList"
                label="Choose warehouse"
                item-text="name"
                item-value="id"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="3" v-for="pv in productValues" :key="pv.id">
                  <v-text-field
                    class=""
                    clearable
                    dense
                    v-model="pv.newQnty"
                    :append-icon="pv.unit"
                    :label="'Enter ' + pv.name + ' quantity'"
                  ></v-text-field>
                </v-col>
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
          @click="test"
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

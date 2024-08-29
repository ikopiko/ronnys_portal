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
      productValues: [
        { id: 168, name: "მყარი ყველი გატარებული", unit: "კგ" },
        { id: 2, name: "გატარებული ყველი (შებოლილი)", unit: "კგ" },
        { id: 7, name: "ობიანი ყველი", unit: "კგ" },
        { id: 167, name: "მოცარელა გატარებული", unit: "კგ" },
        { id: 10, name: "სალიამი პიკანტე (პეპერონი)", unit: "კგ" },
        { id: 161, name: "გრილის ქათამი პორციებით(500გრ)", unit: "ცალი" },
        {id: 162,name: "ქათამი ბარბიქიუსთვის პორციებით ბბქ (300გრ)",unit: "ცალი"},
        { id: 58, name: "იტალიური სოსიჯის სუნელი", unit: "კგ" },
        { id: 16, name: "ანჩოუსის ფილე ", unit: "კგ" },
        { id: 19, name: "ზეთისხილი შავი (დაჭრილი)", unit: "კგ" },
        { id: 20, name: "ზეთისხილი მწვანე (უკურკო)", unit: "კგ" },
        { id: 21, name: "ანანასი (850 მლ)", unit: "კგ" },
        { id: 170, name: "მოთუშული სოკო (50 გრ)", unit: "ცალი" },
        { id: 169, name: "მოთუშული სოკო (0,150გრ)", unit: "ცალი" },
        { id: 102, name: "ზეთი", unit: "ლიტრი" },
        { id: "25", name: " გარჩეული ხახვი ", unit: "კგ" },
        { id: "26", name: "გარჩეული ბულგარული", unit: "კგ" },
        { id: "228", name: "პომიდორი (ყუნწის გარეშე)", unit: "კგ" },
        { id: "28", name: "გასუფთავებული ნიორი", unit: "კგ" },
        { id: "29", name: "მწარე მწ. წიწაკა ცოცხალი", unit: "კგ" },
        { id: "34", name: "ჰალაპენიო", unit: "კგ" },
        { id: "35", name: "ტომატი (სოუსი) მარინერა", unit: "კგ" },
        { id: "172", name: "რენჩ სოუსი (40გრ)", unit: "ცალი" },
        { id: "171", name: "რენჩ სოუსი (70გრ)", unit: "ცალი" },
        { id: "38", name: "მწარე სოუსი", unit: "ლიტრი" },
        { id: "42", name: "მჭადის ფქვილი", unit: "კგ" },
        { id: "43", name: "ვეჯის სუნელები", unit: "კგ" },
        { id: "44", name: "ნიორი გრანულა", unit: "კგ" },
        { id: "45", name: "წითელი წიწაკა დაღერღილი", unit: "კგ" },
        { id: "49", name: "იოდიზირებული მარილი", unit: "კგ" },
        { id: "50", name: "საფუარი (100გრ)", unit: "ცალი" },
        { id: "134", name: "ქუქის ბურთულები (75გრ)", unit: "ცალი" },
        { id: "61", name: " შოკოლადის ფირფიტები(ქუქის)", unit: "კგ" },
        { id: "66", name: "ყავა მოხალული (0.09 გრ)", unit: "ცალი" },
        { id: "244", name: "მწვანე ჩაი (შეზავებული)", unit: "კგ" },
        { id: "202", name: "მწვანე ჩაი", unit: "კგ" },
        { id: "195", name: "ჩერი კოლა", unit: "ცალი" },
        { id: "187", name: "რონის კოლა", unit: "ცალი" },
        { id: "199", name: "ლაიმი", unit: "ცალი" },
        { id: "198", name: "ფორთოხალი", unit: "ცალი" },
        { id: "200", name: "რუთ ბიარი", unit: "ცალი" },
        { id: "197", name: "ვანილის კოლა", unit: "ცალი" },
        { id: "196", name: "ჩერი ვანილის კოლა", unit: "ცალი" },
        { id: "76", name: "მ/ყუთი  L 0.68მ2 25ც", unit: "ცალი" },
        { id: "78", name: "მ/ყუთი S 0.24მ2 100ც", unit: "ცალი" },
        { id: "77", name: "მ/ყუთი M 0.32მ2 50ც", unit: "ცალი" },
        { id: "86", name: "გამოსაცხობი ქაღალდი 40*60 ", unit: "კგ" },
        { id: "88", name: "პარკი ერთჯერადი", unit: "შეკვრა" },
        { id: "87", name: "პარკი ყურიანი", unit: "შეკვრა" },
      ],
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
    closeModal() {
      this.productValues = [];
      this.branchValue = "";
      this.$emit("closeModal");
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
          this.request = [];

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
            <v-col cols="8" class="d-none">
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
                <v-col
                  style="
                    margin-top: 0;
                    margin-bottom: 0;
                    padding-bottom: 0;
                    padding-top: 0;
                  "
                  cols="12"
                  v-for="pv in productValues"
                  :key="pv.id"
                >
                  <v-text-field
                    class=""
                    clearable
                    dense
                    v-model="pv.newQnty"
                    :append-icon="pv.unit"
                    :label="pv.name + ' ' + pv.unit"
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

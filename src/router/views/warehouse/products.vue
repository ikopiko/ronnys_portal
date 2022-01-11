<script>
import axios from 'axios'
import Layout from '../../layouts/main'
// import PageHeader from '@/components/page-header'



/**
 * Products-order component
 */
export default {
   page: {
    title: "Products",
  },
  components: { Layout, },
  computed: {
      selected() {
          this.changeSelect;
      return this.products.filter(product => product.selected)
    }
  },
  data() {
    return {
        roundNum: 0,
        splitdata: [],
        addProductsActive: false,
        newProduct: {
            name: '',
            unit: ''
        },
        responseData: null,
        products: [],
        units: [],
        changeSelect: 0,
    }
  },
  watch: {

  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;

    const TOKEN = this.loggedUser.token;

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "warehouses/products-list",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.products = response.data;
        this.products.forEach((x) => {
            x.selected = false;
        });
      });

    axios
      .request({
        method: "post",
        url:
          this.$hostname + "warehouses/warehouse-unit",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.units = response.data;
      });
  },
  methods: {
      roundNumber() {
        var num = this.roundNum;
        var oldNum = Number(this.roundNum);
        var split = [];
        var digits = 0;
        var realDigits = 0;

        if (num.includes('.')){
          split = num.split('.');
          this.splitdata = split;
          num = split[1];
          digits = num.toString().split('');
          realDigits = digits.map(Number);
        } else {
          digits = num.toString().split('');
          realDigits = digits.map(Number);
        }

        if(0 <= realDigits[1] && realDigits[1] <= 4){
          oldNum = this.splitdata[0] + "." + Number(realDigits[0] + "0");
          alert(oldNum);
        } else if(realDigits[1] == 5){
          oldNum = this.splitdata[0] + "." + Number(realDigits[0] + "5");
          alert(oldNum);
        } else if(6 <= realDigits[1] && realDigits[1] <= 9) {
          if(realDigits[0] == 9){
            oldNum = Number(this.splitdata[0]) + 1 +".00";
          } else {
            oldNum = this.splitdata[0] + "." + (Number(realDigits[0]) +1) + "0";
          }
          alert(oldNum);
        }
        
        return oldNum;
      },
      addProduct(){
        const TOKEN = this.loggedUser.token;

        //this.addProductsActive = true;
        if(this.newProduct.name != '' && this.newProduct.unit != ""){
            var bodyFormData = new FormData();
            bodyFormData.set("name", this.newProduct.name);
            bodyFormData.set("unit", this.newProduct.unit);

            axios
            .request({
                method: "post",
                url:
                this.$hostname + "warehouses/product-create",
                headers: {
                Authorization: "Bearer " + TOKEN,
                },
                data: bodyFormData
            })
            .then((response) => {
                alert(response.data.data);
                this.addProductsActive = false;
                this.newProduct.name = "";
                this.newProduct.unit = "";
            }).catch(error => {
                alert(error)
            })
        } 
      },
  },
}
</script>

<template>
<div data-app>
  <Layout>
    <div class="row">
        <div class="col-4">
            <v-card
                class="mx-auto"
                max-width="500"
            >
                <v-toolbar
                color="deep-purple accent-4"
                dark
                >
                <v-toolbar-title>Products</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="addProductsActive = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                </v-toolbar>

                <v-list subheader>

                <v-list-item
                    v-for="(product, index) in products"
                    :key="index"
                    @click="product.selected = !product.selected, changeSelect = changeSelect+1"
                >
                    <v-list-item-title>
                        {{ product.name }}
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-checkbox :value="product.selected" />
                    </v-list-item-action>
                    

                    <v-list-item-content>
                    <v-list-item-title v-text="product.name"></v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
                </v-list>
                {{ selected }}
            </v-card>
        </div>
        <div class="col-8">
            <v-card height="100%" v-if="addProductsActive">
                <v-card-title>
                    ADD NEW PRODUCT
                </v-card-title>
                <div class="row">
                    <div class="col-1">
                      <v-text-field
                          v-model="roundNum"
                          label="ROUND"
                          required
                      ></v-text-field>
                    </div>
                    <div class="col-4">
                        <v-text-field
                            v-model="newProduct.name"
                            label="Product Name"
                            required
                        ></v-text-field>
                    </div>
                    <div class="col-4">
                        <v-select
                        v-model="newProduct.unit"
                        :items="units"
                        label="Units"
                        item-text="name"
                        dense
                        ></v-select>
                    </div>
                </div>
                {{ roundNumReturn }}
            <v-card-actions>
                <v-btn
                    class="mr-4"
                    @click="roundNumber()"
                >
                    Round Number
                </v-btn>
                <v-btn
                    class="mr-4"
                    @click="addProduct"
                >
                    Create Product
                </v-btn>
                <v-btn @click="addProductsActive = false">
                    Close   
                </v-btn>
            </v-card-actions>
            </v-card>
        </div>
    </div>
  </Layout>
  </div>
</template>

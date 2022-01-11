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
      return this.supplies.filter(supply => supply.selected)
    }, 
      selectedProducts() {
        this.changeSelect;
      return this.products.filter(product => product.selected)
    }, 
  },
  watch: {
      changeSelect() {
          this.requestData = this.products.filter(product => product.selected);
      }
  },
  data() {
    return {
        requestSuppliesActive: false,
        newProduct: {
            name: '',
            unit: ''
        },
        request: {
            supplies: [],
            warehouse_id: null
        },
        responseData: null,
        products: [],
        requestData: [],
        supplies: [],
        units: [],
        changeSelect: 0,
        warehouse_id: 2,
    }
  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;

    const TOKEN = this.loggedUser.token;

    var bodyFormData = new FormData();
    bodyFormData.set("warehouse_id", this.warehouse_id);
    axios
      .request({
        method: "post",
        url:
          this.$hostname + "warehouses/supplies-list",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyFormData
      })
      .then((response) => {
        this.supplies = response.data;
        this.supplies.forEach((x) => {
            x.selected = false;
        });
      });

        
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
  },
  methods: {
      addRequest(){
        this.requestData.forEach(x => {
            var req = {
                product_id: x.id,
                quantity: x.newQty
            };
            this.request.supplies.push(req)
        });
        this.request.warehouse_id = this.warehouse_id;

        const TOKEN = this.loggedUser.token;

        axios
        .request({
            method: "post",
            url:
            this.$hostname + "warehouses/send-request",
            headers: {
            Authorization: "Bearer " + TOKEN,
            },
            data: { supplies: this.request, warehouse_id: this.warehouse_id }
        })
        .then((response) => {
            this.responseData = response;
        });
        
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

                <v-toolbar-title>Warehouses</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="requestSuppliesActive = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                </v-toolbar>

                <v-list subheader>

                <v-list-item
                    v-for="(supply, index) in supplies"
                    :key="index"
                    @click="supply.selected = !supply.selected, changeSelect = changeSelect+1"
                >
                    <v-list-item-title>
                        {{ supply.product_name }} - {{ supply.quantity }} {{ supply.unit }}
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-checkbox :value="supply.selected" />
                    </v-list-item-action>
                    

                    <v-list-item-content>
                    <v-list-item-title v-text="supply.product_name"></v-list-item-title>
                    </v-list-item-content>

                    <!-- <v-list-item-icon>
                    <v-icon :color="'grey'">
                        mdi-message-outline
                    </v-icon>
                    </v-list-item-icon> -->
                </v-list-item>
                </v-list>
                {{ selected }}
            </v-card>
        </div>
        <div class="col-8">
            <v-card height="100%" v-if="requestSuppliesActive">
                <v-card-title>
                    Request Supplies
                </v-card-title>
                <div class="row">
                    <div class="col-4">
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
                    </div>
                    <div class="col-6">
                        <div class="row" 
                                v-for="(product, index) in selectedProducts"
                                :key="index"> 
                            <div class="col-1">&nbsp;</div>
                            <div class="col-6">
                                <v-text-field
                                    v-model="product.newQty"
                                    :label="product.name"
                                    :suffix="product.unit"
                                    required
                                ></v-text-field>
                            </div>
                        </div>
                    </div>
                </div>
            <v-card-actions>
                <v-btn
                    class="mr-4"
                    @click="addRequest"
                >
                    Create Request
                </v-btn>
                <v-btn @click="requestSuppliesActive = false">
                    Close   
                </v-btn>
            </v-card-actions>
            </v-card>
        </div>
    </div>
  </Layout>
  </div>
</template>

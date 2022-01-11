<script>
import axios from 'axios'
import Layout from '../../layouts/main'
// import PageHeader from '@/components/page-header'



/**
 * Products-order component
 */
export default {
   page: {
    title: "Supplies List",
  },
  components: { Layout, },
  computed: {
      
  },
  watch: {

  },
  data() {
    return {
        requestList: [],
        fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "product_name",
          label: "Product",
          sortable: true,
        },
        {
          key: "quantity",
          label: "QTY",
          sortable: true,
        },
        {
          key: "unit",
          label: "Unit",
          sortable: true,
        },
        {
          key: "warehouse_name",
          label: "Requested From",
          sortable: true,
        },
        { key: 'actions', label: 'Actions' }
      ],
      infoModal: {
        id: '',
        title: 'info-modal',
        product_name: '',
        quantity: '',
        unit: '',
        warehouse: '',
        date: '',
      },
      requests: [],
      reqResp: {},
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      totalRows: 1,
    }
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
        this.loggedUser = this.$store.state.authfack.user;

        const TOKEN = this.loggedUser.token;

        var bodyFormData = new FormData();
        bodyFormData.set("status", 1);
        axios
        .request({
            method: "post",
            url:
            this.$hostname + "warehouses/request-list",
            headers: {
            Authorization: "Bearer " + TOKEN,
            },
            data: bodyFormData
        })
        .then((response) => {
            this.requestList = response.data;
        });
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.id = item.id;
        this.infoModal.product_name = item.product_name;
        this.infoModal.unit = item.unit;
        this.infoModal.quantity = item.quantity;
        this.infoModal.warehouse = item.warehouse_name;
        this.infoModal.date = item.created_at;
        
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    acceptRequest(request){
        var req = {
            id: '',
            quantity: 0,
        };
        req.id = request.id;
        req.quantity = request.quantity;
        this.requests.push(req);

        const TOKEN = this.loggedUser.token;

        axios
            .request({
            method: "post",
            url:
                this.$hostname + "warehouses/accept-request",
            headers: {
                Authorization: "Bearer " + TOKEN,
            },
            data: {requests: this.requests}
            })
            .then((response) => {
                if(response.status === 200){
                    alert('Request Sent');
                    this.$root.$emit('bv::hide::modal', this.infoModal.id);
                    this.updateList();
                }
        });
    },
    rejectRequest(request){
        var req = {
            id: '',
        };
        req.id = request.id;
        this.requests.push(req);

        const TOKEN = this.loggedUser.token;

        axios
            .request({
            method: "post",
            url:
                this.$hostname + "warehouses/void-request",
            headers: {
                Authorization: "Bearer " + TOKEN,
            },
            data: {requests: this.requests}
            })
            .then((response) => {
                if(response.status === 200){
                    alert('Request Voided');
                    this.$root.$emit('bv::hide::modal', this.infoModal.id);
                    this.updateList();
                }
        });
    },
},
}
</script>

<template>
<div data-app>
  <Layout>
    <div class="row">
        <div class="table-responsive mb-0" style="min-height: 300px;">
            <b-table
            class="datatables"
            :items="requestList"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
            >
            <template #cell(actions)="row">
                <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                    Request Details
                </b-button>
            </template>
            </b-table>
        </div>
    </div>

    <b-modal :id="infoModal.id" :title="infoModal.order_id" hide-footer >

      <p class="mb-2">
        Request id:
        <span class="text-primary">{{ infoModal.id }}</span>
      </p>
      <p class="mb-2">
        Requested Product:
        <span class="text-primary">{{ infoModal.product_name }}</span>
      </p>
      <p class="mb-2">
        Requested From:
        <span class="text-primary">{{ infoModal.warehouse }}</span>
      </p>
      <p class="mb-2">
        Date:
        <span class="text-primary">{{ infoModal.date }}</span>
      </p>
      <div class="table-responsive">
        <table class="table table-centered table-nowrap">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product QTY</th>
              <th scope="col">Product Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <h5 class="text-truncate font-size-14">
                    {{ infoModal.product_name }}
                  </h5>
                </div>
              </td>
              <td>
                {{ infoModal.quantity }}
              </td>
              <td>{{ infoModal.unit }}</td>
            </tr>
          </tbody>
        </table>
        <b-button class="mx-3" variant="success" block @click="acceptRequest(infoModal)">Accept</b-button>
        <b-button class="mx-2" variant="warning" block @click="rejectRequest(infoModal)">Reject</b-button>
      </div>

    </b-modal>
  </Layout>
  </div>
</template>

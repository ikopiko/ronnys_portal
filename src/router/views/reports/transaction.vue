<script>
import Loader from "@/components/widgets/loader";

/**
 * Transactions component
 */
export default {
  components: {
    Loader,
  },
  props: {
    transactions: {
      type: Array,
      default: function () {
        return [];
      },
    },
    updating: {
      type: Boolean,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  
};
</script>

<template>
  <Loader :loading="updating">
    <div class="table-responsive mb-0">
      <table class="table align-middle table-nowrap">
        <thead class="table-light">
          <tr>
            <th class="align-middle">Order ID</th>
            <th class="align-middle">Billing Name</th>
            <th class="align-middle">Date</th>
            <th class="align-middle">Total</th>
            <th class="align-middle">Type</th>
            <th class="align-middle">Amount</th>
            <th class="align-middle">Discounted</th>
            <th class="align-middle">Total Due</th>
            <th class="align-middle">Status</th>
            <th class="align-middle">Method</th>
            <th class="align-middle">View Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in transactions" :key="data.id">
            
            <td>
              <a href="javascript: void(0);" class="text-body fw-bold">{{
                data.id
              }}</a>
            </td>
            <td>{{ data.order_data.customer.name }}</td>
            <td>{{ data.finish_date }}</td>
            <td>{{ data.order_data.totalPrice }}</td>
            <td>{{ data.order_data.discountName }}</td>
            <td>{{ data.order_data.discount }} {{ data.order_data.discType }}</td>
            <td>{{ data.order_data.discPrice }}</td>
            <td>{{ data.order_data.totalDue }}</td>
            <td>
              <span
                class="badge badge-pill badge-soft-success font-size-11"
                :class="{
                  
                  'badge-soft-warning': `${data.status}` != 7,
                }"
                >{{ data.statusName }}</span>
            </td>
            <td>
              {{ data.order_data.paymentType }}
            </td>
            <td>
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-primary btn-sm btn-rounded"
                @click="$bvModal.show(data.id)"
              >
                View Details
              </button>
            </td>
            <b-modal :id="data.id" title="Order Details" centered>
              <p class="mb-2">
                Product id:
                <span class="text-primary">{{ data.id }}</span>
              </p>
              <p class="mb-2">
                Discount Type:
                <span class="text-primary">{{ data.order_data.discountName }}</span>
              </p>
              <p class="mb-2">
                Discount:
                <span class="text-primary">- {{ data.order_data.discount }} {{ data.order_data.discType }}</span>
              </p>
              <p class="mb-4">
                Customer Name:
                <span class="text-primary">{{ data.order_data.customer.name }}</span>
              </p>
              <div class="table-responsive">
                <table class="table table-centered table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product QTY</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in data.order_data.items" :key="index">
                      <td>
                        <div>
                          <h5 class="text-truncate font-size-14">
                            {{ item.size }} {{ item.name }}
                          </h5>
                          <p class="text-muted mb-0">GEL {{ item.price }} x {{ item.qty }}</p>
                        </div>
                      </td>
                      <td>
                        X {{ item.qty }}
                      </td>
                      <td>{{ item.price * item.qty }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h6 class="m-0 text-end">Sub Total:</h6>
                      </td>
                      <td>{{ data.order_data.totalPrice }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h6 class="m-0 text-end">Discount:</h6>
                      </td>
                      <td>{{ data.order_data.discPrice }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <h6 class="m-0 text-end">Total Due:</h6>
                      </td>
                      <td>{{ data.order_data.totalDue }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-modal>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end table -->
  </Loader>
</template>
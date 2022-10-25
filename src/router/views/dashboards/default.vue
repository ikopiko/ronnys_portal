<script>
import axios from 'axios';
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Stat from "@/components/widgets/stat";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    Stat
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Default",
          active: true,
        },
      ],
      statData: [
        {
          icon: "bx bx-bar-chart-alt-2",
          title: "Saburtalo",
          orders: "1,235",
          sum: "10000 GEL",
        },
      ],
      loggedUser: {},
      date: String(new Date()),
      status: "1,2,3,4,5,6,7,8,9,10",
      ordersList: [],
      branchInfo: [],
    };
  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;

    this.date = this.formatDate(this.date);

    const TOKEN = this.loggedUser.token;

    var day = this.date + ' to ' + this.date;
    var bodyUpdateSaburtalo = new FormData();
    bodyUpdateSaburtalo.set("day", day);
    bodyUpdateSaburtalo.set("status_key", this.status);
    bodyUpdateSaburtalo.set("branch", "saburtalo");

    axios
      .request({
        method: "post",
        url:
          "http://new.ronnys.info/?r=v1/orders/list-reporting",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyUpdateSaburtalo,
      })
      .then((response) => {
        this.ordersList = response.data.data;
        var orderCount = 0;
        var orderSum = 0;
        this.ordersList.forEach( x => {
          orderCount++;
          orderSum = orderSum + Number(x.order_data.totalPrice);
        })
        var saburtalo = {
          name: 'Saburtalo',
          orders:  orderCount,
          sum: orderSum,
          icon: "bx bx-bar-chart-alt-2",
        };
        this.branchInfo.push(saburtalo);
      });
 
     var bodyUpdateVake = new FormData();
    bodyUpdateVake.set("day", day);
    bodyUpdateVake.set("status_key", this.status);
    bodyUpdateVake.set("branch", "vake");
    axios
      .request({
        method: "post",
        url:
          "http://new.ronnys.info/?r=v1/orders/list-reporting",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyUpdateVake,
      })
      .then((response) => {
        this.ordersList = response.data.data;
        var orderCount = 0;
        var orderSum = 0;
        this.ordersList.forEach( x => {
          orderCount++;
          orderSum = orderSum + Number(x.order_data.totalPrice);
        })
        var saburtalo = {
          name: 'Vake',
          orders:  orderCount,
          sum: orderSum,
          icon: "bx bx-bar-chart-alt-2",
        };
        this.branchInfo.push(saburtalo);
      });
     var bodyUpdateDigomi = new FormData();
    bodyUpdateDigomi.set("day", day);
    bodyUpdateDigomi.set("status_key", this.status);
    bodyUpdateDigomi.set("branch", "digomi");
    axios
      .request({
        method: "post",
        url:
          "http://new.ronnys.info/?r=v1/orders/list-reporting",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyUpdateDigomi,
      })
      .then((response) => {
        this.ordersList = response.data.data;
        var orderCount = 0;
        var orderSum = 0;
        this.ordersList.forEach( x => {
          orderCount++;
          orderSum = orderSum + Number(x.order_data.totalPrice);
        })
        var saburtalo = {
          name: 'Digomi',
          orders:  orderCount,
          sum: orderSum,
          icon: "bx bx-bar-chart-alt-2",
        };
        this.branchInfo.push(saburtalo);
      });
    var bodyUpdateGldani = new FormData();
    bodyUpdateGldani.set("day", day);
    bodyUpdateGldani.set("status_key", this.status);
    bodyUpdateGldani.set("branch", "gldani");
    axios
      .request({
        method: "post",
        url:
          "http://new.ronnys.info/?r=v1/orders/list-reporting",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        data: bodyUpdateGldani,
      })
      .then((response) => {
        this.ordersList = response.data.data;
        var orderCount = 0;
        var orderSum = 0;
        this.ordersList.forEach( x => {
          orderCount++;
          orderSum = orderSum + Number(x.order_data.totalPrice);
        })
        var saburtalo = {
          name: 'Gldani',
          orders:  orderCount,
          sum: orderSum,
          icon: "bx bx-bar-chart-alt-2",
        };
        this.branchInfo.push(saburtalo);
      });
  },
  methods: {
    formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
    },
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
     
      <div class="row">
        <div v-for="stat of branchInfo" :key="stat.name" class="col-3">
          <Stat :icon="stat.icon" :name="stat.name" :orders="stat.orders" :sum="stat.sum" />
        </div>
      </div>
  </Layout>
</template>

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

   
    axios
      .request({
        method: "post",
        url: this.$hostname + "orders/sales-report-by-branch",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((response) => {
        this.branchInfo = response.data.data;
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
        <div v-for="(stat, index) of branchInfo" :key="index" class="col-3">
          <Stat :icon="stat.icon" :name="stat.branch" :orders="stat.count" :sum="stat.total" />
        </div>
      </div>
  </Layout>
</template>

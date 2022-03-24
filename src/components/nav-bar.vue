<script>
import axios from "axios";

import i18n from "../i18n";
import {  notifications } from "../firebase";
import simplebar from "simplebar-vue";

/**
 * Nav-bar Component
 */
export default {
  firebase: {
    anArray: notifications,
    count: [{ id: 12 }],
  },
  data() {
    return {
      warehouseId: 0,
      user_id: null,
      notificationCount: 0,

      anArray: [],
      count: null,
      anObject: null,
      loggedUser: {},
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "Spanish",
        },
        {
          flag: require("@/assets/images/flags/chaina.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  components: {
    simplebar,
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    // eslint-disable-next-line no-console



    this.$watch(
      "anArray",
      function () {
        
      
        let t = Object.values(this.anArray);
        t = t.filter((rqst) => {
          return rqst.warehouse_id == this.warehouseId;
        });
          this.notificationCount = t.length

      // eslint-disable-next-line no-console
     
      },
      { deep: false }
    );
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
    },
    logoutUser() {
      // eslint-disable-next-line no-unused-vars
      axios.get("http://127.0.0.1:8000/api/logout").then((res) => {
        this.$router.push({
          name: "default",
        });
      });
    },
  },
  created() {
    // let t = Object.values(this.anArray);
    // // eslint-disable-next-line no-console
    // console.log(this.anArray);
    // for (let i = 0; i < t.length; i++) {
    //   if (i == 0) this.notificationCount = 0;
    //   if (this.user_id == t[i].user_id) this.notificationCount++;
    // }
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link tag="a" to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/new_ronnys.png" alt height="50" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/new_ronnys.png" alt height="50" />
            </span>
          </router-link>

          <router-link tag="a" to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/sm_logo.png" alt height="35" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/new_ronnys.png" alt height="50" />
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <!-- <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('navbar.search.text')"
            />
            <span class="bx bx-search-alt"></span>
          </div>
        </form> -->
      </div>

      <div class="d-flex">
        <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span class="badge bg-danger rounded-pill">{{
              notificationCount
            }}</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">New Orders</h6>
              </div>
              <!-- <div class="col-auto">
                <a href="#" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div> -->
            </div>
          </div>
          <simplebar style="max-height: 230px">
            <li v-for="person of anArray" v-bind:key="person['.key']">
              <span
                v-if="person.user_id == user_id"
                class="text-reset notification-item"
              >
                <a
                  :href="
                    person.type == 'Project'
                      ? '/#/projects/overview/' + person.type_id
                      : '#'
                  "
                >
                  <div class="media">
                    <div class="media-body">
                      <h6 class="mt-0 mb-1">
                        Branch: {{ person.branch }} <br />
                      </h6>
                      <div class="font-size-12 text-muted">
                        <p class="mb-1">order_id {{ person.order_id }}</p>
                      </div>
                    </div>
                    <i
                      class="mdi mdi-check-all text-success font-size-18"
                      style="cursor: pointer"
                      @click="removeNogification(person['.key'])"
                    ></i>
                  </div>
                </a>
              </span>
            </li>
          </simplebar>
          <!-- <div class="p-2 border-top d-grid">
            <a
              class="btn btn-sm btn-link font-size-14 text-center"
              href="javascript:void(0)"
            >
              <i class="mdi mdi-arrow-right-circle me-1"></i>
              {{ $t("navbar.dropdown.notification.button") }}
            </a>
          </div> -->
        </b-dropdown>

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <span class="d-xl-inline-block ms-1">{{
              loggedUser.first_name
            }}</span>
            <i class="mdi mdi-chevron-down d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <i class="bx bx-user font-size-16 align-middle me-1"></i>
            {{ loggedUser.first_name }}
          </b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>

          <router-link tag="a" to="/logout" class="dropdown-item text-danger">
            <i
              class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
            ></i>
            {{ $t("navbar.dropdown.henry.list.logout") }}
          </router-link>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

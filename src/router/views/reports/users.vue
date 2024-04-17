`<script>
import axios from "axios";
import Layout from "../../layouts/main";
export default {
  page: {
    title: "Users",
  },
  components: {
    Layout,
  },
  data() {
    return {
      snackBar: false,
      snackBarText: '',
      color: 'success',
      showPassword: false,
      showConfirmPassword: false,
      password: '',
      confirmPassword: '',
      selectedBranch: '',
      selectedRole: '',
      selectedUser: {},
      userData: {
        username: '',
        email: '',
        phone: '',
        branch: '',
        password: '',
        role: '',
        fullname: '',
      },
      textRules: [
        v => !!v || 'Field is required',
      ],
      passwordRules: [v => !!v || "Password is required", v => (v && v.length >= 6) || 'minimum 6 characters',],
      confirmPasswordRules: [v => !!v || "Password is required"],
      passwordEditRules: [v => (v && v.length >= 6 || v.length == 0) || 'minimum 6 characters',],
      confirmPasswordEditRules: [],
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      order_data:[],
      userModal: false,
      branchID: '',
      validSearch: true,
      loader: false,
      userSearch: "",
      TOKEN: null,
      branchOptions: [
        { value: 2, text: "Saburtalo", id: 2 },
        { value: 3, text: "Vake", id: 3 },
        { value: 1, text: "Digomi", id: 1 },
        { value: 4, text: "Gldani", id: 4 },
        { value: 5, text: "Avlabari", id: 5 }
      ],
      userList: [],
      branchList: [],
      roleList: [],
      
      userHeaders: [
        {
          value: "branch",
          text: "Branch Name",
          sortable: true,
        },
        {
          value: "fullname",
          text: "Full Name",
          sortable: true,
        },
        {
          value: "username",
          text: "Username",
          sortable: true,
        },
        {
          value: "phone",
          text: "Phone",
          sortable: true,
        },
        {
          value: "pin",
          text: "Pin",
          sortable: true,
        },
        {
          value: "role",
          text: "Role",
          sortable: true,
        },
        {
          value: "email",
          text: "Email",
          sortable: true,
        },
        {
          value: "created_at",
          text: "Created At",
          sortable: true,
        },
        { text: 'Actions', value: 'actions', sortable: false },
       
      ],
    };
  },
  mounted() {
    this.loggedUser = this.$store.state.authfack.user;
    this.warehouseId = this.loggedUser.warehouseId;
    this.TOKEN = this.loggedUser.token;

    this.getReport()
    this.getBranch()
    this.getRoles()
  },
  watch: {

  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  methods: {
    toggleAddDialog() {
      this.addDialog = !this.addDialog;
      this.userData = {
        username: '',
        fullname: '',
        email: '',
        phone: '',
      }  
      this.selectedBranch = '';
      this.selectedRole = '';
      this.password = '';
      this.confirmPassword = '';
      this.getReport();
    },
    toggleEditDialog(item) {
      this.editDialog = !this.editDialog;
      if(this.editDialog) {

        this.userData = item;
        this.selectedBranch = Number(item.branch_id);
        this.selectedRole = item.role;
      } else {
        this.userData = {
          username: '',
          fullname: '',
          email: '',
          phone: '',
        }  
        this.selectedBranch = '';
        this.selectedRole = '';
        this.password = '';
        this.confirmPassword = '';
        this.getReport();
      }
    },
    toggleDeleteDialog(item){
      this.deleteDialog = !this.deleteDialog;
      if(this.deleteDialog) {
        this.userData = item;
      } else {
        this.userData = {
          username: '',
          fullname: '',
          email: '',
          phone: '',
        }  
        this.getReport();
      }
    },
    saveUser(){
      if (this.$refs.form.validate()) {
        axios
          .request({
            method: "post",
            url: this.$hostname + "usermax/createuser",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },

            data: {
              username: this.userData.username,
              fullname: this.userData.fullname,
              email: this.userData.email,
              phone: this.userData.phone,
              role: this.selectedRole,
              branch_id: this.selectedBranch,
              password: this.confirmPassword,
            }
          })
          .then((response) => {
            this.toggleSnackBar(response.data);
            if(response.data == "new user registered"){
              this.toggleAddDialog();
            }
          });
      } 
    },
    editUser(){
      if (this.$refs.formEdit.validate()) {
        axios
          .request({
            method: "post",
            url: this.$hostname + "usermax/updateuser",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },

            data: {
              user_id: this.userData.id,
              username: this.userData.username,
              fullname: this.userData.fullname,
              email: this.userData.email,
              phone: this.userData.phone,
              role: this.selectedRole,
              branch_id: this.selectedBranch,
              password: this.confirmPassword,
            }
          })
          .then((response) => {
            this.toggleSnackBar(response.data);
            if(response.data == "user updated"){
              this.toggleEditDialog();
            }
          });
      } 
    },
    toggleSnackBar(text) {
      this.snackBar = !this.snackBar;
      this.snackBarText = text;
    },
    deleteUser(){
      axios
          .request({
            method: "post",
            url: this.$hostname + "usermax/delete",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },
            data: {
              user_id: this.userData.id,
            }
          })
          .then((response) => {
            this.toggleSnackBar(response.data.data);
            if(response.data.data == 'user deleted');
              this.toggleDeleteDialog();
          });
    },
    getBranch(){
      axios
        .request({
          method: "post",
          url: this.$hostname + "usermax/getbranch",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
        })
        .then((response) => {
          this.loader = false;
          // eslint-disable-next-line no-console
          this.branchList = response.data.data; 
             
        });
    },
    getRoles(){
      axios
        .request({
          method: "post",
          url: this.$hostname + "usermax/getrole",
          headers: {
            Authorization: "Bearer " + this.TOKEN,
          },
        })
        .then((response) => {
          this.loader = false;
          // eslint-disable-next-line no-console
          this.roleList = response.data.data; 
             
        });
    },

    getReport() {
        this.loader = true;

        this.userList = [];

        // this.branchURL = "http://posapi.ronnyspizza.grena.ge/rest/web/index.php?r=v1/reporting/list-reporting"
        // this.branchURL = "http://new.ronnys.info/?r=v1/reporting/list-reporting"
        axios
          .request({
            method: "post",
            url: this.$hostname + "usermax/list",
            headers: {
              Authorization: "Bearer " + this.TOKEN,
            },

            data: {
              branch_id: this.selectedBranch,
            }
          })
          .then((response) => {
            this.loader = false;
            // eslint-disable-next-line no-console
            this.userList = this.json_data = response.data.data; 
            
            this.userList.forEach(x => {
              x.created_at = this.formatDate(Number(x.created_at * 1000));
            });
          
          });
    },
    formatDate(val){
      const today = new Date(val);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '-' + mm + '-' + yyyy;

      return formattedToday;
    },
    updateBranch() {
      
    }
  },
};
</script>

<template>
  <Layout>
    <v-card>
      <v-form ref="form1">
        <v-row>
          <v-col cols="4" class="ml-2">
            <v-text-field
            dense
            v-model="userSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              clearable
              v-model="selectedBranch"
              :items="branchOptions"
              dense
              label="Select branch"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" elevation="0" @click="getReport()">
              <v-icon small> mdi-magnify </v-icon>
              Search
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn color="primary" elevation="0" @click="toggleAddDialog()">
              <v-icon small> mdi-plus </v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-card-text>
        <v-card-title class="pl-0">
          
          <v-spacer></v-spacer>
        </v-card-title>
        <template>
            <v-data-table
              :headers="userHeaders"
              :items="userList"
              :items-per-page="10"
              :search="userSearch"
            > 
            <template v-slot:item.actions="{ item }">
              <v-icon
                size="small"
                @click="toggleEditDialog(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                size="small"
                @click="toggleDeleteDialog(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            </v-data-table>
          </template>
      </v-card-text>
    </v-card>
       
       <v-dialog v-model="userModal" max-width="600">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Order Detail</span>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="userModal = false" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
      
        </v-card-text>
        <hr />
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>

         

          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="userModal = false"
          >
            <i class="bx bx-x-circle"></i> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addDialog" max-width="600">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Add User</span>
          
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="toggleAddDialog" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="form" >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.fullname"
                  label="Full Name"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.username"
                  label="Username"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.email"
                  label="Email"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.phone"
                  label="Phone"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="selectedBranch"
                  :items="branchList"
                  item-text="name"
                  item-value="id"
                  :rules="textRules"
                  label="Branch"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="selectedRole"
                  :items="roleList"
                  item-text="name"
                  :rules="textRules"
                  label="Role"
                  required
                ></v-select>  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  label="Password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="confirmPassword"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  label="Confirm Password"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <hr />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success me-2"
            elevation="0"
            @click="saveUser"
            small
            class="white--text text-capitalize"
          >
          Add
        </v-btn>
          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="toggleAddDialog"
          >
            <i class="bx bx-x-circle"></i> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6"> Edit User</span>
          
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="toggleEditDialog" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          <v-form ref="formEdit" >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.fullname"
                  label="Full Name"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.username"
                  label="Username"
                  :rules="textRules"
                  disabled
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.email"
                  label="Email"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="userData.phone"
                  label="Phone"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="selectedBranch"
                  :items="branchList"
                  item-text="name"
                  item-value="id"
                  :rules="textRules"
                  label="Branch"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="selectedRole"
                  :items="roleList"
                  item-text="name"
                  :rules="textRules"
                  label="Role"
                  required
                ></v-select>  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :rules="passwordEditRules"
                  label="Password"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  v-model="confirmPassword"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :rules="confirmPasswordEditRules.concat(passwordConfirmationRule)"
                  label="Confirm Password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <hr />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success me-2"
            elevation="0"
            @click="editUser"
            small
            class="white--text text-capitalize"
          >
          Edit
        </v-btn>
          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="toggleEditDialog"
          >
            <i class="bx bx-x-circle"></i> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="600">
      <v-card>
        <v-toolbar color="white" elevation="0">
          <span class="text-h6">Delete User</span>
          
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn @click="toggleDeleteDialog" icon small color="gray">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-toolbar>

        <hr />
        <v-card-text>
          Are you sure to delete user - {{ userData.username }}?
        </v-card-text>
        <hr />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success me-2"
            elevation="0"
            @click="deleteUser"
            small
            class="white--text text-capitalize"
          >
          Confirm
        </v-btn>
          <v-btn
            elevation="0"
            color="red"
            small
            class="white--text text-capitalize"
            @click="toggleDeleteDialog"
          >
            <i class="bx bx-x-circle"></i> Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackBar" :color="color" elevation="5">
        {{ snackBarText }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackBar = false"> Close </v-btn>
        </template>
      </v-snackbar>
  </Layout>
</template>

<style>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>`
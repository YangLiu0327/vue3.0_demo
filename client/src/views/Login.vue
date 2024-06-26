<template>
    <div class="login">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">MI XIU management system</span>
          <el-form
            ref="loginForm"
            :model="loginUser"
            :rules="rules"
            label-width="120px"
            class="loginForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="loginUser.email"
                type="email"
                placeholder="please type user email"
              />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="loginUser.password"
                type="password"
                placeholder="please type user password"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_button"
              >
                Login
              </el-button>
            </el-form-item>
            <div class="tiparea">
                <p>If you don't have account? <router-link to="/register">Register</router-link> now</p>
            </div>
          </el-form>
        </div>
      </section>
    </div>
  </template>
  
  <script>

  import {jwtDecode} from 'jwt-decode';
  export default {
    name: "login-component",
    components: {},
    data() {
      return {
        loginUser: {
          email: "",
          password: "",
        },
        rules: {
          email: [
            {
              type: "email",
              required: true,
              message: "Please type the right format email",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "Password cannot empty",
              trigger: "blur",
            },
            {
              min: 6,
              max: 30,
              meesage: "Password cannot less than 6 or more than 30 character",
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
          this.$refs[formName].validate(valid => {
              if(valid) {
                  this.$axios
                  .post('/api/users/login', this.loginUser)
                  .then((res) => {
                    console.log(res);
                    // get token
                    const { token } = res.data;
                    // store token
                    localStorage.setItem('eleToken', token);
                    //   this.$message({
                    //       message: 'account login successfully!',
                    //       type: 'success'
                    //   });
                  const decoded = jwtDecode(token);
                  // store decode token 
                  this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
                  this.$store.dispatch('setUser', decoded)
                  this.$router.push('/index')
                  })
              }
          })
      },
      isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) || 
            (typeof value === 'string' && value.trim().length === 0)
         )
      }
    }
  };
  </script>
  <style scoped>
  .login {
    position: relative;
    height: auto;
    width: 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .form_container {
      .loginForm {
        margin-top: 40px;
        padding: 24px;
        width: 440px;
        border: 1px solid gray;
        border-radius: 12px;
      }
      .tiparea {
       text-align: right;
       font-size: 12px;
       color: #333;
      }
    }
  }
  </style>
  
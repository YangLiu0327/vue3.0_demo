<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">MI XIU management system</span>
        <el-form
          ref="registerForm"
          :model="registerUser"
          :rules="rules"
          label-width="120px"
          class="registerForm"
        >
          <el-form-item label="Usename" prop="name">
            <el-input
              v-model="registerUser.name"
              type="text"
              placeholder="please type user name"
            />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="registerUser.email"
              type="email"
              placeholder="please type user email"
            />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="registerUser.password"
              type="password"
              placeholder="please type user password"
            />
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              v-model="registerUser.confirmPassword"
              type="password"
              placeholder="please confirm user password"
            />
          </el-form-item>
          <el-form-item label="Select Identity" prop="confirmPassword">
            <el-select
              v-model="registerUser.identity"
              aria-placeholder="please select user identity"
            >
              <el-option aria-label="admin" value="admin"></el-option>
              <el-option aria-label="staff" value="staff"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('registerForm')"
              class="submit_button"
            >
              Register
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// import { reactive, ref } from 'vue'
// import { FormInstance, FormRules } from 'element-plus'
// const ruleFormRef = ref();

export default {
  name: "register-component",
  components: {},
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        identity: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "User name cannot empty",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            meesage: "User name cannot less than 2 or more than 30 character",
            trigger: "blur",
          },
        ],
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
        confirmPassword: [
          {
            required: true,
            message: "Confirm password cannot empty",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "Password cannot less than 6 or more than 30 character",
            trigger: "blur",
          },
          {
            validator: validatePassword,
            trigger: "blur",
          }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if(valid) {
                this.$axios
                .post('/api/users/register', this.registerUser)
                .then(() => {
                    this.$message({
                        message: 'account register successfully!',
                        type: 'success'
                    });
                })
                this.$router.push('/login')
            }
        })
    }
  }
};
</script>
<style scoped>
.register {
  position: relative;
  height: auto;
  width: 100%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  .form_container {
    .registerForm {
      margin-top: 40px;
      padding: 24px;
      width: 440px;
      border: 1px solid gray;
      border-radius: 12px;
    }
  }
}
</style>

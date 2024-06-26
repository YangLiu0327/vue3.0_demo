<template>
  <header class="head-nav">
    <el-row class="head">
      <el-col :span="6" class="logo-container">
        <p>MIXIU</p>
        <span class="title">MIXIU online management system</span>
      </el-col>
      <el-col :span="2" class="user">
        <div class="user-container">
          <img :src="user.avatar" class="avatar" alt="avatar" />
          <div class="welcome-container">
            <p class="welcome">welcome</p>
            <p class="name">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <el-icon class="icon">
                  <arrow-down/>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="information">information</el-dropdown-item>
                        <el-dropdown-item command="logout">logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>

import { ArrowDown } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex';

export default {
  name: "head-nav",
  components: {
    ArrowDown,
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    setDialogInfo(cmdItem) {
     switch(cmdItem) {
        case 'information':
            this.showInfoList();
            break;
        case 'logout':
            this.logout();
            break;
     }
    },
    showInfoList() {
        this.$router.push('/infoshow')
    },
    logout() {
       localStorage.removeItem('eleToken');
       this.$store.dispatch('clearCurrentState');
       this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.head-nav {
  width: 100%;
  min-width: 600px;
  padding: 4px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}
.logo-container {
  display: flex;
  p {
    color: pink;
    margin-right: 12px;
  }
}
.user-container {
  margin-right: 4px;
  cursor: pointer;
  display: flex;
  img {
    margin-right: 20px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
}
.welcome-container {
  font-size: 12px;
  margin-top: 4px;
  .name {
    color: palevioletred;
  }
}
.icon {
 color: white;
 margin-top: 6px;
 margin-left: 12px;
}
</style>

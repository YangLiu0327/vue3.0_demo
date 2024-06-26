<template>
    <div class="left-menu">
    <ElMenu
    class="el-menu-vertical-demo"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#409eff"
  >
  <router-link to="/home">
    <ElMenuItem index="0">
        <i class="fa fa-margin fa-server"></i>
        <span>Home Page</span>
    </ElMenuItem>
    <template v-for="item in items">
        <ElSubmenu v-if="item.children" :index="item.path" :key="item.path">
            <template #title>
                <i :class="'fa fa-margin ' + item.icon"></i>
                <span>{{item.name}}</span>
            </template>
            <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                <ElMenuItem :index="citem.path">
                    <span>{{ citem.name }}</span>
                </ElMenuItem>
            </router-link>
        </ElSubmenu>
    </template>
  </router-link>
  </ElMenu>
</div>
</template>
  
<script>

import { ElMenu, ElSubmenu, ElMenuItem } from 'element-plus';

export default {
    name: 'left-menu',
    components: {
    ElMenu,
    ElSubmenu,
    ElMenuItem
    },
    data() {
        return {
           items: [
            {
                icon: 'fa-envelope',
                name: 'Cash Management',
                path: 'fund',
                children: [
                    {
                        path: 'fundlist',
                        name: 'Pay List'
                    }
                ]
            },
            {
                icon: 'fa-asterisk',
                name: 'Information Management',
                path: 'info',
                children: [
                    {
                        path: 'infoshow',
                        name: 'Personal Information'
                    }
                ]
            },
           ]
        }
    }
};
</script>
<style scoped>
.left-menu{
    position: relative;
    height: auto;
    /* width: 100%; */
    display: flex;
    align-items: center;
}
.el-menu-vertical-demo {
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
</style>
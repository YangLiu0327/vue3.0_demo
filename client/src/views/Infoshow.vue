<template>
    <div class="infoshow">
        <el-row type="flex" class="ow-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img :src="user.avatar" class="avatar" alt="avatar" />
                </div>
            </el-col>
            <el-col :span="16" class="info">
                <div class="userinfo">
                    <div class="user-name">
                        <i class="fa fa-user"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="fa fa-cog"></i>
                        <span>{{user.identity}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'InfoshowComponent',
    components: {},
    computed: {
    ...mapGetters(['user']),
  },
};
</script>
<style scoped>
.infoshow{
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
}
.ow-bg {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    align-items: center;
    padding: 0 60px;
}
.userinfo {
    font-size: 24px;
    span {
        margin-left: 12px;
    }
}
.user-name {
    margin-bottom: 40px;
}
.info {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 40px;
    background-color: rgb(167, 210, 227);
}
</style>
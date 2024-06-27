<!-- <template>
    <div class="index">
       <HeadNav />
       <LeftNav />
       <router-view />
    </div>
</template> -->

<template>
    <div class="index">
      <HeadNav />
      <div class="main-content">
        <LeftNav />
        <div class="right-container">
          <router-view class="router-view" />
        </div>
      </div>
    </div>
  </template>

<script>
import HeadNav from '@/components/HeadNav.vue';
import LeftNav from '@/components/LeftMenu.vue';

export default {
    name: 'IndexComponent',
    components: {
    HeadNav,
    LeftNav
}
};
</script>
<style>
.index{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.content-placeholder{
    color: red;
}

.main-content {
  display: flex;
  width: 100%;
}

.router-view {
  width: 100%;
}
.right-container {
  position: relative;
  top: 0;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: hidden;
}
</style>
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
        <router-view class="router-view" />
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
  align-items: center; /* 居中内容 */
  height: 100vh; /* 占满整个视口高度 */
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
</style>
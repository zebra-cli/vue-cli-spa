<template>
  <el-container class="layout-container">
    <el-aside
      width="200px"
      class="layout-aside"
    >
      <Menu />
    </el-aside>
    <el-container>
      <Navbar />
      <el-main>
        <div class="px-3 py-5">
          <router-view />
        </div>
      </el-main>
      <el-footer class="d-none text-center font-size-8 text-default my-5" height="1em">Copyright © {{year}} 北京光速斑马数据科技有限公司, All Rights Reserved 京ICP备17036596号-4</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from './Navbar'
import Menu from './Menu'
export default {
  name: 'Layout',

  components: {
    Menu,
    Navbar
  },

  data: () => ({ year: new Date().getFullYear() })
}
</script>

<style lang="scss" scoped>
  .layout-container {
    height: 100%;
  }
  .layout-aside {
    height: 100%;
    background-color: #fff;
  }
</style>

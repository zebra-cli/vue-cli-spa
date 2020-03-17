<template>
  <el-scrollbar class="menu-scrollbar">
    <el-menu router :default-active="$route.fullPath">
      <MenuItem
        v-for="item in routes"
        :key="item.name"
        :route="item"
        :role="$store.state.role"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'Menu',

  components: {
    MenuItem
  },

  computed: {
    routes () {
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-scrollbar {
  height: 100%;
  border-right: 1px solid $--border-color-base;
  &::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .is-active {
      background-color: $--background-color-base;
    }
  }
}
</style>

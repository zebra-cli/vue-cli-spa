<template>
  <el-header class="navbar d-flex" height="40px">
    <spacer></spacer>
    <el-dropdown>
      <el-button type="text">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <base-link router to="/userinfo">用户信息</base-link>
        </el-dropdown-item>
        <el-dropdown-item divided><base-link href="/logout" :prevent="prevent" @click="logout">退出登录</base-link></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  name: 'Navbar',

  computed: {
    username () {
      const { nick_name, account_name, phone } = this.$store.state.userInfo || {}
      return nick_name || account_name || phone
    }
  },

  data () {
    return {
      prevent: process.env.NODE_ENV !== 'production'
    }
  },

  methods: {
    logout () {
      if (!this.prevent) return
      this.axios.get('/logout').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
  z-index: 1000;
}
</style>

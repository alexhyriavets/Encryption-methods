<template>
  <el-row class="nav">
    <el-col :span="24">
      <el-menu class="nav__ul">
        <el-menu-item
          v-for="(menuItem, index) in $options.menuConfig"
          :key="index"
          :index="index.toString()"
          @click="redirectTo(menuItem.routeName)"
        >
          <i :class="menuItem.iconClass"></i>
          <span>{{ menuItem.caption }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
const menuConfig = [
  {
    caption: 'Affine',
    iconClass: 'el-icon-document',
    routeName: 'affine'
  },
  {
    caption: 'BitPermutation',
    iconClass: 'el-icon-document',
    routeName: 'bit-permutation'
  },
  {
    caption: 'Hill',
    iconClass: 'el-icon-setting',
    routeName: 'hill'
  }
]

export default {
  menuConfig,

  name: 'Nav',
  methods: {
    redirectTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>


<style lang="scss" scoped>
.nav {
  &__ul {
    background-color: #e9eef3;
    border: none;
    height: calc(100vh - 60px);
  }
}
</style>


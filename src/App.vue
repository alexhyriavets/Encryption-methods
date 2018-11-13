<template>
  <el-container class="app">
    <el-header class="app__header">
      <AHeader />
    </el-header>
    <el-container>
      <el-aside class="app__nav">
        <ANav />
      </el-aside>
      <el-container>
        <el-main class="app__main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-footer class="app__footer">
      <AFooter />
    </el-footer>
  </el-container>
</template>

<script>
import AHeader from '@/components/layout/AHeader'
import AFooter from '@/components/layout/AFooter'
import ANav from '@/components/layout/ANav'

export default {
  name: 'App',
  components: {
    AHeader,
    AFooter,
    ANav
  }
}
</script>


<style lang="scss" scoped>
.body, html {
  margin: 0;
  padding: 0;
}

.app {
  &__header,
  &__footer {
    background-color: #409EFF;
  }

  &__main {
    min-height: calc(100vh - 60px);
  }
}
</style>

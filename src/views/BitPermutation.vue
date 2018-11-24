<template>
  <div class="bp">
    <div class="bp__select-wrapper">
      <el-select
        v-model="currentMethod"
        placeholder="Select"
        class="bp__select"
      >
        <el-option
          v-for="item in $options.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <br>
    <br>
    <component
      transition="fade" transition-mode="out-in"
      :is="currentMethod"
    />
  </div>
</template>

<script>
import Decrypt from '@/components/sections/bitPermutation/Decrypt'
import Encrypt from '@/components/sections/bitPermutation/Encrypt'

const options = [
  {
    value: 'Encrypt',
    label: 'Encrypt',
  },
  {
    value: 'Decrypt',
    label: 'Decrypt',
  },
]

export default {
  options,

  name: 'BitPermutations',
  components: {
    Decrypt,
    Encrypt,
  },
  data() {
    return {
      currentMethod: 'Encrypt',
    }
  },
}
</script>

<style lang="scss">
.bp {
  &__select-wrapper {
    position: relative;
    width: 100%;
    height: 40px;
  }

  &__select {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.fade-transition {
  transition: opacity 0.2s ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>

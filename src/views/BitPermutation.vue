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
    <el-input
      v-model="messageToEncrypt"
      :placeholder="`Message to ${currentMethod}`"
      type="textarea"
      :rows="5"
    />
    <br>
    <br>
    <el-input
      v-model="keyToEncrypt"
      class="bp__key-input"
      :placeholder="`Key for ${currentMethod}`"
    />
    <br>
    <br>
    <br>
    <el-button
      type="primary"
      @click="encrypt"
    >
      {{ currentMethod }}
    </el-button>
    <el-button
      @click="clearForm"
    >
      Clear
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      title="Result"
      width="30%"
    >
      <span class="bp__message-in-dialog">{{ encryptedMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="copyToClipboard(encryptedMessage)"
        >
          Copy
        </el-button>
        <el-button
          type="danger"
          @click="closeDialog"
        >
          Close
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  compose,
  map,
  join,
  split,
} from 'ramda'

const getCharCode = character => character.charCodeAt(0)
const getStringFromCharCode = charCode => String.fromCharCode(charCode)
const shiftCharCode = key => character => character ^ key

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

  name: 'BitPermutation',
  data() {
    return {
      messageToEncrypt: '',
      keyToEncrypt: null,
      encryptedMessage: '',
      dialogVisible: false,
      currentMethod: 'Encrypt',
    }
  },
  methods: {
    copyToClipboard(message) {
      try {
        navigator.clipboard.writeText(message)

        this.$notify({
          title: 'Success',
          message: 'Message copied to clipboard',
          type: 'success',
        })
      } catch (err) {
        this.$notify({
          title: 'Error',
          message: 'Error happened during copy to clipboard',
          type: 'error',
        })
      }
    },
    closeDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    },
    encrypt() {
      if (!this.messageToEncrypt) {
        this.$notify({
          title: 'Error',
          message: 'You must enter message before this action',
          type: 'error',
        })

        return
      }

      if (!this.keyToEncrypt) {
        this.$notify({
          title: 'Error',
          message: 'You must enter key before this action',
          type: 'error',
        })

        return
      }

      if (Number.isNaN(this.keyToEncrypt)) {
        this.$notify({
          title: 'Error',
          message: 'Key must be a number',
          type: 'error',
        })

        return
      }

      const shiftOn = key => compose(
        getStringFromCharCode,
        shiftCharCode(key),
        getCharCode,
      )

      const encryptString = compose(
        join(''),
        map(shiftOn(this.keyToEncrypt)),
        split(''),
      )

      this.encryptedMessage = encryptString(this.messageToEncrypt)

      this.showDialog()
    },
    clearForm() {
      this.messageToEncrypt = ''
      this.keyToEncrypt = null
    },
  },
}
</script>

<style lang="scss">
  .bp {
    &__key-input {
      width: 200px;
    }

    &__message-in-dialog {
      word-break: break-word;
    }

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
</style>

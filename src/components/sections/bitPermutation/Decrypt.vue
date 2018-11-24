<template>
    <div class="bp">
        <el-input
          v-model="messageToDecrypt"
          placeholder="Message to decrypt"
          type="textarea"
          :rows="5"
        />
        <br>
        <br>
        <el-input
          v-model="keyToDecrypt"
          class="bp__key-input"
          placeholder="Key for decrypt"
        />
        <br>
        <br>
        <br>
        <el-button
          type="primary"
          @click="decrypt"
        >
            Decrypt
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
            <span class="bp__message-in-dialog">{{ decryptedMessage }}</span>
            <span slot="footer" class="dialog-footer">
        <el-button
          @click="copyToClipboard(decryptedMessage)"
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
// eslint-disable-next-line
  const shiftCharCode = key => character => character ^ key

export default {
  name: 'BitPermutation',
  data() {
    return {
      messageToDecrypt: '',
      keyToDecrypt: null,
      decryptedMessage: '',
      dialogVisible: false,
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
          message: 'Error happered during copy to clipboard',
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
    decrypt() {
      if (!this.messageToDecrypt) {
        this.$notify({
          title: 'Error',
          message: 'You must enter message before this action',
          type: 'error',
        })

        return
      }

      if (!this.keyToDecrypt) {
        this.$notify({
          title: 'Error',
          message: 'You must enter key before this action',
          type: 'error',
        })

        return
      }

      if (Number.isNaN(this.keyToDecrypt)) {
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

      const decryptString = compose(
        join(''),
        map(shiftOn(this.keyToDecrypt)),
        split(''),
      )

      this.decryptedMessage = decryptString(this.messageToDecrypt)

      this.showDialog()
    },
    clearForm() {
      this.messageToDecrypt = ''
      this.keyToDecrypt = null
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
    }
</style>

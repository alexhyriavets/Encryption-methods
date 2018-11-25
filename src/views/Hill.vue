<template>
  <div class="hill">
    <div class="hill__select-wrapper">
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
      v-model="enteredMessage"
      :placeholder="`Message to ${currentMethod}`"
      type="textarea"
      :rows="5"
    />
    <br>
    <br>
    <el-button
      type="primary"
      @click="doAction"
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
      <span class="bp__message-in-dialog">{{ resultMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="copyToClipboard(resultMessage)"
        >
          Copy
        </el-button>
        <el-button
          type="danger"
          @click="hideDialog"
        >
          Close
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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

const matrix = [[15, 4], [11, 3]]
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const getTransposeMatrix = matrixToTranspose => [
  [matrixToTranspose[1][1], -matrixToTranspose[0][1]],
  [-matrixToTranspose[1][0], matrixToTranspose[0][0]],
]

const getRegular = text => text.match(/.{1,2}/g)

export default {
  options,

  name: 'Hill',
  data() {
    return {
      currentMethod: 'Encrypt',
      enteredMessage: '',
      encryptedMessage: '',
      decryptedMessage: '',
      dialogVisible: false,
    }
  },
  computed: {
    resultMessage() {
      return this.currentMethod === 'Encrypt'
        ? this.encryptedMessage
        : this.decryptedMessage
    },
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
    doAction() {
      if (!this.enteredMessage) {
        this.$notify({
          title: 'Error',
          message: 'You must enter message before this action',
          type: 'error',
        })

        return
      }

      if (this.currentMethod === 'Encrypt') {
        this.encrypt()
      } else {
        this.decrypt()
      }
    },
    clearForm() {
      this.enteredMessage = ''
    },
    showDialog() {
      this.dialogVisible = true
    },
    hideDialog() {
      this.dialogVisible = false
    },
    crypt(message, cryptMatrix) {
      let sum = 0
      let final = ''

      for (let i = 0; i < message.length; i++) {
        for (let j = 0; j < cryptMatrix.length; j++) {
          for (let k = 0; k < cryptMatrix.length; k++) {
            sum += cryptMatrix[j][k] * alphabet.indexOf(message[i][k])
          }
          const index = sum >= 0
            ? (sum % alphabet.length)
            : (alphabet.length - (Math.abs(sum) % alphabet.length))
          final += alphabet[index]
          sum = 0
        }
      }

      return final
    },
    encrypt() {
      this.encryptedMessage = this.crypt(
        getRegular(this.enteredMessage),
        getTransposeMatrix(matrix),
      )

      this.showDialog()
    },
    decrypt() {
      const message = this.enteredMessage.length % 2
        ? `${this.enteredMessage}z`
        : this.enteredMessage

      this.decryptedMessage = this.crypt(getRegular(message), matrix)

      this.showDialog()
    },
  },
}
</script>

<style lang="scss">
.hill {
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

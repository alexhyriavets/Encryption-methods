/* eslint-disable */
<template>
  <div class="bp">
    <div class="af__select-wrapper">
      <el-select
        v-model="currentMethod"
        placeholder="Select"
        class="af__select"
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
    <el-input
      v-model="keyA"
      class="af__key-input"
      :placeholder="`Key a for ${currentMethod}`"
    />
    &nbsp; &nbsp;
    <el-input
      v-model="keyB"
      class="af__key-input"
      :placeholder="`Key b for ${currentMethod}`"
    />
    <br>
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
      <span class="af__message-in-dialog">{{ resultMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="copyToClipboard(resultMessage)"
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
/* eslint-disable */

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

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const getMiltiplicativeInverseOf = (a, b, findedValue = 1) => {
  const va1 = ((findedValue * b) + 1) / a
  const calculation = va1 % a

  if (calculation === 0) return va1
  if (findedValue >= 100000) throw new Error('Cannot find multiplicativ inverse')

  findedValue += 1

  return getMiltiplicativeInverseOf(a, b, findedValue)
}

export default {
  options,

  name: 'BitPermutation',
  data() {
    return {
      enteredMessage: '',
      encryptedMessage: '',
      decryptedMessage: '',
      keyA: '',
      keyB: '',
      dialogVisible: false,
      currentMethod: 'Encrypt',
    }
  },
  computed: {
    isEncryption() {
      return this.currentMethod === 'Encrypt'
    },
    resultMessage() {
      return this.isEncryption
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
    closeDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    },
    doAction() {
      if (this.isEncryption) {
        this.encrypt()
      } else {
        this.decrypt()
      }
    },
    encrypt() {
      const enc = character =>
        ALPHABET[
          (Number(this.keyA) * ALPHABET.indexOf(character) + Number(this.keyB)) % ALPHABET.length
        ]

      this.encryptedMessage = this.enteredMessage.split('').map(enc).join('')

      this.showDialog()
    },
    decrypt() {
      const dec = character => {
        const charCode = ALPHABET.indexOf(character)
        const multiplicativeInverse = getMiltiplicativeInverseOf(this.keyA, ALPHABET.length, 1)

        const resultCode = ((multiplicativeInverse * (charCode - this.keyB)) % ALPHABET.length)

        const final = resultCode >= 0
          ? resultCode
          : ALPHABET.length - Math.abs(resultCode)

        return ALPHABET[
          final
        ]
      }

      this.decryptedMessage = this.enteredMessage.split('').map(dec).join('')

      this.showDialog()
    },
    clearForm() {
      this.enteredMessage = ''
      this.keyA = ''
      this.keyB = ''
    },
  },
}
</script>

<style lang="scss">
  .af {
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

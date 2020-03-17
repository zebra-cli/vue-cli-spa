import CryptoJS from 'crypto-js'
// 解密方法
export default {
  key: '',
  iv: '',
  init ({ key, iv }) {
    this.key = CryptoJS.enc.Hex.parse(key)
    this.iv = CryptoJS.enc.Hex.parse(iv)
  },
  // 解密
  decrypt (word) {
    // const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    const baseResult = CryptoJS.enc.Base64.parse(word)
    const srcs = CryptoJS.enc.Base64.stringify(baseResult)
    const decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  // 加密
  encrypt (word) {
    const origin = typeof word === 'object' ? JSON.stringify(word) : String(word)
    const srcs = CryptoJS.enc.Utf8.parse(origin)
    const encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  }
}

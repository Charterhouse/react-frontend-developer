import { Buffers } from './Buffers'

class TypedArrays {
  static string2ab (str, encoding = 'utf16le') {
    const buffer = Buffer.from(str, encoding)
    return Buffers.copyToArrayBuffer(buffer)
  }

  static ab2string (ab, encoding = 'utf16le') {
    return Buffer.from(ab).toString(encoding)
  }

  static string2Uint8Array (str, encoding = 'utf16le') {
    const buffer = Buffer.from(str, encoding)
    return Buffers.copyToUint8Array(buffer)
  }

  static uint8Array2string (arr, encoding = 'utf16le') {
    return Buffer.from(arr).toString(encoding)
  }
}

export { TypedArrays }

import { Buffers } from './Buffers'
import type { Encoding } from './Encoding'

class TypedArrays {
  static string2ab (str: string, encoding: Encoding = 'utf8'): ArrayBuffer {
    const buffer = Buffer.from(str, encoding)
    return Buffers.copyToArrayBuffer(buffer)
  }

  static ab2string (ab: ArrayBuffer, encoding: Encoding = 'utf8'): string {
    return Buffer.from(ab).toString(encoding)
  }

  static string2Uint8Array (str: string, encoding: Encoding = 'utf8'): Uint8Array {
    const buffer = Buffer.from(str, encoding)
    return Buffers.copyToUint8Array(buffer)
  }

  static uint8Array2string (arr: Uint8Array, encoding: Encoding = 'utf8'): string {
    return Buffer.from(arr).toString(encoding)
  }
}

export { TypedArrays }

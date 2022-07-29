import type { Encoding } from './Encoding'
type TypedArray =
  Uint8Array |
  Uint16Array |
  Uint32Array |
  Int8Array |
  Int16Array |
  Int32Array

class Buffers {
  static moveFromTypedArray (typedArray: TypedArray): Buffer {
    return Buffer.from(typedArray.buffer)
  }

  static copyFromTypedArray (typedArray: TypedArray): Buffer {
    return Buffer.from(typedArray)
  }

  static fromString (str: string, encoding: Encoding = 'utf8'): Buffer {
    return Buffer.from(str, encoding)
  }

  static toString (buffer: Buffer, encoding: Encoding = 'utf8') {
    return buffer.toString(encoding)
  }

  static copyToArrayBuffer (nodeBuffer: Buffer): ArrayBuffer {
    return nodeBuffer.buffer.slice(
      nodeBuffer.byteOffset,
      nodeBuffer.byteOffset + nodeBuffer.byteLength)
  }

  static moveToArrayBuffer (nodeBuffer: Buffer): ArrayBuffer {
    if (nodeBuffer.length === nodeBuffer.buffer.byteLength) {
      return nodeBuffer.buffer
    }
    return Buffers.copyToArrayBuffer(nodeBuffer)
  }

  static copyToUint8Array (nodeBuffer: Buffer): Uint8Array {
    return new Uint8Array(Buffers.copyToArrayBuffer(nodeBuffer))
  }

  static moveToUint8Array (nodeBuffer: Buffer): Uint8Array {
    return new Uint8Array(Buffers.moveToArrayBuffer(nodeBuffer))
  }
}

export { Buffers }

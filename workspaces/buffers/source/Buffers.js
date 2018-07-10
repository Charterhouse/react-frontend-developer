class Buffers {
  static moveFromTypedArray (typedArray) {
    return Buffer.from(typedArray.buffer)
  }

  static copyFromTypedArray (typedArray) {
    return Buffer.from(typedArray)
  }

  static fromString (str, encoding = 'utf16le') {
    return Buffer.from(str, encoding)
  }

  static toString (buffer, encoding = 'utf16le') {
    return buffer.toString(encoding)
  }

  static copyToArrayBuffer (nodeBuffer) {
    return nodeBuffer.buffer.slice(
      nodeBuffer.byteOffset,
      nodeBuffer.byteOffset + nodeBuffer.byteLength)
  }

  static moveToArrayBuffer (nodeBuffer) {
    if (nodeBuffer.length === nodeBuffer.buffer.byteLength) {
      return nodeBuffer.buffer
    }
    return Buffers.copyToArrayBuffer(nodeBuffer)
  }

  static copyToUint8Array (nodeBuffer) {
    return new Uint8Array(Buffers.copyToArrayBuffer(nodeBuffer))
  }

  static moveToUint8Array (nodeBuffer) {
    return new Uint8Array(Buffers.moveToArrayBuffer(nodeBuffer))
  }
}

export { Buffers }

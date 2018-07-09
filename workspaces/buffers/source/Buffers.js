class Buffers {
  static buffer2ArrayBuffer (nodeBuffer) {
    if (nodeBuffer.length === nodeBuffer.buffer.byteLength) {
      return nodeBuffer.buffer
    }
    return nodeBuffer.buffer.slice(
      nodeBuffer.byteOffset,
      nodeBuffer.byteOffset + nodeBuffer.byteLength)
  }
}

export { Buffers }

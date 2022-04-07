import { Buffers } from './Buffers'

describe('Buffers', () => {
  describe('converting TypedArrays to Buffer', function () {
    let input: Uint8Array

    beforeEach(() => {
      const buf: Buffer = Buffer.from('Ala ma kota', 'utf16le')
      const inputArrayBuffer: ArrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length)
      input = new Uint8Array(inputArrayBuffer)
    })

    describe('moving', () => {
      it('can convert Uint8Array to Buffer without copying the data', () => {
        const buffer = Buffers.moveFromTypedArray(input)

        expect(buffer.buffer).toBe(input.buffer)
      })

      it('does not use message pool when creating a Buffer without copying', () => {
        const buffer = Buffers.moveFromTypedArray(input)

        expect(buffer).toHaveLength(buffer.buffer.byteLength)
        expect(buffer.byteOffset).toBe(0)
      })
    })

    describe('copying', () => {
      it('can convert Uint8Array to Buffer by copying the data', () => {
        const buffer = Buffers.copyFromTypedArray(input)

        expect(buffer.buffer).not.toBe(input.buffer)
      })

      it('uses a 8KB message pool as the underlying ArrayBuffer when array size is less than 4KB', () => {
        const buffer = Buffers.copyFromTypedArray(input)

        expect(Buffer.poolSize).toBe(8192)
        expect(buffer.buffer.byteLength).toBe(8192)
      })

      it('uses dedicated underlaying Array Buffer if the view length is equal to 4KB', () => {
        const input = Uint8Array.from({ length: 4096 }, (v, k) => k)

        const buffer = Buffers.copyFromTypedArray(input)

        expect(buffer.buffer.byteLength).toBe(4096)
      })

      it('uses dedicated underlaying Array Buffer if the view length is more than 4KB', () => {
        const input = Uint8Array.from({ length: 4097 }, (v, k) => k)

        const buffer = Buffers.copyFromTypedArray(input)

        expect(buffer.buffer.byteLength).toBe(4097)
      })
    })
  })

  describe('converting Buffer to TypedArray', () => {
    describe('copying Buffer to ArrayBuffer', () => {
      it("copies the Buffer's underlying ArrayBuffer if its size is the same as that of the Buffer", () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array.buffer)

        expect(buffer).toHaveLength(buffer.buffer.byteLength)

        const arrayBuffer = Buffers.copyToArrayBuffer(buffer)

        expect(arrayBuffer).not.toBe(buffer.buffer)
        expect(arrayBuffer.byteLength).toBe(buffer.length)
        expect(new Uint8Array(arrayBuffer)).toEqual(array)
      })

      it('buffers are safe - changes in source are not reflected in target', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array.buffer)

        const arrayBuffer = Buffers.copyToArrayBuffer(buffer)
        const newArray = new Uint8Array(arrayBuffer)

        array[array.length - 1] = 100

        expect(buffer[buffer.length - 1]).toBe(100)
        expect(newArray[newArray.length - 1]).toBe(4)
      })

      it('copies the underlying buffer is size of the buffer is different from the size of the underlying array buffer (memory pool)', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array)

        expect(buffer).toHaveLength(5)
        expect(buffer.buffer.byteLength).toBe(Buffer.poolSize)

        const arrayBuffer = Buffers.copyToArrayBuffer(buffer)

        expect(arrayBuffer).not.toBe(buffer.buffer)
        expect(arrayBuffer.byteLength).toBe(buffer.length)
        expect(new Uint8Array(arrayBuffer)).toEqual(array)
      })

      it('provides convenience method to copy Buffer to Uint8Array', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array)

        const uint8Array = Buffers.copyToUint8Array(buffer)

        expect(uint8Array).toEqual(array)
      })
    })

    describe('moving Buffer to ArrayBuffer', () => {
      it("reuses the Buffer's underlying ArrayBuffer if its size is the same as that of the Buffer", () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array.buffer)

        expect(buffer).toHaveLength(buffer.buffer.byteLength)

        const arrayBuffer = Buffers.moveToArrayBuffer(buffer)

        expect(arrayBuffer).toBe(buffer.buffer)
        expect(arrayBuffer.byteLength).toBe(buffer.length)
      })

      it('buffers are connected - source should be used as read-only', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array.buffer)

        const arrayBuffer = Buffers.moveToArrayBuffer(buffer)
        const newArray = new Uint8Array(arrayBuffer)

        array[array.length - 1] = 100

        expect(buffer[buffer.length - 1]).toBe(100)
        expect(newArray[newArray.length - 1]).toBe(100)
      })

      it('copies the underlying buffer is size of the buffer is different from the size of the underlying array buffer (memory pool)', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array)

        expect(buffer).toHaveLength(5)
        expect(buffer.buffer.byteLength).toBe(Buffer.poolSize)

        const arrayBuffer = Buffers.moveToArrayBuffer(buffer)

        expect(arrayBuffer).not.toBe(buffer.buffer)
        expect(arrayBuffer.byteLength).toBe(buffer.length)
        expect(new Uint8Array(arrayBuffer)).toEqual(array)
      })

      it('provides convenience method to move Buffer to Uint8Array', () => {
        const array = Uint8Array.from({ length: 5 }, (v, k) => k)
        const buffer = Buffer.from(array)

        const uint8Array = Buffers.moveToUint8Array(buffer)

        expect(uint8Array).toEqual(array)
      })
    })
  })

  describe('converting from string', () => {
    const testInputString = 'Test String'

    const ab2str = (buf: ArrayBuffer): string => {
      return String.fromCharCode.apply(null, new Uint16Array(buf) as unknown as number[])
    }

    const ab2strUtf8 = (buf: ArrayBuffer): string => {
      return String.fromCharCode.apply(null, new Uint8Array(buf) as unknown as number[])
    }

    it('by default it converts utf8 string to a buffer', () => {
      const buffer = Buffers.fromString(testInputString)
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.length)
      expect(ab2strUtf8(arrayBuffer)).toBe(testInputString)
    })

    it('can also convert any other encoding supported by Buffer.from', () => {
      const buffer = Buffers.fromString(testInputString, 'utf16le')
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.length)
      expect(ab2str(arrayBuffer)).toBe(testInputString)
    })
  })

  describe('converting to string', () => {
    const testInputString = 'Test'

    it('by default it converts Buffer to a utf8 string', () => {
      const buffer = Buffer.from(testInputString, 'utf8')

      expect(Buffers.toString(buffer)).toEqual(testInputString)
    })

    it('can also convert Buffer to any other encoding supported by buf.toString(encoding)', () => {
      const buffer = Buffer.from(testInputString, 'utf16le')

      expect(Buffers.toString(buffer, 'utf16le')).toEqual(testInputString)
    })
  })
})

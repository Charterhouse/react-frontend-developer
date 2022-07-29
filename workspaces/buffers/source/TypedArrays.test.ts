import { TypedArrays } from './TypedArrays'
import { Buffers } from './Buffers'

describe('TypedArrays', () => {
  const testString = 'aBCD'

  describe('converting string to a TypedArray', () => {
    const utf162ab = (str:string): ArrayBuffer => {
      const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
      const bufView = new Uint16Array(buf)
      Array.from(str).forEach((c, i) => {
        bufView[i] = str.charCodeAt(i)
      })
      return buf
    }

    const utf82ab = (str: string): ArrayBuffer => {
      const buf = new ArrayBuffer(str.length) // 1 byte for each char
      const bufView = new Uint8Array(buf)
      Array.from(str).forEach((c, i) => {
        bufView[i] = str.charCodeAt(i)
      })
      return buf
    }

    it('can convert utf8 string to Uint8Array', () => {
      const output = TypedArrays.string2Uint8Array(testString, 'utf8')

      expect(output).toEqual(new Uint8Array(utf82ab(testString)))
    })

    it('can convert utf16 string to Uint8Array', () => {
      const output = TypedArrays.string2Uint8Array(testString, 'utf16le')

      expect(output).toEqual(new Uint8Array(utf162ab(testString)))
    })

    it('can convert hex string to Uint8Array', () => {
      const output = TypedArrays.string2Uint8Array(testString, 'hex')

      expect(output).toEqual(new Uint8Array([0xab, 0xcd]))
    })

    it('can convert binary (latin1) string to Uint8Array', () => {
      const testBinaryString = 'a\u0000b\u0023c\u00ab'
      const output = TypedArrays.string2Uint8Array(testBinaryString, 'binary')

      expect(output).toEqual(new Uint8Array([
        'a'.charCodeAt(0), // 97
        0x00,
        'b'.charCodeAt(0), // 98
        0x23,
        'c'.charCodeAt(0), // 99
        0xab]))
    })

    it('can convert base64 string to Uint8Array', () => {
      const testBase64String = Buffer.from(testString).toString('base64')
      const output = TypedArrays.string2Uint8Array(testBase64String, 'base64')

      expect(output).toEqual(new Uint8Array(
        Buffer.from(testBase64String, 'base64')
      ))
    })

    it('can convert utf8 string to ArrayBuffer', () => {
      const output = TypedArrays.string2ab(testString, 'utf8')

      expect(new Uint16Array(output)).toEqual(new Uint16Array(utf82ab(testString)))
    })

    it('can convert utf16 string to ArrayBuffer', () => {
      const output = TypedArrays.string2ab(testString, 'utf16le')

      expect(new Uint16Array(output)).toEqual(new Uint16Array(utf162ab(testString)))
    })

    it('can convert hex string to ArrayBuffer', () => {
      const output = TypedArrays.string2ab(testString, 'hex')

      expect(new Uint16Array(output)).toEqual(new Uint16Array([0xcdab]))
    })

    it('can convert binary (latin1) string to ArrayBuffer', () => {
      const testBinaryString = 'a\u0000b\u0023c\u00ab'
      const output = TypedArrays.string2ab(testBinaryString, 'binary')

      // Note - little endian
      expect(new Uint16Array(output)).toEqual(new Uint16Array([
        parseInt('0x0061', 16), // a\u0000
        parseInt('0x2362', 16), // b\u0023
        parseInt('0xab63', 16) // c\u00ab
      ]))
    })

    it('can convert base64 string to ArrayBuffer', () => {
      const testBase64String = Buffer.from(testString).toString('base64')
      const output = TypedArrays.string2ab(testBase64String, 'base64')

      expect(new Uint8Array(output)).toEqual(new Uint8Array(
        Buffer.from(testBase64String, 'base64')
      ))
    })
  })

  describe('converting TypeArray to string', () => {
    const testBinaryString = 'a\u0000b\u0023c\u00ab'
    const testUint8ArrayUtf8 = Buffers.copyToUint8Array(Buffers.fromString(testString, 'utf8'))
    const testUint8ArrayUtf16 = Buffers.copyToUint8Array(Buffers.fromString(testString))
    const testUint8ArrayHex = Buffers.copyToUint8Array(Buffers.fromString(testString, 'hex'))
    const testUint8ArrayBinary = Buffers.copyToUint8Array(Buffers.fromString(testBinaryString, 'binary'))
    const testUint8ArrayBase64 = Buffers.copyToUint8Array(Buffers.fromString(testString, 'base64'))

    it('can convert Uint8Array to utf8 string', () => {
      const output = TypedArrays.uint8Array2string(testUint8ArrayUtf8, 'utf8')

      expect(output).toEqual(testString)
    })

    it('can convert Uint8Array to utf16 string', () => {
      const output = TypedArrays.uint8Array2string(testUint8ArrayUtf16)

      expect(output).toEqual(testString)
    })

    it('can convert Uint8Array to hex string', () => {
      const output = TypedArrays.uint8Array2string(testUint8ArrayHex, 'hex')

      expect(output).toEqual(testString.toLowerCase())
    })

    it('can convert Uint8Array to binary (latin1) string', () => {
      const output = TypedArrays.uint8Array2string(testUint8ArrayBinary, 'binary')

      expect(output).toEqual(testBinaryString)
    })

    it('can convert Uint8Array to basse64 string', () => {
      const output = TypedArrays.uint8Array2string(testUint8ArrayBase64, 'base64')

      expect(output).toEqual(testString)
    })

    it('can convert ArrayBuffer to utf8 string', () => {
      const output = TypedArrays.ab2string(testUint8ArrayUtf8.buffer, 'utf8')

      expect(output).toEqual(testString)
    })

    it('can convert ArrayBuffer to utf16 string', () => {
      const output = TypedArrays.ab2string(testUint8ArrayUtf16.buffer)

      expect(output).toEqual(testString)
    })

    it('can convert ArrayBuffer to hex string', () => {
      const output = TypedArrays.ab2string(testUint8ArrayHex.buffer, 'hex')

      expect(output).toEqual(testString.toLowerCase())
    })

    it('can convert ArrayBuffer to binary (latin1) string', () => {
      const output = TypedArrays.ab2string(testUint8ArrayBinary.buffer, 'binary')

      expect(output).toEqual(testBinaryString)
    })

    it('can convert ArrayBuffer to base64 string', () => {
      const output = TypedArrays.ab2string(testUint8ArrayBase64.buffer, 'base64')

      expect(output).toEqual(testString)
    })
  })
})

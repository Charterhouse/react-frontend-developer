# buffers

`buffers` provide functions for manipulating NodeJS `Buffer` and JavaScript `ArrayBuffer`.

## Installation

Install using either `yarn` or `npm`:

```bash
# yarn
$ yarn add '@react-frontend-developer/buffers'
# npm
$ npm install '@react-frontend-developer/buffers'
```

## Using Buffer

Semantics of the NodeJS buffers is not instantly obvious. A NodeJS `Buffer` is similar to a JavaScript
`Uint8Array`, actually, they largely share the same API, but their semantics is different here and there.

A `Buffer`, similar to `Uint8Array` is a *view* casted on the underlying `ArrayBuffer`. In JavaScript, the (byte) size of the view is the same as the (byte) size of the underlying `ArrayBuffer`, but in NodeJS, a small `Buffer` (small meaning `< 4KB` bytes) will be casted on a bigger underlying `ArrayBuffer` to prevent memory segmentation. This can be easily observed. Let's create a `Buffer` with just a couple of elements:

```javascript
const buffer = Buffer.from([1,2,3]) // Buffer <01, 02, 03>
buffer.length                       // 3
buffer.buffer.byteLength            // 8192
buffer.byteOffset                   // 3432 - will be different for you
Buffer.poolSize                     // 8192
```

We see the `buffer` property to access the underlying `ArrayBuffer`. Buffer will use a shared `ArrayBuffer` as long as the requested size is less than or equal `4096` bytes:

```javascript
const largeBuffer = Buffer.allocUnsafe(4096).fill('a')
largeBuffer.buffer.byteLength       // 4096 (and not 8192)
```

Please notice, that there is a difference between calling: `Buffer.allocUnsafe(20).fill('a')` and `Buffer.alloc(20, 'a')`. The former will use shared memory pool, while the latter will allocate dedicated
buffer of `20` bytes. Also, when you use one `Buffer.from` methods the semantics depends on the provided input. For example:

```javascript
const largeBufferAlloc = Buffer.alloc(20, 'a')
largeBufferAlloc.buffer.byteLength  // 20

const largeBufferAllocUnsafe = Buffer.allocUnsafe(20).fill('a')
largeBufferAllocUnsafe.buffer.byteLength  // 8192

const bufferFromSmallString = Buffer.from('Short...')
bufferFromSmallString.buffer.byteLength   // 8192

const bufferFromRegularArray = Buffer.from([1,2,3])
bufferFromSmallString.buffer.byteLength   // 8192

const uint8Array = new Uint8Array({length: 5})
const bufferFromUint8Array = Buffer.from(uint8Array)
bufferFromUint8Array.buffer.byteLength    // 8192

const bufferFromArrayBuffer = Buffer.from(uint8Array.buffer)
bufferFromArrayBuffer.buffer.byteLength   // 5
```

The last case is the most interesting. Providing an array buffer as the input to `Buffer.from` will create a `Buffer` that uses the provided `ArrayBuffer` as its underlying buffer (thus, no copy):

```javascript
console.log(uint8Array.buffer === bufferFromArrayBuffer.buffer) // true
console.log(uint8Array.buffer === bufferFromUint8Array.buffer)  // false
```

Yes, it is easy to get lost if you do not use `Buffers` and `TypedArrays` on a daily basis.

This is why we created this package. We got some options fixed for you and we made API a bit more descriptive so that it is easier to predict the result.

> BTW: we have captured the above examples in RunKit: https://runkit.com/marcinczenko/5b44a0b41ff01e0012d13bbf so that you can play with it.

### Using buffers

So our convenience package provides two abstractions: `Buffers` and `TypedArrays`. `Buffers` provides a set of convenience methods to convert between `Buffer`s and `TypedArray`s using the copy and move semantics. `TypedArrays` provide convenience methods for creating `TypedArray`s from Strings - something we miss in the existing API.

### `beforeAll()`

Remember to import `Buffers` and `TypedArrays` in your code:

```javascript
import { Buffers, TypedArrays } from '@react-frontend-developer/buffers'

// or using require
const { Buffers, TypedArrays } = require('@react-frontend-developer/buffers')
```

We also prepared for you a RunKit where you can try it immediately: https://runkit.com/marcinczenko/5b437ad7b034eb0012c56c85

#### You have a Buffer and want to convert it to TypedArray

So `Buffer` is the older brother of `Uint8Array` - thus, we provide two methods to conveniently move between the two: `Buffers.copyToUint8Array` and `Buffers.moveToUint8Array`. `Buffers.copyToUint8Array` is super save. It takes a NodeJS `Buffer` as the input and returns `Uint8Array` with its own underlying `ArrayBuffer` so that you do not have to worry if the Buffer is modified after conversion. You also do not have to care about buffer sizes, message pools, etc:

```javascript
const buffer = Buffer.alloc(20, 'a')
const uint8Array = Buffers.copyToUint8Array(buffer)
```

In some case, you may not want to copy. Imagine you have a large (like, really large) `Buffer` and you want to use it as `Uint8Array` from now on, but you do not want to copy the bytes to a new `ArrayBuffer`. This is where `Buffers.moveToUint8Array` comes:

```javascript
const largeBuffer = Buffer.allocUnsafe(4096).fill('a')
const uint8Array = Buffers.moveToUint8Array(buffer)
```

You will get an `Uint8Array` view on the same underlying `ArrayBuffer` - thus no copying.

There is one small trap though. You have to make sure that `Buffer` provided as the input to `moveToUint8Array` does not use a memory pool (i.e. buffer.length === buffer.buffer.byteLength) or you will get a copy instead of a move. So, pragmatically, if your buffer is `4096+` bytes in size, you do not have to worry as this is always the case. Otherwise, it depends how your buffer was created. If it uses a pre-allocated pool, you will get a copy, otherwise, we will move. In other words, a copy may only occur for small buffers - not a big deal thus.

Let's make it clear - using `moveToUint8Array` is usually a pre-mature optimization, especially when you move outside of Buffer's native environment - NodeJS. So for most of the cases, sticking with copy semantics is recommended.

#### Other `TypedArray` types

So, we have a convenience method that converts `Buffer` to `Uint8Array`. What about other types like `Uint16Array` or `Uint32Array`?

In order to convert from `Buffer` to an arbitrary `TypedArray` type, you have to perform two steps:

1. Convert `Buffer` to `ArrayBuffer` - either by copying or moving
2. Create the desired view using the resulting `ArrayBuffer` as the input

For instance:

```javascript
const buffer = Buffer.from('Some string...', 'utf16le')
const arrayBuffer = Buffers.copyToArrayBuffer(buffer)

// now create the view of your liking
const uint16Array = new Uint16Array(arrayBuffer)
const uint32Array = new Uint32Array(arrayBuffer)
const uint8Array = new Uint8Array(arrayBuffer)
```

Of course, also here, we provide `Buffers.moveToArrayBuffer` for move semantics.

### Converting `TypedArray` to a string

`Buffer` has great support for string conversions:

```javascript
Buffer.from('1234', 'utf8')       // Buffer <31, 32, 33, 34>
Buffer.from('1234', 'utf16le')    // Buffer <31, 00, 32, 00, 33, 00, 34, 00>
Buffer.from('1234', 'hex')        // Buffer <12, 34>
Buffer.from('\u00124', 'binary')  // Buffer <12, 34>
```

See more on RunKit: https://runkit.com/marcinczenko/5b3f3974226fb000128824a6.

For `TypedArray` however, we do not have any equivalent API. Therefore, our `TypedArrays` provides some convenience methods for converting from and to strings.

`TypedArrays` allows you to convert any `ArrayBuffer` to a string and vice versa in any encoding supported by `Buffer.from` and `Buffer.toString()`.

> `TypedArrays` is using `Buffer` underneath to perform the conversion.

And so we have `TypedArrays.string2ab` to convert a string to `ArrayBuffer` and `TypedArrays.ab2string` to convert `ArrayBuffer` to a string.

We found that conversions to an from `Uint8Array` are the most frequent. For this reason in `TypedArrays` we included two convenience methods: `string2Uint8Array` and `uint8Array2string`.

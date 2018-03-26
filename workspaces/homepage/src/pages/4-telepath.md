---
title: Telepath
path: /telepath
---

Provides a secure channel for communication between a web app running in a browser and an app running on a mobile device.

Setting up a secure channel between the mobile device and a browser is done using a QR code that is presented by the web app whenever a secure channel is required. The user can then open the secure channel by scanning the QR code using the app on the phone.

### Architecture

Telepath consists of a javascript library that can be used in web apps, and an iOS library for mobile apps.

Because both the browser and phone are likely to be behind distinct [NAT][nat], we use a service with a public ip address to facilitate peer-to-peer communication between them. This is a fairly simple service that only holds end-to-end encrypted messages in queues.

The channel supports bi-directional communication; both from the web app to the mobile app, and vice-versa. A channel therefore consists of two queues, which we’ve named ‘blue’ and ‘red’. The red queue is used to send messages from the web app to the mobile app, and the blue queue is used for the reverse route.

    -------------                             ------------
    |    web    |  ---------- red ----------> |  mobile  |
    |    app    |  <--------- blue ---------- |    app   |
    -------------                             ------------

Setting up a secure channel is done using these steps:

1.  The web app requests a secure connection to the identity app by invoking the `createChannel` function on the javascript library.
2.  The `createChannel` function generates a random channel id (`I`) and a pair of random symmetric keys for encryption (`E`) and message authentication (`A`).
3.  The web app displays a QR code containing the channel id `I`, and keys `E` and `A`.
4.  The owner of the phone opens the app, points the camera to the QR code.
5.  The phone app extracts the channel id and the two keys from the QR code.
6.  Both phone and web app can now communicate on channel `I`. They encrypt their messages using the key `E` and ensure message integrity with key `A`.

[nat]: https://en.wikipedia.org/wiki/Network_address_translation

### QR Code

The channel id `I` and keys `E` and `A` are first encoded in a URL, and then the  URL is encoded in a QR code. This allows a user to scan the QR code using the standard camera app in iOS and be directed to the telepath-enabled mobile app.

An example of such a URL and its QR Code:

    https://example.com/telepath/connect#I=2oxSJ6_eyP7JXsn6VK7ooB_u&E=m8JzVbVlEwlzzR0-o8-AU0F6oONYcqvLW5YVLvLLP6s

![Example QR Code](images/ExampleQRCode.png)

The URL is made up of the following components:

    <base url>telepath/connect#I=<channel id>&E=<encryption key>

* `<base url>` is the url that is registered to open the mobile app in [iOS](https://developer.apple.com/library/content/documentation/General/Conceptual/AppSearch/UniversalLinks.html) or [Android](https://developer.android.com/training/app-links/deep-linking.html)
* `<channel id>` is the channel id string, [percent encoded](https://tools.ietf.org/html/rfc3986#section-2.1) for use in a URL fragment
* `<encryption key>` is the encryption key, [base64url encoded](https://tools.ietf.org/html/rfc4648#section-5)

iOS
---

### Usage

```swift
import Telepath
```

Instantiating a Telepath instance. You need the URL of a running [Queuing Service][queuing].

```swift
let telepath = Telepath(queuingServiceUrl: URL(string: "https://...."))
```

Connecting to a secure channel when you have the channel id, and its key:

```swift
let channel = telepath.connect(channel: channelId, key: channelKey)
```

Connecting to a secure channel when you received a Telepath URL (e.g. through a QR Code):

```swift
let channel = telepath.connect(url: telepathURL)
```

Sending messages:

```swift
channel.send(message: "a message") { error: Error? in
    // ...
}
```

Receiving messages. Received message is `nil` when no message is waiting.

```swift
channel.receive { message: String?, error: Error? in
    // ...
}
```

[queuing]: #telepath-queuing-service

### Sources

Git repo: https://gitlab.ta.philips.com/blockchain-lab/cogito/tree/master/packages/telepath-ios



Javascript
----------

### Usage

Create an instance of the Telepath class, providing the URL of the queuing
service:

```javascript
import Telepath from '@cogito/telepath-js'
const telepath = new Telepath('https://queuing.example.com')
```

Creating a new channel with a random id and a random encryption key. Returns a
promise:

```javascript
const channel = await telepath.createChannel()
```

Connecting a mobile app to the channel can be done by creating a connect URL.
This URL can be displayed in a QR code. The QR code can be scanned by the mobile
app and used to connect to this channel. The telepath library does not include
functionality for displaying QR codes, you can use a QR code component such as
[qrcode.react][qrcode] for this purpose.

```javascript
const connectUrl = channel.createConnectUrl(appBaseUrl)
```

Messages are exchanged using [JSON-RPC][json-rpc]:

```javascript
const request = { jsonrpc: '2.0', method:'test', id: 1 }
const response = await channel.send(request)
```

The `send` method returns a promise. The queuing service will be polled for a
response for at least 10 minutes. If no response is available after this time it
will return `null`.

[qrcode]: https://www.npmjs.com/package/qrcode.react
[json-rpc]: http://www.jsonrpc.org/specification

### Sources

Git repo: https://gitlab.ta.philips.com/blockchain-lab/cogito/tree/master/packages/telepath-js


Queuing Service
---------------

Simple Queueing Service for use with Telepath. Allows two Telepath clients to
communicate when they are behind distinct NAT.

### Sources

Git repo: https://gitlab.ta.philips.com/blockchain-lab/cogito/tree/master/packages/telepath-queuing-service


### Usage

```sh
» cd telepath-queuing-service
» yarn start
```

`telepath-queuing-service` is listening on port `3000` and you can use [httpie](https://httpie.org) (`brew install httpie`) to verify that the queueing service works:

```bash
# write something do the queue with queue id "hond"
» http POST :3000/hond body='likes to chase cats'
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 0
Date: Tue, 06 Feb 2018 16:33:54 GMT
X-Powered-By: Express
```

To read back from the queue `hond` we do this:

```bash
# read back from the queue
» http :3000/hond
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 23
Content-Type: text/html; charset=utf-8
Date: Tue, 06 Feb 2018 16:34:04 GMT
ETag: W/"17-P/sADWb+ZvqryBhtyfknr18yII4"
X-Powered-By: Express

{
    "body": "likes to chase cats"
}
```

Attempt to read from an empty or non-existing queue, will result in `204 No Content` response:

```bash
» http :3000/hond
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Connection: keep-alive
Date: Tue, 06 Feb 2018 16:34:06 GMT
X-Powered-By: Express
```

### Easy deployment with `now`

[now](https://zeit.co/now) from [zeit](https://zeit.co) allows you to put your app *up there* in minutes.
Currently *now* supports static web app, node.js, and docker based deployments.
In order to take advantage of this deployment method follow the [Get Started](https://zeit.co/now#get-started) steps. When running `now` command, you will be given option to select between *docker* and *npm* deployment. This is because our project includes `Dockerfile`. Here is an example deployment:

```bash
» now
> Deploying ~/Documents/Projects/Philips/BLOCKCHAIN/Cogito/telepath-queuing-service under marcin@example.com
> Two manifests found. Press [n] to deploy or re-run with --flag
> [1] package.json         --npm
> [2] Dockerfile        --docker
> Using Node.js 9.4.0 (requested: `>=7.6.0`)
> Ready! https://telepath-queuing-service-kblozrcqif.now.sh (copied to clipboard) [5s]
> You (marcin@example.com) are on the OSS plan. Your code and logs will be made public.
> NOTE: You can use `now --public` to skip this prompt
> Initializing…
> Building
> ▲ npm install
> ✓ Using "yarn.lock"
> ⧗ Installing 8 main dependencies…
> ✓ Installed 423 modules [8s]
> ▲ npm start
> > telepath-queuing-service@0.1.0 start /home/nowuser/src
> > node ./index
> Telepath Queueing Service running on port 3000
> Deployment complete!
```

Both deployment options are fine and will work. After deployment, you can use [httpie](https://httpie.org) (`brew install httpie`) to verify that the queueing service works:

```bash
# write something do the queue with queue id "pies"
» http --verify=no POST https://telepath-queuing-service-kblozrcqif.now.sh/pies body='likes to chase cats'
HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 0
Date: Tue, 06 Feb 2018 16:00:30 GMT
Server: now
X-Now-Region: now-bru
X-Powered-By: Express
```

To read back from the queue `pies` we do this:

```bash
» http --verify=no https://telepath-queuing-service-kblozrcqif.now.sh/pies
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Tue, 06 Feb 2018 16:00:49 GMT
ETag: W/"17-P/sADWb+ZvqryBhtyfknr18yII4"
Server: now
Transfer-Encoding: chunked
X-Now-Region: now-bru
X-Powered-By: Express

{
    "body": "likes to chase cats"
}
```

Attempt to read from an empty queue, will result in `204 No Content` response:

```bash
» http --verify=no https://telepath-queuing-service-kblozrcqif.now.sh/pies
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Connection: keep-alive
Date: Tue, 06 Feb 2018 16:00:53 GMT
Server: now
X-Now-Region: now-bru
X-Powered-By: Express
```

### Cloud deployment using Terraform

A [Terraform][terraform] script to deploy to Amazon Web Services is included. Adapt the
script to match your own Amazon environment, domain name and ssl certificate.
Deploy to Amazon by issuing the following commands:

    rm -rf node_modules
    terraform init
    terraform plan
    terraform apply

[terraform]: https://terraform.io

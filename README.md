# Client to test Signal K servers and gateways

This test client tries to be a simple tool that one can fire up to discover & connect to Signal K servers/gateways, more specifically to their streaming WebSocket service. 

Once connected the client verifies the schema compliance of the messages it receives and reports errors.

# Installation 

Install dependencies with `npm install`. For Bonjour/mdns you need to install the optional mdns library with `npm install mdns`.

# Usage

`bin/signalk-test` will start the test client in discovery mode: it will start Bonjour/dns-sd discovery process and once it finds a _signalk-ws_ service it will try to connect to it.

`bin/signalk-test localhost 3000` will try to connect directly to the specified address.

Test client uses [debug](https://www.npmjs.com/package/debug) for logging. You can enable logging by setting the environment variable `DEBUG` to `signalk:*`.

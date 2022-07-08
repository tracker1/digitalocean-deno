# DigitalOcean API client for Deno

JavaScript library for the DigitalOcean API. For use in Deno.

Originally forked from
[digitalocean-js](https://github.com/johnbwoodruff/digitalocean-js/)

## Usage

Simply import the client and initialize it with your API token:

```js
import { DigitalOcean } from "https://raw.githubusercontent.com/tracker1/digitalocean-deno/master/mod.ts";

const client = new DigitalOcean("my-api-token");
```

To see all the services available, check out the
[documentation](https://johnbwoodruff.github.io/digitalocean-js/). (TODO: Update
publishing if any changes).

![digitalocean-deno](https://user-images.githubusercontent.com/5883616/126348407-dd1e694d-64a9-402e-b8df-f59e67686014.png)

# DigitalOcean API client for Deno

JavaScript library for the DigitalOcean API. For use in Deno.

Originally forked from
[digitalocean-deno](https://github.com/tracker1/digitalocean-deno/)

## Usage

Simply import the client and initialize it with your API token:

```js
import { DigitalOcean } from "https://raw.githubusercontent.com/tracker1/digitalocean-deno/master/mod.ts";

const client = new DigitalOcean("my-api-token");
```

To see all the services available, check out the
[documentation](https://tracker1.github.io/digitalocean-deno/). (TODO: Update
publishing if any changes).

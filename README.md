# cmpc_487w
n64wasm our cmpsc_487w project

# Running the tests

To install dependencies in an ubuntu or WSL system run

```
sudo apt-get install -y build-essential check
```

### Install the MIPS toolchain

```
sudo apt-get install -y gcc-mips-linux-gnu binutils-mips-linux-gnu
```

To build the custom rom, a baserom is required to be in the root `mario` folder

### Check

```
make check
```

### Tests

```
make test NO_EMULATOR=1
```

# Server

To load the User interface and web assembly emulator run the deno server

```
deno task server
```

This will spin up a local server.

## Custom ROM

The roms located in the `src/roms` folder will be served
An endpoint is also needed to be added in the server.js like this

```js
const router = new Router();
router
  .get("/my_n64_game_rom", (context) => {
    const buffer = Deno.readFileSync(`${Deno.cwd()}/src/roms/rom_name.z64`);

    context.response.type = "application/json";
    context.response.body = {
      "name": "my_n64_game_rom_name",
      "description": "A description",
      "img_url": "/assets/my_rom_game_cover_image.png",
      "bytes": Array.from(buffer),
    };
  })
```

Make sure the cover image of the rom is in the `assets` folder

To add UI element just add the following entry in `index.html`

```js

await romSelection("/my_n64_game_rom");
```

And option to select your rom should be avaialble in the web page!

Click on the option to start your game with the web assembly n64 emulator and enjoy your game!

# Licence

MIT

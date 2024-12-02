# N64WASM
n64wasm our cmpsc_487w project

This repo features the `mario` folder which is the modded version of original mario n64 with our own levels and characters

This repo also features a web emulator which can be run and used to run the mod or any other ROM of your choice!

# Web Emulator

To load the User interface and web assembly emulator run the deno server

```
deno task server
```

This will spin up a local server. Go the address make sure your ROM is loaded.

## Loading ROM

Place your rom somewhere in the `src` and folder and simply add
entry here on the `roms` object in `src/server.js`

```js
const roms = {
  og_mario: {
    path: `${Deno.cwd()}/src/roms/baserom.z64`,
    description: "The original Super Mario 64 ROM",
    img_url: "/assets/684.png",
  },
  my_rom_name: {
    path: "path_to_rom",
    description: "The description of the rom",
    img_url: "/assets/image.png"
  }
};

```

And option to select your rom should be available like that in the web page!

Click on the option to start your game with the web assembly n64 emulator and enjoy your game!

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

# Licence

MPL

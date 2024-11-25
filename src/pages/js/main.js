// This is the main file which configures the emulator and manages the ROM(s)

import { configString } from "./config.js";
import { FS, Module } from "./n64wasm.js";

export const init = () => {
  Module["canvas"] = document.getElementById("canvas");
  $("#p").style.display = "none";
};

export const $ = (s) => document.querySelector(s);

export const loadEmulatorWithEndpoint = (endpoint) => {
  loadShaders().then(() => {
    loadConfig();
    loadCustomRom(endpoint).then((romName) => {
      let rom = [romName];

      console.log(rom);

      Module.callMain(rom);
    });
  });
};

// Create a ROM select element
export const romSelect = (id, imgSrc, romName) => {
  const parent = document.createElement("div");

  parent.addEventListener("click", () => {
    window.location.href = "/emulator.html?rom=" + id;
  });

  parent.classList.add("uk-width-auto", "rom-button");
  parent.setAttribute("id", id);

  const child = document.createElement("div");

  parent.classList.add("uk-inline");

  const img = document.createElement("img");
  img.src = imgSrc;

  img.classList.add("uk-child-width-expand");

  const overlay = document.createElement("div");

  overlay.classList.add(
    "uk-overlay",
    "uk-animation-scale-up",
    "uk-overlay-primary",
    "uk-position-bottom",
  );

  const name = document.createElement("p");
  name.innerHTML = romName;

  overlay.appendChild(name);

  child.appendChild(img);
  child.appendChild(img);
  child.appendChild(overlay);

  parent.appendChild(child);

  return parent;
};

// Load the OG mario ROM
const loadOgMarioRom = async () => {
  const response = await fetch("/og_mario");

  if (!response.ok) {
    throw new Error(`ROM fetching response status: ${response.status}`);
  }

  const json = await response.json();
  const byteArray = new Uint8Array(json.bytes);

  FS.writeFile("og_mario.v64", byteArray);
};

// Load the custom rom from the server
const loadCustomRom = async (endpoint) => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(
      `Custom ROM fetching response status: ${response.status}`,
    );
  }

  console.log(response);

  const json = await response.json();
  const byteArray = new Uint8Array(json.bytes);
  const name = json.name;

  FS.writeFile(name, byteArray);

  return Promise.resolve(name);
};

// Load the assets file into the emulator
const loadShaders = async () => {
  const response = await fetch("/assets/shaders.zip");
  const bytes = new Uint8Array(await response.arrayBuffer());

  FS.writeFile("assets.zip", bytes);
};

// Load the configuration of the emulator
const loadConfig = () => {
  const config = configString();
  console.log(config);

  FS.writeFile(
    "config.txt",
    config,
  );
};

// Configure the web assembly, tell it the location of the canvas
window["Module"] = {
  onRuntimeInitialized: init,
  canvas: document.getElementById("canvas"),
  print: (text) => console.log(text),
  printErr: (text) => console.err(text),
};

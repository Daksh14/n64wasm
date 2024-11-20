// This is the main file which configures the emulator and manages the ROM(s)

function init() {
	var Module = {};
	Module["canvas"] = document.getElementById("canvas");
	window["Module"] = Module;
}

function initHandler() {
	console.log("Emulator is initalized");
}

function processPrintStatement(text) {
	console.log(text);
}

function processErrStatement(text) {
	console.err(text);
}

async function load_og_mario_rom() {
	const response = await fetch("/og_mario");
	if (!response.ok) {
		throw new Error(`ROM fetching response status: ${response.status}`);
	}

	const json = await response.json();
	const byteArray = new Uint8Array(json.bytes);

	FS.writeFile("og_mario.v64", byteArray);
}

async function loadShaders() {
	const response = await fetch("/assets/shaders.zip");
	const bytes = new Uint8Array(await response.arrayBuffer());

	FS.writeFile("assets.zip", bytes);

	FS.writeFile(
		"config.txt",
		"12\n13\n14\n15\n0\n2\n9\n4\n6\n5\n11\n-1\n-1\n-1\n-1\nb\nn\ny\nh\nEnter\ni\nk\nj\nl\na\nq\ne\ns\nd\n`\nArrowUp\nArrowDown\nArrowLeft\nArrowRight\n0\n0\n0\n1\n0\n0\n0\n0\n0\n0\n0\n0\n0\n",
	);
}

function loadEmulator() {
	loadShaders().then(() => {
		load_og_mario_rom().then(() => {
			Module.callMain(["og_mario.v64"]);
		});
	});
}

window["Module"] = {
	onRuntimeInitialized: initHandler,
	canvas: document.getElementById("canvas"),
	print: (text) => processPrintStatement(text),
	printErr: (text) => processErrStatement(text),
};

import { bold, cyan, green, red, yellow } from "@std/fmt/colors";
import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

const app = new Application();

// The domain for LOCAL_NODE for example purposes
app.use(oakCors({ origin: "*", optionsSuccessStatus: 200 }));

// Error middlewares so the server doesnt give unhelpful errors
app.use(async (context, next) => {
  try {
    context.response.headers.set("Access-Control-Allow-Origin", "*"); // * for all servers, you can use your own server address
    context.response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    context.response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type",
    ); // If your request body has json
    await next();

    // logging
    console.log(
      `${green(context.request.method)} ${cyan(context.request.url.pathname)}`,
    );
  } catch (e) {
    context.response.status = e.status;
    context.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${e.message}</h1>
              </body>
            </html>`;
  }
});

// Static file webserver
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/src/pages`,
      index: `index.html`,
    });
  } catch {
    await next();
  }
});

const roms = {
  og_mario: {
    path: `${Deno.cwd()}/src/roms/baserom.z64`,
    description: "The original Super Mario 64 ROM",
    img_url: "/assets/684.png",
  },
};

// Setup ROM routes
const router = new Router();

router
  .get("/roms/:rom", async (context, next) => {
    const param = context.params.rom;
    const locate = Object.keys(roms).includes(param);
    console.log(locate)
    if (!locate) {
      context.response.status = 404;
      await next();
    } else {
      const rom = roms[param];

      const buffer = Deno.readFileSync(rom.path);

      console.log(bold("ROM loading: ") + yellow("Super Mario 64"));

      context.response.status = 200;
      context.response.type = "application/json";
      context.response.body = {
        "name": param,
        "description": rom.description,
        "img_url": rom.img_url,
        "bytes": Array.from(buffer),
      };
    }
  })
  .get("/all", (context) => {
    context.response.status = 200;
    context.response.type = "application/json";

    context.response.body = roms;
  });

app.use(router.routes());
app.use(router.allowedMethods());

// start the server and setup logging
app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});

await app.listen({ port: 8000 });

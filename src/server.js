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

// Setup ROM routes
const router = new Router();
router
  .get("/og_mario", (context) => {
    const buffer = Deno.readFileSync(`${Deno.cwd()}/src/roms/baserom.us.z64`);

    console.log(bold("ROM loading: ") + yellow("Super Mario 64"));

    context.response.status = 200;
    context.response.type = "application/json";
    context.response.body = {
      "name": "og_mario",
      "description": "The original Super Mario 64 ROM",
      "img_url": "/assets/684.png",
      "bytes": Array.from(buffer),
    };
  })
  .get("/custom_mario", (context) => {
    const buffer = Deno.readFileSync(`${Deno.cwd()}/src/roms/custom.z64`);

    console.log(bold("Our custom ROM loading: ") + yellow("Super Mario 64"));

    context.response.status = 200;
    context.response.type = "application/json";
    context.response.body = {
      "name": "custom_mario",
      "description": "A custom Super Mario 64 ROM",
      "img_url": "/assets/688.png",
      "bytes": Array.from(buffer),
    };
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

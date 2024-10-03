import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

const app = new Application();

// The domain for LOCAL_NODE for example purposes
app.use(oakCors({ origin: "*", optionsSuccessStatus: 200 }));

// ALL OF THIS BECAUSE CORS ON THEB BROWSER
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*"); // * for all servers, you can use your own server address
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  ); // Which methods you want to allow
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type"); // If your request body has json
  await next(); // If you use async await in other middlewares, you must use async await here
});

app.use(async (context, next) => {
  try {
    await context.send({
      root: `./`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

console.log(
  "Starting example server at http://127.0.0.1:8000/example/index.html",
);

await app.listen({ port: 8000 });

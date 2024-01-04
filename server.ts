const express = require("express");
const next = require("next");

const { parse } = require("url");
const { resolve } = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 8080;
const router = require("./routes");
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use("static ", express.static("./static"));
  server.use(handle);
  server.use(morgan("dev"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      console.log(parsedUrl);
      const { pathname } = parsedUrl;

      if (pathname === "/service-worker.js") {
        app.serveStatic(req, res, resolve("./static/service-worker.js"));
      } else {
        handle(req, res, parsedUrl);
      }
    })
    .listen(port, (err: Error | null) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
});

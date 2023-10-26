import express, { Request, Response, Application } from "express";
const app: Application = express();

const PORT = process.env.PORT || 8000;

import ytdl from "ytdl-core";

app.get("/", (req: Request, res: Response): void => {
  res.send("go to /url?url=url for url or /id?id=id for id");
});

app.get("/url", (req: Request, res: Response): void => {
  if (
    !ytdl.validateURL(req.query.url.toString()) ||
    !ytdl.validateID(ytdl.getURLVideoID(req.query.url.toString()))
  ) {
    res.send("Invalid url!");
    return;
  }
  res.setHeader("Content-Type", "video/mp4");
  res.writeHead(200);
  ytdl(req.query.url.toString()).pipe(res);
});

app.get("/id", (req: Request, res: Response): void => {
  if (!ytdl.validateID(ytdl.getURLVideoID(req.query.id.toString()))) {
    res.send("Invalid id!");
    return;
  }
  res.setHeader("Content-Type", "video/mp4");
  res.writeHead(200);
  ytdl(req.query.url.toString()).pipe(res);
});

app.listen(PORT, (): void => {
  console.log(
    `Server Running here 👉 https://localhost:${PORT}\n                    ^ I did not do this`
  );
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
app.get("/", (req, res) => {
    res.send("go to /url?url=url for url or /id?id=id for id");
});
app.get("/url", (req, res) => {
    if (!ytdl_core_1.default.validateURL(req.query.url.toString()) ||
        !ytdl_core_1.default.validateID(ytdl_core_1.default.getURLVideoID(req.query.url.toString()))) {
        res.send("Invalid url!");
        return;
    }
    res.setHeader("Content-Type", "video/mp4");
    res.writeHead(200);
    (0, ytdl_core_1.default)(req.query.url.toString()).pipe(res);
});
app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}\n                    ^ I did not do this`);
});

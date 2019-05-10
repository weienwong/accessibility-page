const fs = require("fs");
const http = require("http")
const server = require("http").createServer();
const port = process.env.PORT || 8000;

const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');

server.on("request", (req, res) => {
    const src = fs.createReadStream("./index.html");
    src.pipe(res)
})

console.log(`Running on port ${port}`);
server.listen(port);

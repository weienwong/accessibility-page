const fs = require("fs");
const http = require("http")
const server = require("http").createServer();
const port = process.env.PORT || 8000;

const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const log = console.log;

server.on("request", (req, res) => {
    const src = fs.createReadStream("./index.html");
    src.pipe(res)
})

console.log(`Running on port ${port}`);
server.listen(port);

;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setBypassCSP(true)

    await page.goto("http://localhost:8000")

    const results = await new AxePuppeteer(page)
                .analyze()
    
    if (results.violations.length > 0) {
        log(chalk.red.bold("Axe violations:"))
        for (let i = 0; i < results.violations.length; i++) {
            console.log(results.violations[i]);
        }
    } else {
        console.log("All accessibility tests have passed!");
    }

    await page.close()
    await browser.close()

    server.close((err) => {
        if (err) {
            console.error(err);
        }
    })
})()

const http = require('http');
const fs = require('fs');
const requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");
const server = http.createServer((req, res) =>
{
   if(req.url == "/")
   {
    requests("https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=a74b138dc910bb933613687261af2948")
    .on("data", (chunk) => {
        console.log(chunk);
    })
    .on("end", (err) => {
        if(err) return console.log("connection timed out", err);

        console.log("end");
    });
   }
});

server.listen(8000, "127.0.0.1");
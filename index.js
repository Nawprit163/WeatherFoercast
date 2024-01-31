const http = require('http');
const fs = require('fs');
const requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempval, orgval) => {
    let temp = tempval.replace("{%tempval%}", orgval.main.temp);
    temp = temp.replace("{%tempmin%}", orgval.main.temp_min);
    temp = temp.replace("{%tempmax%}", orgval.main.temp_max);
    temp = temp.replace("{%location%}", orgval.name);
    temp = temp.replace("{%country%}", orgval.sys.country);
    return temp;
}



const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=a74b138dc910bb933613687261af2948")
            .on("data", (chunk) => {
                const obj_data = JSON.parse(chunk);
                const arr_data = [obj_data];
                const real_time_data = arr_data.map((val) => replaceVal(homeFile, val)).join(" ");
                res.write(real_time_data);
            })
            .on("end", (err) => {
                if (err) return console.log("connection timed out", err);
                res.end();
            });
    }
});

server.listen(8000, "127.0.0.1");
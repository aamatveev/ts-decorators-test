let express = require("express");
let jsonData = require("./data.json");
let app = express();

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// logger
app.use(function (req, res, next) {
    console.log(`[${new Date().toISOString()}]: ${req.originalUrl}`);
    next();
})

app.get("/test",
    function (req, res) {
        res.send(jsonData);
    });

app.get("/*",
    function (req, res) {
        res.send("Hello World!");
    });

app.listen(3002, function () {
    console.log("Example app listening on port 3002!");
});
const express = require ("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT ;




// ! for testing the server
app.get("/", (req, res) => {
    res.send("Hello World bireswar");
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
const express = require ("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set

const connectDB = require("./config/db");
connectDB();
// const cors = require("cors");
// app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



const userRoute = require("./routes/user.route");
app.use("/api/v1", userRoute);
 






// ! for testing the server
app.get("/", (req, res) => {
    res.send("Hello World bireswar");
});








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
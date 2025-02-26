require("dotenv").config();
const express = require("express");
const app = express();

const assetsPath = path.join(__dirname,"public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");




const indexRouter = require("./routes/indexRouter");


app.use(express.urlencoded({extended: true }))
app.use("/",)

const PORT = 3000;
app.listen(PORT, () => {
    console.log("your app is listening at http://localhost:3000/")
})
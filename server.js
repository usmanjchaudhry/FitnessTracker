const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");
const app = express();
const path = require("path");
// use packages
app.use(logger("dev"));
//get exercise
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/exercise.html`));
});
//get stats
app.get("/stats", (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/stats.html`));
});
//use express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./routes/routes.js")(app);

const PORT = process.env.PORT || 4000;
// alert
const DeprecationWarning = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
// for mongoose to heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", DeprecationWarning)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`localhost:${PORT}`);
        });
    });
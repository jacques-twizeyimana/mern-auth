const app = require("express")();
const bodyparser = require("body-parser");
const config = require("config");
const cors = require("cors");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

require("./model/db");

app.get("/", (req, res) => res.send(config.get("APP_DETAILS")));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

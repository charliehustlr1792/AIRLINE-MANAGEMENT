const express = require("express");
const { PORT } = require("./config/serverconfig");
const bodyParser = requirer("body-parser");
const setupandstartserver = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlendcoded({ extended: true }));
    app.listen(PORT, async () => {
        console.log("Server Running on ", PORT);
    });
};
setupandstartserver();

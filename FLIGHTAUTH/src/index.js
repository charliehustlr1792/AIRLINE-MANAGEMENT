const express = require("express");
const { PORT } = require("./config/serverconfig.js");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index.js");
const db=require('./models/index.js')
const setupandstartserver = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log("Server started at port ", PORT);
  });
  if(process.env.DB_SYNC){
    db.sequelize.sync({alter:true})
  }
};
setupandstartserver();

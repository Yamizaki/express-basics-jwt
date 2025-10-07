import express from "express";
import 'dotenv/config';
import routesUsers from './routes/users.js';
import routesAuthUsers from './routes/authUser.js';
import db_config from "./config/db_config.js";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', routesUsers)
app.use('/authusers', routesAuthUsers);

try {
  // connect to db
  const db = db_config;
  db.connectDb();
  
  // initialize server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("Server running at port: " + PORT));
} catch (error) {
  console.log("Cannot connect to the server" + error);
}

process.on('SIGINT', async () => {
  await db_config.disconnectDb();
  console.log("Disconnected from the database");
  process.exit(0);
});
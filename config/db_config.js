import {MongoClient} from "mongodb";
import 'dotenv/config';
import mongoose from "mongoose";
class dbClient{

    async connectDb(){
        const queryString=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_SERVER}/newCollection?retryWrites=true&w=majority`;
        // this.client = new MongoClient(queryString);
        await mongoose.connect(queryString);
        console.log("Connected to the database");
    }

    async disconnectDb(){
        // await this.client.close();
        await mongoose.disconnect();
    }

}
export default new dbClient();
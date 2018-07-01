import mongoose, { MongooseDocumentOptionals, Mongoose } from "mongoose";
import { MongosOptions } from "mongodb";
import { reject } from "bluebird";

export class MongoConnector {
  uri: string;
  constructor(uri: string) {
    this.uri = uri;
  }
  connect() {
    if (mongoose.connection.readyState) {
      return Promise.resolve(mongoose);
    }

    const connectionPromise: Promise<Mongoose> = new Promise((resolve, reject) => {
      const options: mongoose.ConnectionOptions = {};
      options.server = {
        auto_reconnect: true,
        poolSize: 5,
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 },
        reconnectTries: 3000
      };


      mongoose.connect(this.uri, options);

      const db = mongoose.connection;

      mongoose.connection.on("error", function (err) {
        console.log("MONGODB ERROR MONGOOSE LEVEL ", err);
      });

      setTimeout(() => {
        if (!mongoose.connection.readyState) {
          reject("Timeout when connecting to mongoDB");
        }
      }, 30000);

      db.on("connecting", function () {
        console.info("MONGODB " + " connecting.");
      });

      db.on("error", function (err) {
        console.log("MONGODB ERROR ", err);
      });

      db.on("close", function (err) {
        console.log("MONGODB CLOSE ", err);
      });

      db.on("connected", function () {
        console.info("MONGODB " + " connected successfully.");
        resolve(mongoose);
      });

      db.once("open", function callback() {
        console.info("MONGODB " + " opened successfully.");
      });

      db.on("reconnected", function () {
        console.info("MONGODB " + " reconnected.");
      });

      db.on("timeout", function () {
        console.info("MONGODB " + " timeout.");
      });

      db.on("disconnected", function () {
        console.info("MONGODB " + " disconnected");
      });
    });

    return connectionPromise;
  }


}







import mongoose, { MongooseDocumentOptionals, Mongoose, mongo } from "mongoose";
import { MongosOptions } from "mongodb";
import { reject } from "bluebird";

export class MongoConnector {
  uri: string;
  private readonly TIMEOUT_BETWEEN_CONNECTION_ATTEMPTS = 4000;

  private readonly CONNECTION_TIMEOUT = 30000;

  constructor(uri: string) {
    this.uri = uri;
  }
  connect() {

    if (mongoose.connection.readyState) {
      return Promise.resolve(mongoose);
    }


    const connectionPromise: Promise<Mongoose> = new Promise((resolve, reject) => {
      const options: mongoose.ConnectionOptions = {
        autoReconnect: true,
        poolSize: 5,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectTries: 3000
      };


      mongoose.connect(this.uri, options).catch(err => console.log(err));

      const db = mongoose.connection;

      mongoose.connection.on("error", function (err) {
        console.log("MONGODB ERROR MONGOOSE LEVEL ", err);
      });

      setTimeout(() => {
        if (!mongoose.connection.readyState) {
          reject("Timeout when connecting to mongoDB");
        }
      }, this.CONNECTION_TIMEOUT);

      db.on("connecting", function () {
        console.info("MONGODB " + " connecting.");
      });

      db.on("error", function (err) {
        console.log("MONGODB ERROR ", err);
        mongoose.disconnect();
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
        console.log(this.uri);
        setTimeout(() => {
          mongoose.connect(this.uri, options);
        }, this.TIMEOUT_BETWEEN_CONNECTION_ATTEMPTS);

      }.bind(this));
    });

    return connectionPromise;
  }


}







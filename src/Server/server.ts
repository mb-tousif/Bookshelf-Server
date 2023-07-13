import { Server } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "../Config";

dotenv.config();
let server: Server;
const url = config.URL as string;

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception 💥 Shutting down..." , error);
  process.exit(1);
});


mongoose.set("strictQuery", true);
async function ConnectSerer(): Promise<void> {
    try {
        await mongoose.connect(url);
        console.log(`🗂️ MongoDB Server connected`);
    } catch (error) {
        console.log(error);
    }
    process.on("unhandledRejection", (error) => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM signal. 🗂️ MongoDB Server disconnected");
  await mongoose.connection.close();
  if (server) {
    server.close(() => {
      console.log("Process terminated");
    });
  } else {
    process.exit(1);
  }
  process.exit(0);
});

export default ConnectSerer;
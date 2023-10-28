import dotenv from "dotenv";
import app from "./app";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});

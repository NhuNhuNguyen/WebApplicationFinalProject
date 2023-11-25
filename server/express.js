
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import borrowRoutes from "./routes/borrow.routes.js";
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./server/dist/app"));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", borrowRoutes);
app.use("/", bookRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;

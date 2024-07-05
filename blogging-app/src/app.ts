import dotenv from "dotenv";
import express, {Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/posts";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', router);
app.use('/userRoutes', userRoutes )

const dbConnection = process.env.DB_CONNECTION;
if (!dbConnection) {
    throw new Error('DB_CONNECTION is not defined in .env file');
}
mongoose.connect(dbConnection)
    .then(() => console.log('Connected to DB!'))
    .catch((err: unknown) => {
        if (err instanceof Error) {
            console.error('Failed to connect to DB:', err.message);
        } else {
            console.error('Failed to connect to DB:', err);
        }
    });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


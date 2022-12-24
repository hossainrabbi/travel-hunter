"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("./middleware/common/errorHandler");
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
// dotenv configuration
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// database connection
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log('💡 [database]: Database connection successfully!'))
    .catch((err) => console.log(`❌ Database connection fail for ${err.message}`));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api/v1', auth_1.default);
app.use('/api/v1', user_1.default);
// error handler
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// listen application
app.listen(port, () => {
    console.log(`⚡ [server]: Server is running at http://localhost:${port}`);
});

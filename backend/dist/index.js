"use strict";
// const express = require("express");
// const db = require('./db');
// const jwt = require("jsonwebtoken");
// const cors = require('cors');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// api functions
// const {Caching}=require('./routes')
// const { Login } = require('./routes')
// const { Logout } = require('./routes');
// const { AdminDashboard } = require('./routes');
// const { UploadData } = require('./routes')
// const { verifyToken } = require('./routes');
// const { Foreclosure } = require('./routes');
// const { Dashboard } = require('./routes')
// const { checkURLAccess } = require('./routes')
const routes_1 = require("./routes");
const routes_2 = require("./routes");
const routes_3 = require("./routes");
const routes_4 = require("./routes");
const routes_5 = require("./routes");
const routes_6 = require("./routes");
const routes_7 = require("./routes");
const routes_8 = require("./routes");
const routes_9 = require("./routes");
const routes_10 = require("./routes");
const routes_11 = require("./routes");
const routes_12 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.post('/login', routes_3.Login);
// admin
app.get('/admin-dashboard', routes_7.verifyToken, routes_10.checkURLAccess, routes_5.AdminDashboard);
app.get('/upload-data', routes_7.verifyToken, routes_10.checkURLAccess, routes_6.UploadData);
app.get('/upload-data/new-upload', routes_7.verifyToken, routes_10.checkURLAccess, routes_11.NewUpload);
app.post('/new-upload/file', routes_12.FileUpload);
// user
app.get('/dashboard', routes_7.verifyToken, routes_10.checkURLAccess, routes_9.Dashboard);
app.get('/foreclosure', routes_7.verifyToken, routes_10.checkURLAccess, routes_8.Foreclosure);
app.get('/logout', routes_7.verifyToken, routes_10.checkURLAccess, routes_4.Logout);
// caching code
// will store seed data-role id,url,url-type
(0, routes_2.Caching_DropdownValues)();
(0, routes_1.Caching)(); // runs for the first time at initiation of server
console.log("caching function execuuted");
const port = 8000;
app.listen(port, () => console.log(`server running on port ${port}`));

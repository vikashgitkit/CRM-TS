"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Foreclosure = exports.FileUpload = exports.NewUpload = exports.UploadData = exports.AdminDashboard = exports.Dashboard = exports.Login = exports.checkURLAccess = exports.Caching_DropdownValues = exports.Caching = exports.verifyToken = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import cors from 'cors';
const app = (0, express_1.default)();
const secretKey = "SOME_SECRET";
// cache
console.log("secret key ", secretKey);
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
let role_url_ui = {};
let role_url_api = {};
let county = {};
let fileType = {};
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in verification function : ", secretKey);
        const token = req.headers['authorization']; // token is sent in the 'Authorization' header
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }
        const tokenExists = yield db_1.default.query('SELECT COUNT(*) FROM accesstoken WHERE access_token = $1', [token]);
        const count = parseInt(tokenExists.rows[0].count);
        console.log("token count is ", count);
        if (count === 0) {
            console.log('Token expired');
        }
        else {
            jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.log("error is ", err);
                    // return res.status(401).json({ message: 'Invalid token' });
                }
                // If token is valid, can access its payload in 'decoded'
                const decodedToken = decoded;
                if (!decodedToken) { }
                req.body.user = decodedToken;
                const { username, userid } = decodedToken;
                console.log("req.user is", req.body.user);
                const role_id = req.body.user.role_id;
                next();
            });
        }
    });
}
exports.verifyToken = verifyToken;
const Caching = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("In caching function  : ", role_url_api);
    console.log("🚀 ~ file: routes.js:53 ~ Caching ~ Object.keys(role_url_api).length === 0:", Object.keys(role_url_api).length === 0);
    if (Object.keys(role_url_api).length === 0) {
        console.log("cache is empty...query will execute");
        try {
            const caching = yield db_1.default.query('SELECT role_id, url, url_type FROM role_screen JOIN screen_urls ON role_screen.screen_id = screen_urls.screen_id', []);
            const role_url = caching.rows;
            console.log("total role_url : ", caching.rows);
            role_url_api = role_url.filter(data => data.url_type === 'backend');
            role_url_ui = role_url.filter(data => data.url_type === 'frontend');
            console.log("backend role url present in cache   : ", role_url_api);
            console.log("frontend role url present in cache   : ", role_url_ui);
            return {
                "role_url_uii": role_url_ui,
                "role_url_apii": role_url_api
            };
        }
        catch (error) {
            console.log("🚀  cacheUrls ~ error:", error);
            return error;
        }
    }
    else {
        console.log("🚀cache filled : ", role_url_api); // return role_url_api;
        return {
            "role_url_uii": role_url_ui,
            "role_url_apii": role_url_api
        };
    }
});
exports.Caching = Caching;
const Caching_DropdownValues = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("In caching DropdownValues function  : ");
    console.log("🚀  Caching ~ Object.keys( county and fileType) === 0:", Object.keys(county).length === 0, "file type :", Object.keys(fileType).length === 0);
    if ((Object.keys(county).length === 0) && (Object.keys(fileType).length === 0)) {
        console.log("cache is empty...query will execute for county and filetype");
        try {
            const caching_county = yield db_1.default.query('SELECT id,name,type_id from lov WHERE type_id= $1', [103]);
            const caching_fileType = yield db_1.default.query('SELECT id,name,type_id from lov WHERE type_id= $1', [102]);
            county = caching_county.rows;
            fileType = caching_fileType.rows;
            console.log("total county: : ", county);
            console.log("total fileType: : ", fileType);
            return {
                "county": county,
                "fileType": fileType
            };
        }
        catch (error) {
            console.log("🚀  error:", error);
            return error;
        }
    }
    else {
        console.log("🚀cache filled "); // return role_url_api;
        return {
            "county": county,
            "fileType": fileType
        };
    }
});
exports.Caching_DropdownValues = Caching_DropdownValues;
const checkURLAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("check URL access function called");
    try {
        //  expecting an array of any type for role_url_apii.
        const { role_url_apii } = yield (0, exports.Caching)();
        console.log("🚀  checkURLAccess ~ test:", role_url_apii);
        console.log("Cached data recieved: ", role_url_apii);
        const reqURL = req.route.path;
        const reqRole_id = req.body.user.role_id;
        console.log("role_id requesting for screen access: ", reqRole_id);
        console.log("requested url requesting for screen access : ", reqURL);
        const checkApi = role_url_apii.some((data) => { return data.role_id === reqRole_id && data.url === reqURL; });
        if (checkApi) {
            //extracting dropdown values of filetype and county
            next();
        }
        else {
            console.log("access denied");
            return res.status(401).json({ message: 'Not Accessible url' });
        }
    }
    catch (error) {
        // Handle errors if caching fails
        console.error("Error while caching: ", error);
        if (error instanceof Error) {
            // If 'error' is an instance of Error type
            res.status(500).json({ message: 'Error', error: error.message });
        }
        else {
            // If 'error' is of a different type (string, etc.)
            res.status(500).json({ message: 'Error', error: String(error) });
        }
    }
});
exports.checkURLAccess = checkURLAccess;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        console.log("user details are  : ", user);
        let userid = user.id;
        console.log("users pw", user.password, "set pw : ", password);
        if (user && user.password === password) {
            console.log("correct credentials");
            // console.log("userid is ",userid)
            const role_id = user.role_id;
            // TOKEN GENERATION
            const tokenVal = jsonwebtoken_1.default.sign({ username, role_id }, secretKey, { expiresIn: '18000s' });
            const { role_url_uii } = yield (0, exports.Caching)();
            console.log("cache of frontend urls : ", role_url_uii);
            const token_id = 'token_id';
            yield db_1.default.query('INSERT INTO AccessToken (id,user_id, access_token, expiration_timestamp) VALUES (nextval($1), $2, $3,$4)', [token_id, user.id, tokenVal, new Date(Date.now() + 3600000)]);
            // console.log("🚀 In Login Function , token value :", tokenVal);
            if (user.role_id == 1001) {
                res.status(200).json({ tokenVal, role_url_uii, userid, role_id, message: `Welcome ${username}` });
            }
            else if (user.role_id == 1003) {
                res.status(200).json({ tokenVal, role_url_uii, userid, role_id, message: `WelcomeAdmin ${username}` });
            }
            else {
                res.status(200).json({ tokenVal, role_url_uii, userid, role_id, message: `WelcomeTenant ${username}` });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'No User Found' });
    }
});
exports.Login = Login;
const Dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Dashboard verification");
    res.status(200).json({ message: 'Token Verified' });
});
exports.Dashboard = Dashboard;
const AdminDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Admin Dashboard verification");
    // check 
    const county_FileType = yield (0, exports.Caching_DropdownValues)();
    console.log("access granted");
    res.status(200).json({ county_FileType, message: 'Token Verified' });
});
exports.AdminDashboard = AdminDashboard;
const UploadData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Upload Data verification");
    const checkData = yield db_1.default.query('SELECT * FROM upload_meta_data', []);
    const DataRows = checkData.rows;
    console.log("🚀 ~ file: routes.ts:212 ~ UploadData ~ checkData:", DataRows);
    res.status(200).json({ DataRows, message: 'Token Verified' });
});
exports.UploadData = UploadData;
const NewUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'Token Verified' });
});
exports.NewUpload = NewUpload;
const FileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("requests recieved are : ",req)
    if (!req.files) {
        return res.status(400).send('No file uploaded or incorrect field name');
    }
    const { county, fileType, RowCount } = req.body; // Destructure county and fileType from the request body
    // Logging to check the received values
    console.log('County:', county);
    console.log('File Type:', fileType);
    console.log('RowCount:', RowCount);
    const actualCounty = JSON.parse(county);
    const actualFileType = JSON.parse(fileType);
    const actualRowCount = JSON.parse(RowCount);
    // Logging to check the actual data within the objects
    console.log('Actual County:', actualCounty);
    console.log('Actual File Type:', actualFileType);
    console.log('Actual Row  Present:', actualRowCount);
    const _file = req.files.file;
    const filename = _file.name;
    // unique file name
    const timestamp = Date.now();
    const fileExtension = filename.split('.').pop() || ''; // Extract file extension
    const uniqueFilename = `${filename}_${timestamp}.${fileExtension}`;
    console.log("file name is : ", filename);
    _file.mv(`${__dirname}/uploads/${uniqueFilename}`, err => {
        if (err) {
            return res.status(500).send(err);
            // console.log("Error at saving file : ",err)
        }
    });
    console.log("file uploaded and saved to server successfuly");
    // INSERTING METADATA INTO TABLE
    const upload_type = actualFileType.name;
    const upload_county = actualCounty.name;
    const upload_date = new Date();
    const upload_path = `uploads/${uniqueFilename}`;
    try {
        const upload_meta_data_id = 'upload_meta_data_id';
        yield db_1.default.query('INSERT INTO upload_meta_data (id,upload_date,upload_type,county,file_name,record_count,view_data) VALUES (nextval($1), $2, $3,$4,$5,$6,$7)', [upload_meta_data_id, upload_date, upload_type, upload_county, filename, RowCount, upload_path]);
        res.status(200).send('File uploaded successfully');
    }
    catch (e) {
        console.log("error present is at query execution of upload file : ", e);
        return res.status(500).send(e);
    }
});
exports.FileUpload = FileUpload;
const Foreclosure = (req, res) => {
    console.log("Foreclosure verification");
};
exports.Foreclosure = Foreclosure;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers.authorization;
    const tokenDetails = req.body.user;
    try {
        if (authToken) {
            const invd_id = 'ex_id';
            yield db_1.default.query('INSERT INTO expired_tokens(id,token) VALUES (nextval($1),$2)', [invd_id, authToken]);
            yield db_1.default.query('DELETE FROM accesstoken WHERE access_token = $1', [authToken]);
        }
        else {
            throw new Error('Authorization token is undefined');
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'No User Found' });
    }
});
exports.Logout = Logout;
// module.exports = {
//     Login, Logout, AdminDashboard, verifyToken, UploadData, Foreclosure, Dashboard, checkURLAccess, Caching
// };

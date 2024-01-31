// const express = require("express");
// const db = require('./db');
// const jwt = require("jsonwebtoken");
// const cors = require('cors');

import express from 'express';
import db from './db';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const app = express();

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

import { Caching } from './routes';
import { Caching_DropdownValues } from './routes';
import { Login } from './routes';
import { Logout } from './routes';
import { AdminDashboard } from './routes';
import { UploadData } from './routes';
import { verifyToken } from './routes';
import { Foreclosure } from './routes';
import { Dashboard } from './routes';
import { checkURLAccess } from './routes';
import {NewUpload} from './routes';
import {FileUpload} from './routes'
import fileUpload from 'express-fileupload';


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(fileUpload());

app.post('/login', Login)
// admin
app.get('/admin-dashboard', verifyToken, checkURLAccess, AdminDashboard)
app.get('/upload-data', verifyToken, checkURLAccess, UploadData)
app.get('/upload-data/new-upload', verifyToken, checkURLAccess,NewUpload)
app.post('/new-upload/file',FileUpload)
// user
app.get('/dashboard', verifyToken, checkURLAccess, Dashboard)
app.get('/foreclosure', verifyToken, checkURLAccess, Foreclosure)
app.get('/logout', verifyToken, checkURLAccess, Logout)


// caching code
// will store seed data-role id,url,url-type
Caching_DropdownValues();
Caching(); // runs for the first time at initiation of server
console.log("caching function execuuted")


const port = 8000;
app.listen(port, () => console.log(`server running on port ${port}`))



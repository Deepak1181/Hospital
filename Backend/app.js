import express from  'express';
import {config} from "./config";
 const app = express();






config({path:"./config"});
module.exports = app;







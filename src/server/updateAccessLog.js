import fs from 'fs'
import accessLogJson from './accessLog.json'
//import { defineEventHandler, readBody } from 'h3';
import { Request, Response } from 'express';

// expressについて
// https://qiita.com/fe_js_engineer/items/b052918f64b2df554d0f

export default defineEventHandler(async (event) => {
    if(accessLogJson.accessCount < accessLogJson.limitAccessCount){
        accessLogJson.accessCount = accessLogJson.accessCount + 1
        fs.writeFileSync("src/server/accessLog.json", accessLogJson, 'utf-8');
    }
    return { message: 'Success' };
});

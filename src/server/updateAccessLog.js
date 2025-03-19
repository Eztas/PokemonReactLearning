import fs from 'fs'
import accessLogJson from './accessLog.json'
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    if(accessLogJson.accessCount < accessLogJson.limitAccessCount){
        accessLogJson.accessCount = accessLogJson.accessCount + 1
        fs.writeFileSync("src/server/accessLog.json", accessLogJson, 'utf-8');
    }
    return { message: 'Success' };
});

import fs from 'fs'
import accessLogJson from './accessLog.json'

export const updateAccessLog = () => {
    if(accessLogJson.accessCount < accessLogJson.limitAccessCount){
        accessLogJson.accessCount = accessLogJson.accessCount + 1
        fs.writeFileSync("src/server/accessLog.json", accessLogJson, 'utf-8');
    }
}
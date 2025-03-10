import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises} from 'fs';
import * as path from 'path';
@Injectable()
export class LoggerService extends ConsoleLogger {
    async logToFile(entry) {
        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))){
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'logs.log'), entry)
        } catch(e) {
            if (e instanceof Error ) console.error(e.message)
        }
    }

    log(message: any, context?: string){
        const entry = `${context}\t${message}\n`

        this.logToFile(entry)
        super.log(message, context)
    }

    error(message: any, stackOrContext?: string){
        const entry = `${stackOrContext}\t${message}\n`

        this.logToFile(entry)
        super.error(message, stackOrContext)

        // Adding some dummy code
        console.log("")
    }
}

import sqlite from 'sqlite3';
import 'dotenv/config'
sqlite.verbose();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
class DB {
    static #db;

    static open() {
        if (this.#db == undefined) {
            const pathdb = path.resolve(path.dirname(__dirname) + '/database/'+process.env.DATABASE)
            this.#db = new sqlite.Database(pathdb, sqlite.OPEN_READWRITE | sqlite.OPEN_FULLMUTEX, (err) => {
                if (err) {
                    console.error(err.message);        
                } else {
                    console.log('Connection is ready!');
                }}
            );
        }
        return this.#db;
    }

    static close() {
        if (this.#db != undefined) {
            this.#db.close();
            this.#db = undefined;
        }
    }
}

export default DB;
import { ConfigModel } from "../config/config.model";
import { Database } from "sqlite3"
import { EventModel } from "../event.model";

const _queries = {
    create: "create table if not exists event (id integer primary key, createdAt integer, tag text, mgroup text, meta_data text)",

}

export class DbManager {
    config: ConfigModel
    db: Database
    constructor(config: ConfigModel) {
        this.config = config
    }

    async init() {
        this.db = new Database(`${this.config.file.split('.')[0]}.db`)
        await this.execute(_queries.create)
    }

    async insert(event: EventModel) {
        const q = 'insert into event (createdAt, tag, mgroup, meta_data) values (?,?,?,?)'
        const { createdAt, tag, group, metaData } = event.dto()
        await this.execute(q, [createdAt, tag, group, metaData])
    }

    async execute(sql: string, params?: (Date | number | string)[]): Promise<void> {
        if (params && params.length > 0) {
            return new Promise((resolve, reject) => {
                this.db.run(sql, params, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        }
        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    };


}
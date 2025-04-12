import { ConfigLoader } from "./config/config.loader"
import { DbManager } from "./db/db.manager"
import { EventModel, MetaData } from "./event.model"

export class App {
    configLoader: ConfigLoader
    dbManager: DbManager

    async loadConfig() {
        this.configLoader = new ConfigLoader("src/config/prasoon.config.json")
        await this.configLoader.init()
    }

    async setupDb() {
        this.dbManager = new DbManager(this.configLoader.data)
        await this.dbManager.init()
    }


    async generator(count: number, createdAt?: Date, tag?: string, group?: string, page?: string, element?: string) {
        for (let i = 0; i < count; i++) {
            const dataRef = this.configLoader.data;
            const event = new EventModel(
                createdAt ?? Date.now(),
                tag ?? dataRef.chooseTag(),
                group ?? dataRef.chooseGroup(),
                new MetaData(
                    page ?? dataRef.choosePage(),
                    element ?? dataRef.chooseElement()
                )
            )
            await this.dbManager.insert(event)
        }
    }
}



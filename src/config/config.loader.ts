import { ConfigModel } from "./config.model";
import { readFile } from 'fs/promises'

export class ConfigLoader {
    configPath: string
    data: ConfigModel

    constructor(configPath: string) {
        this.configPath = configPath;
    }


    async init() {
        const file = await readFile(this.configPath, 'utf8')
        const parsed = JSON.parse(file)
        this.data = new ConfigModel(parsed, this.configPath)
    }
}
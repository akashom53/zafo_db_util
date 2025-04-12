import { App } from "./app"

const script = async () => {
    console.log("Starting scripts")

    const app = new App()
    await app.loadConfig()
    await app.setupDb()
    await app.generator(10)
}

script()
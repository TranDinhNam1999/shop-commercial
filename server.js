const app = require("./src/app");
const { app: { port } } = require("./src/config/config.mongodb")

const server = app.listen(port, () => {
    console.log(`server start with ${port}`)
})

process.on('SIGINT', () => {
    server.close( () => console.log(`Exit Server Express`))
})
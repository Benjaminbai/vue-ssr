const express = require('express')
const server = express()
const createApp = require('./app')
const vueRenderer = require('vue-server-renderer')
const fs = require('fs')
// const renderer = vueRenderer.createRenderer()
const rendererTmp = vueRenderer.createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
})

server.get('/template', (request, response) => {
    const context = { url: request.url }
    const app = createApp(context)
    rendererTmp.renderToString(app, (err, doc) => {
        if (err) throw err
        response.send(doc)
    })
})

server.listen(8000)
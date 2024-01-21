const http = require('http')

let requestCount = 0

const server = http.createServer((request, response) => {
    requestCount++

    switch (request.url) {
        case '/students':
            response.write('Students')
            break
        case '/courses':
            response.write('Front + Back')
            break
        default:
            response.write('404 Not found')
    }

    response.write(' Request Count: ' + requestCount)
    response.end()
})

server.listen(3003)

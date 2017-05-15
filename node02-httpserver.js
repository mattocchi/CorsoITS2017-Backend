var serverhttp = require("http");
const port = 8000;

serverhttp.createServer(function (request, response) {
    console.log("arrivata una richiesta http");
    // aggiungiamo un header alla response
    response.writeHead(200, {'content-type': 'text/plain'});
    response.end("Risposta dal server web NODE");
})  .listen(port);

console.log(`Server HTTP avviato sulla porta ${port}`);
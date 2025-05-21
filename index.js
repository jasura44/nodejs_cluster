const cluster = require('cluster');
const http = require('http');
const os = require('os');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Master process
    console.log(`Master process ${process.pid} is running`);

    // Fork workers based on CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Log when a worker dies
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Worker processes
    http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(3000, () => {
    console.log(`Worker process ID: ${process.pid} is listening on port 3000`);
  });
    console.log(`Worker ${process.pid} started`);
}
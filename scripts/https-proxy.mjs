import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const key = fs.readFileSync(path.join(rootDir, 'storage/certs/local-key.pem'));
const cert = fs.readFileSync(path.join(rootDir, 'storage/certs/local-cert.pem'));

const TARGET_HOST = '127.0.0.1';
const TARGET_PORT = 8010;
const LISTEN_PORT = 8443;

const server = https.createServer({ key, cert }, (clientReq, clientRes) => {
    const headers = { ...clientReq.headers };
    headers['x-forwarded-proto'] = 'https';
    headers['x-forwarded-host'] = clientReq.headers.host || `192.168.1.38:${LISTEN_PORT}`;
    headers['x-forwarded-port'] = String(LISTEN_PORT);
    headers['x-forwarded-for'] = clientReq.socket.remoteAddress || '127.0.0.1';

    const proxyReq = http.request(
        {
            hostname: TARGET_HOST,
            port: TARGET_PORT,
            path: clientReq.url,
            method: clientReq.method,
            headers,
        },
        (proxyRes) => {
            clientRes.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
            proxyRes.pipe(clientRes, { end: true });
        }
    );

    proxyReq.on('error', (err) => {
        if (!clientRes.headersSent) {
            clientRes.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
        }
        clientRes.end(`Upstream proxy error: ${err.message}`);
    });

    clientReq.pipe(proxyReq, { end: true });
});

server.listen(LISTEN_PORT, '0.0.0.0', () => {
    console.log(`HTTPS proxy listening on https://0.0.0.0:${LISTEN_PORT} -> http://${TARGET_HOST}:${TARGET_PORT}`);
});

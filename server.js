
const express = require('express');

const server = express();
const port = 3000;

server.set('port', port);

server.use(express.static(__dirname));

server.all('*', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

const ip = '192.168.2.229';

server.listen(server.get('port'), ip, () =>
  console.log(`server listening on port ${server.get('port')}`));

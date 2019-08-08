const express = require('express');

const app = express();

app.use(express.static('public'));

console.log("server listening port localhost:4000");

app.listen(4000);


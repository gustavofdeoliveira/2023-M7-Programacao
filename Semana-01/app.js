const express = require('express'); 
const app = express();

const hostname = '0.0.0.0';
const port = 80;
app.use(express.static("./frontend/"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//Initialize express router
const express = require('express'); 
const app = express();

//Set default API response
const hostname = '0.0.0.0';
const port = 80;
//Import the frontend
app.use(express.static("./frontend/"));
// start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
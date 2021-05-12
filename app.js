const express  = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

//Using initalization the app//
const app = express();

//Using the decoding to http security
app.use(cors);

//Deconding property the body in web browser
app.use(bodyParser.json() );
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 3000; 

app.get("/", (request, response) =>{
        response.send("Hola mundo")
});

app.listen(PORT, ()=> {
        console.log(`Server running in: http://localhost:${PORT}`);
});
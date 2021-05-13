const express  = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRouters = require('./app/routers/todos.js');
const PORT = 5000; 

//Using initalization the app//
const app = express();

//Using the decoding to http security
app.use(cors() );

//Deconding property the body in web browser
app.use(bodyParser.json() );

//To link the app.js with router module
app.use("/todos", todosRouters)



// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", (request, response) =>{
        console.log("Hello world");
        response.send("Hola mundo"); 
});

app.listen(PORT, ()=> {
        console.log(`Server running in: http://localhost:${PORT}`);
});
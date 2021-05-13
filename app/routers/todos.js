const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Note  =  require('../models/todo.model.js');


router.get("/",   async ( req, res)  => {
        const notes  = new Note({});
        res.send( await notes.findAll()); 
})

router.post( "/", (req, res) => {
        const note  = new Note({});
        const id =  uuidv4();
        note.create(  { ["idnotes"]: id , ...req.body}  )    
        res.send(true); 
})

router.delete("/:id", (req, res) =>{
        const  {id} = req.params;
        const note = new Note({}); 
        note.removeID( id );
        res.send( `Data with  ${id} was deleted ` );
})

router.put( "/:id", ( req, res) =>{
        const note = new Note( {} );
        const  {id} = req.params;
        const { title,  body } = req.body; 
        if(title){
                note.updateTitle( id,  title)
        }
        if(body){
                note.updateBody( id, body);
        }
        res.send( `Data with  ${id} was put ` );
})

module.exports = router;




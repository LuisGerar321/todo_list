const sql = require("./db.js");

// constructor
const Note = function(note) {
        this.idnotes = note.idnotes;
        this.title = note.title;
        this.body = note.body;
};


const table = "notes";


Note.prototype.create = (newNote) =>{

        sql.query( `INSERT INTO ${table} SET ?`, newNote, (err, res) => {
                if (err) {
                        console.log("The Note Title or Note ID has alrready exist, try again...");
                        return;
                }
                console.log("created note: ", {...newNote });
        });

        
};




Note.prototype.findID = ( noteID,noteTitle , noteAuthor  )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table} WHERE idnotes = '${noteID}' OR title =  '${noteTitle}' OR body  = '${noteAuthor}'`,  (err, res)=>{
                        if(err){
                                // console.log("error: ", err);
                                console.log("Customer not found customer: ");
                                resolve(true);
                        }
                        //If I found the element
                        if(res.length){
                                this.title =  res[0].title;
                                this.body =  res[0].body;
                                this.idnotes =  res[0].idnotes;
                                console.log("found customer: ");
                                resolve(true);
                        }else{
                                this.idnotes =  null;
                                this.title =  null;
                                this.body =  null;

                                console.log("Customer not found customer: ");
                                resolve([]);
                        }
                });
        })
}

Note.prototype.findAll = ( )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table}`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        //If I found the element
                        if(res.length){
                                console.log("notes: ",  res );
                                
                                const result = res.reduce( (accu = [], element)=> {
                                        accu =  [...accu].concat(element);
                                        return accu;
                                }, [])
                                console.log( result);
                                resolve(result);
                        }else{
                                this.idnotes =  null;
                                this.title =  null;
                                this.body =  null;
                                resolve([])
                        }
                });
        })

}

Note.prototype.getAtributes =  () => {
        return { 
                idnotes: this.idnotes,
                title:   this.title,
                body: this.body,

        };
}

Note.prototype.removeID =  ( idnotes) =>{
        return new Promise((resolve, reject) =>{
                sql.query( `DELETE FROM ${table} WHERE idnotes = '${idnotes}'`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });
        });
}

Note.prototype.removeAll=  ()=>{
        return new Promise( (resolve, reject) => {
                sql.query(`DELETE FROM ${table}`, (err,res) => {
                        if(err){
                                resolve(false);
                        }
                        resolve(true);
                })
        }) 
}

Note.prototype.updateTitle = (idnotes, title)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET title = '${title}' WHERE idnotes = '${idnotes}'`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });

        });
}

Note.prototype.updateBody = (idnotes, body)=>{
        return new Promise( (resolve, reject)=> {
                sql.query( `UPDATE ${table} SET body = '${body}' WHERE idnotes = '${idnotes}'`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                }); 
        });
}

module.exports = Note;

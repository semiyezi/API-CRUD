const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");


//initialisation du serveur
const app=express();

//connexion de la base de données
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'semia',
    password : 'root',
    database : 'test1'
  });
   
  connection.connect((erreur)=>{
    if (erreur) {
        throw erreur;
    }
    console.log('la connexion est établie')
    
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//routes

//1.récupération de tout les users

app.get('/api/users',(req,res)=>{
    connection.query('select * from user',(err,result)=>{
        if(err)
         throw err;
         return res.send(result);
    })
})

//2.récupération d'un utilisateur

app.get('/api/users/:id',(req,res)=>{
    connection.query(`select * from user where id=${req.params.id}` ,(err,result)=>{
        if(err)
        throw err;
        return res.send(result); 
    })
})

//3.modification d'un utilisateur

app.put('/api/users/:id',(req,res)=>{
    connection.query(`update user set nom="${req.body.nom}", postnom="${req.body.postnom}",age="${req.body.age}" where id=${req.params.id} `,(err,result)=>{
        if(err)
        throw err;
        return res.send(result); 
    })
})
//4.suppression d'un utilisateur

app.delete('/api/users/:id',(req,res)=>{
    connection.query(`delete from user where id=${req.params.id} `,(err,result)=>{
        if(err)
        throw err;
        return res.send(result); 
    })
})
//5.céartion d'un utilisateur
app.post('/api/users',(req,res)=>{
    connection.query(`insert into user(nom,postnom,age) values ("${req.body.nom}","${req.body.postnom}","${req.body.age}")`,(err,result)=>{
        if(err)
        throw err;
        return res.send(result); 
    })
})






  const port=5000;
  app.listen(port,function(){
      console.log(`le serveur écoute sur ce port ${port}`)
  })
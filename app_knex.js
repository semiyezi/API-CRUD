const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");

const app=express();


//connexion de la base de données

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'semia',
      password : 'root',
      database : 'test1'
    }
  });

  
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//récuperation tout des utilisateurs
app.get('/api/users',(req,res)=>{
    knex.select().from('user').then((result)=>{
       
         return res.send(result);
    })
})
//récuperation d'un utilisateur
app.get('/api/users/:id',(req,res)=>{
    knex.select().from('user').where({ id:req.params.id }).then((result)=>{
       
         return res.send(result[0]);
    })
})


//3.modification d'un utilisateur

app.put('/api/users/:id',(req,res)=>{
knex('user').where({id:req.params.id}).update({
    nom:req.body.nom,
    postnom:req.body.postnom,
    age:req.body.age
  }).then(()=>{
    return res.send({message:'utilisateur modifié avec succès'});
})
})



//4delete
app.delete('/api/users/:id',(req,res)=>{
    knex('user')
    .where('id', req.params.id)
    .del().then(()=>{
      return res.send({message:'utilisateur supprimé avec succès'});
  })
  })

//middleware de validation
const Validation=function(req,res,next){
  const{nom,postnom,age}=req.body

  if(!nom.length || !postnom.length || !age.length){
      return res.status(400).send("Tout les champs sont obligatoires");
  }
      else if(isNaN(age)){
      return res.status(400).send("L'âge doit être un nombre");
      }
      next();
  }
  //5 creer un utilisateur
  app.post('/api/users/', Validation,(req,res,)=>{
    knex('user').insert({
        nom:req.body.nom,
        postnom:req.body.postnom,
        age:req.body.age
      }).then(()=>{
        return res.send({message:'utilisateur ajouté avec succès'});
    })
    })
    



const port=5000;
app.listen(port,function(){
    console.log(`le serveur écoute sur ce port ${port}`)
}) 
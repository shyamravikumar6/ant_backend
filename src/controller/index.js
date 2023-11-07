const jwt = require('jsonwebtoken');
const {loginSchema,addUsersSchema,editUsersSchema}= require('../validation');
const Environment = require('../envrionment');
const envrionment = require('../envrionment');
const {customQuery} = require('../db');
class Controller{
    
    authorizationMiddleWare(req,res,next){
      if(!req.headers.token)res.status(401).send("Unauthorized");
      const token = req.headers.token.replace('Bearer','');
         
      jwt.verify(token,Environment.secert_key,function(err,decoded){
        if(err){
          return res.status(401).send(err.name);
        }
        res.req.email = decoded.email;
        next();
      })
      
           
    }
    async deleteUser(req,res){
      console.log(req.body,'-----');
        const {id}  = req.query;
        
        try {
            await customQuery(`delete from users where id='${id}'`);
          res.status(200).json({msg:'user deleted successfully'});
        } catch (error) {
          res.status(500).json({msg:error.message||"internal db error"});
        }
    }

    async editUser(req,res){
      const editBody = req.body;
      try {
          const id = editBody.id;
          delete editBody.id;
          const updateString = Object.keys(editBody).map(el=>`${el} ='${editBody[el]}'`).join(",");
         console.log(updateString,`update users set ${updateString} where id = ${id}`);
          await customQuery(`update users set ${updateString} where id = ${id}`)
          .then(success=>{
            res.status(200).json({msg:'user has been upadated successfully'})
          })
         .catch(err=>{
          console.log(err);
          res.status(500).json({msg:err.message})
        
         });
         console.log('1');
         
      } catch (error) {
        res.status(400).json({msg:error.message|| "Bad request"});
      }
    }

    async login(req,res){
      try {
        const loginBody = req.body;
        const valueRes =  await loginSchema(loginBody);
        const token = jwt.sign({email:valueRes.email},envrionment.secert_key,{algorithm:'RS256',expiresIn:'1d'});
        res.status(200).json({token});
      } catch (error) {
         res.status(400).json({error:error.message||error.name})
      }
    }
    async getAllUsers(req,res){
      try {
        
        const users = (await customQuery('select * from users')).rows;
        res.status(200).json({users})
      } catch (error) {
        res.status(500).json({error:"Db internal error"});
      }
    }

    async addUser(req,res){
      try {
         const userBody = req.body;
        // console.log(userBody);
         const userBodyRes = await addUsersSchema(userBody);
         // userBodyRes.image;
         const keys = Object.keys(userBodyRes).join(',');
         const values = Object.values(userBodyRes).map(el=>`'${el}'`).join(',');
        // console.log(values);
         const query=`insert into users (${keys}) values (${values}) `;
       //  console.log(query);
         customQuery(`insert into users (${keys}) values (${values}) returning *`).then(res1=>{
           if(res1&&res1.rows){

              res.status(200).json({user:res1.rows[0]});
              return;
           }
           
         }).catch(e=>{
          res.status(500).json({error:e.message || "Internal db error"});
         })
      } catch (error) {
         res.status(400).json({error:error.message|| error.name});
      }
    }

}

module.exports = Controller;
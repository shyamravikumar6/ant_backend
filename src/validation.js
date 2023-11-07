const Joi = require('joi');

 const loginSchema=(loginBody)=>{
   const schema = Joi.object({
     email:Joi.string().email().required(),
     password:Joi.string().required()
   })

    return schema.validateAsync(loginBody); 
}

 const  addUsersSchema=(userBody)=>{
    const schema = Joi.object({
      name:Joi.string().required(),
      email:Joi.string().email().required(),
      mobile:Joi.number().required(),
      age:Joi.number().less(101).greater(9).required(),
      image:Joi.string().required()
    })
 
     return schema.validateAsync(userBody); 
 }


 const editUsersSchema=(userBody)=>{
        
 }

 module.exports={loginSchema,addUsersSchema,editUsersSchema};
const Controller = require('../controller');

class Routes {
App;
constructor(app){

this.controller=new Controller();
//this.route();


}

route(app){
  app.post('/login',this.controller.login);
 // this.App.use(this.controller.authorizationMiddleWare);
  app.get('/users',this.controller.getAllUsers);
  app.put('/users',this.controller.editUser);
  app.delete('/users',this.controller.deleteUser);
 app.post('/users',this.controller.addUser);
}


};

module.exports= Routes;
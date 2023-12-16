const app = require('express')
const route = app.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const { loginRequired } = require('./src/middleware/middleware')
// Rotas da home
route.get('/', homeController)
// Rotas de login 
route.get('/login', loginController.index)
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.get('/login/logout',loginController.logout)
/* Rotas de contato */
route.get('/contato',loginRequired, contatoController.index)
route.post('/contato/register',loginRequired, contatoController.register)
route.get('/contato/:id',loginRequired, contatoController.updateIndex)
route.post('/contato/edit/:id',loginRequired, contatoController.edit)
route.get('/contato/delete/:id',loginRequired, contatoController.delete)


module.exports = route;
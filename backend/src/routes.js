const { Router } = require('express');
const DevController = require('./app/controllers/DevController');
const SearchController = require('./app/controllers/SearchController');
const AuthController = require('./app/controllers/AuthController');
const AuthMiddleware = require('./app/middleware/auth');

const routes = Router();

routes.post('/authenticate', AuthController.index);
routes.post('/register', AuthController.store);
routes.get('/activeUser/:tokenConfirmRegister', AuthController.active);
routes.put('/activeUser/:tokenConfirmRegister', AuthController.update);
routes.get('/search', SearchController.index);

routes.use(AuthMiddleware);

//Rotas padroes sugeridas
//index, show, store, update, destroy
routes.get('/getById/:id', AuthController.getById);

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/getDevByGitHubUserName/:github_username', DevController.getDevByGitHubUserName);
routes.put('/devs/:userId', DevController.update);

module.exports = routes;

//metodos http: get, post, put, delete

//tipos de parâmetros:
//Query params: request.query (Filtros, ordenação, paginação, ...)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criacao ou alteracao de um registro)
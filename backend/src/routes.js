const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Rotas padroes sugeridas
//index, show, store, update, destroy

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;

//metodos http: get, post, put, delete

//tipos de parâmetros:
//Query params: request.query (Filtros, ordenação, paginação, ...)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criacao ou alteracao de um registro)
const express = require('express'); // importante o express
const { celebrate, Joi, Segments } = require('celebrate');

const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController')
const routes = express.Router(); // estou desacoplando o módulo de rotas do express em uma nova váriavel. 
const sessionController = require('./controllers/sessionController');

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);//lista incidentes
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create); // criar ong

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

}), profileController.index); //listar todos os casos da ong

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentsController.index);//lista incidentes

routes.post('/incidents', incidentsController.create); // cria os casos

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentsController.delete);//deleta incidente
module.exports = routes; // exportar essas rotas para o index

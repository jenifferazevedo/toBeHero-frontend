const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');



const routes = express.Router();
//Rota de sessão
routes.post('/session', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}) ,SessionController.create);

//Rota para ver ongs cadastradas
routes.get('/ongs', OngController.index);

routes.get('/ongs', OngController.list);


//Rota para criar ongs
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

//Rota para validar se a ONG está cadastrada e ir ao perfil
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileController.index);

//Rota para ver todos os casos (estão para aparecer em paginas com 5 casos cada)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),IncidentController.index);

//Rota para criar novo caso
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.string().required()
  })
}),IncidentController.create);

//Rota para deletar caso
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),IncidentController.delete);

routes.delete('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}),ProfileController.delete);
module.exports = routes;
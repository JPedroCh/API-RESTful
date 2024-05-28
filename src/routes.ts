import { Router } from "express";
import { makeCreateNewsController } from "./api/controllers/createNews";
import { adaptExpressRoute } from "./api/adapters/express-router";
import { makeListNewsController } from "./api/controllers/listNews";

const routes = Router()

routes.post('/create', adaptExpressRoute(makeCreateNewsController()))
routes.get('/list', adaptExpressRoute(makeListNewsController()))

export default routes;
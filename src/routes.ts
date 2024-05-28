import { Router } from "express";
import { makeCreateNewsController } from "./api/controllers/createNews";
import { adaptExpressRoute } from "./api/adapters/express-router";
import { makeListNewsController } from "./api/controllers/listNews";
import { makeUpdateNewsController } from "./api/controllers/updateNews";
import { makeDeleteNewsController } from "./api/controllers/deleteNews";

const routes = Router()

routes.post('/create', adaptExpressRoute(makeCreateNewsController()))
routes.get('/list', adaptExpressRoute(makeListNewsController()))
routes.put('/update', adaptExpressRoute(makeUpdateNewsController()))
routes.delete('/delete', adaptExpressRoute(makeDeleteNewsController()))

export default routes;
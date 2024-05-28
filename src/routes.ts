import { Router } from "express";
import { makeCreateNewsController } from "./api/controllers/createNews";
import { adaptExpressRoute } from "./api/adapters/express-router";

const routes = Router()

routes.post('/create', adaptExpressRoute(makeCreateNewsController()))

export default routes;
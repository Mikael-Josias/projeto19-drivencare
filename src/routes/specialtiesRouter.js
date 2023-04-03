import validateSchemasMiddleware from "../middlewares/validateSchemasMiddleware.js";
import specialtiesController from "../controllers/specialtiesController.js";
import schemas from "../schemas/index.js";
import { Router } from "express";

const router = Router();

router.post("/create", validateSchemasMiddleware(schemas.specialtySchema), specialtiesController.create);

export default router;
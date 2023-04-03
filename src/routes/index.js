import specialtiesRouter from "./specialtiesRouter.js";
import { Router } from "express";

const router = Router();

router.use("/specialties", specialtiesRouter);

export default router;
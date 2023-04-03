import specialtiesRouter from "./specialtiesRouter.js";
import doctorsRouter from "./doctorsRouter.js";
import clientsRouter from "./clientsRouter.js";
import { Router } from "express";

const router = Router();

router.use("/specialties", specialtiesRouter);
router.use("/doctors", doctorsRouter);
router.use("/clients", clientsRouter);

export default router;
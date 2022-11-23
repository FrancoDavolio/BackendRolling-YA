import { Router } from "express";
import { check } from "express-validator";

const router = Router()

router.route("/").post(login);
router.route("/nuevo").post(crearUsuario);

export default router;


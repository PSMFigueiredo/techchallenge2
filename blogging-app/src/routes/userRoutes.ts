
import {Router} from "express";
import {getUserProfile, loginUser, registrarUsuario} from "../controllers/userController";
import {protect} from "../middleware/auth";


const router: Router = Router();
router.get('/', protect, getUserProfile);
router.post('/', registrarUsuario);
router.post('/', loginUser);





export default router
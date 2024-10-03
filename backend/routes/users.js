import { Router } from 'express';
import { SignupCustomer, LoginCustomer } from '../controllers/users.js'; // Ensure the correct path and .js extension

const router = Router();

router.post('/signup', SignupCustomer);
router.post('/login', LoginCustomer);

export default router;

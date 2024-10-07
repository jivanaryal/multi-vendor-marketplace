import { Router } from 'express';
import { SignupCustomer, LoginCustomer, getAllUsers } from '../controllers/users.js'; // Ensure the correct path and .js extension
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.post('/signup', SignupCustomer);
router.get("/all",getAllUsers)
router.post('/login', LoginCustomer);
router.post('/validate-token', verifyToken, (req, res) => {
      return res.status(200).json({ valid: true, user: req.user });
})

export default router;

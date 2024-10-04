import db from "../database/connect.js";
import { createUser } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//signup page
const SignupCustomer = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'please provide all required fields' });
    }

     try {
       
    const exisitingEmail = await db`select * from users where email = ${email}`
       
    if (exisitingEmail != 0) {
        return res.status(400).json({ error: 'the user is already register' });
    } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        console.log(secPass)
         const result = await createUser(fullname, email, secPass);
        res.status(200).json({ message: 'User Created Successfully', user: result[0] });
       }
       
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: 'Database error occurred' });
    }
};

//login
const LoginCustomer = async(req, res) => {
    const { email, password } = req.body;

    try {
         const result = await db`
      SELECT * FROM users WHERE email = ${email}`;
    
    const user = result[0];

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
         return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({token});
  


    } catch (error) {
         console.error('Error logging in:', error);
       return res.status(500).json({ message: 'Server error' });
    }

};

// Use named exports
export { SignupCustomer, LoginCustomer };

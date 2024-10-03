// controllers/users.js
const SignupCustomer = (req, res) => {
    res.send("let's signup for tomorrow");
};

const LoginCustomer = (req, res) => {
    res.send("let's login tomorrow");
};

// Use named exports
export { SignupCustomer, LoginCustomer };

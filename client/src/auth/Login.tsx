import { useState } from "react";

type Props = { 
    email: string;
    password: string;
    role: string;
}





const Login = ({email,password,role}: Props) => {
    const [formData, setFormData] = useState({ email: "", password: "", role: "" });



    const handleSubmit = (event:Event) => {
    event.preventDefault();
        console.log("handling form data");
        console.log(formData.email)
        console.log(formData.password)
        console.log(formData.role)
}

const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const name = event.currentTarget.name;
    setFormData({...formData,[name]:newValue})
  
     
      
}
  return (
      <form>
          
       <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="eg:harry@gmail.com" required onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="enter you password" onChange={handleChange} required />

          <label htmlFor="role">Role</label>
          <select name="role" id="role" onChange={handleChange} required>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
          </select>

          <input type="submit" value="submit" onClick={handleSubmit} />
   



      </form>
  )
}

export default Login
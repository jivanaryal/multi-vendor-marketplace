import { useForm, SubmitHandler } from 'react-hook-form';
import LoginImage from "../assets/images/signup.jpg"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormField } from './LoginFormField';



const formValidationSchema = yup.object({
 
  
  email: yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});



type IFormInput = {
  
    email: string;
    password: string;
}

const LoginOption = [
  {
    icons:<FcGoogle />,
    title:"Sign in with Google"
  },
  {
    icons:<FaApple />,
    title:"Sign in with Apple"
  }
]



const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm<IFormInput>({
    resolver:yupResolver(formValidationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <section className='container grid grid-cols-2'> 
      <section className="flex justify-center flex-col items-center h-full w-full ">
        <div className='flex justify-center items-center w-full'>
          <h1 className='font-semibold text-[30px] mb-14'>Welcome Back !</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] md:min-w-[500px]'>
          {LoginFormField.map((formField, index) => {
            return (
              <div key={index}>
                <label htmlFor={formField.labelName} className='capitalize font-medium text-sm'>{formField.labelName}</label> <br />
                <input {...register(formField.name)} type={formField.type} placeholder={formField.placeholder} className='border-[1px] py-1 text-sm px-2  rounded-lg w-full focus:ring-green-600 focus:outline-none' />
                {/* displaying error message here  */}
                {errors[formField.name] && (
                  <p className='text-red-600 text-xs font-semibold'>{errors[formField.name]?.message}</p>
          
                )}

                <div className='mt-2'></div>
             </div>
            )
          })}
          <input type='submit' value="login" className='w-full cursor-pointer bg-green-700 hover:bg-green-800  text-white font-bold text-sm py-2 rounded-md' />
          <hr className='text-black'/>
          <div className='grid grid-cols-2 gap-4 mt-10'>
          {LoginOption.map((option, index) => (
            <div key={index} className=''>
              <div className='flex items-center hover:scale-105 transition-all duration-150 delay-75 border-2 px-3 py-2 cursor-pointer rounded-full justify-center'>
                <div className="icons">{option.icons}</div>
                <div className="text-xs ml-1 font-semibold  rounded">{option.title}</div>
              </div>
            </div>
          ))}
                     <div className='flex w-full justify-center min-w-[600px] items-center'>
  <h1 className='text-sm font-semibold text-center  w-full'>
    Don't have an account? <a href="#" className='text-blue-500'>Sign Up</a>
  </h1>
</div>

                      </div>
                      
        </form> 
      </section>
      <section className="right">
          <img src={LoginImage} alt=""  className='h-full object-cover min-h-screen' />
      </section>
      </section>
  )
}

export default Login
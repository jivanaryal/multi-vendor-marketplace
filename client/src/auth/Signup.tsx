import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupFormField } from './SignupFormField';
import LoginImage from "../assets/images/login_image.jpg"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";



type IFormInput = {
    user_id: number;
    fullname: string;
    email: string;
    password: string;
    role: 'user'|'vendor';
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



const Signup = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <section className='grid grid-cols-2'>
      <section className="flex justify-center flex-col items-center h-full ">
        <div className='flex justify-center items-center'>
          <h1 className='font-semibold text-[30px] mb-14'>Get Started Now</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] md:min-w-[500px]'>
          {SignupFormField.map((formField, index) => {
            return (
              <div key={index}>
                <label htmlFor={formField.labelName} className='capitalize font-medium text-sm'>{formField.labelName}</label> <br />
                <input {...register} type={formField.type} placeholder={formField.placeholder} className='border-[1px] py-1 text-sm px-2  rounded-lg w-full focus:ring-green-600 focus:outline-none' />
                <br />  <br />
             </div>
            )
          })}
          <input type='submit' value="signup" className='w-full cursor-pointer bg-green-700 hover:bg-green-800  text-white font-bold text-sm py-2 rounded-md' />
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
            </div>
        </form> 
      </section>
      <section className="right">
          <img src={LoginImage} alt=""  className='h-full object-cover min-h-screen' />
      </section>
      </section>
  )
}

export default Signup
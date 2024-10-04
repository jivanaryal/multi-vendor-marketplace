

type Props = {
    user_id: number;
    fullname: string;
    email: string;
    password: string;
    role: string;
}

const Signup = ({user_id,fullname,email,password,role}: Props) => {
  return (
      <div>
          <h1>Signup Page</h1>
    </div>
  )
}

export default Signup
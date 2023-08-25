import { createUser } from "@/functions/prisma/user";
import RegisterForm from "./form";

export default function Register() {

  return (
    <div className="flex flex-col justify-center h-screen w-1/3 m-auto">
      <h1 className="font-bold text-2xl mb-5">Register</h1>
      <RegisterForm createUser={createUser} />
    </div>
  )
}
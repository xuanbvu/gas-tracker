import LoginForm from "./form";

export default function Login() {
  return (
    <div className="flex flex-col justify-center h-screen w-1/3 m-auto">
      <h1 className="font-bold text-2xl mb-5">Sign In</h1>
      <LoginForm />
    </div>
  )
}
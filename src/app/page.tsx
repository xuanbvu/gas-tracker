import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOutForm from "@/components/SignOutForm";

export default function Home() {
  const signedIn = cookies().get('gas-tracker-sign-in')

  if (signedIn) {
    return (
      <>
        <h1>Hello {signedIn.value}</h1>
        <SignOutForm />
      </>
    )
  }

  redirect('/sign-in')
}

import { LogoutButton } from "../auth"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NavLinks } from "./navlinks"

type LayoutProps = {
  children?: React.ReactNode
}

export async function Layout({ children } : LayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="w-1/6 h-screen fixed flex flex-col px-6 py-5 gap-5 bg-white drop-shadow-xl">
        <h1 className="font-medium text-lg">Hello {session?.user.username}</h1>
        <hr className="border-gray-500" />
        <NavLinks />
        <LogoutButton style={'mt-auto text-left hover:text-orange-700'} />
      </div>
      <div className="flex">
        <div className="w-1/6" />
        <div className="w-5/6">
          <main className="w-11/12 mx-auto my-14">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
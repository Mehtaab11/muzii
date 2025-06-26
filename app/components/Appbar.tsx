"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = () => {

    const session = useSession()

    return (
        <nav className="flex items-center justify-between px-10 py-4">
            <div>Muzii</div>
            <div>
                {session.data?.user ? <button className="m-2 p-2 text-white rounded-md     bg-blue-700" onClick={() => signOut()} >Log out</button> : <button className="m-2 p-2 text-white rounded-md     bg-blue-700" onClick={() => signIn()} >Sign in</button>
                }

            </div>
        </nav >
    )
}

"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Music } from "lucide-react"
export const Appbar = () => {

    const session = useSession()

    return (
        <nav className="flex w-full items-center justify-between px-10 py-8">
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Music className="h-5 w-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white">Muzii</span>
            </Link>

            <div>
                {session.data?.user ? <button className="m-2 p-2 text-black rounded-md    bg-gradient-to-r from-emerald-400 to-cyan-400" onClick={() => signOut()} >Log out</button> : <button className="m-2 p-2 text-black rounded-md    bg-gradient-to-r from-emerald-400 to-cyan-400" onClick={() => signIn()} >Sign in</button>
                }

            </div>
        </nav >
    )
}

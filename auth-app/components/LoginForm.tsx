'use client'

import React from 'react'
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true)

        try {
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res?.error) {
                setError("Incorrect email or password");
                setLoading(false)
                return
            }

            router.replace('dashboard')
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-300">
                <h1 className=" text-center text-2xl font-bold">Тестовое задание NextJS</h1>
                <h1 className="text-xl font-bold my-4">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    )}
                    {loading ? <Loader/> :
                        <button
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Login
                        </button>
                    }
                    <Link className="text-sm mt-3 text-center" href={'/register'}>
                        Don't have an account? <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
export default LoginForm

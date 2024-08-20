'use client'

import React from 'react'
import Link from "next/link";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";

const RegisterForm = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        if (!name || !email || !password) {
            setError('All fields are required!');
            setLoading(false)
            return
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            })

            const { user } = await resUserExists.json();

            if(user) {
                setError("User already exists!");
                setLoading(false)
                return
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            })

            if (res.ok) {
                const form = e.target as HTMLFormElement;
                form.reset()
                router.push("/")
                setLoading(false)
            } else {
                console.log("User registration failed!")
                setLoading(false)
            }
        } catch (error) {
            console.log("Error during registration: ", error);
            setLoading(false)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-300">
                <h1 className=" text-center text-2xl font-bold">Тестовое задание NextJS</h1>
                <h1 className="text-xl font-bold my-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="Name"/>
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    )
                    }
                    {loading ? <Loader/> :
                        <button
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Register
                        </button>
                    }
                    <Link className="text-sm mt-3 text-center" href={'/'}>
                        Already have an account? <span className="underline">Sign In</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
export default RegisterForm

import React from 'react'
import Image from 'next/image'
import LogoName from '../../public/LogoName.png'
import Head from 'next/head'
import Link from 'next/link'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function Login() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    // Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            route.push('/home');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user) {
            route.push('/home')
        } else {
            console.log('login')
        }
    }, [user]);
    return (
        <div>
            <Head>
                <title>Login | Notz</title>
                <link rel="icon" href="/LogoIcon.png" />
            </Head>
            <main className='flex flex-col gap-y-[16rem]'>
                <nav className='mx-auto flex justify-center mt-2'>
                    <Link href={"/"}>
                        <Image src={LogoName} className='cursor-pointer' />
                    </Link>
                </nav>
                <div className='flex justify-center p-12 '>
                    <button onClick={GoogleLogin} className='border-black border-2 px-12 py-3 rounded-lg shadow-lg'>Sign in with Google</button>
                </div>
            </main>

        </div>
    )
}

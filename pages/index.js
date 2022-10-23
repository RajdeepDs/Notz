import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notz | Note App</title>
        <meta name="description" content="Note taking app" />
        <link rel="icon" href="/LogoIcon.png" />
      </Head>
      <main>
        <h2 className="font-bold text-center mt-8">This is landing page for Notz</h2>
        <Link href={'./auth/login'}>
          <button className='px-6 py-3 flex mx-auto bg-cyan-400 text-white mt-4 rounded-lg'>
            Get Started
          </button>
        </Link>
      </main>
    </div>
  )
}

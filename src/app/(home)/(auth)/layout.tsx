import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="p-14 w-fit">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <Image
                        src="/images/logo.svg" // Path to the image in the public folder
                        className=""
                        alt="My Image"
                        width={90}
                        height={90}
                    />
                    {/* <h1 className="text-3xl font-black"><span className="text-primary-500">Soho</span><span className="text-secondary-500">jog</span></h1> */}
                    <h1 className="text-3xl font-black text-lavender-blush-500">Sohojog</h1>

                </div>
                <div className="mt-8 ">
                    {children}
                </div>

                <div className="mt-6 mb-8 flex w-full items-center justify-between">

                    <div className="border border-gray-400 w-full h-0"></div>
                    <p className="w-fit whitespace-nowrap px-2 text-gray-500 text-lg">Or continue with</p>
                    <div className="border border-gray-400 w-full h-0"></div>
                </div>

                <div className="flex justify-center items-center">
                    <Link href={'http://localhost:4000/api/v1/auth/google/login'} className="flex items-center w-fit gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-600 font-medium cursor-pointer">
                        <Image src={'/images/icon-google.svg'} width={20} height={20} alt="Google icon" />
                        <p>Google</p>
                    </Link>
                </div>

            </div>

        </div>
    )
}
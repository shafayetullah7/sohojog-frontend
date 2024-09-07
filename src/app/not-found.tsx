import Link from "next/link";

const notFound = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div>
                <div>
                    <h1 className="text-9xl text-red-500 font-bold mx-auto w-fit">404</h1>
                    <p className="text-3xl font-bold text-gray-900 w-full text-center mt-5">Page Not Found</p>
                </div>
                <Link href={'/'} replace className=" font-medium hover:font-bold underline text-gray-600 text-center mx-auto w-fit mt-10 block">Go To Home</Link>
            </div>
        </div>
    );
};

export default notFound;
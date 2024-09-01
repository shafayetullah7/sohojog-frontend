"use client"

import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthTextInput from "@/components/authModule/AuthTextInput";
import Link from "next/link";
import { useLoginMutation } from "@/app/lib/redux/api/api-features/authApi";
import { useEffect } from "react";
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import PasswordInput from "@/components/authModule/PasswordInput";
// import Loader1 from "@/components/loaders/Loader1";



const formSchema = z.object({
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be string." }).email("Invalid email format.").max(255, "Email is too long."),
    password: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be string." }).min(8, "Password must at least 8 character long.").max(40, "Password is too long.")
});
type Tform = z.infer<typeof formSchema>;

const SignIn = () => {

    const [login, { isError, isLoading, isSuccess, data }] = useLoginMutation()

    useEffect(() => {
        console.log('haha', data)
    }, [data])

    const form = useForm<Tform>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const loginFormHandler = async (data: Tform) => {
        try {
            console.log(data);
            const res = await login(data).unwrap();
            console.log('res 123', res);
        } catch (error) {
            console.log('Error occured', error);
            console.log((error as { message: string }).message);
            console.log(JSON.stringify(error))
        }
    }
    return (
        <div>
            <p className="font-bold text-xl">Sign in</p>
            {/* <Loader1 size={30}></Loader1> */}
            <div className="mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(loginFormHandler)}>

                        <div className="space-y-4">
                            <AuthTextInput<Tform> control={form.control} name="email" placeholder="Enter your email" type="email" Icon={EnvelopeIcon} />
                            <PasswordInput<Tform> control={form.control} name="password" placeholder="Enter your password" Icon={LockClosedIcon} />
                        </div>

                        <div className="flex justify-between mt-6">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    defaultChecked={false}
                                    className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500"
                                    id="terms2" />
                                <label
                                    htmlFor="terms2"
                                    className="font-medium text-gray-500 leading-none cursor-pointer"
                                >
                                    Remember Me
                                </label>
                            </div>
                            <p className="text-red-500">Forgot Password?</p>
                        </div>

                        {/* <button type="submit" className="w-full mt-9 py-3 block bg-secondary-500 rounded-xl text-white font-medium">LOG IN</button> */}
                        <button type="submit" className="w-full mt-9 py-3 block bg-lavender-blush-500-tr-bl rounded-xl text-white font-medium">LOG IN</button>


                    </form>

                </Form>
            </div>

            {/* <p className="text-center mt-10 text-gray-400" >If you don’t have an account?  <Link replace href={'/sign-up'} className="text-blue-400 font-medium">sign up</Link></p> */}
            <p className="text-center mt-10 text-gray-400" >If you don’t have an account?  <Link replace href={'/sign-up'} className="text-lavender-blush-500 font-bold">sign up</Link></p>

        </div>
    );
};

export default SignIn;
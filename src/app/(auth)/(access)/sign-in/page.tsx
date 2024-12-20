"use client"

import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthTextInput from "@/components/authModule/AuthTextInput";
import Link from "next/link";
import { useLoginMutation } from "@/_lib/redux/api/api-features/common/auth-api/authApi";
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import PasswordInput from "@/components/authModule/PasswordInput";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";
// import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/components/alerts/errorAlert";
import { successAlert } from "@/components/alerts/successAlert";
// import { useEffect } from "react";
// import { LocalStorageService } from "@/lib/helpers/access/Access";
import { useDispatch } from "react-redux";
import { setUser } from "@/_lib/redux/features/user/userSlice";
// import { redirect } from 'next/navigation'

// import Loader1 from "@/components/loaders/Loader1";



const formSchema = z.object({
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be string." }).email("Invalid email format.").max(255, "Email is too long."),
    password: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be string." }).min(8, "Password must at least 8 character long.").max(40, "Password is too long.")
});
type Tform = z.infer<typeof formSchema>;

const SignIn = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [login, { isError, isLoading, isSuccess, data }] = useLoginMutation()



    const form = useForm<Tform>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // const LocalStorage = LocalStorageService.getInstance()


    // useEffect(() => {
    //     if (isSuccess && LocalStorage.token) {
    //         console.log(LocalStorage.token)
    //         console.log('redirecting success')
    //         router.replace(`/sh`)
    //     }
    // }, [isSuccess, LocalStorage, router])

    const loginFormHandler = async (data: Tform) => {
        try {
            // console.log(data);
            const res = await login(data).unwrap();
            const { data: { user } } = res;
            // console.log('res 123', res.data, user.id);
            if (res.success) {
                // console.log('here 0')
                // toast({
                //     title: "Success",
                //     description: res.message || "You have signed up successfully.",
                //     className: 'bg-green-500 text-white'
                // });
                dispatch(setUser(user));
                successAlert({
                    title: "Success",
                    description: res.message || "You have logged in successfully.",
                })
                // router.replace('/sign-in')
                // form.reset()
                router.replace(`/sh`)
                // redirect('/dashboard','replace')

            }
        } catch (err) {
            // console.log('Error occured', err);
            // console.log((err as { message: string }).message);
            // console.log(JSON.stringify(err));

            // console.log('eeror', err);
            const axiosError = err as { data: TerrorResponse, status: number };

            // let errors: { title: string, description: string }[] = []
            let error = { title: 'Login Failed', description: axiosError?.data?.message || 'Something went wrong' }
            // alert(error.description);

            // toast({ ...error, variant: "destructive", })
            errorAlert({ ...error });
        }
    }
    return (
        <div>
            <p className="font-bold text-xl text-slate-900">Sign in</p>
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
                            <Link href={'/forgot-pass'} className="text-red-500 hover:underline">Forgot Password?</Link>
                        </div>

                        {/* <button type="submit" className="w-full mt-9 py-3 block bg-secondary-500 rounded-xl text-white font-medium">LOG IN</button> */}
                        <button type="submit" disabled={isLoading || isSuccess} className={`w-full mt-9 py-3 block ${isLoading || isSuccess ? 'bg-lavender-blush-300-tr-bl' : 'bg-lavender-blush-500-tr-bl'} rounded-xl text-white font-medium`}>LOG IN</button>


                    </form>

                </Form>
            </div>

            {/* <p className="text-center mt-10 text-gray-400" >If you don’t have an account?  <Link replace href={'/sign-up'} className="text-blue-400 font-medium">sign up</Link></p> */}
            <p className="text-center mt-10 text-gray-400" >If you don’t have an account?  <Link replace href={'/sign-up'} className="text-lavender-blush-500 font-bold">sign up</Link></p>

        </div>
    );
};

export default SignIn;
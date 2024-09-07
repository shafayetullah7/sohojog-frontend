"use client"

import { useSignUpMutation } from "@/lib/redux/api/api-features/authApi";
import AuthTextInput from "@/components/authModule/AuthTextInput";
import { Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EnvelopeIcon, UserCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PasswordInput from "@/components/authModule/PasswordInput";
import { useToast } from "@/components/ui/use-toast";
import { TerrorResponse } from "@/lib/redux/data-types/responseDataType";
import { useRouter } from "next/navigation";
import { successAlert } from "@/components/alerts/successAlert";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/features/user/userSlice";
import { errorAlert } from "@/components/alerts/errorAlert";

// Import the specific icon you want to use


const formSchema = z.object({
    name: z.string({ required_error: "Name is required.", invalid_type_error: "Name must be string" }).min(2, "Name is too short.").max(255, "Name is too long."),
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be string." }).email("Invalid email format.").max(255, "Email is too long."),
    password: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be string." }).min(8, "Password must at least 8 character long.").max(40, "Password is too long."),
    rePassword: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be string." }).min(8, "Password must at least 8 character long.").max(40, "Password is too long.")
}).refine(data => data.password === data.rePassword, "Passwords do not match");

export type TsignUpform = z.infer<typeof formSchema>;
export type TsignUpData = Omit<TsignUpform, 'rePassword'>;

const SignUp = () => {

    const [signUp, { isError, isLoading,isSuccess, data }] = useSignUpMutation();
    const router = useRouter();
    const dispatch = useDispatch()

    const form = useForm<TsignUpform>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: ""
        }
    });

    const signUpFormHandler = async (data: TsignUpform) => {
        try {
            const { rePassword, ...signUpData } = data;
            const res = await signUp(signUpData).unwrap();

            const { data: { user } } = res;

            console.log('res', res);

            if (res.success) {
                // console.log('here 0')
                dispatch(setUser(user))
                successAlert({
                    title: "Success",
                    description: res.message || "You have signed up successfully.",
                })
                // toast({
                //     title: "Success",
                //     description: res.message || "You have signed up successfully.",
                //     className: 'bg-green-500 text-white'
                // });
                router.replace('/sh')
            }
            // else {
            //     console.log('here 2');
            //     let error = { title: 'Failed', description: res.message ||'Something went wrong' }
            //     toast({
            //         ...error,
            //         variant: "destructive"
            //     })
            // }

            console.log("sign up response:", res);
        } catch (err) {
            console.log('eeror', err)
            const axiosError = err as { data: TerrorResponse, status: number };

            let errors: { title: string, description: string }[] = []
            let error = { title: 'Sign Up Failed', description: axiosError?.data?.message || 'Something went wrong' }

            // toast({ ...error, variant: "destructive", })
            errorAlert({ ...error })

            // if (axiosError) {
            //     if (axiosError.data?.errors?.length) {
            //         console.log('hereeeeeeeee')
            //         errors = axiosError.data.errors.map(err => ({ title: err.name, description: err.message }));
            //     } else { errors.push(error) }
            //     console.log(errors);
            //     errors.forEach(err => {
            //         toast({
            //             title: err.title,
            //             description: err.description,
            //             variant: "destructive",
            //         });
            //     })
            // } else {
            //     toast({ ...error, variant: "destructive", })
            // }
        }
    };
    return (
        <div>
            <p className="font-bold text-xl text-slate-900">Sign up</p>
            <div className="mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(signUpFormHandler)} className="space-y-8">
                        <div className="space-y-3">
                            <AuthTextInput<TsignUpform> control={form.control} type='text' name='name' placeholder='Enter your last name' Icon={UserCircleIcon} />
                            <AuthTextInput<TsignUpform> control={form.control} type='email' name='email' placeholder='Enter your email' Icon={EnvelopeIcon} />
                            <PasswordInput<TsignUpform> control={form.control} name='password' placeholder='Create your password' message='Password must be at least 8 characters' Icon={LockClosedIcon} />
                            <PasswordInput<TsignUpform> control={form.control} name='rePassword' placeholder='Re-type your password' Icon={LockClosedIcon} />
                            {form.formState.isSubmitted && form.watch('password') !== form.watch('rePassword') && (
                                <FormMessage>Passwords do not match</FormMessage>
                            )}
                        </div>

                        {/* <button type="submit" className={`w-full mt-9 py-3 block ${isLoading ? 'bg-secondary-400' : 'bg-secondary-500'} rounded-xl text-white font-medium`} disabled={isLoading}>LOG IN</button> */}
                        {/* <button type="submit" className={`w-full mt-9 py-3 block bg-blush-lavender-500 rounded-xl text-white font-medium`} disabled={isLoading}>LOG IN</button> */}
                        {/* <button type="submit" className={`w-full mt-9 py-3 block bg-blush-lavender-500 bg-tran rounded-xl text-white font-medium`} disabled={isLoading}>LOG IN</button> */}
                        <button type="submit" className={`w-full mt-9 py-3 block ${isLoading||isSuccess ? 'bg-lavender-blush-300-tr-bl' : 'bg-lavender-blush-500-tr-bl'} rounded-xl text-white font-medium`} disabled={isLoading||isSuccess}>SIGN UP</button>
                        {/* <button type="submit" disabled={isLoading} className={`w-full mt-9 py-3 block ${isLoading ? 'bg-lavender-blush-300-tr-bl' : 'bg-lavender-blush-500-tr-bl'} rounded-xl text-white font-medium`}>LOG IN</button> */}

                    </form>
                </Form>
            </div>

            {/* <p className="text-center mt-10 text-gray-400" >Already have an account? <Link href={'/sign-in'} replace className="text-blue-400 font-medium">sign in</Link></p> */}
            <p className="text-center mt-10 text-gray-400" >Already have an account? <Link href={'/sign-in'} replace className="text-blush-lavender-600 font-bold">sign in</Link></p>

        </div>
    );
};

export default SignUp;
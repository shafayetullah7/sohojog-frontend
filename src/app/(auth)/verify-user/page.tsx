'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useSendOtpMutation, useVerifyUserMutation } from "@/_lib/redux/api/api-features/common/auth-api/authApi";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";
import { errorAlert } from "@/components/alerts/errorAlert";
import { useDispatch } from "react-redux";
import { setUser } from "@/_lib/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import { successAlert } from "@/components/alerts/successAlert";
import { useGetUser } from "@/_lib/hooks/getUser";

// Define the form validation schema using Zod
const formSchema = z.object({
    otp: z
        .string({ required_error: "OTP is required.", invalid_type_error: "OTP must be a string." })
        .length(6, "OTP must be exactly 6 digits.")
        .regex(/^[0-9]+$/, "OTP must contain only numbers."),
});

export type TverifyUserData = z.infer<typeof formSchema>;

export default function VerifyUserPage() {

    const [verifyUser, verificationState] = useVerifyUserMutation();
    const [sendOtp, sendOtpResponse] = useSendOtpMutation()

    const userState = useGetUser()
    const dispatch = useDispatch();
    const router = useRouter()

    const form = useForm<TverifyUserData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    });

    const handleSendOtp = async () => {
        if (userState.data) {
            try {
                const res = await sendOtp({ email: userState.data.email }).unwrap()
                // console.log('sendotp response', sendOtpResponse);
                // console.log('res..', res)
                if (res.success) {
                    // router.replace('/verify-user');
                    successAlert({ title: "Success", description: "New OTP has been sent to the email." })
                } else {
                    errorAlert({ title: "Failed", description: res.message || "Failed to send otp." });

                }

            } catch (err) {
                const axiosError = err as { data: TerrorResponse, status: number };
                errorAlert({ title: "Failed", description: axiosError.data.message || "Failed to send otp." });
                router.replace('/sign-in');
            }
        }
    }

    // Handle form submission
    const verifyHandler = async (data: TverifyUserData) => {
        try {
            // console.log(data);
            const response = await verifyUser(data).unwrap()
            // console.log(response);
            if (response.success) {
                dispatch(setUser(response.data.user))
                successAlert({ title: "User Verified", description: "User verification successful" })
                router.replace('/sh')
            }
        } catch (err) {
            // console.log('eeror', err)
            const axiosError = err as { data: TerrorResponse, status: number };

            let errors: { title: string, description: string }[] = []
            let error = { title: 'Failed', description: axiosError?.data?.message || 'Something went wrong' }
            form.reset()

            errorAlert({ ...error })
            // router.replace('/sign-in')
        }
        // You can add API call or further actions here for OTP verification
    };

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-slate-900">Verify Your Account</h1>
                    <p className="text-muted-foreground text-slate-500">
                        Please enter the one-time password (OTP) sent to your registered email address to verify your account.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(verifyHandler)} className="mt-12 space-y-12">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} pattern="^[0-9]+$" {...field} disabled={sendOtpResponse.isLoading || verificationState.isLoading}>
                                            <InputOTPGroup className="w-fit mx-auto">
                                                {[...Array(6)].map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <Button type="submit" className="w-full">
                            Verify
                        </Button> */}

                        <button type="submit" className={`w-full mt-9 py-3 block ${sendOtpResponse.isLoading || verificationState.isLoading ? 'bg-lavender-blush-400-tr-bl' : "bg-lavender-blush-500-tr-bl"} rounded-xl text-white font-medium`} disabled={sendOtpResponse.isLoading || verificationState.isLoading}>VERIFY</button>

                        {/* <button type="submit" className={`w-full mt-9 py-3 block ${isLoading||isSuccess ? 'bg-lavender-blush-300-tr-bl' : 'bg-lavender-blush-500-tr-bl'} rounded-xl text-white font-medium`} disabled={isLoading||isSuccess}>SIGN UP</button> */}

                        <div className="text-sm text-muted-foreground">
                            Didn&apos;t receive the OTP?{"  "}
                            <span className="underline underline-offset-2 font-medium hover:font-bold cursor-pointer" onClick={handleSendOtp}>
                                Resend OTP
                            </span>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

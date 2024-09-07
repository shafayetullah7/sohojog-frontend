'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Define the form validation schema using Zod
const formSchema = z.object({
    otp: z
        .string({ required_error: "OTP is required.", invalid_type_error: "OTP must be a string." })
        .length(6, "OTP must be exactly 6 digits.")
        .regex(/^[0-9]+$/, "OTP must contain only numbers."),
});

export type TverifyForm = z.infer<typeof formSchema>;

export default function VerifyUserPage() {
    // Initialize the form using react-hook-form and Zod validation
    const form = useForm<TverifyForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    });

    // Handle form submission
    const verifyHandler = (data: TverifyForm) => {
        console.log(data);
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
                                        <InputOTP maxLength={6} pattern="^[0-9]+$" {...field}>
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

                        <button type="submit" className={`w-full mt-9 py-3 block bg-lavender-blush-500-tr-bl rounded-xl text-white font-medium`} >VERIFY</button>

                        {/* <button type="submit" className={`w-full mt-9 py-3 block ${isLoading||isSuccess ? 'bg-lavender-blush-300-tr-bl' : 'bg-lavender-blush-500-tr-bl'} rounded-xl text-white font-medium`} disabled={isLoading||isSuccess}>SIGN UP</button> */}

                        <div className="text-sm text-muted-foreground">
                            Didn&apos;t receive the OTP?{" "}
                            <Link href="#" className="underline underline-offset-2" prefetch={false}>
                                Resend OTP
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

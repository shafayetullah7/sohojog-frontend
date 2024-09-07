'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResetPassPage() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Set a New Password</h1>
                    <p className="text-muted-foreground">Your new password must be different from previous used passwords.</p>
                </div>
                <form className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" placeholder="Enter your new password" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm your new password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="#" className="underline underline-offset-2" prefetch={false}>
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="mx-auto max-w-md space-y-6 py-12">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Forgot Password</h1>
                    <p className="text-muted-foreground text-gray-400">
                        Enter your email address and we`&apos;`ll send you a link to reset your password.
                    </p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    <Link href="#" className="underline" prefetch={false}>
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    )
}
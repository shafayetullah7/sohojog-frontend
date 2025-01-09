import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Briefcase, Globe, Users } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-lavender-blush-50 to-lavender-blush-100">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-lavender-blush-800 mb-4">Welcome to SOHOJOG</h1>
                    <p className="text-xl text-lavender-blush-600 mb-8">Connecting people, projects, and possibilities</p>
                    <Link href={'/sh/my-projects'}>
                        <Button size="lg" className="bg-lavender-blush-600 hover:bg-lavender-blush-700 text-white">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button></Link>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-16">
                    <Card className="bg-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <Briefcase className="h-12 w-12 text-blue-600 mb-2" />
                            <CardTitle className="text-blue-800">Projects</CardTitle>
                            <CardDescription className="text-blue-600">Create and oversee your projects with ease</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-blue-700">Organize tasks, set milestones, and track progress all in one place.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">Learn More</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-green-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <Users className="h-12 w-12 text-green-600 mb-2" />
                            <CardTitle className="text-green-800">Collaborate</CardTitle>
                            <CardDescription className="text-green-600">Work together seamlessly with your team</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">Share ideas, assign tasks, and communicate effectively within projects.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100">Explore Features</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <Globe className="h-12 w-12 text-purple-600 mb-2" />
                            <CardTitle className="text-purple-800">Connect Globally</CardTitle>
                            <CardDescription className="text-purple-600">Expand your network and reach</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-purple-700">Discover opportunities and connect with professionals worldwide.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">Start Networking</Button>
                        </CardFooter>
                    </Card>
                </section>

                <section className="text-center bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-semibold text-lavender-blush-800 mb-4">Join SOHOJOG Today</h2>
                    <p className="text-lavender-blush-600 mb-8">
                        Experience a new way of managing projects and connecting with professionals.
                        SOHOJOG is your all-in-one platform for success.
                    </p>
                    {/* <Button size="lg" className="bg-lavender-blush-600 hover:bg-lavender-blush-700 text-white">
                        Sign Up Now
                    </Button> */}
                </section>
            </div>
        </div>
    )
}


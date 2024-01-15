
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Login() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="w-[350px] ">
                <CardHeader>
                    <CardTitle>Login Your Account</CardTitle>
                    <CardDescription>Welcome Admin</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder="Your Username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Password</Label>
                                <Input id="name" placeholder="Your Password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end items-end">

                    <Button>Login Now</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login;
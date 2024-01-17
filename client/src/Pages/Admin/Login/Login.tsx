
import makeApi from "@/Lib/makeApi"
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
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<{ email: string, pass: string }>({ email: "", pass: "" });
    const handelForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const verifyLogin = async () => {

        if (formData.email == "") {
            toast({
                title: "Login Field",
                description: "Invalid Username or Password",
            })
        } else if (formData.pass == "") {
            toast({
                title: "Login Field",
                description: "Invalid Username or Password",
            })
        } else {

            try {
                setLoading(true)
                const response = await makeApi({ path: "/api/admin/login", "method": "POST", data: formData });
                setLoading(false)
                if (response.status == 200) {
                    localStorage.setItem(import.meta.env.VITE_ADMINAUTHKEY, response.data.token);
                    navigate("/admin")
                }
            } catch (error) {
                setLoading(false)
                toast({
                    title: "Login Field",
                    description: "Invalid Username or Password",
                })
            }
        }
    }
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
                                <Label htmlFor="name">Email ID</Label>
                                <Input id="name" placeholder="Your Email" value={formData.email} name="email" onChange={handelForm} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Password</Label>
                                <Input id="name" placeholder="Your Password" value={formData.pass} type="password" name="pass" onChange={handelForm} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end items-end">
                    <Button onClick={() => verifyLogin()} disabled={loading} >Login Now</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login;
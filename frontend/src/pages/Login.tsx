import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Login() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSucess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSucess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeInputHandler = (e: any, type: string) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (type: string) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerData && !registerIsLoading && !registerError) {
      toast.success(registerData.message || "Signup Successful");
    }

    // ✅ Register error
    if (registerError && "data" in registerError) {
      toast.error(registerError.data?.message || "Signup failed");
    }

    // ✅ Login success
    if (loginData && !loginIsLoading && !loginError) {
      toast.success(loginData.message || "Login Successful");
    }

    // ✅ Login error
    if (loginError && "data" in loginError) {
      toast.error(loginError.data?.message || "Login failed");
    }
  }, [
    registerData,
    registerError,
    loginData,
    loginError,
    registerIsLoading,
    loginIsLoading,
  ]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="signup">
        <TabsList className="min-w-full">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  id="tabs-demo-username"
                  placeholder="Username"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  id="tabs-demo-email"
                  placeholder="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-password">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  // type="password"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  id="tabs-demo-name"
                  placeholder="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  id="tabs-demo-current"
                  placeholder="email"
                  type="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  id="tabs-demo-new"
                  placeholder="password"
                  // type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("signin")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

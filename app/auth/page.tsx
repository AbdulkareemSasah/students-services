"use client";

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
import { Icons } from "@/components/icons";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {useRouter, useSearchParams} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    router.push("/")
}
  console.log(status)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSignIn(values: any) {
    try {
        const body = { ...values };
        let res = await signIn("credentials", {
          ...body,
        });
      
      } catch (error) {
        console.error(error);
      }
    }

  async function onSignUp(values: any) {
    try {
      const body = { ...values };
      console.log(`POSTing ${JSON.stringify(body)}`);
      if (body.password === body.confirm_password) {
        const res = await fetch(`/api/user/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if(res.ok) {
          let resOth = await signIn("credentials", {
            ...body,
          });
          if(resOth?.ok){
            router.push(params?.get("callbackUrl") || "/");
          }
        }
        reset();
      }

      // router.push(params?.get("callbackUrl") || "/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center align-middle h-full">
      <Tabs defaultValue="login" className="w-[400px] my-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleSubmit(onSignIn)}>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  {/*<Button variant="outline" onClick={() => signIn("google")} >*/}
                  {/*  <Icons.gitHub className="mr-2 h-4 w-4" />*/}
                  {/*  Github*/}
                  {/*</Button>*/}
                  <Button variant="outline" onClick={() => signIn("google")} >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
              <Button
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="register">
        <form onSubmit={handleSubmit(onSignUp)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline">
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                  />
                </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                    id="confirm_password"
                    {...register("confirm_password")}
                    type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
            <Button
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign up
                </Button>
            </CardFooter>
          </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

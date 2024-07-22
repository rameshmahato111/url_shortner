"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

export function RegisterForm({ setRegister }) {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async (formData) => {
    try {
      const res = await axios.post("http://localhost:4000/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        window.alert("registered successfully");
        reset();
        router.push("/login");
      } else {
        throw new Error("Something went wrong. Please try again");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(error.response.data.message);
      } else {
        window.alert("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid gap-4">
              <div className="grid  gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full name</Label>
                  <Input
                    name="fullname"
                    id="fullname"
                    placeholder="Max"
                    {...register("fullname", {
                      required: "Full Name is required",
                    })}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Valid Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="flex items-center justify-center mt-4 text-center text-sm">
              Already have an account?{" "}
              <div
                className="underline cursor-pointer"
                onClick={() => setRegister(false)}
                outline="none"
              >
                Sign in
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

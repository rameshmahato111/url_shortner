"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";


const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export default function Home() {
 
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("authToken");
      console.log('Retrieved token:', token); // Debugging

      // Redirect to login if token is not present
      if (!token) {
        console.log('User not authenticated, redirecting to login.');
        router.push('/login');
        return;
      }

      setIsLoading(true);
      console.log("Form data:", formData);

      // Send POST request to shorten URL
      const res = await axios.post("http://localhost:4000/shorturl", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include token in header
        },
      });

      // Check response status
      if (res.status === 200) {
        window.alert("URL shortened successfully");
        reset();
      }
    } catch (error) {
      // Handle errors
      window.alert(error.message || "Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <> 
        
      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="max-w-[500px] mx-auto md:mt-[20%] mt-[50%] px-3">
        <h1 className="pb-5">Please enter valid url only works.</h1>
          <Input
            type="text"
            name="originalurl"
            placeholder="https://www.google.com"
            className="max-w-[500px]"
            {...register("originalurl", {
              required: "To shorten, a valid URL is required",
              pattern: {
                value: urlPattern,
                message: "Please enter a valid URL (e.g., https://www.google.com)"
              }
            })}
          />
          {errors.originalurl && (
            <p className="text-sm text-red-600 mt-3">{errors.originalurl.message}</p>
          )}
          <Button type="submit" disabled={isLoading} className="w-full mt-5">
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </main>
      </form>
    </>
  );
}

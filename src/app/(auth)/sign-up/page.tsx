"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Loader2 }  from 'lucide-react';


// -----------------------------------------------------------------------
function SignUpForm() {

  const [username, setUsername] = useState('');
  const [usernameMsg, setUsernameMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const [debouncedUsername, setDebouncedUsername] = useDebounceValue(username, 600);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        username: '',
        email: '',
        password: '',
    }
  });

  useEffect(() => {

    const checkUsernameUnique = async () => {

        console.log(debouncedUsername);

        if (debouncedUsername) {
            setIsCheckingUsername(true);
            setUsernameMsg('');

            try {

                const resp = await axios.get<ApiResponse>(`/api/check-username-unique?username=${debouncedUsername}`);
                setUsernameMsg(resp.data.message);

            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setUsernameMsg(
                    axiosError.response?.data.message ?? 'Error checking username'
                );
            }
            finally {
                setIsCheckingUsername(false);
            }
        }
    }

    checkUsernameUnique();

  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

    setIsSubmitting(true);

    try {
        const resp = await axios.post<ApiResponse>('/api/sign-up', data);
        toast(resp.data.message);

        router.replace(`/verify/${username}`);

    } catch (error) {
        console.error('Error during sign-up:', error);

        const axiosError = error as AxiosError<ApiResponse>;

        // Default error message
        let errorMessage = axiosError.response?.data.message;
        ('There was a problem with your sign-up. Please try again.');

        toast(errorMessage);
    }
    finally {
        setIsSubmitting(false);
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Join True Feedback
                </h1>
            </div>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="username"
                            {...field}
                            onChange={(e) => {field.onChange(e); setUsername(e.target.value);}}
                        />

                        {isCheckingUsername && <Loader2 className="animate-spin" />}

                        {!isCheckingUsername && usernameMsg && (
                            <p
                            className={`text-sm ${
                                usernameMsg === 'Username is unique'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                            >
                            {usernameMsg}
                            </p>
                        )}
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="email" {...field} name="email" />
                            <p className='text-gray-400 text-sm'>We will send you a verification code</p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="password" type="password" {...field} name="password" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        'Sign Up'
                    )}
                </Button>

                </form>
            </Form>

            <div className="text-center mt-4">
                <p>
                    Already a member?{' '}
                    <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                        Sign in
                    </Link>
                </p>
            </div>

        </div>
    </div>
  )
}

export default SignUpForm

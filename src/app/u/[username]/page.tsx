'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";
//-----------------------------------------------------
function SendMessage() {

  const {
    completion,
    complete,
    isLoading: isSuggestLoading,
    error
    } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString
  });

  const params = useParams<{username: string}>();
  const username = params.username;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {

    setIsLoading(true);
    try {
        const resp = await axios.post<ApiResponse>('/api/send-message', {
            ...data,
            username,
        });

        toast(resp.data.message);
        form.reset({ ...form.getValues(), content: ''});
    }
    catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast(axiosError.response?.data.message ?? 'Failed to send a message');
    }
    finally {
        setIsLoading(false);
    }

  }

  const messageContent = form.watch('content');

  const fetchSuggestedMessages = async () => {

    try {
        complete(''); // Manually trigger API call
    } catch (error) {
        console.error('Error fetching messages:', error)
    }
  }

  const handleMessageClick = (aiResponseMsg: string) => {
    form.setValue('content', aiResponseMsg);
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
            Public Profile Link
        </h1>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Write your anonymous message here"
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    {isLoading ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                        ) : (
                        <Button type="submit" className='cursor-pointer"' disabled={isLoading || !messageContent}>
                            Send It
                        </Button>
                        )}
                </div>
            </form>
        </Form>

        <div className="space-y-4 my-8">
            <div className="space-y-2">
                <Button onClick={fetchSuggestedMessages} className="my-4 cursor-pointer" disabled={isSuggestLoading}>
                    Suggest Messages
                </Button>
                <p>Click on any message below to select it.</p>
            </div>

            <Card>
                <CardHeader>
                    <h3 className="text-xl font-semibold">Messages</h3>
                </CardHeader>

                <CardContent className="flex flex-col space-y-4">
                    {error ? (
                        <p className="text-red-500">
                            {error.message}
                        </p>
                        ) : (
                            <div>
                                {completion?.split('||').filter(Boolean).map((msg, idx) => (
                                    <Button
                                        variant="outline"
                                        className='cursor-pointer mx-2'
                                        key={idx}
                                        onClick={() => handleMessageClick(msg)}
                                    >
                                        {msg}
                                    </Button>
                                ))}
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </div>

        <Separator className="my-6" />
        <div className="text-center">
            <div className="mb-4">Get Your Message Board</div>
            <Link href={'/sign-up'}>
                <Button>Create Your Account</Button>
            </Link>
        </div>
    </div>
  )
}

export default SendMessage

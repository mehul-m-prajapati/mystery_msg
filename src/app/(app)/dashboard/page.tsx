'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {toast} from 'sonner'
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';


function UserDashboard() {
  const { data: session } = useSession();
  const { username } = session?.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);


  const handleDeleteMessage = (messageId: string) => {

  }

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    },
  []);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
    },
  []);

  // Fetch initial state from the server
  useEffect(() => {
  }, []);

  // Handle switch change
  const handleSwitchChange = async () => {
  }

  if (!session || !session.user) {
    return <div>No Auth data found</div>;
  }

  const copyToClipboard = () => {
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">

        <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>

        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
            <div className="flex items-center">
                <input
                    type="text"
                    value={profileUrl}
                    disabled
                    className="input input-bordered w-full p-2 mr-2"
                />
                <Button className='cursor-pointer' onClick={copyToClipboard}>Copy</Button>
            </div>
        </div>

        <div className="mb-4">
            <Switch
                {...register('acceptMessages')}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
            />
            <span className="ml-2">
                Accept Messages: {acceptMessages ? 'On' : 'Off'}
            </span>
        </div>
        <Separator />

        <Button
            className="mt-4"
            variant="outline"
            onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
            }}
        >
            {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
            <RefreshCcw className="h-4 w-4" />
            )}
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
            messages.map((message, index) => (
                <>
                    <p>{index}</p>
                </>
            )))
            :
            (<p>No messages to display.</p>)}
      </div>

    </div>
  )
}

export default UserDashboard

"use client"

import { useState, useEffect } from "react"
import { Search, X, Send } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useSendInvitationMutation } from "@/_lib/redux/api/api-features/roles/manager/manager-invitation/manager.invitation.api"
import { SendInvitePayload } from "@/_lib/redux/api/api-features/roles/manager/manager-invitation/dto/manager.send.invitation"
import { successAlert } from "@/components/alerts/successAlert"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"
import { errorAlert } from "@/components/alerts/errorAlert"

interface User {
  id: string
  name: string
  email: string
}

const inviteFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
})

type InviteFormValues = z.infer<typeof inviteFormSchema>

type Props = {
  isOpen: boolean;
  onClose: () => void,
  projectId: string
}

export default function InviteForm({ isOpen, onClose, projectId }: Props) {
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const [sendInvitation, { isError, isLoading, isSuccess, data: inviteResponse, reset }] = useSendInvitationMutation();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  })

  // const email = watch("email")

  // useEffect(() => {
  //   const searchUsers = async () => {
  //     if (email.length > 2) {
  //       setIsSearching(true)
  //       const results = await mockSearchAPI(email)
  //       setSearchResults(results)
  //       setIsSearching(false)
  //     } else {
  //       setSearchResults([])
  //     }
  //   }

  //   const debounce = setTimeout(searchUsers, 300)
  //   return () => clearTimeout(debounce)
  // }, [email])



  const handleSelectUser = (user: User) => {
    setValue("email", user.email)
    setValue("name", user.name)
    setSearchResults([])
  }


  const onSubmit = async (data: InviteFormValues) => {
    // console.log("Sending invitation to:", data)
    // Here you would typically call an API to send the invitation

    const reqData: SendInvitePayload = {
      email: data.email,
      invitedUserName: data.name,
      message: data.message,
      sendEmail: true,
      projectId
    };

    try {
      const response = await sendInvitation(reqData).unwrap();
      reset()

      successAlert({ title: 'Success', description: response.message || 'Request has been sent.' });
      // console.log("Project created successfully!");
    } catch (err) {
      const axiosError = err as { data: TerrorResponse, status: number };
      const errorMessage = axiosError?.data?.message || 'Failed to send invitation';

      const error = { title: "Failed", description: errorMessage };

      errorAlert(error);
      // console.error("Error creating project:", err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent className="sm:max-w-[425px]" closeShow={false}>
        <Card>
          <CardHeader>
            <CardTitle>Invitation Details</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className="relative flex items-center">
                        <Input
                          id="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                  {(isSearching || searchResults.length > 0) && (
                    <ScrollArea className="absolute z-10 w-full max-h-[200px] mt-1 rounded-md bg-white shadow-lg border border-gray-200">
                      {isSearching ? (
                        <div className="p-2 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ) : (
                        searchResults.map((user) => (
                          <div
                            key={user.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 border-b border-gray-100 last:border-none"
                            onClick={() => handleSelectUser(user)}
                          >
                            <Search className="text-gray-400" />
                            <span>{user.name} ({user.email})</span>
                          </div>
                        ))
                      )}
                    </ScrollArea>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Enter name"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="message"
                      placeholder="Enter invitation message"
                      {...field}
                    />
                  )}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={onClose} className="flex items-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-700 border-2 border-gray-100 hover:border-gray-200  hover:bg-white">
                <X className="h-4 w-4" />
                <span>Close</span>
              </Button>
              <Button disabled={isLoading} type="submit" className="flex items-center space-x-2 rounded-xl gradient-button">
                <Send className="h-4 w-4" />
                <span>Send Invitation</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

// Mock API function for searching users
async function mockSearchAPI(query: string): Promise<User[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Replace this with the actual API call
  return [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Alice Johnson", email: "alice@example.com" },
  ].filter(user => user.email.toLowerCase().includes(query.toLowerCase()))
}

"use client"

import { useState } from "react"
import { Search, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: string
  name: string
  email: string
}

export default function InviteForm() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [inviteEmails, setInviteEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState<string>("")
  const [inviteSubject, setInviteSubject] = useState<string>("")
  const [inviteMessage, setInviteMessage] = useState<string>("")

  const handleSearch = async () => {
    const results = await mockSearchAPI(searchQuery)
    setSearchResults(results.filter(user => !selectedUsers.some(selected => selected.id === user.id)))
  }

  const handleSelectUser = (user: User) => {
    setSelectedUsers(prev => [...prev, user])
    setSearchResults(prev => prev.filter(u => u.id !== user.id))
  }

  const handleRemoveUser = (userId: string) => {
    const removedUser = selectedUsers.find(user => user.id === userId)
    setSelectedUsers(prev => prev.filter(user => user.id !== userId))
    if (removedUser) {
      setSearchResults(prev => [...prev, removedUser])
    }
  }

  const handleAddEmail = () => {
    if (newEmail && !inviteEmails.includes(newEmail)) {
      setInviteEmails(prev => [...prev, newEmail])
      setNewEmail("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setInviteEmails(prev => prev.filter(e => e !== email))
  }

  const handleSendInvitations = (type: "users" | "emails") => {
    if (type === 'users') {
      console.log("Sending invitations to users:", selectedUsers)
    } else {
      console.log("Sending email invitations to:", inviteEmails)
    }
    console.log("Subject:", inviteSubject)
    console.log("Message:", inviteMessage)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Invite Participants</CardTitle>
        <CardDescription>Search for users or send email invitations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Users</TabsTrigger>
            <TabsTrigger value="email">Email Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              {searchResults.length > 0 && (
                <ScrollArea className="h-[100px] w-full border rounded-md p-2">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                      <span>{user.name} ({user.email})</span>
                      <Button size="sm" onClick={() => handleSelectUser(user)}>Select</Button>
                    </div>
                  ))}
                </ScrollArea>
              )}
              {selectedUsers.length > 0 && (
                <div>
                  <Label>Selected Users</Label>
                  <ScrollArea className="h-[100px] w-full border rounded-md p-2 mt-2">
                    {selectedUsers.map((user) => (
                      <div key={user.id} className="flex justify-between items-center p-2">
                        <span>{user.name}</span>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveUser(user.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="email">
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Enter email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button onClick={handleAddEmail} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {inviteEmails.length > 0 && (
                <ScrollArea className="h-[100px] w-full border rounded-md p-2">
                  {inviteEmails.map((email, index) => (
                    <div key={index} className="flex justify-between items-center p-2">
                      <span>{email}</span>
                      <Button size="sm" variant="destructive" onClick={() => handleRemoveEmail(email)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="inviteSubject">Subject</Label>
            <Input
              id="inviteSubject"
              value={inviteSubject}
              onChange={(e) => setInviteSubject(e.target.value)}
              placeholder="Invitation subject"
            />
          </div>
          <div>
            <Label htmlFor="inviteMessage">Message</Label>
            <Textarea
              id="inviteMessage"
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              placeholder="Invitation message"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleSendInvitations(selectedUsers.length > 0 ? 'users' : 'emails')} className="w-full">
          Send Invitations
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock API function for searching users
async function mockSearchAPI(query: string): Promise<User[]> {
  // Replace this with the actual API call
  return [
    { id: "1", name: "User One", email: "userone@example.com" },
    { id: "2", name: "User Two", email: "usertwo@example.com" },
  ].filter(user => user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()))
}
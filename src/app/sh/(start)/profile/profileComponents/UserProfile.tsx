"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Bell,
  Clock,
  Globe,
  Key,
  Lock,
  LogOut,
  Mail,
  Moon,
  Phone,
  Sun,
  User,
  Edit2,
  Camera,
  Upload,
  Plus,
  X,
  Eye,
  EyeOff,
  Shield,
  Trash2,
  Calendar,
  Award,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface UserData {
  name: string
  username: string
  email: string
  phone: string
  location: string
  timezone: string
  profilePicture: string
  bio: string
  skills: string[]
  certifications: Certification[]
  recentActions: RecentAction[]
  loginHistory: LoginHistory[]
}

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  expiry: string | null
}

interface RecentAction {
  action: string
  date: string
}

interface LoginHistory {
  location: string
  device: string
  date: string
}

// Mock user data
const user: UserData = {
  name: "Jane Doe",
  username: "janedoe123",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  timezone: "Eastern Time (ET)",
  profilePicture: "/placeholder.svg?height=128&width=128",
  bio: "Passionate UX designer with 5+ years of experience in creating user-centered digital products. Skilled in user research, prototyping, and usability testing. Always eager to learn and apply new technologies to enhance user experiences.",
  skills: ["UI Design", "Project Coordination", "Agile Methodologies", "User Research"],
  certifications: [
    { id: 1, name: "Certified Scrum Master", issuer: "Scrum Alliance", date: "2022-05-15", expiry: "2024-05-15" },
    { id: 2, name: "Google UX Design Professional Certificate", issuer: "Google", date: "2021-11-30", expiry: null },
  ],
  recentActions: [
    { action: "Updated profile picture", date: "2023-11-05T14:30:00Z" },
    { action: "Changed password", date: "2023-11-03T09:15:00Z" },
    { action: "Added new skill", date: "2023-11-01T16:45:00Z" },
  ],
  loginHistory: [
    { location: "New York, USA", device: "MacBook Pro", date: "2023-11-05T08:00:00Z" },
    { location: "New York, USA", device: "iPhone 12", date: "2023-11-04T19:30:00Z" },
    { location: "Boston, USA", device: "Windows PC", date: "2023-11-02T10:15:00Z" },
  ],
}

export default function UserProfile() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [editPictureOpen, setEditPictureOpen] = useState(false)
  const [fullViewPictureOpen, setFullViewPictureOpen] = useState(false)
  const [certifications, setCertifications] = useState<Certification[]>(user.certifications)
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({ name: "", issuer: "", date: "", expiry: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [userInfo, setUserInfo] = useState<UserData>(user)
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null)

  const truncateBio = (bio: string, maxLength: number) => {
    if (bio.length <= maxLength) return bio
    return bio.slice(0, maxLength) + "..."
  }

  const handleAddCertification = () => {
    setCertifications([...certifications, { ...newCertification, id: Date.now() }])
    setNewCertification({ name: "", issuer: "", date: "", expiry: "" })
  }

  const handleRemoveCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id))
  }

  const handleUpdateUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    setUserInfo({ ...userInfo })
    setEditProfileOpen(false)
  }

  const handleUpdateProfilePicture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, you would upload the new picture to your server
    if (newProfilePicture) {
      setUserInfo({ ...userInfo, profilePicture: URL.createObjectURL(newProfilePicture) })
    }
    setEditPictureOpen(false)
  }

  const CustomButton = ({ children, className, ...props }: React.ComponentProps<typeof Button>) => (
    <Button
      className={`bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  )

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Profile Header */}
      <Card className="relative overflow-hidden rounded-3xl">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary" />
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row items-start -mt-16 sm:-mt-20 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background cursor-pointer rounded-2xl" onClick={() => setFullViewPictureOpen(true)}>
                <AvatarImage src={userInfo.profilePicture} alt={userInfo.name} />
                <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Dialog open={editPictureOpen} onOpenChange={setEditPictureOpen}>
                <DialogTrigger asChild>
                  <CustomButton className="absolute bottom-0 right-0 w-10 h-10 p-0 rounded-full">
                    <Camera className="w-5 h-5" />
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-2xl">
                  <form onSubmit={handleUpdateProfilePicture}>
                    <DialogHeader>
                      <DialogTitle>Edit Profile Picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture or choose from the options below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-center">
                        <Avatar className="w-40 h-40 rounded-2xl">
                          <AvatarImage src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : userInfo.profilePicture} alt={userInfo.name} />
                          <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Label htmlFor="picture" className="cursor-pointer">
                          <CustomButton type="button">
                            <Upload className="w-5 h-5 mr-2" />
                            Upload New Picture
                          </CustomButton>
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setNewProfilePicture(e.target.files?.[0] || null)}
                          />
                        </Label>
                        <Button variant="outline" type="button" className="rounded-xl" onClick={() => setNewProfilePicture(null)}>
                          <Trash2 className="w-5 h-5 mr-2" />
                          Remove Picture
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <CustomButton type="submit">Save changes</CustomButton>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{userInfo.name}</h1>
                  <p className="text-muted-foreground">@{userInfo.username}</p>
                </div>
                <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                  <DialogTrigger asChild>
                    <CustomButton className="mt-2 w-10 h-10 p-0">
                      <Edit2 className="w-5 h-5" />
                    </CustomButton>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] rounded-2xl">
                    <form onSubmit={handleUpdateUserInfo}>
                      <DialogHeader>
                        <DialogTitle>Edit Profile Information</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id="name"
                              value={userInfo.name}
                              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                              className="pl-10 rounded-xl"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id="username"
                              value={userInfo.username}
                              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                              className="pl-10 rounded-xl"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id="email"
                              value={userInfo.email}
                              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                              className="pl-10 rounded-xl"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id="phone"
                              value={userInfo.phone}
                              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                              className="pl-10 rounded-xl"
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id="location"
                              value={userInfo.location}
                              onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                              className="pl-10 rounded-xl"
                            />
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="bio" className="text-right mt-3">
                            Bio
                          </Label>
                          <div className="col-span-3 relative">
                            <Textarea
                              id="bio" value={userInfo.bio}
                              onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                              className="pl-10 pt-3 min-h-[100px] rounded-xl"
                            />
                            <Edit2 className="absolute left-3 top-3 text-muted-foreground" size={18} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <CustomButton type="submit">Save changes</CustomButton>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {showFullBio ? userInfo.bio : truncateBio(userInfo.bio, 150)}
                </p>
                {userInfo.bio.length > 150 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-primary"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? "See less" : "See more"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full View Picture Modal */}
      <Dialog open={fullViewPictureOpen} onOpenChange={setFullViewPictureOpen}>
        <DialogContent className="sm:max-w-[720px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {/* <img src={userInfo.profilePicture} alt={userInfo.name} className="max-w-full max-h-[70vh] object-contain rounded-xl" /> */}
            <Image
              src={userInfo.profilePicture}
              alt={userInfo.name}
              className="object-contain rounded-xl"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto', maxHeight: '70vh' }}
              unoptimized={true} // Use only if profilePicture URL isn't optimizable by Next.js
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{userInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span>{userInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{userInfo.timezone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills and Expertise */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Skills and Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {userInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="rounded-xl">{skill}</Badge>
                ))}
              </div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">
                        Issued: {new Date(cert.date).toLocaleDateString()}
                        {cert.expiry && ` | Expires: ${new Date(cert.expiry).toLocaleDateString()}`}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveCertification(cert.id)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Popover>
                <PopoverTrigger asChild>
                  <CustomButton className="w-full mt-4">
                    Add Certification
                  </CustomButton>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-2xl">
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Add New Certification</h4>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="cert-name">Name</Label>
                        <div className="col-span-2 relative">
                          <Input
                            id="cert-name"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            className="pl-10 h-9 rounded-xl"
                          />
                          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="cert-issuer">Issuer</Label>
                        <div className="col-span-2 relative">
                          <Input
                            id="cert-issuer"
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                            className="pl-10 h-9 rounded-xl"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="cert-date">Issue Date</Label>
                        <div className="col-span-2 relative">
                          <Input
                            id="cert-date"
                            type="date"
                            value={newCertification.date}
                            onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                            className="pl-10 h-9 rounded-xl"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="cert-expiry">Expiry Date</Label>
                        <div className="col-span-2 relative">
                          <Input
                            id="cert-expiry"
                            type="date"
                            value={newCertification.expiry || ""}
                            onChange={(e) => setNewCertification({ ...newCertification, expiry: e.target.value })}
                            className="pl-10 h-9 rounded-xl"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        </div>
                      </div>
                    </div>
                    <CustomButton onClick={handleAddCertification}>Add Certification</CustomButton>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns */}
        <div className="md:col-span-2 space-y-8">
          {/* Preferences */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>Notifications</span>
                </Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode" className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                  <span>Dark Mode</span>
                </Label>
                <Switch
                  id="darkMode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
              <div className="flex items-center space-x-2">
                {isDarkMode ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
                <span>{isDarkMode ? "Dark" : "Light"} theme active</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="security">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="security" className="rounded-xl">Security</TabsTrigger>
                  <TabsTrigger value="privacy" className="rounded-xl">Privacy</TabsTrigger>
                  <TabsTrigger value="login-history" className="rounded-xl">Login History</TabsTrigger>
                </TabsList>
                <TabsContent value="security" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your current password"
                        className="pl-10 rounded-xl"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 rounded-xl"
                      />
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        className="pl-10 rounded-xl"
                      />
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                  </div>
                  <CustomButton className="w-full">Change Password</CustomButton>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="two-factor" className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <span>Two-Factor Authentication</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="two-factor" />
                      <span>Enable two-factor authentication</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="privacy" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <Select>
                      <SelectTrigger id="profile-visibility" className="rounded-xl">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Preferences</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="marketing-emails" />
                      <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="social-emails" />
                      <Label htmlFor="social-emails">Receive social notifications</Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="login-history">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {user.loginHistory.map((login, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{login.location}</p>
                            <p className="text-sm text-muted-foreground">{login.device}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(login.date).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <ul className="space-y-2">
                  {user.recentActions.map((action, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{action.action}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(action.date).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <CustomButton variant="destructive" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </CustomButton>
      </div>
    </div>
  )
}
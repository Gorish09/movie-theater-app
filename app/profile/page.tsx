"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Edit, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { movies } from "@/lib/data"
import BookingCard from "@/components/booking-card"
import MovieCard from "@/components/movie-card"
import { useAppContext } from "@/lib/context/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { bookings, userProfile, updateUserProfile } = useAppContext()
  const { toast } = useToast()
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    avatar: userProfile.avatar,
  })

  const recentBookings = bookings.slice(0, 2)
  const watchlist = [movies[0], movies[2], movies[4]]

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm({ ...profileForm, [name]: value })
  }

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile(profileForm)

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsEditProfileOpen(false)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image src={userProfile.avatar || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground">{userProfile.email}</p>
          <p className="text-muted-foreground">Member since {userProfile.memberSince}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="bookings">Booking History</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <Button variant="link" asChild>
              <Link href="/bookings/my-bookings">View All</Link>
            </Button>
          </div>

          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">You don't have any recent bookings.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlist">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Watchlist</h2>
            <Button variant="outline" size="sm">
              Manage Watchlist
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input id="avatar" name="avatar" value={profileForm.avatar} onChange={handleProfileChange} required />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

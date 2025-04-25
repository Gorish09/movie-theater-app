"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Star, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { showtimes, reviewUsers } from "@/lib/data"
import { useAppContext } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface MovieDetailsPageProps {
  params: {
    id: string
  }
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const router = useRouter()
  const { movies, addReview } = useAppContext()
  const { toast } = useToast()
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    review: "",
  })

  const movie = movies.find((m) => m.id === params.id)

  if (!movie) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="mb-4 text-muted-foreground">The movie you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/movies">Browse Movies</Link>
        </Button>
      </div>
    )
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReviewForm({ ...reviewForm, [name]: value })
  }

  const handleRatingChange = (rating: number) => {
    setReviewForm({ ...reviewForm, rating })
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    addReview(movie.id, reviewForm)

    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your thoughts on this movie!",
    })

    setIsReviewDialogOpen(false)
    setReviewForm({ name: "", rating: 5, review: "" })
  }

  // Combine initial reviews with any user-added reviews
  const allReviews = [
    ...(movie.reviews || []),
    ...reviewUsers.map((review) => ({
      id: `review-${review.id}`,
      name: review.name,
      avatar: review.avatar,
      rating: review.rating,
      review: review.review,
    })),
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg md:w-1/3 lg:w-1/4">
          <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>

          <div className="mb-4 flex flex-wrap gap-2">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Duration: {movie.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Rating: {movie.rating.toFixed(1)}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Director: {movie.director}</span>
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">{movie.description}</p>

          <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push(`/bookings?movie=${movie.id}`)}>
            Book Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="showtimes" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
          <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="showtimes" className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Today's Showtimes</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {showtimes.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/bookings?movie=${movie.id}&time=${time}`)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Tomorrow's Showtimes</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {showtimes.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/bookings?movie=${movie.id}&time=${time}`)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cast">
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Cast</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {movie.cast.map((person) => (
                <div key={person.name} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <h3 className="mb-4 text-lg font-semibold">Crew</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={movie.directorImage || "/placeholder.svg"}
                    alt={movie.director}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{movie.director}</p>
                  <p className="text-sm text-muted-foreground">Director</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Reviews</h3>
              <Button variant="outline" size="sm" onClick={() => setIsReviewDialogOpen(true)}>
                Write a Review
              </Button>
            </div>

            <div className="space-y-4">
              {allReviews.length > 0 ? (
                allReviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < review.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                              }`}
                              fill="currentColor"
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.review}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this movie!</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" value={reviewForm.name} onChange={handleReviewChange} required />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRatingChange(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < reviewForm.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                      />
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                name="review"
                value={reviewForm.review}
                onChange={handleReviewChange}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

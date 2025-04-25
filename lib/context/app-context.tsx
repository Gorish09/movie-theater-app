"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  type Movie,
  type Booking,
  type Offer,
  type Message,
  type Notification,
  movies as initialMovies,
  bookings as initialBookings,
  offers as initialOffers,
  messages as initialMessages,
  notifications as initialNotifications,
  userProfile as initialUserProfile,
} from "@/lib/data"

type UserProfile = {
  name: string
  email: string
  memberSince: string
  avatar: string
}

interface AppContextType {
  // Data
  movies: Movie[]
  bookings: Booking[]
  offers: Offer[]
  messages: Message[]
  notifications: Notification[]
  userProfile: UserProfile

  // Movie CRUD
  addMovie: (movie: Omit<Movie, "id">) => void
  updateMovie: (id: string, movie: Partial<Movie>) => void
  deleteMovie: (id: string) => void

  // Booking CRUD
  addBooking: (booking: Omit<Booking, "id" | "bookingDate">) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  deleteBooking: (id: string) => void

  // Review CRUD
  addReview: (movieId: string, review: { name: string; rating: number; review: string; avatar?: string }) => void

  // User Profile
  updateUserProfile: (profile: Partial<UserProfile>) => void

  // Messages
  addMessage: (message: Omit<Message, "id" | "timestamp" | "read">) => void
  markMessageAsRead: (id: string) => void

  // Notifications
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with data from lib/data.ts
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [offers, setOffers] = useState<Offer[]>(initialOffers)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile)

  // Load data from localStorage on initial render (if available)
  useEffect(() => {
    const storedMovies = localStorage.getItem("movies")
    const storedBookings = localStorage.getItem("bookings")
    const storedUserProfile = localStorage.getItem("userProfile")

    if (storedMovies) setMovies(JSON.parse(storedMovies))
    if (storedBookings) setBookings(JSON.parse(storedBookings))
    if (storedUserProfile) setUserProfile(JSON.parse(storedUserProfile))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies))
    localStorage.setItem("bookings", JSON.stringify(bookings))
    localStorage.setItem("userProfile", JSON.stringify(userProfile))
  }, [movies, bookings, userProfile])

  // Movie CRUD operations
  const addMovie = (movie: Omit<Movie, "id">) => {
    const newMovie = {
      ...movie,
      id: `m${Date.now()}`,
    }
    setMovies([...movies, newMovie])
  }

  const updateMovie = (id: string, movieUpdate: Partial<Movie>) => {
    setMovies(movies.map((movie) => (movie.id === id ? { ...movie, ...movieUpdate } : movie)))
  }

  const deleteMovie = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  // Booking CRUD operations
  const addBooking = (booking: Omit<Booking, "id" | "bookingDate">) => {
    const newBooking = {
      ...booking,
      id: `B${Date.now()}`,
      bookingDate: new Date().toISOString().split("T")[0],
      status: "upcoming" as const,
    }
    setBookings([...bookings, newBooking])
  }

  const updateBooking = (id: string, bookingUpdate: Partial<Booking>) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, ...bookingUpdate } : booking)))
  }

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  // Review operations
  const addReview = (movieId: string, review: { name: string; rating: number; review: string; avatar?: string }) => {
    // In a real app, we'd store reviews in a separate collection
    // For this demo, we'll just update the movie with a new review
    const movie = movies.find((m) => m.id === movieId)
    if (!movie) return

    // This is just for demo purposes - in a real app, reviews would be a separate entity
    const updatedMovie = {
      ...movie,
      reviews: [
        ...(movie.reviews || []),
        {
          id: `r${Date.now()}`,
          ...review,
          avatar:
            review.avatar ||
            `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "women" : "men"}/${Math.floor(Math.random() * 100)}.jpg`,
        },
      ],
    }

    updateMovie(movieId, updatedMovie)
  }

  // User profile operations
  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    setUserProfile({ ...userProfile, ...profileUpdate })
  }

  // Message operations
  const addMessage = (message: Omit<Message, "id" | "timestamp" | "read">) => {
    const newMessage = {
      ...message,
      id: `M${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setMessages([...messages, newMessage])
  }

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, read: true } : message)))
  }

  // Notification operations
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification = {
      ...notification,
      id: `N${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications([...notifications, newNotification])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const value = {
    movies,
    bookings,
    offers,
    messages,
    notifications,
    userProfile,
    addMovie,
    updateMovie,
    deleteMovie,
    addBooking,
    updateBooking,
    deleteBooking,
    addReview,
    updateUserProfile,
    addMessage,
    markMessageAsRead,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

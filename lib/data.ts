// Mock data for the movie theater app

export type Movie = {
  id: string
  title: string
  poster: string
  genre: string[]
  language: string
  duration: string
  releaseDate: string
  rating: number
  description: string
  cast: { name: string; role: string; image: string }[]
  director: string
  directorImage: string
  reviews?: {
    id: string
    name: string
    avatar: string
    rating: number
    review: string
  }[]
}

export type Booking = {
  id: string
  movieId: string
  movieTitle: string
  poster: string
  theater: string
  date: string
  time: string
  seats: string[]
  totalAmount: number
  bookingDate: string
  status: "upcoming" | "completed" | "cancelled"
}

export type Offer = {
  id: string
  title: string
  description: string
  code: string
  discount: string
  validUntil: string
  image: string
}

export type Message = {
  id: string
  sender: "user" | "support"
  content: string
  timestamp: string
  read: boolean
  avatar?: string
}

export type Notification = {
  id: string
  type: "booking" | "offer" | "movie"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar: Beyond Time",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=600&auto=format&fit=crop",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    language: "English",
    duration: "2h 49m",
    releaseDate: "2025-05-15",
    rating: 4.8,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a catastrophic food shortage.",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", image: "https://randomuser.me/api/portraits/men/41.jpg" },
      { name: "Anne Hathaway", role: "Brand", image: "https://randomuser.me/api/portraits/women/28.jpg" },
      { name: "Jessica Chastain", role: "Murph", image: "https://randomuser.me/api/portraits/women/33.jpg" },
    ],
    director: "Christopher Nolan",
    directorImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    title: "The Last Guardian",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
    genre: ["Action", "Fantasy", "Adventure"],
    language: "English",
    duration: "2h 15m",
    releaseDate: "2025-06-10",
    rating: 4.5,
    description:
      "A legendary warrior must protect the last of a magical species from those who seek to harness its power for evil.",
    cast: [
      { name: "Tom Hardy", role: "Kael", image: "https://randomuser.me/api/portraits/men/22.jpg" },
      { name: "Zendaya", role: "Aria", image: "https://randomuser.me/api/portraits/women/63.jpg" },
      { name: "Idris Elba", role: "Commander Vex", image: "https://randomuser.me/api/portraits/men/83.jpg" },
    ],
    director: "Denis Villeneuve",
    directorImage: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "3",
    title: "Echoes of Tomorrow",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    genre: ["Drama", "Mystery", "Thriller"],
    language: "English",
    duration: "2h 10m",
    releaseDate: "2025-04-22",
    rating: 4.3,
    description:
      "A woman discovers she can communicate with her future self, leading to a race against time to prevent a personal tragedy.",
    cast: [
      { name: "Saoirse Ronan", role: "Emma Reeves", image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Cillian Murphy", role: "Dr. Nathan Hayes", image: "https://randomuser.me/api/portraits/men/55.jpg" },
      {
        name: "Lupita Nyong'o",
        role: "Detective Sarah Chen",
        image: "https://randomuser.me/api/portraits/women/75.jpg",
      },
    ],
    director: "Ava DuVernay",
    directorImage: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "4",
    title: "Quantum Heist",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop",
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "English",
    duration: "1h 58m",
    releaseDate: "2025-03-18",
    rating: 4.2,
    description:
      "A team of specialized thieves attempt to steal a revolutionary quantum computer, only to discover it holds the key to altering reality itself.",
    cast: [
      { name: "John David Washington", role: "Marcus Reed", image: "https://randomuser.me/api/portraits/men/67.jpg" },
      { name: "Florence Pugh", role: "Dr. Olivia Chen", image: "https://randomuser.me/api/portraits/women/12.jpg" },
      { name: "Oscar Isaac", role: "Victor Reyes", image: "https://randomuser.me/api/portraits/men/29.jpg" },
    ],
    director: "Ryan Coogler",
    directorImage: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: "5",
    title: "The Silent Woods",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
    genre: ["Horror", "Mystery", "Thriller"],
    language: "English",
    duration: "1h 52m",
    releaseDate: "2025-07-05",
    rating: 4.0,
    description:
      "A family's retreat to a remote cabin takes a terrifying turn when they discover the surrounding forest harbors an ancient, malevolent presence.",
    cast: [
      { name: "Emily Blunt", role: "Sarah Mitchell", image: "https://randomuser.me/api/portraits/women/23.jpg" },
      { name: "Ethan Hawke", role: "David Mitchell", image: "https://randomuser.me/api/portraits/men/91.jpg" },
      { name: "Millie Bobby Brown", role: "Lily Mitchell", image: "https://randomuser.me/api/portraits/women/89.jpg" },
    ],
    director: "Mike Flanagan",
    directorImage: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    id: "6",
    title: "Harmony's Echo",
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    genre: ["Musical", "Drama", "Romance"],
    language: "English",
    duration: "2h 12m",
    releaseDate: "2025-06-28",
    rating: 4.6,
    description:
      "A gifted musician with hearing loss finds love and rediscovers her passion for music through an unexpected relationship with a street performer.",
    cast: [
      { name: "Zendaya", role: "Maya Reynolds", image: "https://randomuser.me/api/portraits/women/63.jpg" },
      { name: "Timothée Chalamet", role: "Leo Winters", image: "https://randomuser.me/api/portraits/men/40.jpg" },
      { name: "Viola Davis", role: "Grace Reynolds", image: "https://randomuser.me/api/portraits/women/53.jpg" },
    ],
    director: "Damien Chazelle",
    directorImage: "https://randomuser.me/api/portraits/men/66.jpg",
  },
]

export const bookings: Booking[] = [
  {
    id: "B12345",
    movieId: "1",
    movieTitle: "Interstellar: Beyond Time",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=600&auto=format&fit=crop",
    theater: "Cineplex Downtown",
    date: "2025-05-20",
    time: "7:30 PM",
    seats: ["F5", "F6", "F7"],
    totalAmount: 45.0,
    bookingDate: "2025-05-15",
    status: "upcoming",
  },
  {
    id: "B12346",
    movieId: "3",
    movieTitle: "Echoes of Tomorrow",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    theater: "Starlight Cinema",
    date: "2025-04-25",
    time: "6:15 PM",
    seats: ["D10", "D11"],
    totalAmount: 30.0,
    bookingDate: "2025-04-20",
    status: "upcoming",
  },
  {
    id: "B12347",
    movieId: "5",
    movieTitle: "The Silent Woods",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
    theater: "Cineplex Downtown",
    date: "2025-03-10",
    time: "8:45 PM",
    seats: ["H3", "H4"],
    totalAmount: 30.0,
    bookingDate: "2025-03-05",
    status: "completed",
  },
]

export const offers: Offer[] = [
  {
    id: "O1001",
    title: "Weekend Special",
    description: "Get 20% off on all movie tickets booked for weekend shows!",
    code: "WEEKEND20",
    discount: "20%",
    validUntil: "2025-06-30",
    image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "O1002",
    title: "Family Package",
    description: "Book 4 or more tickets and get a free popcorn and soda combo!",
    code: "FAMILY4",
    discount: "Free Combo",
    validUntil: "2025-07-15",
    image: "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "O1003",
    title: "Student Discount",
    description: "Students get 15% off on all movie tickets with valid ID!",
    code: "STUDENT15",
    discount: "15%",
    validUntil: "2025-12-31",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "O1004",
    title: "Early Bird Special",
    description: "Book tickets 7 days in advance and get 25% off!",
    code: "EARLY25",
    discount: "25%",
    validUntil: "2025-08-31",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
  },
]

export const messages: Message[] = [
  {
    id: "M1001",
    sender: "support",
    content: "Hello! Thank you for contacting MovieTheater support. How can we assist you today?",
    timestamp: "2025-05-10T10:30:00",
    read: true,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "M1002",
    sender: "user",
    content: "Hi, I booked tickets for Interstellar: Beyond Time but I need to change the date. Is that possible?",
    timestamp: "2025-05-10T10:32:00",
    read: true,
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "M1003",
    sender: "support",
    content: "Of course! We can help you with that. Could you please provide your booking ID?",
    timestamp: "2025-05-10T10:35:00",
    read: true,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "M1004",
    sender: "user",
    content: "It's B12345.",
    timestamp: "2025-05-10T10:36:00",
    read: true,
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "M1005",
    sender: "support",
    content: "Thank you! I can see your booking for May 20th. What date would you like to change it to?",
    timestamp: "2025-05-10T10:38:00",
    read: false,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]

export const notifications: Notification[] = [
  {
    id: "N1001",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Interstellar: Beyond Time on May 20th has been confirmed!",
    timestamp: "2025-05-15T14:30:00",
    read: true,
  },
  {
    id: "N1002",
    type: "movie",
    title: "New Movie Release",
    message: "The Last Guardian is now available for booking! Don't miss the premiere on June 10th.",
    timestamp: "2025-05-20T09:15:00",
    read: false,
  },
  {
    id: "N1003",
    type: "offer",
    title: "Special Offer",
    message: "Weekend Special: Get 20% off on all movie tickets booked for weekend shows!",
    timestamp: "2025-05-22T11:45:00",
    read: false,
  },
  {
    id: "N1004",
    type: "booking",
    title: "Booking Reminder",
    message: "Reminder: Your show for Echoes of Tomorrow starts tomorrow at 6:15 PM.",
    timestamp: "2025-04-24T16:00:00",
    read: false,
  },
]

export const theaters = [
  "Cineplex Downtown",
  "Starlight Cinema",
  "Grand Theater",
  "Metropolis IMAX",
  "Riverside Cinemas",
]

export const showtimes = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM", "7:30 PM", "9:45 PM"]

// User profile data
export const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  memberSince: "January 2025",
  avatar: "https://randomuser.me/api/portraits/men/36.jpg",
}

// Review users
export const reviewUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    review: "Absolutely loved this movie! The visuals were stunning and the story kept me engaged throughout.",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4,
    review: "Great performances by the cast. The plot was a bit predictable but still enjoyable.",
  },
  {
    id: 3,
    name: "Olivia Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 3,
    review: "Decent movie but not as good as the director's previous works. Worth watching once.",
  },
]

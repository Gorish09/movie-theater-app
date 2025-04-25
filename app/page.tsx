import HeroSection from "@/components/hero-section"
import MovieCarousel from "@/components/movie-carousel"
import { movies } from "@/lib/data"

export default function Home() {
  // Filter movies for different sections
  const featuredMovies = movies.slice(0, 6)
  const upcomingMovies = movies.slice(2, 6)

  return (
    <div className="flex flex-col">
      <HeroSection />

      <div className="container py-12">
        <MovieCarousel title="Featured Movies" movies={featuredMovies} />

        <div className="my-12">
          <MovieCarousel title="Coming Soon" movies={upcomingMovies} />
        </div>
      </div>
    </div>
  )
}

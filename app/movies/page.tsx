import { movies } from "@/lib/data"
import MovieCard from "@/components/movie-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function MoviesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Movies</h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search movies..." className="pl-8" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Action
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Drama
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Sci-Fi
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            Horror
          </Badge>
          <Button variant="outline" size="sm">
            More Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showDescription />
        ))}
      </div>
    </div>
  )
}

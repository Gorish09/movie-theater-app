import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/data"

interface MovieCardProps {
  movie: Movie
  showDescription?: boolean
}

export default function MovieCard({ movie, showDescription = false }: MovieCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{movie.title}</h3>
        <div className="mb-2 flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{movie.duration}</span>
          </div>
        </div>
        {showDescription && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{movie.description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/movies/${movie.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

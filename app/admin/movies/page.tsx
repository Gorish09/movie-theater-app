"use client"

import { useState } from "react"
import Image from "next/image"
import { useAppContext } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MovieForm from "@/components/admin/movie-form"

export default function AdminMoviesPage() {
  const { movies, deleteMovie } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<string | null>(null)

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Movies</h1>
        <Button onClick={() => setIsAddMovieOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Movie
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
            <div className="relative aspect-[2/3] w-full">
              <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-2 text-lg font-semibold">{movie.title}</h3>
              <div className="mb-2 flex flex-wrap gap-1">
                {movie.genre.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(movie.releaseDate).toLocaleDateString()} • {movie.duration}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" size="sm" onClick={() => setEditingMovie(movie.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this movie?")) {
                    deleteMovie(movie.id)
                  }
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Movie Dialog */}
      <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
          </DialogHeader>
          <MovieForm onClose={() => setIsAddMovieOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Movie Dialog */}
      <Dialog open={!!editingMovie} onOpenChange={(open) => !open && setEditingMovie(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
          </DialogHeader>
          {editingMovie && <MovieForm movieId={editingMovie} onClose={() => setEditingMovie(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

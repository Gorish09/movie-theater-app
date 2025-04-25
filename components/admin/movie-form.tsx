"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, X } from "lucide-react"

interface MovieFormProps {
  movieId?: string
  onClose: () => void
}

export default function MovieForm({ movieId, onClose }: MovieFormProps) {
  const { movies, addMovie, updateMovie } = useAppContext()

  const emptyMovie = {
    title: "",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
    genre: [""],
    language: "English",
    duration: "",
    releaseDate: new Date().toISOString().split("T")[0],
    rating: 0,
    description: "",
    cast: [{ name: "", role: "", image: "https://randomuser.me/api/portraits/men/1.jpg" }],
    director: "",
    directorImage: "https://randomuser.me/api/portraits/men/2.jpg",
  }

  const existingMovie = movieId ? movies.find((m) => m.id === movieId) : null

  const [formData, setFormData] = useState(existingMovie || emptyMovie)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...formData.genre]
    newGenres[index] = value
    setFormData({ ...formData, genre: newGenres })
  }

  const addGenre = () => {
    setFormData({ ...formData, genre: [...formData.genre, ""] })
  }

  const removeGenre = (index: number) => {
    const newGenres = [...formData.genre]
    newGenres.splice(index, 1)
    setFormData({ ...formData, genre: newGenres })
  }

  const handleCastChange = (index: number, field: string, value: string) => {
    const newCast = [...formData.cast]
    newCast[index] = { ...newCast[index], [field]: value }
    setFormData({ ...formData, cast: newCast })
  }

  const addCastMember = () => {
    setFormData({
      ...formData,
      cast: [
        ...formData.cast,
        {
          name: "",
          role: "",
          image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "women" : "men"}/${Math.floor(Math.random() * 99) + 1}.jpg`,
        },
      ],
    })
  }

  const removeCastMember = (index: number) => {
    const newCast = [...formData.cast]
    newCast.splice(index, 1)
    setFormData({ ...formData, cast: newCast })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty genres
    const cleanedData = {
      ...formData,
      genre: formData.genre.filter((g) => g.trim() !== ""),
      cast: formData.cast.filter((c) => c.name.trim() !== "" && c.role.trim() !== ""),
    }

    if (movieId) {
      updateMovie(movieId, cleanedData)
    } else {
      addMovie(cleanedData)
    }

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="poster">Poster URL</Label>
        <Input id="poster" name="poster" value={formData.poster} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label>Genres</Label>
        {formData.genre.map((genre, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={genre} onChange={(e) => handleGenreChange(index, e.target.value)} placeholder="Genre" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeGenre(index)}
              disabled={formData.genre.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addGenre} className="mt-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Genre
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input id="language" name="language" value={formData.language} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 2h 15m"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Cast</Label>
        {formData.cast.map((castMember, index) => (
          <div key={index} className="rounded-md border p-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor={`cast-name-${index}`}>Name</Label>
                <Input
                  id={`cast-name-${index}`}
                  value={castMember.name}
                  onChange={(e) => handleCastChange(index, "name", e.target.value)}
                  placeholder="Actor Name"
                />
              </div>
              <div>
                <Label htmlFor={`cast-role-${index}`}>Role</Label>
                <Input
                  id={`cast-role-${index}`}
                  value={castMember.role}
                  onChange={(e) => handleCastChange(index, "role", e.target.value)}
                  placeholder="Character Name"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor={`cast-image-${index}`}>Image URL</Label>
                <Input
                  id={`cast-image-${index}`}
                  value={castMember.image}
                  onChange={(e) => handleCastChange(index, "image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeCastMember(index)}
                disabled={formData.cast.length <= 1}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addCastMember} className="mt-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Cast Member
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input id="director" name="director" value={formData.director} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="directorImage">Director Image URL</Label>
          <Input
            id="directorImage"
            name="directorImage"
            value={formData.directorImage}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{movieId ? "Update Movie" : "Add Movie"}</Button>
      </div>
    </form>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import type { Movie } from "@/lib/data"

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const container = carouselRef.current
    const scrollAmount = container.clientWidth * 0.8

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setScrollPosition(Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount))
    }
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : false

  useEffect(() => {
    const handleResize = () => {
      setScrollPosition(0)
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = 0
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      <div ref={carouselRef} className="flex gap-4 overflow-x-hidden pb-4 pt-1 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[250px] max-w-[250px] flex-shrink-0">
            <MovieCard movie={movie} showDescription />
          </div>
        ))}
      </div>
    </div>
  )
}

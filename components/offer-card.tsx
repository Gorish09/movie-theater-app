import Image from "next/image"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Offer } from "@/lib/data"

interface OfferCardProps {
  offer: Offer
}

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
        <div className="absolute right-2 top-2">
          <Badge className="bg-primary text-primary-foreground">{offer.discount}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{offer.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{offer.description}</p>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-muted px-3 py-1 font-mono text-sm">{offer.code}</div>
          <Button variant="outline" size="sm">
            Copy Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

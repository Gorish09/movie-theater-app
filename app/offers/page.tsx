import { offers } from "@/lib/data"
import OfferCard from "@/components/offer-card"

export default function OffersPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Special Offers</h1>

      <div className="mb-6 rounded-lg border bg-muted/50 p-6">
        <h2 className="mb-2 text-xl font-semibold">Current Promotions</h2>
        <p className="text-muted-foreground">
          Take advantage of these limited-time offers to save on your movie tickets and concessions. Use the promo codes
          during checkout to redeem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}

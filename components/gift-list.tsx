import { getGifts } from "@/lib/gift-actions"
import GiftCard from "./gift-card"

export default async function GiftList() {
  const gifts = await getGifts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </div>
  )
}

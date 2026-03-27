import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HeroSlider from "@modules/home/components/hero-slider"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import CollectionsSlider from "@modules/home/components/collections-slider/collections-slider"

export const metadata: Metadata = {
  title: "Urbanflaky | Premium T-Shirts, Shirts & Much More for Men, Women & Kids",
  description:
    "Discover premium fashion for the whole family at Urbanflaky. Shop stylish and comfortable T-shirts, shirts, suits, and more for men, women, and kids. Explore our exclusive collections and upgrade your wardrobe with trend-forward essentials. Fast shipping and quality guaranteed!",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title, metadata",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* <Hero /> */}
      <HeroSlider />
      <CollectionsSlider />
      <div className="py-6 features-container">
        <ul className="flex flex-col gap-x-6 list-none">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}

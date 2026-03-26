"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

import { sdk } from "@lib/config"

export default function CollectionsSlider() {
  const [collections, setCollections] = useState<any[]>([])

useEffect(() => {
  const fetchCollections = async () => {
    const res = await sdk.store.collection.list({
      limit: 10,
      fields: "id,title,handle,metadata",
    })

  

    setCollections(res.collections || [])
  }

  fetchCollections()
}, [])

  return (
    <section className="py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-6">Collections</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {collections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <Link href={`/collections/${collection.handle}`}>
              <div className="group cursor-pointer">

                {/* IMAGE */}
                <div className="relative h-[320px] overflow-hidden rounded-xl">
                  <Image
                    src={
                      collection.metadata?.thumbnail ||
                      "/images/placeholder-image.png"
                    }
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent flex items-end p-4">
                    <div>
                      <h3 className="font-sans text-gray-900 text-2xl md:text-2xl font-bold">
                        {collection.title}
                      </h3>
                      <p className="font-sans text-1xl md:text-1xl text-gray-800">
                        {collection.metadata?.subtitle}
                      </p>
                      <p className="badge font-sans text-1xl md:text-1xl text-gray-800">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded absolute top-0 mt-4">
{collection.metadata?.badge}
</span>
                        
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import carData from "@/data/cars.json"
const brands = [...new Set(carData.cars.map(car => car.brand))]

export default function BrandPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Car Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link href={`/brands/${brand.toLowerCase()}`} key={brand}>
            <Card>
              <CardContent className="p-4">
                <Image src={`/images/logo/${brand}.png`} alt={brand} width={300} height={200} className="w-full h-48 object-contain rounded-md mb-2 bg-white" />
                <h2 className="text-xl font-semibold">{brand}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


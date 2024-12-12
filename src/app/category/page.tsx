import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: 'Sedan', image: '/images/BMW/M3 Competition/placeholder.jpg' },
  { name: 'Coupe', image: '/images/Subaru/BRZ 2023/placeholder.jpg' },
  { name: 'SUV', image: '/images/Mercedes-Benz/G63/placeholder.jpg' },
  { name: 'Luxury Sedan', image: '/images/BMW/M760e xDrive/placeholder.jpg' },
  { name: 'Truck', image: '/images/Tesla/Cybertruck/placeholder.jpg' },
  { name: 'Electric', image: '/images/Tesla/Model 3/placeholder.jpg' },
]

export default function CategoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Car Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category.name.toLowerCase()}`} key={category.name}>
            <Card>
              <CardContent className="p-4">
                <Image src={category.image} alt={category.name} width={300} height={200}  className="w-full h-48 object-cover rounded-md mb-2" />
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


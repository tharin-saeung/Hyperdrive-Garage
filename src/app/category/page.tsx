import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: 'Sedan', image: '/placeholder.svg?height=200&width=300' },
  { name: 'SUV', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Truck', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Sports Car', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Electric', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Luxury', image: '/placeholder.svg?height=200&width=300' },
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
                <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-md mb-2" />
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


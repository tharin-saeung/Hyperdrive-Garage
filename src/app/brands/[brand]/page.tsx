import CarCard from '@/components/CarCard'

// This is mock data. In a real application, you would fetch this based on the brand from the URL.
const brandCars = [
  { id: '1', name: 'Model 3', brand: 'Tesla', price: 41990, image: '/placeholder.svg?height=200&width=300' },
  { id: '2', name: 'Model Y', brand: 'Tesla', price: 53990, image: '/placeholder.svg?height=200&width=300' },
  { id: '3', name: 'Model S', brand: 'Tesla', price: 79990, image: '/placeholder.svg?height=200&width=300' },
  { id: '4', name: 'Model X', brand: 'Tesla', price: 89990, image: '/placeholder.svg?height=200&width=300' },
]

export default function BrandPage({ params }: { params: { brand: string } }) {
  // In a real application, you would fetch cars based on params.brand

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">{params.brand} Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  )
}


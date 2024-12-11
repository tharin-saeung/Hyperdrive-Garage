'use client'
import CarCard from '@/components/CarCard'
import carData from '@/data/cars.json'
import { useParams } from 'next/navigation';

export default function BrandPage() {
  // In a real application, you would fetch cars based on params.brand
  const params = useParams<{brand: string}>();
  const brand = decodeURIComponent(params.brand);

  const filteredCars = carData.cars.filter(car => (car.brand.toLowerCase() === brand.toLowerCase()))
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">{brand} Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      { filteredCars.map((car) => (
        <CarCard key={car.id} {...car} />
      ))}
      </div>
    </div>
  )
}


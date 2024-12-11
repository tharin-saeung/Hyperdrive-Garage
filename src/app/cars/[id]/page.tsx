'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import carData from '@/data/cars.json'
import { useParams } from 'next/navigation';
// This is mock data. In a real application, you would fetch this based on the ID from the URL.
const carDetails = {
  id: '1',
  name: 'Tesla Model 3',
  brand: 'Tesla',
  price: 41990,
  image: '/placeholder.svg?height=400&width=600',
  description: 'The Tesla Model 3 is an electric four-door fastback sedan developed by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range versions deliver 353 miles (568 km).',
  features: ['Electric', 'Autopilot', 'Dual Motor', '0-60 mph in 3.1s']
}

export default function CarDetail() {
  // In a real application, you would fetch the car details based on params.id
  const params = useParams<{id: string}>();
  const carDetails = carData.cars.find(car => car.id === params.id);

  // Handle case where car is not found
  if (!carDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Car not found</h1>
        <p>The car you are looking for does not exist. Please go back and try again.</p>
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">{carDetails.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={carDetails.image}
            alt={carDetails.name}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-xl font-semibold mb-2">{carDetails.brand}</p>
          <p className="text-2xl font-bold mb-4">${carDetails.price.toLocaleString()}</p>
          <p className="mb-4">{carDetails.description}</p>
          <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
          <ul className="list-disc list-inside mb-4">
            {Object.entries(carDetails.specifications).map(([key, value]) => (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + String(key).slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>
          <Button asChild>
            <Link href="/payment">Buy Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


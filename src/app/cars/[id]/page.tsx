'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import carData from '@/data/cars.json'
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";

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

  const generateImagePaths = (brand: string, name: string, imgCount: number) => {
    const basePath = `/images/${brand}/${name}/`;
    const imagePaths = [`${basePath}placeholder.jpg`];

    for (let i = 1; i < imgCount; i++) {
      imagePaths.push(`${basePath}${i}.jpg`);
    }

    return imagePaths;
  };

  const imgCount = carDetails.imgCount || 1; // Replace with real data or a fallback
  const imagePaths = generateImagePaths(carDetails.brand, carDetails.name, imgCount);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hideButtons, setHideButtons] = useState(imgCount > 1);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length);
  };

  useEffect(() => {
    setHideButtons(imgCount > 1); // Update button visibility if imgCount changes
  }, [imgCount]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">{carDetails.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 carouselButtons"
          >
            &lt;
          </button>
          <Image
            src={imagePaths[currentIndex]}
            alt={carDetails.name}
            width={600}
            height={400}
            className="rounded-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 carouselButtons"
          >
            &gt;
          </button>
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


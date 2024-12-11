'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import CarCard from '@/components/CarCard'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import carData from '@/data/cars.json'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')

  const filteredCars = carData.cars.filter(car => {
    const categories = Array.isArray(car.category) ? car.category : [car.category];
    return(
      (selectedCategory === 'all' || categories.includes(selectedCategory)) &&
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === 'all' || car.brand === selectedBrand)
    );
  });

  const categories = [...new Set(carData.cars.flatMap(car => Array.isArray(car.category) ? car.category : [car.category]))]
  const brands = [...new Set(carData.cars.map(car => car.brand))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-600 dark:text-yellow-400">Welcome to CarSell Thailand</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <Sidebar brands={brands} />
        </aside>
        <main className="md:w-3/4">
          <div className="mb-6 space-y-4">
            <Input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category, index) => (
                      <SelectItem key={`${category}-${index}`} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label htmlFor="brand">Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-yellow-400">Featured Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}


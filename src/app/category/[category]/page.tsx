'use client'
import CarCard from '@/components/CarCard'
import carData from '@/data/cars.json'
import { useParams } from 'next/navigation';
function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
 
export default function CategoryPageParams() {
  // In a real application, you would fetch cars based on params.category
  const params = useParams<{category: string}>();
  const category = decodeURIComponent(params.category);

  const filteredCars = carData.cars.filter(car => (car.category.includes(titleCase(category)) || car.category.includes(category.toUpperCase())))
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category} Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      { filteredCars.map((car) => (
        <CarCard key={car.id} {...car} />
      ))}
      </div>
    </div>
  )
}


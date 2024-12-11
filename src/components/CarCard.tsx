import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CarCardProps {
  id: string
  name: string
  brand: string
  price: number
  image: string
}

const CarCard: React.FC<CarCardProps> = ({ id, name, brand, price, image }) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <Image src={image} alt={name} width={300} height={200} className="w-full h-48 object-cover rounded-md" />
        <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{brand}</p>
        <p className="mt-2 text-xl font-bold text-red-600 dark:text-yellow-400">฿{price.toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black">
          <Link href={`/cars/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CarCard


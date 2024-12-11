import Link from 'next/link'

interface SidebarProps {
  brands: string[]
}

const Sidebar: React.FC<SidebarProps> = ({ brands }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-yellow-400">Car Brands</h2>
      <ul className="space-y-2">
        {brands.map((brand) => (
          <li key={brand}>
            <Link href={`/brands/${brand.toLowerCase()}`} className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-yellow-400">
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar


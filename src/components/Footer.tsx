import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold text-red-600 dark:text-yellow-400">CarSell</span>
            <p className="text-gray-400 dark:text-gray-300 text-base">
              Your trusted marketplace for buying and selling cars.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-100 tracking-wider uppercase">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/category" className="text-base text-gray-400 dark:text-gray-300 hover:text-white">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/brands" className="text-base text-gray-400 dark:text-gray-300 hover:text-white">
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link href="/service" className="text-base text-gray-400 dark:text-gray-300 hover:text-white">
                      Services
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-100 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-400 dark:text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-300 xl:text-center">
            &copy; 2023 CarSell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


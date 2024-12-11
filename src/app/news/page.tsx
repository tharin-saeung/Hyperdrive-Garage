import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

const newsArticles = [
  {
    id: 1,
    title: 'Electric Vehicle Sales Surge in 2023',
    excerpt: 'The automotive industry sees a significant increase in electric vehicle adoption...',
    date: '2023-06-15'
  },
  {
    id: 2,
    title: 'New Safety Features Becoming Standard in 2024 Models',
    excerpt: 'Car manufacturers are incorporating advanced safety technologies as standard features...',
    date: '2023-06-10'
  },
  {
    id: 3,
    title: 'The Rise of Autonomous Vehicles: What to Expect',
    excerpt: "Self-driving cars are becoming a reality. Here's what you need to know about the future of transportation...",
    date: '2023-06-05'
  },
  // Add more news articles as needed
]

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Automotive News</h1>
      <div className="space-y-6">
        {newsArticles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{article.date}</span>
                <Link href={`/news/${article.id}`} className="text-blue-600 hover:underline">
                  Read more
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


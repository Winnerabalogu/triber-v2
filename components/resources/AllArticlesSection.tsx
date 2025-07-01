"use client"

import { useState, useMemo } from "react"
import { Search, ArrowRight } from "lucide-react"
import { useModal } from "@/contexts/ModalContext"

type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryLabel: string;
  date: string;
  featured: boolean;
};

const categories = [
  { key: "all", label: "All Articles", count: 12 },
  { key: "startup-tips", label: "Startup Tips", count: 6 },
  { key: "investor-insights", label: "Investor Insights", count: 3 },
  { key: "case-study", label: "Case Study", count: 2 },
  { key: "platform-updates", label: "Platform Updates", count: 1 },
  { key: "events-webinars", label: "Events & Webinars", count: 0 },
]

const allArticles = [
  {
    id: 1,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=300&width=500",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=300&width=500",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: true,
  },
  {
    id: 3,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=200&width=300",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: false,
  },
  {
    id: 4,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=200&width=300",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: false,
  },
  {
    id: 5,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=200&width=300",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: false,
  },
  {
    id: 6,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=300&width=500",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: true,
  },
  {
    id: 7,
    title: "How to Build Investor Confidence from Day One",
    excerpt:
      "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
    image: "/placeholder.svg?height=300&width=500",
    category: "startup-tips",
    categoryLabel: "Startup Tips",
    date: "Jun 14, 2025",
    featured: true,
  },
  // Add some investor insights articles
  {
    id: 8,
    title: "Understanding Investor Psychology in 2025",
    excerpt:
      "Deep dive into what investors are really looking for in today's market. Learn the key metrics and strategies that catch their attention.",
    image: "/placeholder.svg?height=300&width=500",
    category: "investor-insights",
    categoryLabel: "Investor Insights",
    date: "Jun 12, 2025",
    featured: true,
  },
  {
    id: 9,
    title: "Valuation Trends in Tech Startups",
    excerpt:
      "Analyzing current valuation trends and what they mean for your fundraising strategy in the current market environment.",
    image: "/placeholder.svg?height=200&width=300",
    category: "investor-insights",
    categoryLabel: "Investor Insights",
    date: "Jun 10, 2025",
    featured: false,
  },
  // Add case studies
  {
    id: 10,
    title: "Case Study: How TechCorp Raised $50M Series A",
    excerpt:
      "A detailed breakdown of TechCorp's successful Series A fundraising journey, including pitch deck insights and investor feedback.",
    image: "/placeholder.svg?height=300&width=500",
    category: "case-study",
    categoryLabel: "Case Study",
    date: "Jun 8, 2025",
    featured: true,
  },
  {
    id: 11,
    title: "Platform Update: New Dashboard Features",
    excerpt:
      "Introducing our latest dashboard improvements designed to streamline your investor relations and fundraising process.",
    image: "/placeholder.svg?height=200&width=300",
    category: "platform-updates",
    categoryLabel: "Platform Updates",
    date: "Jun 5, 2025",
    featured: false,
  },
]

export default function AllArticlesSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { openModal } = useModal();

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    let filtered = allArticles

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((article) => article.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.categoryLabel.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [activeCategory, searchQuery])
  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
   const standardArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);
    const handleArticleClick = (article: Article) => {
    openModal('article-details', article);
  };
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-on-scroll animate-fadeInUp">
            All Articles
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed animate-on-scroll animate-fadeInUp animate-delay-200">
            Whether you're starting up or scaling, our insights are here to guide you at every stage helping you
            navigate challenges, make smart decisions, and grow with confidence.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-gray-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 animate-on-scroll animate-fadeInUp animate-delay-${
                    (index + 3) * 100
                  } ${
                    activeCategory === category.key
                      ? "bg-primary text-foreground"
                      : "bg-background text-muted-foreground border border-gray-700 hover:bg-gray-700 hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Featured Article (Left Column on Desktop) */}
            <div 
              className="lg:col-span-2 group cursor-pointer animate-on-scroll animate-fadeInUp"
              onClick={() => handleArticleClick(featuredArticle)}
            >
              <div className="bg-card/50 border border-border rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <div className="aspect-video overflow-hidden">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-primary text-sm font-medium">📝 {featuredArticle.categoryLabel}</span>
                    <span className="text-muted-foreground text-sm">• {featuredArticle.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl text-foreground font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{featuredArticle.excerpt}</p>
                  <div className="mt-auto text-primary font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Standard Articles (Right Column on Desktop) */}
            <div className="space-y-6">
              {standardArticles.slice(0, 3).map((article, index) => (
                <div 
                  key={article.id}
                  className="group cursor-pointer animate-on-scroll animate-fadeInUp"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="bg-card/50 border border-border rounded-2xl overflow-hidden flex transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                    <div className="w-1/3 aspect-square overflow-hidden flex-shrink-0">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-4 flex flex-col">
                      <h4 className="text-sm font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h4>
                      <p className="text-xs text-muted-foreground mt-auto">{article.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">No articles found</div>
            <p className="text-gray-500">Try adjusting your search terms or selecting a different category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

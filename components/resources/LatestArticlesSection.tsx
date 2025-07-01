"use client"
import { useModal } from "@/contexts/ModalContext";
import { ArrowRight } from "lucide-react";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime?: string; 
};

const featuredArticle: Article = {
  id: 1,
  title: "How to Build Investor Confidence from Day One",
  excerpt:
    "From team setup to product vision, here's how to make your business pitch-ready early. Lorem ipsum dolor sit amet consectetur. Consequat semper tellus semper risus nec purus. Pellentesque nulla commodo vivamus nullam ut dui.",
  image: "/placeholder.svg?height=300&width=500",
  category: "Startup Tips",
  date: "Jun 14, 2025",
  readTime: "5 min read",
};

const latestArticles: Article[] = [
  {
    id: 2,
    title: "Understanding Investor Psychology in 2025",
    excerpt: "Deep dive into what investors are really looking for in today's market. Learn the key metrics and strategies that catch their attention.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Investor Insights",
    date: "Jun 12, 2025",
  },
  {
    id: 3,
    title: "Case Study: How TechCorp Raised $50M Series A",
    excerpt: "A detailed breakdown of TechCorp's successful Series A fundraising journey, including pitch deck insights and investor feedback.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Case Study",
    date: "Jun 10, 2025",
  },
  {
    id: 4,
    title: "Platform Update: New Dashboard Features",
    excerpt: "Introducing our latest dashboard improvements designed to streamline your investor relations and fundraising process.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Platform Updates",
    date: "Jun 5, 2025",
  },
];

export default function LatestArticlesSection() {
  const { openModal } = useModal(); 
  
  const handleArticleClick = (article: Article) => {    
    openModal('article-details', { 
        ...article, 
        categoryLabel: article.category 
    });
  };

  return (
    <section className="py-12 md:py-20 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-on-scroll animate-fadeInUp">
            Resources & Insights
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto leading-relaxed animate-on-scroll animate-fadeInUp animate-delay-200">
            Actionable tips, industry trends, and expert advice to help you build a solid business foundation, scale
            with confidence, and stay investor-ready every step of the way.
          </p>
        </div>

        {/* Latest Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Featured Article */}
          <div className="animate-on-scroll animate-fadeInLeft">
            <h3 className="text-2xl font-bold text-foreground mb-8">Top Article</h3>            
            <div 
              className="bg-card/50 border border-border rounded-2xl overflow-hidden hover:bg-card/70 transition-all duration-300 hover:scale-105 group cursor-pointer"
              onClick={() => handleArticleClick(featuredArticle)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-primary text-sm font-medium">📝 {featuredArticle.category}</span>
                  <span className="text-muted-foreground text-sm">• {featuredArticle.date}</span>
                </div>
                <h4 className="text-foreground font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300">
                  {featuredArticle.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
                <div className="text-primary font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Latest Articles List */}
          <div className="animate-on-scroll animate-fadeInRight animate-delay-300">
            <h3 className="text-2xl font-bold text-foreground mb-8">Trending Posts</h3>
            <div className="space-y-6">
              {latestArticles.map((article, index) => (                
                <div
                  key={article.id}
                  className={`bg-card/50 border border-border rounded-xl overflow-hidden hover:bg-card/70 transition-all duration-300 hover:scale-105 group cursor-pointer animate-on-scroll animate-fadeInUp animate-delay-${(index + 4) * 100}`}
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex items-center space-x-4 p-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-primary text-xs font-medium">📝 {article.category}</span>
                        <span className="text-muted-foreground text-xs">• {article.date}</span>
                      </div>
                      <h4 className="text-foreground font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="text-primary text-xs font-medium flex items-center space-x-1 group-hover:space-x-2 transition-all duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
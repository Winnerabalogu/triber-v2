// OpenPositionsSection.tsx
"use client"

import { useState } from "react"
import { useModal } from "@/contexts/ModalContext"
import { ArrowRight } from "lucide-react"

// Define categories
const jobCategories = [
  { name: "All positions", key: "all" },
  { name: "Engineering", key: "engineering" },
  { name: "Product", key: "product" },
  { name: "Design", key: "design" },
  { name: "Operation", key: "operation" },
  { name: "Marketing", key: "marketing" },
]

const positions = [
    {
      title: "Full-Stack Developer",
      category: 'engineering',
      tags: ["Tartu", "Full-time"],
      description: "Due to growing workload, we are looking for experienced and talented Full-Stack Developers to join our fast-paced Engineering team. You will work closely with Product, Design and Marketing to analyze, develop, debug, test, roll-out and support new and existing product features.",
      requirements: ["3+ years in Full-Stack Development", "Proficiency in React & Node.js", "Experience with databases"],
      benefits: ["Competitive Salary", "Flexible Hours", "Health Insurance"]
    },
    {
      title: "Application developer (React Native)",
      category: 'engineering',
      tags: ["Tartu", "Full-time"],
      description: "Join our mobile team to build and maintain our cross-platform applications using React Native. You'll ensure performance, quality, and responsiveness of applications.",
      requirements: ["2+ years with React Native", "Strong understanding of mobile UI/UX", "Experience with native build tools"],
      benefits: ["Team Events", "Latest Hardware", "Professional Development Budget"]
    },
    {
      title: "Senior Product Designer",
      category: 'design',
      tags: ["Hybrid", "Tallinn", "Full-time"],
      description: "We are seeking a creative and experienced Senior Product Designer to lead the design of our core products, from concept to launch. You will own the user experience and visual design.",
      requirements: ["5+ years in Product Design", "A strong portfolio of work", "Expertise in Figma and prototyping tools"],
      benefits: ["Stock Options", "Leadership Opportunities", "Wellness Programs"]
    },
    {
      title: "Product Manager",
      category: 'product',
      tags: ["Remote", "Netherlands", "Full-time"],
      description: "Define product vision, strategy, and roadmap. You will work with cross-functional teams to design, build and roll-out products that deliver the company’s vision and strategy.",
      requirements: ["4+ years as a Product Manager in a tech company", "Experience with agile methodologies", "Excellent communication skills"],
      benefits: ["Competitive Salary", "Performance Bonus", "Remote Work Stipend"]
    },    
];

export default function OpenPositionsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { openModal } = useModal(); 
  
  const filteredPositions = activeCategory === 'all'
    ? positions
    : positions.filter(pos => pos.category === activeCategory);
  
  // Calculate counts dynamically
  const getCount = (key: string) => {
    if (key === 'all') return positions.length;
    return positions.filter(p => p.category === key).length;
  }

  const handlePositionClick = (position: any) => {
    openModal('job-details', position);
  };

  const handleLinkedInShare = () => {
    openModal('linkedin-share');
  };

  return (
    <section  id="open-positions" className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 md:mb-16 animate-on-scroll animate-fadeInUp">
          We have {positions.length} open positions now!
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Desktop Sidebar Navigation */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="space-y-2 mb-8">
              {jobCategories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-primary/10 border-l-4 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/30"
                  } animate-on-scroll animate-fadeInLeft animate-delay-${(index + 2) * 100}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm">({getCount(category.key)})</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-card/30 border border-border rounded-xl p-6 animate-on-scroll animate-fadeInLeft animate-delay-800">
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Can't find your desired position? Send us your LinkedIn profile. We will be in touch.
              </p>
              <button onClick={handleLinkedInShare} className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-card/50 transition-all duration-300 text-sm">
                Share your LinkedIn profile
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Navigation */}
          <div className="lg:hidden mb-8">
            <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
              {jobCategories.map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50"
                  } animate-on-scroll animate-fadeInUp animate-delay-${(index + 2) * 100}`}
                >
                  <span>{category.name}</span>
                  <span className="ml-1">({getCount(category.key)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {filteredPositions.length > 0 ? (
                filteredPositions.map((job, index) => (
                  <div
                    key={index}
                    onClick={() => handlePositionClick(job)} // Make the whole card clickable
                    className={`bg-card/30 border border-border rounded-xl p-6 md:p-8 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] animate-on-scroll animate-fadeInUp animate-delay-${(index + 2) * 100} hover-glow cursor-pointer`}
                  >
                    <div className="mb-4">
                      <h3 className="text-foreground font-semibold text-xl mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-background border border-border rounded-full text-xs text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="flex items-center space-x-2 text-primary">
                        <span>See position</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card/30 border border-border rounded-xl">
                    <p className="text-muted-foreground">No open positions in this category at the moment.</p>
                </div>
              )}
            </div>

            {/* Mobile LinkedIn Section */}
            <div className="lg:hidden mt-8 bg-card/30 border border-border rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Can't find your desired position? Send us your LinkedIn profile. We will be in touch.
              </p>
              <button onClick={handleLinkedInShare} className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-card/50 transition-all duration-300 text-sm">
                Share your LinkedIn profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
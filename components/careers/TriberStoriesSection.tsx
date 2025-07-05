"use client"

import { useModal } from "@/contexts/ModalContext"; 
import { ArrowRight } from "lucide-react"; 
type Story = {
  image: string;
  title: string;
  author: string;
  date: string;
  authorImage: string;
  excerpt: string;
};

const stories: Story[] = [
  {
    image: "/career/story/post1.png?height=200&width=300",
    title: "How we build the Dagmarket on 6 months",
    author: "Kaur Kaljuma",
    date: "May 20th 2020",
    authorImage:"/career/story/authur1.png?height=32&width=32",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  },
  {
    image: "/career/story/post2.png?height=200&width=300",
    title: "The last anoncement for success factory",
    author: "Raigo Tuulik",
    date: "May 20th 2020",
    authorImage:"/career/story/authur2.png?height=32&width=32",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  },
  {
    image: "/career/story/post3.png?height=200&width=300",
    title: "The Role of Repetition in Conversation Design",
    author: "Jüri Sillivask",
    date: "May 20th 2020",
    authorImage:"/career/story/authur3.png?height=32&width=32",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  },
  {
    image: "/career/story/post4.png?height=200&width=300",
    title: "What I Learned Getting Hired",
    author: "Mazdak Shakiba",
    date: "May 20th 2020",
    authorImage:"/career/story/authur4.png?height=32&width=32",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
  },
]

export default function TriberStoriesSection() {
  const { openModal } = useModal(); 

  const handleStoryClick = (story: Story) => {    
    openModal('story-details', story);
  };

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-on-scroll animate-fadeInUp">
            Stories by Tribers!
          </h2>
          <p className="text-muted-foreground animate-on-scroll animate-fadeInUp animate-delay-200">
            Read more on our blog
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stories.map((story, index) => (            
            <div
              key={index}
              onClick={() => handleStoryClick(story)}
              className={`group cursor-pointer animate-on-scroll animate-fadeInUp animate-delay-${
                (index + 2) * 100
              } touch-manipulation`}
            >
              <div className="bg-card/30 border border-border rounded-xl overflow-hidden hover:bg-card/50 transition-all duration-300 hover:scale-105 hover-glow h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-foreground font-semibold text-lg mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-primary leading-tight">
                    {story.title}
                  </h3>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                      <img
                        src={story.authorImage ||"/placeholder.svg?height=32&width=32"}
                        alt={story.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{story.author}</p>
                      <p className="text-muted-foreground text-xs">{story.date}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{story.excerpt}</p>

                  <div className="mt-auto text-primary font-medium text-sm flex items-center space-x-1 transition-colors duration-300">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
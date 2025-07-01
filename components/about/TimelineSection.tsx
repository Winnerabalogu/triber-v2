"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { X, Calendar, ArrowRight, ExternalLink } from "lucide-react"

// Extended timeline data with more details for the modal
const timelineItems = [
  {
    year: "2014",
    title: "ANNOUNCEMENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis bibendum mattis et dolor placerat in consequat. Risus leo et.",
    // Additional details for modal
    fullDate: "March 15, 2014",
    detailedDescription: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum quis ultrices. Suspendisse rutrum se mi quis. Sed mattis bibendum mattis et dolor placerat in consequat crus.",
      "Nulla quis viverra ornareursent quis vehiculaconvalis, quis vehicula urna quis. Pellentesque condementum ormi adinosu vulputate pretium. Maecenas eget magna in dolor rhoncus rhoncus.",
    ],
    image: "/placeholder.svg?height=300&width=500",
    achievements: [
      "Initial company founding",
      "Secured seed funding of $1.5M",
      "Established headquarters in San Francisco",
    ],
    link: {
      text: "Read the press release",
      url: "#",
    },
  },
  {
    year: "2016",
    title: "ANNOUNCEMENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis bibendum mattis et dolor placerat in consequat. Risus leo et.",
    // Additional details for modal
    fullDate: "June 22, 2016",
    detailedDescription: [
      "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
      "Sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.",
    ],
    image: "/placeholder.svg?height=300&width=500",
    achievements: ["Launched first product version", "Reached 10,000 active users", "Expanded team to 25 employees"],
    link: {
      text: "View product launch",
      url: "#",
    },
  },
  {
    year: "2018",
    title: "ANNOUNCEMENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis bibendum mattis et dolor placerat in consequat. Risus leo et.",
    // Additional details for modal
    fullDate: "November 8, 2018",
    detailedDescription: [
      "Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.",
      "Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.",
    ],
    image: "/placeholder.svg?height=300&width=500",
    achievements: ["Series A funding round of $12M", "Expanded to European markets", "Released mobile applications"],
    link: {
      text: "Read funding announcement",
      url: "#",
    },
  },
  {
    year: "2022",
    title: "ANNOUNCEMENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis bibendum mattis et dolor placerat in consequat. Risus leo et.",
    // Additional details for modal
    fullDate: "February 14, 2022",
    detailedDescription: [
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu.",
      "Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.",
    ],
    image: "/placeholder.svg?height=300&width=500",
    achievements: [
      "Reached 1 million active users",
      "Launched enterprise solution",
      "Opened offices in Asia and South America",
    ],
    link: {
      text: "Explore our global impact",
      url: "#",
    },
  },
]

function TimelineItem({
  item,
  index,
  isVisible,
  onClick,
}: {
  item: any
  index: number
  isVisible: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`flex transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
      }}
    >
      <div className="flex flex-col items-center mr-4 md:mr-8 flex-shrink-0">
        <div
          className={`w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full transition-all duration-500 ${
            isVisible ? "scale-100 shadow-lg shadow-primary/50" : "scale-0"
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 200 + 100}ms` : "0ms",
          }}
        ></div>
        {index < timelineItems.length - 1 && (
          <div
            className={`w-px bg-border mt-3 md:mt-4 transition-all duration-700 ${
              isVisible ? "h-16 md:h-20 bg-gradient-to-b from-primary/50 to-border" : "h-0"
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 200 + 300}ms` : "0ms",
            }}
          ></div>
        )}
      </div>
      <div className="flex-1 pb-8 md:pb-12 cursor-pointer group" onClick={onClick}>
        <h3
          className={`text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2 transition-all duration-600 group-hover:text-primary ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 200 + 200}ms` : "0ms",
          }}
        >
          {item.year}
        </h3>
        <h4
          className={`text-xs md:text-sm font-semibold text-muted-foreground tracking-wider mb-2 md:mb-3 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 200 + 300}ms` : "0ms",
          }}
        >
          {item.title}
        </h4>
        <p
          className={`text-muted-foreground text-sm md:text-sm leading-relaxed transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 200 + 400}ms` : "0ms",
          }}
        >
          {item.description}
        </p>
        <div
          className={`mt-3 inline-flex items-center text-primary text-sm font-medium opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}
        >
          <span>View details</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

function TimelineModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean
  onClose: () => void
  item: (typeof timelineItems)[0] | null
}) {
  if (!item) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div
        className={`relative bg-background border border-border rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-all duration-500 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-muted transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        {/* Image Header */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          <img
            src={item.image || "/placeholder.svg"}
            alt={`${item.year} - ${item.title}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center text-primary mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{item.fullDate}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {item.year} - {item.title}
          </h3>

          <div className="space-y-4 my-6">
            {item.detailedDescription.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Achievements */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-foreground mb-4">Key Achievements</h4>
            <ul className="space-y-2">
              {item.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link */}
          {item.link && (
            <a
              href={item.link.url}
              className="inline-flex items-center mt-8 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              {item.link.text}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TimelineSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.2 })
  const [selectedItem, setSelectedItem] = useState<(typeof timelineItems)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (item: (typeof timelineItems)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Re-enable body scrolling
    document.body.style.overflow = ""
  }

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div ref={headerRef} className="lg:pr-8">
            <h2
              className={`text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 transition-all duration-700 text-center lg:text-left ${
                headerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Timeline
            </h2>
            <p
              className={`text-muted-foreground text-sm md:text-sm leading-relaxed transition-all duration-700 delay-200 text-center lg:text-left ${
                headerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum se mi quis. Sed mattis
              bibendum mattis et dolor placerat in consequat crus. Nulla quis viverra ornareursent quis
              vehiculaconvalis, quis vehicula urna quis. Pellentesque condementum ormi adinosu vulputate pretium.
            </p>
          </div>
          <div ref={timelineRef} className="mt-8 lg:mt-0">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isVisible={timelineVisible}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <TimelineModal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </section>
  )
}

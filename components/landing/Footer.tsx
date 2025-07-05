"use client"

import { Button } from "@/components/ui/button"
import { useConfetti } from "@/components/confetti-controller"
import Link from "next/link"

export default function Footer() {
  const { triggerConfetti } = useConfetti()

  const footerLinkSections = [
    {
      title: "ABOUT US",
      links: [
        { href: "/about", label: "Team" },
        { href: "/careers", label: "Careers" },
        { href: "/research", label: "Research" },
        { href: "/partners", label: "Partners" },
      ],
    },
    {
      title: "COLLABORATIONS",
      links: [
        { href: "#collaborate-accelerators", label: "Business accelerators" },
        { href: "#collaborate-financial", label: "Financial institutions" },
        { href: "#collaborate-private-equity", label: "Private equity firms" },
        { href: "#collaborate-venture", label: "Venture services" },
      ],
    },
    {
      title: "PRODUCTS",
      links: [
        { href: "#product-fundability", label: "Fundability test" },
        { href: "#product-valuation", label: "Valuation" },
        { href: "#product-deal-room", label: "Deal room" },
        { href: "#product-database", label: "Database" },
      ],
    },
  ]

  return (
    <footer className="py-16 border-t border-border bg-background text-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {footerLinkSections.map((section) => (
              <div key={section.title} className="text-center sm:text-left">
                <h3 className="text-primary md:text-2xl font-bold font-danfo mb-5 tracking-widest uppercase">
                  {section.title}
                </h3>              
                <ul className="space-y-3 inline-block sm:block">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center border-t border-border pt-12 mt-12">          
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
            <Link href={"/auth/register"}>
            Become a Triber
            </Link>
          </h3>
          
          <Button
            className="bg-primary hover:bg-primary/80 text-foreground mb-8 px-8 py-3 text-base sm:text-lg rounded-lg font-medium"
            onClick={() =>
              triggerConfetti({
                particleCount: 200,
                spread: 100,
               colors :["#0fb492", "#ffffff", "#2d2d2d", "#0d0f11", "#979797"],
              })
            }
          >
            <Link href={"/auth/register"}>
            Try Triber for free
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Triber. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
"use client"
import Image from "next/image"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"
import AnimatedButton from "@/components/animated-button"
import NavDropdown, { type DropdownItem } from "@/components/nav-dropdown" 

const aboutDropdownItems: DropdownItem[] = [
  { name: "Our Team", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
  { name: "Connect with partners", href: "/partners" },
];

export default function Header() {
  return (
    <header className="border-b border-[#2d2d2d] sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image 
              src="/logo/logo.png" 
              width={40}
              height={32}
              alt="Triber Logo"
              className="w-10 h-8" 
          />
          <span className="font-bold text-xl"> 
            Triber
          </span>
        </Link>                       
        <nav className="hidden lgNav:flex items-center gap-8">
          <Link href="/fundability" className="text-sm hover:text-[#0fb492] transition-colors">
            Fundability test
          </Link>
          <Link href="/valuation" className="text-sm hover:text-[#0fb492] transition-colors">
            Valuation
          </Link>
          <Link href="/dealroom" className="text-sm hover:text-[#0fb492] transition-colors">
            Deal room
          </Link>
          <Link href="/research" className="text-sm hover:text-[#0fb492] transition-colors">
            Research & publications
          </Link>
                    
          <NavDropdown title="About us" items={aboutDropdownItems} />
        </nav>
        
        <div className="flex items-center gap-4">     
          <div className="lgNav:hidden">
            <MobileMenu />
          </div>      
          <AnimatedButton className="hidden lgNav:flex bg-[#0fb492] hover:bg-[#0fb492]/90 text-white" animation="pulse">
            <Link href={"/auth/register"}>
              Connect with a Partner
            </Link>
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
}
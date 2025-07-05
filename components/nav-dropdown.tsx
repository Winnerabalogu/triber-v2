// components/nav-dropdown.tsx
"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

// Define the types for our props
export interface DropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

export default function NavDropdown({ title, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm text-foreground hover:text-[#0fb492] transition-colors focus:outline-none">
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10"
          >
            <div className="py-1">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-foreground hover:text-foreground hover:bg-primary/80 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// components/mobile-menu.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define types for menu items to handle links and submenus
interface LinkMenuItem {
  name: string;
  href: string;
  subItems?: never; // Ensures subItems doesn't exist on this type
}

interface SubMenuItem {
  name: string;
  href?: never; // Ensures href doesn't exist on this type
  subItems: {
    name: string;
    href: string;
  }[];
}

type MenuItem = LinkMenuItem | SubMenuItem;


export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenSubMenu(null); 
  };
  
  const menuItems: MenuItem[] = [
    { name: "Fundability test", href: "/fundability" },
    { name: "Valuation", href: "/valuation" },
    { name: "Deal room", href: "/dealroom" },
    { name: "Research & publications", href: "/research" },
    { 
      name: "About us", 
      subItems: [
        { name: "Our Team", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact Us", href: "/contact" },
        { name: "Connect with partners", href: "/partners" },
      ]
    },
  ];
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
  };

  const panelVariants = {
    hidden: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
    visible: { x: 0, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.25, ease: "easeIn" } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 + 0.1, duration: 0.25 }
    }),
     exit: { opacity: 0, x: 20, transition: { duration: 0.15 } }
  };

  return (
    <>     
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 ring-offset-background transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="mobile-menu-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"            
              className="fixed inset-0 dark:bg-background/80 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            <motion.div
              key="mobile-menu-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"              
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-background/90 backdrop-blur-sm shadow-xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Triber</h2>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary ring-offset-1 ring-offset-card transition-all"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                <motion.ul
                  className="space-y-1 px-2"
                  initial="hidden"
                  animate="visible"
                  exit="exit" 
                >
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={listItemVariants}                    
                    >
                      {item.subItems ? (
                        <div>
                          <button
                            onClick={() => setOpenSubMenu(openSubMenu === item.name ? null : item.name)}
                            className="w-full flex justify-between items-center px-4 py-2.5 text-sm rounded-md text-muted-foreground hover:text-primary-foreground hover:bg-primary/80 transition-colors duration-150"
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${openSubMenu === item.name ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {openSubMenu === item.name && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4 mt-1 space-y-1"
                              >
                                {item.subItems.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className="block px-4 py-2.5 text-sm rounded-md text-muted-foreground/80 hover:text-primary-foreground hover:bg-primary/60 transition-colors duration-150"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-sm rounded-md text-muted-foreground hover:text-primary-foreground hover:bg-primary/80 transition-colors duration-150"
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="p-4 border-t border-border mt-auto">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {                    
                    console.log("Register clicked");
                    toggleMenu(); 
                  }}
                >
                  <Link href={"/auth/register"}>
                  Register
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils" 

interface ThemeToggleButtonProps {
  variant?: 'floating' | 'icon';
  className?: string;
}

export default function ThemeToggleButton({ variant = 'floating', className }: ThemeToggleButtonProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { 
    return <div className="w-9 h-9" />
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // --- CONDITIONAL STYLING BASED ON VARIANT ---
  const isFloating = variant === 'floating';

  const buttonClasses = isFloating
    ? "fixed bottom-6 left-4 sm:left-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
    : "p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";
  
  const iconClasses = isFloating
    ? "h-5 w-5 sm:h-6 sm:w-6"
    : "h-5 w-5";

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(buttonClasses, "focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300", className)}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}      
      key={`${resolvedTheme}-${variant}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === "dark" ? (
            <Sun className={iconClasses} />
          ) : (
            <Moon className={iconClasses} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
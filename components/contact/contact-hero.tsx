"use client"

import { useState } from "react";
import { Twitter, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

const subjectOptions = ["General Inquiry", "Fundability", "Valuation", "Assessment"];

export default function ContactHeroSection() {
  const [selectedSubject, setSelectedSubject] = useState("General Inquiry");

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">        
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Main content box */}
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">                         
            <div className="w-full lg:w-2/5 bg-background p-8 md:p-12 flex flex-col">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground mb-8">Say something to start a live chat!</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">+1012 3456 789</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">triber@gmail.com</span>
                  </div>
                   <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">132 Ikate Maiye Elegishi, Lekki Phase 1, 100001, Lagos State.</span>
                  </div>
                </div>
              </div>
              
              {/* Social Icons at the bottom */}
              <div className="flex items-center gap-4 mt-12">
                  <a href="#" className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      <Twitter className="w-5 h-5" />
                  </a>
                   <a href="#" className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                  </a>
                   <a href="#" className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                  </a>
              </div>
            </div>

            {/* Right Card: Contact Form */}
            <div className="w-full lg:w-3/5 p-8 md:p-12">
                <form className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-muted-foreground mb-1.5">First Name</label>
                            <Input id="first-name" placeholder="John" className="bg-transparent border-0 border-b px-0 " />
                        </div>
                         <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-muted-foreground mb-1.5">Last Name</label>
                            <Input id="last-name" placeholder="Doe" className="bg-transparent border-0 border-b px-0 " />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-transparent border-0 border-b px-0" />
                    </div>                    
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-4">Select Subject</label>
                        <div className="flex flex-wrap gap-x-6 gap-y-4">
                            {subjectOptions.map((subject) => (
                                <div key={subject} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        id={subject} 
                                        name="subject" 
                                        value={subject}
                                        checked={selectedSubject === subject}
                                        onChange={() => setSelectedSubject(subject)}
                                        className="hidden"
                                    />
                                    <label 
                                        htmlFor={subject}
                                        className="flex items-center cursor-pointer text-sm"
                                    >
                                        <span className={cn(
                                            "w-3 h-3 mr-2 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200",
                                            selectedSubject === subject ? "border bg-primary" : "border-muted-foreground"
                                        )}>
                                            {selectedSubject === subject && <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>}
                                        </span>
                                        <span className={cn(selectedSubject === subject ? "text-primary font-semibold" : "text-muted-foreground")}>
                                            {subject}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                        <Textarea id="message" placeholder="Write your message..." rows={4} className="bg-transparent border-0 border-b px-0"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="px-8 py-3 w-full sm:w-auto  text-foreground">Send Message</Button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
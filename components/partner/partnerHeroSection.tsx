"use client"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"; 

const partnerLogos = [
  { name: "Partner 1", logo: "/images/partners/access.png?height=40&width=100" },
  { name: "Partner 2", logo: "/images/partners/fcmb.png?height=40&width=100" },
  { name: "Partner 3", logo: "/images/partners/gtbank.png?height=40&width=100" },
  { name: "Partner 4", logo: "/images/partners/pecan.png?height=40&width=100" },
  { name: "Partner 5", logo: "/images/partners/providus.png?height=40&width=100" },
  { name: "Partner 6", logo: "/images/partners/wema.png?height=40&width=100" },
  { name: "Partner 7", logo: "/images/partners/fcmb.png?height=40&width=100" },
  { name: "Partner 8", logo: "/images/partners/stanbic.png?height=40&width=100" },
  { name: "Partner 9", logo: "/images/partners/pecan.png?height=40&width=100" },
  { name: "Partner 10", logo: "/images/partners/sterling.png?height=40&width=100" },
];

export default function ConnectPartnersSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <h3 className="text-lg font-bold text-primary mb-4">CONNECT WITH PARTNERS</h3>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Connect directly with Our Partners</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt.
            </p>
        </div>
        
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">                        
            <div className="w-full lg:w-3/5 p-8 md:p-12 lg:order-2">
                <form className="space-y-6">
                    
                    {/* --- NEW TITLE ADDED HERE --- */}
                    <h2 className="text-xl font-bold text-foreground mb-6">Connect directly with our partners</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="business-name" className="block text-sm font-medium text-muted-foreground mb-1.5">Business name</label>
                            <Input id="business-name" placeholder="Your Company LLC" />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email address</label>
                            <Input id="email" type="email" placeholder="contact@company.com" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1.5">Phone number</label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="sm:col-span-1">
                            <label htmlFor="registration" className="block text-sm font-medium text-muted-foreground mb-1.5">Business Registration</label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cac">CAC</SelectItem>
                                    <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                                    <SelectItem value="llc">LLC</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="turnover" className="block text-sm font-medium text-muted-foreground mb-1.5">Annual Turnover ($)</label>
                            <Input id="turnover" placeholder="e.g., 500,000" />
                        </div>
                        <div className="sm:col-span-1">
                             <label htmlFor="funding" className="block text-sm font-medium text-muted-foreground mb-1.5">Funding Requirement ($)</label>
                            <Input id="funding" placeholder="e.g., 100,000" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Enter text here...</label>
                        <Textarea id="message" placeholder="Tell us about your business and partnership goals..." rows={5} />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit" className="px-8 py-3 w-full sm:w-auto bg-primary text-foreground hover:bg-primary/90">Submit</Button>
                    </div>
                </form>
            </div>                        
            <div className="w-full lg:w-2/5 bg-background p-8 md:p-12 lg:order-1">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">Our Trusted Partners</h3>
                <p className="text-muted-foreground text-sm mt-1">Join a network of industry leaders.</p>
              </div>
              <div className="grid grid-cols-2 grid-rows-5 gap-4">
                {partnerLogos.map((partner, index) => (
                    <div key={index} className="bg-slate-900 border border-border rounded-lg h-16 flex items-center justify-center p-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                        <img src={partner.logo} alt={partner.name} className="max-h-8 object-contain" />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
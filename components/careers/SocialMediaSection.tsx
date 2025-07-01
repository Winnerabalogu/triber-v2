import { Facebook, Youtube, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image";

const socialPosts = [
  {
    name: "title",
    title: "Follow us on social to see what we're up to!",
  },
  {
    name: "socialphoto",
    image: "/career/social/socialphoto.png?height=150&width=150",
  },
  {
    name: "portrait",
    image: "/career/social/portrait.png?height=150&width=150",
  },
  {
    name: "team-large",
    image: "/career/social/firstimage.png?height=200&width=200",
  },
  {
    name: "firstdots",
    image: "/career/social/firstdots.png?height=100&width=200",
  },
  {
    name: "abstract",
    image: "/career/social/seconddots.png?height=150&width=150",
  },
]

const socialLinks = [
  { icon: Facebook, name: "Facebook", url: "#" },
  { icon: Youtube, name: "Youtube", url: "#" },
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
  { icon: Linkedin, name: "LinkedIn", url: "#" },
]

const getImageByName = (name: string) => socialPosts.find(p => p.name === name)?.image || "/placeholder.svg";

export default function SocialMediaSection() {
  const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={`relative  bg-card/30 border border-border rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10 ${className}`}>
      {children}
    </div>
  );

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">                
        <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-1 gap-4 auto-rows-[235px]">
          
          <Card className="lg:col-span-2 p-6 flex items-center justify-center animate-on-scroll animate-fadeInUp">
            <h2 className="text-6xl text-foreground leading-tight">
              Follow us on social to see what we're up to!
            </h2>
          </Card>    
          <Card className="lg:row-span-2 animate-on-scroll animate-fadeInUp animate-delay-100">             
            <Image src={getImageByName('team-large')} alt="Triber team" fill sizes="(max-width: 1024px) 0vw, 25vw" className="object-cover" />
          </Card>                          
          
          <Card className="animate-on-scroll animate-fadeInUp animate-delay-200">
            <Image src={getImageByName('socialphoto')} alt="Social media snapshot" fill sizes="(max-width: 1024px) 0vw, 25vw" className="object-cover" />
          </Card>
           
          <Card className="animate-on-scroll animate-fadeInUp animate-delay-300">
            <Image src={getImageByName('portrait')} alt="Team member portrait" fill sizes="(max-width: 1024px) 0vw, 25vw" className="object-cover" />
          </Card>          
          
          <Card className="animate-on-scroll animate-fadeInUp animate-delay-400">
            <Image src={getImageByName('firstdots')} alt="Colorful dots" fill sizes="(max-width: 1024px) 0vw, 25vw" className="object-cover" />
          </Card>          
          
          <Card className="animate-on-scroll animate-fadeInUp animate-delay-500">
            <Image src={getImageByName('abstract')} alt="Abstract design" fill sizes="(max-width: 1024px) 0vw, 25vw" className="object-cover" />
          </Card>
          <Card className="p-6 flex flex-col justify-around animate-on-scroll animate-fadeInUp animate-delay-600">              
              <h2 className="text-sm font-semibold text-foreground mb-2">
                 We are eager to be in touch with you on these platforms:
              </h2>              
             <div className="grid grid-cols-2 gap-4 w-full">                  
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                      <Facebook className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                      <Youtube className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">YouTube</span>
                  </a>                  
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors group col-span-1"
                  >
                    <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                      <Twitter className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors group col-span-1"
                  >
                    <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors group col-span-1"
                  >
                    <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">LinkedIn</span>
                  </a>
                </div>
            </Card>

        </div>        
        <div className="lg:hidden">
            <h2 className="text-3xl font-bold text-foreground leading-tight text-center mb-8">
               Follow us on social
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {socialPosts.filter(p => p.image).map((post, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                        <Image src={post.image!} alt={`Social post ${index + 1}`} fill sizes="50vw" className="object-cover" />
                    </div>
                ))}
                
                <div className="aspect-square bg-card/30 border border-border rounded-xl p-4 flex flex-col justify-center">
                    <h2 className="font-semibold text-sm mb-3">Find us on:</h2>
                    <div className="space-y-2">
                        {socialLinks.map((social) => (
                            <a key={social.name} href={social.url} className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors group">
                                <div className="w-7 h-7 bg-background/50 rounded-full flex items-center justify-center border border-border group-hover:bg-primary/20">
                                    <social.icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-xs">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}
import React from 'react';
import {BusinessStep,ChallengeItem,FaqItem,Logo,Panel,Testimonial,Capability,EducationCardProps} from '@/types/index'

export const imagePanels: Panel[] = [
    { id: 0, src: "/images/education-1.png", alt: "Person working" ,title: "Connect", description: "We help SMEs and Startups by enabling them become fundable, evaluate their company with precision and generate actionable insights that drive success." },
    { id: 1, src: "/images/connect-panel1.png", alt: "Person working" , title: "Connect", description: "We help SMEs and Startups by enabling them become fundable, evaluate their company with precision and generate actionable insights that drive success." },
    { id: 2, src: "/images/connect-panel2.png", alt: "Person,Capability,EducationCardProps working", title: "Connect", description: "We help SMEs and Startups by enabling them become fundable, evaluate their company with precision and generate actionable insights that drive success." },
    { id: 3, src: "/images/education-2.png", alt: "Person working" , title: "Connect", description: "We help SMEs and Startups by enabling them become fundable, evaluate their company with precision and generate actionable insights that drive success." },
    { id: 4, src: "/images/business-woman.png", alt: "Person working", title: "Connect", description: "We help SMEs and Startups by enabling them become fundable, evaluate their company with precision and generate actionable insights that drive success." },
];

export const faqItems: FaqItem[] = [
    { question: "How does triber help my startup secure funding?", answer: "Triber provides a comprehensive platform that helps startups become more fundable by evaluating their business model, financials, market strategy, and growth potential." },
    { question: "Is my financial data secure on Triber?", answer: "Yes, we take security very seriously. All your financial data is encrypted and stored securely. We use industry-standard security protocols to ensure your information remains confidential." },
    { question: "What if my startup isn't ready for investment?", answer: "Triber offers resources and guidance to help you prepare your startup for investment. Our platform provides assessments and recommendations to improve your fundability." },
    { question: "How do I connect with investors through Triber?", answer: "Once your profile is complete and your business is assessed, you can access our network of investors who match your industry and funding requirements. Our platform facilitates introductions and meetings." },
    { question: "How quickly can deals get closed through Triber?", answer: "The timeline varies depending on your business readiness and investor interest. However, our streamlined process typically helps reduce the funding cycle compared to traditional methods." },
];

export const partnerLogos: Logo[] = [
    { name: "Access", logo: "/images/partners/access.png" },
    { name: "FCMB", logo: "/images/partners/fcmb.png" },
    { name: "Providus Bank", logo: "/images/partners/providus.png" },
    { name: "GTBank", logo: "/images/partners/gtbank.png" },
    { name: "Wema Bank", logo: "/images/partners/wema.png" },
    { name: "Pecan", logo: "/images/partners/pecan.png" },
];

export const capabilities: Capability[] = [
    {
        number: "1",
        title: "Fundability test",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        modalContent: (
            <div>
                <p className="mb-4">Our Fundability Test is a comprehensive assessment tool designed to evaluate your business's readiness for investment. It analyzes over 100 data points across your business model, financials, market strategy, and team composition.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Key Benefits:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Identify strengths and weaknesses in your business model</li>
                    <li>Receive actionable recommendations to improve investment readiness</li>
                    <li>Understand what investors in your industry are looking for</li>
                    <li>Track your progress over time with regular reassessments</li>
                </ul>
                <p className="mt-4">After completing the assessment, you'll receive a detailed report with a fundability score and personalized recommendations to enhance your business's appeal to investors.</p>
            </div>
        ),
        video: { type: "youtube" as const, url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", title: "Fundability Test Overview" }
    },
    {
        number: "2",
        title: "Valuation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        modalContent: (
            <div>
                <p className="mb-4">Our Valuation tool uses advanced algorithms and industry benchmarks to provide an accurate assessment of your business's worth. We combine multiple valuation methodologies to ensure a comprehensive evaluation.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Valuation Methods:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Discounted Cash Flow (DCF) analysis</li>
                    <li>Comparable company analysis</li>
                    <li>Precedent transaction analysis</li>
                    <li>Asset-based valuation</li>
                </ul>
                <p className="mt-4">Understanding your business's true value is essential for negotiating with investors, planning exit strategies, and making informed business decisions. Our valuation reports are recognized by leading financial institutions and investor networks.</p>
            </div>
        ),
        video: { type: "vimeo" as const, url: "https://vimeo.com/824804225", title: "Business Valuation Explained" }
    },
    {
        number: "3",
        title: "Business acceleration",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        modalContent: (
            <div>
                <p className="mb-4">Our Business Acceleration program is designed to help startups and SMEs scale rapidly and sustainably. We provide a combination of resources, mentorship, and strategic guidance tailored to your specific industry and growth stage.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Program Components:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>One-on-one mentorship with industry experts</li>
                    <li>Access to our network of partners and service providers</li>
                    <li>Growth strategy development and implementation support</li>
                    <li>Regular performance reviews and milestone tracking</li>
                </ul>
                <p className="mt-4">Businesses in our acceleration program have achieved an average growth rate of 215% within the first year. Our tailored approach ensures that you receive the specific support needed for your unique business challenges.</p>
            </div>
        ),
        video: { type: "mp4" as const, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Business Acceleration Program", poster: "/placeholder.svg?height=400&width=600" }
    },
    {
        number: "4",
        title: "Deal room",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        modalContent: (
            <div>
                <p className="mb-4">Our Deal Room is a secure, digital environment where businesses and investors can connect, share information, and negotiate deals efficiently. It streamlines the due diligence process and facilitates transparent communication.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Key Features:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Secure document sharing with granular access controls</li>
                    <li>Real-time communication tools for Q&A and negotiations</li>
                    <li>Progress tracking for due diligence and deal milestones</li>
                    <li>Digital signature capabilities for finalizing agreements</li>
                </ul>
                <p className="mt-4">The Deal Room reduces the average time to close investment rounds by 40%. It provides a professional, organized platform that impresses investors and demonstrates your business's readiness for funding.</p>
            </div>
        )
    },
];

export const testimonials: Testimonial[] = [
    { id: 1, name: "Sarah Johnson", role: "CEO", company: "TechStart Inc.", quote: "Triber transformed our fundraising process. Within 3 months, we secured the investment we needed to scale our operations. Their valuation tools gave us the confidence to negotiate from a position of strength.", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Michael Chen", role: "Founder", company: "GreenGrowth", quote: "As a first-time founder, navigating the investment landscape was overwhelming. Triber's platform simplified everything, from preparing our pitch to connecting with the right investors who understood our vision.", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Amara Okafor", role: "CFO", company: "FinEdge Solutions", quote: "The fundability test was eye-opening. It highlighted critical gaps in our business model that we needed to address. After implementing Triber's recommendations, we secured funding within weeks.", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "David Mwangi", role: "Co-founder", company: "Harvest Health", quote: "Triber's deal room feature streamlined our due diligence process and made sharing sensitive information with potential investors secure and efficient. This level of professionalism accelerated our funding timeline.", image: "/placeholder.svg?height=100&width=100" },
];

export const businessSteps: BusinessStep[] = [
    { label: "Building a business", subtitle: "We're here to help you", title: "Complete fundability assessment", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat." },
    { label: "Building a business", subtitle: "We're here to help you", title: "Connect directly with investors", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat." },
    { label: "Building a business", subtitle: "We're here to help you", title: "Sign up and evaluate your business", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat." },
];

export const educationCards: EducationCardProps[] = [
    {
        image: "/images/education-1.png",
        title: "Triber for education",
        description: "Let investors understand more to with additional resources that frame and break down all your business.",
        modalContent: (
            <div>
                <p className="mb-4">Triber for Education provides comprehensive resources designed to help entrepreneurs understand the fundamentals of business finance, investment readiness, and growth strategies.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Educational Resources:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>On-demand video courses taught by industry experts</li>
                    <li>Interactive workshops and webinars on key business topics</li>
                    <li>Comprehensive guides and templates for business planning</li>
                    <li>Case studies of successful funding journeys</li>
                </ul>
                <p className="mt-4">Our educational platform is designed to demystify the investment process and equip you with the knowledge needed to present your business effectively to potential investors. All resources are accessible 24/7 and regularly updated to reflect current market trends.</p>
            </div>
        ),
        video: { type: "youtube" as const, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Triber Education Platform Overview" },
    },
    {
        image: "/images/education-2.png",
        title: "Connect with peers",
        description: "Let investors understand more to with additional resources that frame and break down all your business.",
        modalContent: (
            <div>
                <p className="mb-4">Our peer connection platform facilitates meaningful relationships between entrepreneurs at similar stages or in complementary industries. Building a strong network is crucial for business growth and knowledge sharing.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Networking Opportunities:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Monthly virtual meetups organized by industry and region</li>
                    <li>Moderated discussion forums for specific business challenges</li>
                    <li>Peer mentorship matching based on complementary skills</li>
                    <li>Collaborative problem-solving sessions</li>
                </ul>
                <p className="mt-4">Members of our peer network report that the connections they've made have led to valuable partnerships, client referrals, and shared resources that have accelerated their growth. The diverse perspectives within our community provide insights that might not be available within your immediate business circle.</p>
            </div>
        ),
    },
    {
        image: "/images/education-3.png",
        title: "Product catalog for pitches",
        description: "Let investors understand more to with additional resources that frame and break down all your business.",
        modalContent: (
            <div>
                <p className="mb-4">Our Product Catalog for Pitches helps you showcase your offerings in a professional, investor-friendly format. It transforms technical product information into compelling investment narratives.</p>
                <h3 className="text-xl font-semibold mb-2 mt-6">Catalog Features:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Customizable templates for different product types</li>
                    <li>Guidance on highlighting market differentiation</li>
                    <li>Integration of customer testimonials and case studies</li>
                    <li>Visual representation of product roadmaps</li>
                </ul>
                <p className="mt-4">A well-structured product catalog demonstrates to investors that you have a clear understanding of your market positioning and competitive advantage. Our tools help you articulate the value proposition of your products or services in terms that resonate with investors' priorities.</p>
            </div>
        ),
        video: { type: "vimeo" as const, url: "https://vimeo.com/76979871", title: "Creating Effective Product Catalogs" },
    },
];

export const challengesData: ChallengeItem[] = [
    { title: "Poor financial access", description: "Limited access to financial resources and capital that hinders business growth and expansion opportunities." },
    { title: "Access to funding", description: "Tailored funding options for your business needs enabling you to access capital and grow your business." },
    { title: "Complex business valuation", description: "Simplified valuation processes that accurately determine your business worth without overwhelming complexity." },
    { title: "Lengthy evaluation", description: "Streamlined evaluation processes that reduce waiting times and accelerate your funding journey." },
    { title: "Right investor connection", description: "Strategic matching with investors who understand your industry and align with your business vision." },
];

export const promoVideoUrl: string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
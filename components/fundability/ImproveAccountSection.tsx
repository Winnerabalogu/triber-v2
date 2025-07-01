const improvementActions = [
  "Build a solid team",
  "Show real traction",
  "Take Assessment",
  "Know your numbers",
  "Organize your financials",
  "Define your market",
  "Clarify your business model",
  "Upload key documents",
  "Keep your profile updated",
  "Refine value proposition",
]

export default function ImproveAccountSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">          
          <div className="animate-on-scroll animate-fadeInLeft">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Improve Your Account to Be Fundable
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              To attract the right investors, your account needs to reflect a strong, investor-ready business. This
              means completing your profile with accurate information, uploading key documents, and showcasing your
              traction. The more complete and transparent your account is, the higher your chances of getting noticed
              and funded.
            </p>
          </div>

          {/* Right Action Items Grid */}
          <div className="animate-on-scroll animate-fadeInRight animate-delay-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {improvementActions.map((action, index) => (
                <div
                  key={index}
                  className={`bg-foreground border border-border rounded-lg p-4 hover:bg-card/50 transition-all duration-300 hover:scale-105 cursor-pointer hover-glow animate-on-scroll animate-fadeInUp animate-delay-${
                    (index + 4) * 100
                  }`}
                >
                  <div className="flex items-center space-x-3  ">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-background font-medium text-sm hover:text-foreground">{action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

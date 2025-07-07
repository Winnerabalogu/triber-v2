"use client"

export default function DealRoomLanding() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-background/50 border border-border p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Calculate your SME/Startup and generate professional reports</h3>
        <p className="text-sm text-muted-foreground">Our functionally offers a fast and easy way to calculate your enterprise value, to ascertain the level of fundability of your business.</p>
      </div>
      <div className="bg-background/50 border border-border p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">What Does A Low Score Signify?</h3>
        <p className="text-sm text-muted-foreground">A low score does not signal an inability to secure funding, it focuses on improvements to enable the business secure quicker, cheaper and flexible funding.</p>
      </div>
      <div className="bg-background/50 border border-border p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Why You Should Go To The Deal Room</h3>
        <p className="text-sm text-muted-foreground">Go to the Deal Room to explore active funding opportunities and connect with investors.</p>
      </div>
    </div>
  );
}
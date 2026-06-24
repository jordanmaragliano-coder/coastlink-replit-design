import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="py-16 md:py-24 md:pr-12 lg:pr-16 flex flex-col justify-center">
            <div className="inline-block font-mono text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">For General Contractors</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f2a4a] mb-4 tracking-tight leading-tight">
              Find verified crews, <br/>stay on schedule.
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Post your jobs and get bids from vetted, reliable subcontractors in your area. Stop chasing references.
            </p>
            <div>
              <Button asChild size="lg" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white rounded-md w-full sm:w-auto" data-testid="btn-hero-hire">
                <Link href="/register">I'm hiring <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
          
          <div className="py-16 md:py-24 md:pl-12 lg:pl-16 flex flex-col justify-center bg-gray-50/50">
            <div className="inline-block font-mono text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">For Subcontractors</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f2a4a] mb-4 tracking-tight leading-tight">
              Find serious jobs, <br/>build your pipeline.
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access prime commercial and residential projects. Submit your credentials once, bid on anything.
            </p>
            <div>
              <Button asChild size="lg" variant="outline" className="border-[#0f2a4a] text-[#0f2a4a] hover:bg-gray-50 rounded-md w-full sm:w-auto" data-testid="btn-hero-work">
                <Link href="/register">I'm looking for work <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
           <img 
              src="/hero-construction.png" 
              alt="Professional construction site" 
              className="w-full h-auto aspect-[21/9] object-cover rounded-md border border-border shadow-sm"
           />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f2a4a] mb-4 tracking-tight">How CoastLink works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A structured process designed to eliminate friction between prime contractors and trades.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h3 className="text-xl font-semibold text-[#0f2a4a] mb-6 flex items-center gap-2 border-b border-border pb-4">
                Hiring workflow
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Post precise scopes", desc: "Define budgets, timelines, and required trade specialities in minutes." },
                  { title: "Receive structured bids", desc: "Compare apples-to-apples proposals from verified crews." },
                  { title: "Award and execute", desc: "Award the job, share files, and manage communication in one place." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center font-mono text-sm font-medium text-[#0f2a4a]">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-[#0f2a4a] mb-6 flex items-center gap-2 border-b border-border pb-4">
                Bidding workflow
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Verify credentials once", desc: "Upload insurance, licenses, and safety docs to get the verified badge." },
                  { title: "Find matching jobs", desc: "Filter open projects by trade, location, and budget." },
                  { title: "Win steady work", desc: "Submit competitive bids and build your reputation through reviews." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center font-mono text-sm font-medium text-[#0f2a4a]">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f2a4a] mb-4 tracking-tight">Transparent pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">No hidden fees. Subcontractors always use CoastLink for free.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border border-border rounded-md p-8 bg-gray-50 flex flex-col">
              <div className="font-mono text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">Subcontractors</div>
              <div className="text-3xl font-bold text-[#0f2a4a] mb-1">Free</div>
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">Everything you need to find work.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {["Browse open jobs", "Submit unlimited bids", "Credential verification", "Public profile & reviews"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0f2a4a] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full bg-white" data-testid="btn-pricing-free">
                <Link href="/register">Create free account</Link>
              </Button>
            </div>
            
            <div className="border-2 border-[#0f2a4a] rounded-md p-8 bg-white flex flex-col relative shadow-sm">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#0f2a4a] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded">
                Most Popular
              </div>
              <div className="font-mono text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">Contractors</div>
              <div className="text-3xl font-bold text-[#0f2a4a] mb-1">$199<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">Per site office / project manager.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {["Post unlimited jobs", "Access to verified network", "Bid comparison tools", "Direct messaging & file sharing", "Review management"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0f2a4a] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white" data-testid="btn-pricing-pro">
                <Link href="/register">Start free trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

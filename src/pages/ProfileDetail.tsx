import { useParams, Link } from "wouter";
import { MOCK_USERS, MOCK_REVIEWS } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedBadge } from "@/components/ui/badges";
import { MapPin, Star, Calendar, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const { role } = useRole();
  
  const user = MOCK_USERS.find(u => u.id === id);
  if (!user || user.role !== "subcontractor") return <div>Profile not found</div>;

  const reviews = MOCK_REVIEWS.filter(r => r.targetId === user.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => history.back()} 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* Header Profile Card */}
      <div className="bg-white border border-border rounded-md shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative">
        {user.availability && (
          <div className="absolute top-6 right-6">
            <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold bg-[#f0fdf4] text-[#16a34a] border border-[#16a34a]/20 uppercase tracking-wider">
              Available
            </span>
          </div>
        )}

        <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded bg-gray-100 border border-border shrink-0">
          <AvatarImage src={user.avatarUrl} className="object-cover" />
          <AvatarFallback className="text-3xl text-muted-foreground">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0f2a4a] tracking-tight">{user.company}</h1>
            <VerifiedBadge show={user.verified} />
          </div>
          <div className="text-lg text-muted-foreground mb-4">{user.name}</div>
          
          <div className="flex flex-wrap gap-4 text-sm font-medium mb-6">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-foreground">{user.rating}</span>
              <span>({user.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Since {user.memberSince.split('-')[0]}
            </div>
            <div className="font-mono text-[#0f2a4a] bg-gray-50 border border-border px-2 py-0.5 rounded">
              ${user.hourlyRate}/hr
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.tradeSpecialties?.map((trade) => (
              <span key={trade} className="font-mono text-xs text-muted-foreground bg-gray-50 border border-border px-3 py-1 rounded">
                {trade}
              </span>
            ))}
          </div>
        </div>

        {role === "contractor" && (
          <div className="w-full md:w-auto shrink-0 md:mt-auto pt-6 border-t border-border md:border-0 md:pt-0 flex flex-col gap-3">
            <Button className="w-full md:w-40 bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">Invite to bid</Button>
            <Button variant="outline" className="w-full md:w-40 border-border">Save to list</Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white border border-border rounded-md shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-4 mb-4">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {user.bio || "No bio provided."}
            </p>
          </section>

          <section className="bg-white border border-border rounded-md shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-4 mb-4 flex items-center justify-between">
              Reviews
              <span className="text-sm font-normal text-muted-foreground font-mono">{user.reviewCount} total</span>
            </h2>
            <div className="space-y-6 divide-y divide-border">
              {reviews.map((review, i) => (
                <div key={review.id} className={i !== 0 ? "pt-6" : ""}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-[#0f2a4a]">{review.reviewerName}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{review.date}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-semibold text-[#0f2a4a]">Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Liability Insurance</span>
                {user.docs.insurance === "approved" ? <CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> : <ShieldAlert className="w-5 h-5 text-amber-500" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trade Licence</span>
                {user.docs.licence === "approved" ? <CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> : <ShieldAlert className="w-5 h-5 text-amber-500" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">WorkSafe Registration</span>
                {user.docs.worksafe === "approved" ? <CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> : <ShieldAlert className="w-5 h-5 text-amber-500" />}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-semibold text-[#0f2a4a]">Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground leading-tight mb-1">Commercial TI - Phase {i}</div>
                    <div className="text-xs text-muted-foreground">Webb Construction</div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono shrink-0 text-right">
                    2023
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export type User = {
  id: string;
  name: string;
  role: "contractor" | "subcontractor";
  company: string;
  location: string;
  tradeSpecialties?: string[];
  hourlyRate?: number;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  avatarUrl?: string;
  memberSince: string;
  docs: {
    insurance: "approved" | "pending" | "rejected" | "none";
    licence: "approved" | "pending" | "rejected" | "none";
    worksafe: "approved" | "pending" | "rejected" | "none";
  };
  bio?: string;
  availability: boolean;
};

export type Job = {
  id: string;
  title: string;
  contractorId: string;
  contractorName: string;
  trade: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  status: "draft" | "open" | "reviewing" | "awarded" | "completed";
  postedDate: string;
  bidCount: number;
  description: string;
};

export type Bid = {
  id: string;
  jobId: string;
  subcontractorId: string;
  amount: number;
  timelineDays: number;
  message: string;
  status: "pending" | "shortlisted" | "awarded" | "declined";
  dateSubmitted: string;
};

export type Review = {
  id: string;
  targetId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
};

export const MOCK_USERS: User[] = [
  {
    id: "c1",
    name: "Marcus Webb",
    role: "contractor",
    company: "Webb Construction Group",
    location: "Vancouver, BC",
    memberSince: "2023-01-15",
    docs: { insurance: "none", licence: "none", worksafe: "none" },
    availability: false,
  },
  {
    id: "s1",
    name: "Ryan Thorpe",
    role: "subcontractor",
    company: "Thorpe Electrical Services",
    location: "Vancouver, BC",
    tradeSpecialties: ["Electrical", "Wiring", "Lighting"],
    hourlyRate: 95,
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    avatarUrl: "/avatar-ryan.png",
    memberSince: "2023-03-20",
    docs: { insurance: "approved", licence: "approved", worksafe: "approved" },
    bio: "Licensed electrical contractor with over 15 years of commercial and residential experience. Fully insured and bonded. We specialize in fast, precise rough-ins and complex lighting systems.",
    availability: true,
  },
  {
    id: "s2",
    name: "Sione Tuilagi",
    role: "subcontractor",
    company: "Pacific Concrete Crew",
    location: "Burnaby, BC",
    tradeSpecialties: ["Concrete", "Formwork", "Foundations"],
    hourlyRate: 110,
    rating: 4.6,
    reviewCount: 23,
    verified: false,
    avatarUrl: "/avatar-sione.png",
    memberSince: "2023-06-10",
    docs: { insurance: "approved", licence: "pending", worksafe: "approved" },
    bio: "Professional concrete formwork and finishing crew. Specializing in high-rise residential and commercial foundations.",
    availability: true,
  },
  {
    id: "s3",
    name: "Priya Mehta",
    role: "subcontractor",
    company: "Mehta Drywall Solutions",
    location: "Surrey, BC",
    tradeSpecialties: ["Drywall", "Interior", "Taping"],
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 12,
    verified: false,
    avatarUrl: "/avatar-priya.png",
    memberSince: "2023-08-05",
    docs: { insurance: "none", licence: "none", worksafe: "none" },
    bio: "Expert drywall installation, taping, and finishing. Clean workspaces and flawless results.",
    availability: false,
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "Electrical rough-in, 3200 sqft commercial",
    contractorId: "c1",
    contractorName: "Webb Construction Group",
    trade: "Electrical",
    location: "North Vancouver, BC",
    budgetMin: 18000,
    budgetMax: 22000,
    status: "open",
    postedDate: "2024-03-10",
    bidCount: 4,
    description: "Looking for an experienced electrical crew for a commercial tenant improvement. Scope includes full rough-in, panel upgrade, and specialty lighting installation.",
  },
  {
    id: "j2",
    title: "Foundation formwork, residential high-rise phase 2",
    contractorId: "c1",
    contractorName: "Webb Construction Group",
    trade: "Concrete",
    location: "Burnaby, BC",
    budgetMin: 45000,
    budgetMax: 55000,
    status: "reviewing",
    postedDate: "2024-03-05",
    bidCount: 2,
    description: "Phase 2 of residential development. Requires highly skilled formwork crew for foundation and P1/P2 levels.",
  },
  {
    id: "j3",
    title: "Interior drywall, 8-unit residential",
    contractorId: "c1",
    contractorName: "Webb Construction Group",
    trade: "Drywall",
    location: "Surrey, BC",
    budgetMin: 12000,
    budgetMax: 16000,
    status: "draft",
    postedDate: "2024-03-12",
    bidCount: 0,
    description: "Standard boarding and taping for 8 townhome units.",
  },
  {
    id: "j4",
    title: "Roof framing, custom home",
    contractorId: "c1",
    contractorName: "Webb Construction Group",
    trade: "Framing",
    location: "West Vancouver, BC",
    budgetMin: 28000,
    budgetMax: 34000,
    status: "awarded",
    postedDate: "2024-02-28",
    bidCount: 3,
    description: "Complex roof framing for custom luxury home. Pitched and flat sections.",
  },
];

export const MOCK_BIDS: Bid[] = [
  {
    id: "b1",
    jobId: "j1",
    subcontractorId: "s1",
    amount: 19500,
    timelineDays: 12,
    message: "We have a 4-man crew ready to start next week. We've done 5 similar commercial TIs in North Van this year.",
    status: "pending",
    dateSubmitted: "2024-03-11",
  },
  {
    id: "b2",
    jobId: "j1",
    subcontractorId: "s2",
    amount: 21000,
    timelineDays: 10,
    message: "Can turn this around quickly. Have the team available immediately.",
    status: "pending",
    dateSubmitted: "2024-03-12",
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    targetId: "s1",
    reviewerId: "c1",
    reviewerName: "Marcus Webb",
    rating: 5,
    comment: "Ryan's team was exceptional. Clean site, no delays, perfect inspection pass.",
    date: "2024-01-20",
  },
  {
    id: "r2",
    targetId: "s1",
    reviewerId: "c2",
    reviewerName: "Sarah Jenkins",
    rating: 4,
    comment: "Good work overall. A bit of a communication delay early on, but they delivered exactly what we needed.",
    date: "2023-11-15",
  },
  {
    id: "r3",
    targetId: "s1",
    reviewerId: "c3",
    reviewerName: "Tom Hardy",
    rating: 5,
    comment: "Best electrical crew we've hired. Highly recommend.",
    date: "2023-09-02",
  },
];

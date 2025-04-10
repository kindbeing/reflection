export interface Engagement {
  id: number;
  clientName: string;
  description: string;
  lengthOfEngagement: string;
  color: string;
}

export const engagements: Engagement[] = [
  {
    id: 1,
    clientName: "TechSolutions Inc.",
    description: "Led development of a cloud-based analytics platform, improving data processing speed by 40%",
    lengthOfEngagement: "8 months",
    color: "#FF5722"
  },
  {
    id: 2,
    clientName: "Global Finance Group",
    description: "Redesigned transaction processing system, reducing error rates by 75% and increasing throughput",
    lengthOfEngagement: "12 months",
    color: "#2196F3"
  },
  {
    id: 3,
    clientName: "HealthCare Partners",
    description: "Built patient management system with focus on data privacy and compliance with health regulations",
    lengthOfEngagement: "14 months",
    color: "#4CAF50"
  },
  {
    id: 4,
    clientName: "EduTech Innovations",
    description: "Developed interactive learning platform serving over 50,000 students worldwide",
    lengthOfEngagement: "6 months",
    color: "#FFC107"
  },
  {
    id: 5,
    clientName: "Retail Chain Solutions",
    description: "Integrated inventory management across 200+ stores, resulting in 25% reduction in stockouts",
    lengthOfEngagement: "10 months",
    color: "#9C27B0"
  },
  {
    id: 6,
    clientName: "Startup Accelerator",
    description: "Mentored 15 early-stage startups on technical architecture and scaling strategies",
    lengthOfEngagement: "9 months",
    color: "#00BCD4"
  },
  {
    id: 7,
    clientName: "Media Streaming Platform",
    description: "Optimized content delivery network, reducing buffering incidents by 60% for 2M+ users",
    lengthOfEngagement: "7 months",
    color: "#E91E63"
  },
  {
    id: 8,
    clientName: "Government Agency",
    description: "Modernized legacy systems to meet current security standards and accessibility requirements",
    lengthOfEngagement: "18 months",
    color: "#673AB7"
  },
  {
    id: 9,
    clientName: "Automotive Innovation Lab",
    description: "Built IoT platform for vehicle telemetry data collection and real-time analytics",
    lengthOfEngagement: "11 months",
    color: "#3F51B5"
  },
  {
    id: 10,
    clientName: "International NGO",
    description: "Created disaster response coordination system deployed in four humanitarian crises",
    lengthOfEngagement: "15 months",
    color: "#009688"
  }
]; 
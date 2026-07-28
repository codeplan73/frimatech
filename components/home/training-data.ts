import {Award, type LucideIcon} from "lucide-react";

export interface TrainingCard {
  icon: LucideIcon;
  certificationName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export const trainingCards: TrainingCard[] = [
  {
    icon: Award,
    certificationName: "COMPTIA A+",
    level: "Beginner",
    description:
      "The industry standard for launching IT careers. Master hardware, operating systems, troubleshooting, and customer service skills. Perfect for entry level IT support roles.",
  },
  {
    icon: Award,
    certificationName: "COMPTIA Network+",
    level: "Intermediate",
    description:
      "Build a strong foundation in networking concepts, infrastructure, operations, and security. Ideal for network administrators and support technicians.",
  },
  {
    icon: Award,
    certificationName: "COMPTIA Security+",
    level: "Intermediate",
    description:
      "Gain core cybersecurity skills in threat management, cryptography, identity management, and risk mitigation. The gateway to security focused IT roles.",
  },
];

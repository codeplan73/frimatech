import {Wrench, Monitor, Shield, type LucideIcon} from "lucide-react";

export interface TrainingCard {
  icon: LucideIcon;
  certificationName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export const trainingCards: TrainingCard[] = [
  {
    icon: Wrench,
    certificationName: "Computer Repair Workshop",
    level: "Beginner",
    description:
      "Learn to diagnose and repair laptops and desktops in our hands on workshop. Covers hardware replacement, troubleshooting, motherboard repair, and software fixes. Attend in person at our Benin City training center.",
  },
  {
    icon: Monitor,
    certificationName: "IT Support & Networking",
    level: "Intermediate",
    description:
      "Practical workshop on setting up and managing computer networks, providing IT support, and troubleshooting common business technology issues. Physical classes with real equipment and live lab environments.",
  },
  {
    icon: Shield,
    certificationName: "Cybersecurity Essentials",
    level: "Intermediate",
    description:
      "Understand the fundamentals of cybersecurity including threat detection, data protection, and security best practices. Workshop style training with practical exercises in our physical classroom in Benin City.",
  },
];

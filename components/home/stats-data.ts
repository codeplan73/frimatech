export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {value: 500, suffix: "+", label: "Repairs Completed"},
  {value: 200, suffix: "+", label: "Students Trained"},
  {value: 50, suffix: "+", label: "Corporate Clients"},
  {value: 8, suffix: "+", label: "Years Experience"},
];

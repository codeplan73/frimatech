import Link from "next/link";
import {SearchX} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function TrainingNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="px-4 text-center">
        <SearchX className="mx-auto mb-4 h-16 w-16 text-slate-300" />
        <h1 className="mb-2 text-2xl font-bold text-[#345B58]">
          Workshop Not Found
        </h1>
        <p className="mb-6 text-slate-500">
          This workshop may no longer be available. Check our current offerings.
        </p>
        <Button asChild className="bg-[#345B58] text-white hover:bg-[#2a4a47]">
          <Link href="/training">View All Workshops</Link>
        </Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import {PackageSearch} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="px-4 text-center">
        <PackageSearch className="mx-auto mb-4 h-16 w-16 text-slate-300" />
        <h1 className="mb-2 text-2xl font-bold text-[#345B58]">
          Product Not Found
        </h1>
        <p className="mb-6 text-slate-500">
          This product may have been removed or is no longer available.
        </p>
        <Button asChild className="bg-[#345B58] text-white hover:bg-[#2a4a47]">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import {FileQuestion} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function PostNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="px-4 text-center">
        <FileQuestion className="mx-auto mb-4 h-16 w-16 text-slate-300" />
        <h1 className="mb-2 text-2xl font-bold text-[#345B58]">
          Post Not Found
        </h1>
        <p className="mb-6 text-slate-500">
          The article you are looking for does not exist or may have been moved.
        </p>
        <Button asChild className="bg-[#345B58] text-white hover:bg-[#2a4a47]">
          <Link href="/posts">Back to Blog</Link>
        </Button>
      </div>
    </div>
  );
}

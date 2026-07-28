"use client";

import {useState} from "react";
import {Mail} from "lucide-react";
import AnimateOnEnter from "@/components/AnimateOnEnter";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "react-toastify";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });
      if (res.ok) {
        toast.success("Thanks for subscribing! Check your inbox for updates.");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="newsletter-heading">
      <AnimateOnEnter>
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <div className="mb-6 inline-flex rounded-2xl bg-[#345B58]/10 p-3">
            <Mail className="h-6 w-6 text-[#345B58]" />
          </div>
          <h2
            id="newsletter-heading"
            className="mb-3 text-3xl font-bold text-[#345B58] lg:text-4xl"
          >
            Stay in the Loop
          </h2>
          <p className="mb-8 text-base text-slate-600 lg:text-lg">
            Get the latest on new courses, product arrivals, repair tips, and
            exclusive deals delivered to your inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              className="h-12 min-w-0 border-[#345B58]/20 bg-white text-sm"
            />
            <Button
              type="submit"
              disabled={subscribing}
              size="lg"
              className="h-12 flex-shrink-0 bg-[#345B58] text-white hover:bg-[#2a4a47] font-semibold"
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </AnimateOnEnter>
    </section>
  );
};

export default NewsletterCTA;

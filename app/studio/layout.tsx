export const metadata = {
   title: "Frima Technology | PC & Laptop Repairs, Accessories, and Swap Deals",
  description: "Frima Technology offers expert PC and laptop repair services, sales of computers and accessories, and convenient swap deals. Our team ensures prompt and cost-effective solutions, providing top-quality service to restore and upgrade your devices.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

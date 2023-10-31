import Navbar  from "@/components/site/navbar";
import "@/styles/site.css";
import { Providers } from "./providers";
import { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {

  const global = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/global`).then((res) => res.json())
  return {
    title: global.translations[0].name,
    description:global.translations[0].description,
    openGraph: {
      images: [...global.translations[0].images],
    },
  }
}




export default function RootLayout({
  children
}: {
  children: React.ReactNode;
 
}) {
  return (
      <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
      </Providers>
  
  );
}

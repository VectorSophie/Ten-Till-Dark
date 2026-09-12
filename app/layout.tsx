import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Ten Till Dark — A Duel at Sundown",description:"A first-person polygonal Western duel. Read the hands, trace your action, and survive ten exchanges before sundown.",icons:{icon:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='5' fill='%23212523'/%3E%3Ctext x='20' y='29' text-anchor='middle' font-size='27' fill='%23e9c894' font-family='serif'%3EX%3C/text%3E%3C/svg%3E"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

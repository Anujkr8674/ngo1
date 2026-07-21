import type { Metadata } from "next";
import { inter, outfit } from "./fonts";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
 title: {
 default: "Live 4 Help Foundation | Best NGO in Delhi for Child Education & Healthcare",
 template: "%s | Live 4 Help Foundation"
 },
 description: "Support the Live 4 Help organization, the best NGO in Delhi. We address healthcare, underprivileged child education, coastal mangrove plantation, and relief work to empower local communities.",
 keywords: ["NGO in Delhi", "Child Education NGO", "Elderly Healthcare Support", "Mangrove Plantation Sundarbans", "Charity", "Live 4 Help Foundation", "Volunteering India", "CSR partner Delhi"],
 authors: [{ name: "Live 4 Help Foundation" }],
 openGraph: {
 title: "Live 4 Help Foundation | Best NGO in Delhi",
 description: "Empowering underprivileged communities in Delhi and across India through education, healthcare, and environmental conservation.",
 url: "https://live4help.org/",
 siteName: "Live 4 Help Foundation",
 images: [
 {
 url: "/logo/logo.jpg",
 width: 1200,
 height: 630,
 alt: "Live 4 Help Foundation - Selfless Service",
 },
 ],
 locale: "en_US",
 type: "website",
 },
 twitter: {
 card: "summary_large_image",
 title: "Live 4 Help Foundation | Best NGO in Delhi",
 description: "Empowering communities through child education, elderly care, healthcare, and mangrove restoration.",
 images: ["/logo/logo.jpg"],
 },
 alternates: {
 canonical: "https://live4help.org/",
 },
};

import LayoutWrapper from "./components/LayoutWrapper";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 // JSON-LD Organization & NGO schema
 const schemaOrg = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "NGO",
 "@id": "https://live4help.org/#organization",
 "name": "LIVE 4 HELP FOUNDATION",
 "url": "https://live4help.org/",
 "logo": "/logo/logo.jpg",
 "sameAs": [
 "https://www.facebook.com/live4help.org/?ref=page_internal"
 ],
 "contactPoint": [
 {
 "@type": "ContactPoint",
 "telephone": "+91-9810745206",
 "contactType": "customer support",
 "email": "live4help.org@gmail.com",
 "areaServed": "IN",
 "availableLanguage": ["en", "hi"]
 }
 ],
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "C-504, Sea Show CGHS Ltd. Plot No. 14, Sector -19B, Dwarka",
 "addressLocality": "New Delhi",
 "postalCode": "110075",
 "addressCountry": "IN"
 }
 },
 {
 "@type": "WebSite",
 "@id": "https://live4help.org/#website",
 "url": "https://live4help.org/",
 "name": "LIVE 4 HELP FOUNDATION",
 "publisher": {
 "@id": "https://live4help.org/#organization"
 }
 }
 ]
 };

 return (
 <html
 lang="en"
 className={`${inter.variable} ${outfit.variable} h-full antialiased`}
 suppressHydrationWarning
 >
 <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
 />
 </head>
 <body className="min-h-full flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
 <LayoutWrapper navbar={<Navbar />} footer={<Footer />}>
 {children}
 </LayoutWrapper>
 </body>
 </html>
 );
}

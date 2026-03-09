'use client'

import React from 'react'
import Image from 'next/image'

export function NeoMinimalFooter() {
return (
<footer className="relative z-10 border-t border-gray-800 pt-8 sm:pt-16 pb-8 px-4 sm:px-8 overflow-hidden font-heading">

{/* Purple Blur Background Effect */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#4C3BCF]/20 rounded-full blur-[150px] pointer-events-none" />

<div className="max-w-7xl mx-auto relative z-10">
<div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mb-8 sm:mb-16">

{/* Left Column - Brand & Newsletter */}
<div className="max-w-md w-full lg:w-auto">
{/* Brand */}
<div className="flex items-center gap-3 mb-4">
<Image
src="/DevPulse_LOGO_clean.png"
alt="DevSync AI Logo"
width={40}
height={40}
className="rounded-lg"
/>
<h3 className="text-2xl font-semibold text-white">
DevSync AI
</h3>
</div>

{/* Tagline */}
<p className="text-gray-400 text-sm mb-8 leading-relaxed">
Turn your GitHub commits into engaging social<br />content—automatically.
</p>

{/* Newsletter */}
<div>
<p className="text-white font-medium mb-2 sm:mb-3 text-base sm:text-lg">
Join our newsletter
</p>
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
<input
type="email"
placeholder="name@email.com"
className="bg-gray-900 border border-gray-800 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 flex-1 focus:outline-none focus:border-[#4C3BCF] transition-colors w-full sm:w-auto"
/>
<button className="bg-[#4C3BCF] hover:bg-[#4C3BCF]/80 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors text-white w-full sm:w-auto">
Subscribe
</button>
</div>
</div>
</div>

{/* Right Column - Links & Socials */}
<div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full lg:w-auto">
{/* Links */}
<div>
<h4 className="text-base font-semibold mb-4 text-white">
Links
</h4>
<ul className="space-y-3">
{["Services", "Process", "Founder Success", "Benefits"].map((link) => (
<li key={link}>
<a
href={link === "Services" ? "#powerful-features" : link === "Process" ? "#watch-devsync-ai-in-action" : "#"}
onClick={(e) => {
if (e.currentTarget instanceof HTMLAnchorElement) {
e.preventDefault()
const targetId = link === "Services" ? "powerful-features" : link === "Process" ? "watch-devsync-ai-in-action" : ""
if (targetId) {
const element = document.getElementById(targetId)
if (element) {
element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
}
}
}}
className="text-sm text-gray-400 hover:text-white transition-colors"
>
{link}
</a>
</li>
))}
</ul>
</div>

{/* Socials */}
<div>
<h4 className="text-base font-semibold mb-4 text-white">
Socials
</h4>
<ul className="space-y-3">
{[
{ name: "Instagram", url: "https://www.instagram.com/s7imshady/" },
{ name: "Facebook", url: "https://www.facebook.com/" },
{ name: "Linkedin", url: "https://www.linkedin.com/in/mohammed-tousif-342306171/" },
{ name: "Twitter", url: "https://x.com/mohammed_t41990" },
].map((social) => (
<li key={social.name}>
<a href={social.url} target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">
{social.name}
</a>
</li>
))}
</ul>
</div>
</div>
</div>

{/* Bottom Section */}
<div className="border-t border-gray-800 pt-8 flex items-center justify-center">
<p className="text-gray-400 text-sm">
Made with ❤️ by <span className="text-white">PulseSync Team</span>
</p>
</div>
</div>
</footer>
)
}

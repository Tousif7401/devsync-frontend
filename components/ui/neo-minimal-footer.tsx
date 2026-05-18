'use client'

import React from 'react'
import Image from 'next/image'

export function NeoMinimalFooter() {
return (
	<footer className="relative z-10 border-t border-white/10 pt-8 sm:pt-16 pb-8 px-4 sm:px-8 overflow-hidden bg-black/20 backdrop-blur-xl">

	{/* Action Black Blur Background Effect */}
	<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-actionBlack/5 rounded-full blur-[150px] pointer-events-none" />

	<div className="max-w-page mx-auto relative z-10">
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
		className="rounded-none"
		/>
		<h3 className="font-geist font-bold text-2xl text-white">
		DevSync AI
		</h3>
		</div>

	{/* Tagline */}
		<p className="font-geist text-body-lg leading-body-lg text-white/60 text-sm mb-8 leading-relaxed">
		Turn your GitHub commits into engaging social<br />content—automatically.
		</p>

	{/* Newsletter */}
	<div>
		<p className="font-geist font-medium text-white mb-2 sm:mb-3 text-base sm:text-lg">
		Join our newsletter
		</p>
	<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
		<input
		type="email"
		placeholder="name@email.com"
		className="bg-white/[0.03] border border-white/15 rounded-buttons px-3 sm:px-4 py-2 sm:py-2.5 font-geist text-sm sm:text-base text-white placeholder-white/40 flex-1 focus:outline-none focus:border-brand transition-colors w-full sm:w-auto"
		/>
	<button className="bg-actionBlack hover:bg-midnightInk px-4 sm:px-6 py-2 sm:py-2.5 rounded-buttons font-geist font-medium text-sm sm:text-base text-canvasWhite transition-colors w-full sm:w-auto">
		Subscribe
		</button>
		</div>
		</div>
		</div>

	{/* Right Column - Links & Socials */}
	<div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full lg:w-auto">
	{/* Links */}
	<div>
		<h4 className="font-geist font-medium text-base text-white mb-4">
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
		className="font-geist text-body-lg leading-body-lg text-white/60 hover:text-white transition-colors"
		>
		{link}
		</a>
		</li>
		))}
		</ul>
		</div>

	{/* Socials */}
	<div>
		<h4 className="font-geist font-medium text-base text-white mb-4">
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
		<a href={social.url} target="_blank" className="font-geist text-body-lg leading-body-lg text-white/60 hover:text-white transition-colors">
		{social.name}
		</a>
		</li>
		))}
		</ul>
		</div>
		</div>
		</div>

		</div>
		</footer>
		)
	}

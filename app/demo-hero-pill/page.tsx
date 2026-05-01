'use client'

import HeroPill from "@/components/ui/hero-pill"

export default function DemoHeroPill() {
  return (
    <main className="min-h-screen bg-darkBg flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          HeroPill Component Demo
        </h1>
        <p className="text-gray-400 mb-8">
          This is a demonstration of the HeroPill component. Copy this component and use it in your hero section.
        </p>

        <div className="space-y-4">
          {/* Default pill */}
          <HeroPill
            href="#"
            label="Get Started Today"
          />

          {/* With custom announcement */}
          <HeroPill
            href="#"
            label="Explore Features"
            announcement="New"
          />

          {/* Different announcement */}
          <HeroPill
            href="#"
            label="AI-Powered Content"
            announcement="Beta"
          />

          {/* Custom announcement */}
          <HeroPill
            href="#"
            label="View Demo"
            announcement="Live"
          />
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
          <p className="text-sm text-gray-400 mb-4">
            Import the component and use it anywhere in your app:
          </p>
          <div className="text-left space-y-2">
            <code className="text-sm text-gray-400 bg-black/50 p-3 rounded-lg">
              import HeroPill from "@/components/ui/hero-pill"
            </code>
            <code className="text-sm text-gray-400 bg-black/50 p-3 rounded-lg">
              {"<HeroPill />"}
            </code>
          </div>
        </div>
      </div>
    </main>
  )
}

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutModal } from "@/components/AboutModal";
import { TabSPLAdjoin } from "@/components/tabs/TabSPLAdjoin";
import { TabHillCipher } from "@/components/tabs/TabHillCipher";
import { TabLiveChallenge } from "@/components/tabs/TabLiveChallenge";
import { TabFlowchartPseudocode } from "@/components/tabs/TabFlowchartPseudocode";
import { TabComplexityAnalysis } from "@/components/tabs/TabComplexityAnalysis";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("spl-adjoin");
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#111418] text-neutral-100">
      {/* Top Navigation Bar with Embedded Author Metadata */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {activeTab === "spl-adjoin" && <TabSPLAdjoin />}
        {activeTab === "hill-cipher" && <TabHillCipher />}
        {activeTab === "live-challenge" && <TabLiveChallenge />}
        {activeTab === "pseudocode-flowchart" && <TabFlowchartPseudocode />}
        {activeTab === "complexity-analysis" && <TabComplexityAnalysis />}
      </main>

      {/* About Author & Academic Evaluation Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Application Footer */}
      <Footer />
    </div>
  );
}

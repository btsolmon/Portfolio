"use client";

import AboutMe from "@/components/AboutMe";
import ChatPanel from "@/components/ChatPanel";
import Education from "@/components/Education";
import Experiences from "@/components/Experiences";
import FluidCursor from "@/components/FluidCursor";
import Footer from "@/components/Footer";
import GitContributions from "@/components/GitContributions";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectList from "@/components/ProjectList";
import Skills from "@/components/Skills";
import StickyEmail from "@/components/StickyEmail";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";
import { useLayoutEffect } from "react";

export default function Home() {
  const chat = usePortfolioChat();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FluidCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero onAsk={chat.send} asking={chat.loading} />
        <AboutMe />
        <Skills />
        <Experiences />
        <Education />
        <ProjectList />
        <GitContributions />
      </main>
      <Footer />
      <StickyEmail />
      <ChatPanel
        open={chat.open}
        messages={chat.messages}
        loading={chat.loading}
        onSend={chat.send}
        onClose={chat.close}
        onReset={chat.reset}
      />
    </>
  );
}

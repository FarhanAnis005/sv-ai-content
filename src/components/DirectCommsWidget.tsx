"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DirectCommsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"call" | "message">("call");

  // Call booking state
  const [callDirector, setCallDirector] = useState("Executive Creative Director");
  const [callSlot, setCallSlot] = useState("Tomorrow 15:00 GMT");
  const [callName, setCallName] = useState("");
  const [callEmail, setCallEmail] = useState("");
  const [callPlatform, setCallPlatform] = useState("Google Meet");
  const [callConfirmed, setCallConfirmed] = useState(false);

  // Message state
  const [messageTopic, setMessageTopic] = useState("Budget Scoping");
  const [messageText, setMessageText] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callEmail || !callName) return;
    setCallConfirmed(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageEmail || !messageText) return;
    setMessageSent(true);
  };

  const resetForms = () => {
    setCallConfirmed(false);
    setMessageSent(false);
    setCallName("");
    setCallEmail("");
    setMessageText("");
    setMessageEmail("");
  };

  return (
    <>
      {/* Persistent Luxury Concierge Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) resetForms();
          }}
          className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-canvas-surface/90 border border-white/15 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-brand-accent/60 hover:shadow-[0_0_30px_rgba(0,229,117,0.35)] transition-all duration-300 min-h-[48px] cursor-pointer"
          aria-label="Open communication concierge to book a call or message"
        >
          {/* Pulsing Emerald Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
          </span>

          {/* Friendly Label */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs sm:text-sm font-semibold text-type-primary group-hover:text-brand-accent transition-colors">
              Book a Call or Message
            </span>
          </div>

          {/* Clean Chevron / Close Icon */}
          <svg
            className={`w-4 h-4 text-type-secondary group-hover:text-brand-accent transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
            />
          </svg>
        </button>
      </div>

      {/* Floating Interactive Comms Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-canvas-base/80 backdrop-blur-md">
            {/* Backdrop Click Dismiss */}
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 bg-canvas-surface/95 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-canvas-base/60">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-display font-bold text-base text-type-primary block">
                      Connect with Storyvord
                    </span>
                    <span className="text-xs text-type-secondary">
                      Direct access to our executive production team
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-type-secondary hover:text-white text-lg transition-colors cursor-pointer"
                  aria-label="Close concierge"
                >
                  ✕
                </button>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 border-b border-white/[0.08] bg-canvas-base/30">
                <button
                  type="button"
                  onClick={() => setActiveTab("call")}
                  className={`min-h-[44px] py-3.5 px-4 font-sans text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 select-none cursor-pointer ${
                    activeTab === "call"
                      ? "text-brand-accent border-b-2 border-brand-accent bg-canvas-surface/80"
                      : "text-type-secondary hover:text-type-primary"
                  }`}
                >
                  <span>Schedule a Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("message")}
                  className={`min-h-[44px] py-3.5 px-4 font-sans text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 select-none cursor-pointer ${
                    activeTab === "message"
                      ? "text-brand-cyan border-b-2 border-brand-cyan bg-canvas-surface/80"
                      : "text-type-secondary hover:text-type-primary"
                  }`}
                >
                  <span>Send a Message</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-7 overflow-y-auto">
                {activeTab === "call" ? (
                  callConfirmed ? (
                    <div className="py-8 flex flex-col items-center text-center gap-3">
                      <div className="w-14 h-14 rounded-full border border-brand-accent/40 bg-brand-accent/15 flex items-center justify-center text-brand-accent text-xl">
                        ✓
                      </div>
                      <h4 className="font-display text-xl font-bold text-type-primary">
                        Briefing Call Confirmed
                      </h4>
                      <p className="font-sans text-sm text-type-secondary max-w-xs leading-relaxed">
                        A calendar invitation with your {callPlatform} link has been sent to{" "}
                        <span className="text-brand-accent font-medium">{callEmail}</span>.
                      </p>
                      <div className="mt-3 p-4 rounded-xl bg-canvas-base/60 border border-white/[0.08] text-left w-full text-xs text-type-secondary space-y-1.5">
                        <div><strong className="text-type-primary">Director:</strong> {callDirector}</div>
                        <div><strong className="text-type-primary">Time:</strong> {callSlot}</div>
                        <div><strong className="text-type-primary">Platform:</strong> {callPlatform}</div>
                      </div>
                      <button
                        onClick={() => setCallConfirmed(false)}
                        className="mt-4 min-h-[44px] px-6 py-2 border border-white/10 rounded-full text-xs text-type-secondary hover:text-white transition-colors"
                      >
                        Schedule Another Call
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBookCall} className="flex flex-col gap-5">
                      {/* Focus Directorship */}
                      <div>
                        <label className="block text-xs font-semibold text-type-primary mb-2">
                          Select Directorship Focus
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "Executive Creative Director",
                            "Neural Pipeline Architect",
                            "Commercial Producer & VFX Lead",
                          ].map((d) => (
                            <button
                              type="button"
                              key={d}
                              onClick={() => setCallDirector(d)}
                              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                                callDirector === d
                                  ? "border border-brand-accent bg-brand-accent/10 text-brand-accent shadow-[0_0_15px_rgba(0,229,117,0.15)]"
                                  : "border border-white/10 bg-canvas-base/40 text-type-secondary hover:text-type-primary"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot */}
                      <div>
                        <label className="block text-xs font-semibold text-type-primary mb-2">
                          Select a Convenient Time Slot
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Today 16:30 GMT",
                            "Tomorrow 10:00 GMT",
                            "Tomorrow 15:00 GMT",
                            "Flexible / Custom",
                          ].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setCallSlot(s)}
                              className={`min-h-[44px] px-3 py-2 rounded-xl text-center text-xs font-medium transition-all ${
                                callSlot === s
                                  ? "border border-brand-cyan bg-brand-cyan/15 text-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                                  : "border border-white/10 bg-canvas-base/40 text-type-secondary hover:text-type-primary"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-xs font-medium text-type-secondary mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={callName}
                            onChange={(e) => setCallName(e.target.value)}
                            placeholder="Elena Rostova"
                            className="w-full min-h-[44px] bg-canvas-base/60 border border-white/10 rounded-xl px-3.5 text-sm text-type-primary placeholder:text-type-secondary/40 focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-type-secondary mb-1.5">
                            Work Email
                          </label>
                          <input
                            type="email"
                            required
                            value={callEmail}
                            onChange={(e) => setCallEmail(e.target.value)}
                            placeholder="elena@agency.com"
                            className="w-full min-h-[44px] bg-canvas-base/60 border border-white/10 rounded-xl px-3.5 text-sm text-type-primary placeholder:text-type-secondary/40 focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                      </div>

                      {/* Platform Choice */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-medium text-type-secondary">
                          Meeting Platform:
                        </span>
                        <div className="flex gap-2">
                          {["Google Meet", "Zoom"].map((p) => (
                            <button
                              type="button"
                              key={p}
                              onClick={() => setCallPlatform(p)}
                              className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium ${
                                callPlatform === p
                                  ? "border border-brand-accent text-brand-accent bg-brand-accent/10"
                                  : "border border-white/10 text-type-secondary"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="mt-2 min-h-[48px] w-full bg-brand-accent text-canvas-base font-sans text-sm font-semibold rounded-full hover:shadow-[0_0_25px_rgba(0,229,117,0.5)] transition-all flex items-center justify-center cursor-pointer"
                      >
                        Confirm Briefing Call →
                      </button>
                    </form>
                  )
                ) : messageSent ? (
                  <div className="py-8 flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full border border-brand-cyan/40 bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-xl">
                      ✓
                    </div>
                    <h4 className="font-display text-xl font-bold text-type-primary">
                      Message Sent
                    </h4>
                    <p className="font-sans text-sm text-type-secondary max-w-xs leading-relaxed">
                      Thank you. Your inquiry regarding{" "}
                      <span className="text-brand-cyan font-medium">{messageTopic}</span>{" "}
                      has been received. We will respond directly to {messageEmail}.
                    </p>
                    <button
                      onClick={() => setMessageSent(false)}
                      className="mt-4 min-h-[44px] px-6 py-2 border border-white/10 rounded-full text-xs text-type-secondary hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                    {/* Topic */}
                    <div>
                      <label className="block text-xs font-semibold text-type-primary mb-2">
                        How can we help?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Budget Scoping",
                          "Feasibility Review",
                          "Custom Workflows",
                          "General Inquiry",
                        ].map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setMessageTopic(t)}
                            className={`min-h-[44px] px-3 py-2 rounded-xl text-center text-xs font-medium transition-all ${
                              messageTopic === t
                                ? "border border-brand-cyan bg-brand-cyan/15 text-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                                : "border border-white/10 bg-canvas-base/40 text-type-secondary hover:text-type-primary"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-type-secondary mb-1.5">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={messageEmail}
                        onChange={(e) => setMessageEmail(e.target.value)}
                        placeholder="client@agency.com"
                        className="w-full min-h-[44px] bg-canvas-base/60 border border-white/10 rounded-xl px-3.5 text-sm text-type-primary placeholder:text-type-secondary/40 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="block text-xs font-medium text-type-secondary mb-1.5">
                        Project Overview or Note
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Briefly describe your campaign vision, visual goals, or target turnaround..."
                        className="w-full bg-canvas-base/60 border border-white/10 rounded-xl p-3.5 text-sm font-sans text-type-primary placeholder:text-type-secondary/40 focus:outline-none focus:border-brand-cyan resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="min-h-[48px] w-full bg-brand-cyan text-canvas-base font-sans text-sm font-semibold rounded-full hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center cursor-pointer"
                    >
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1a1a1a",
        borderBottom: "3px solid #00DD00",
        padding: "0 32px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#00DD00",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "1px",
          textDecoration: "none",
        }}
      >
        🏀 Hoops Hawaii
      </Link>

      <Link href="/courts" style={navLinkStyle}>
        List Courts
      </Link>
      <Link href="/team" style={navLinkStyle}>
        Looking For Team
      </Link>

      <div style={{ flex: 1 }} />

      <Link href="/login" style={navLinkStyle}>
        Log In
      </Link>
      <Link
        href="/signup"
        style={{
          color: "white",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
          padding: "7px 20px",
          borderRadius: "4px",
          border: "2px solid #00DD00",
        }}
      >
        Sign Up
      </Link>
    </nav>
  );
}

const navLinkStyle = {
  color: "#cccccc",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
  letterSpacing: "0.3px",
};

const FEATURES = [
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="36" stroke="#00DD00" strokeWidth="3" />
        <line x1="4" y1="40" x2="76" y2="40" stroke="#00DD00" strokeWidth="2.5" />
        <circle cx="40" cy="40" r="11" stroke="#00DD00" strokeWidth="2.5" />
        <path d="M40 4 Q56 22 56 40 Q56 58 40 76" stroke="#00DD00" strokeWidth="2" fill="none" />
        <path d="M40 4 Q24 22 24 40 Q24 58 40 76" stroke="#00DD00" strokeWidth="2" fill="none" />
      </svg>
    ),
    title: "Discover Courts",
    desc: "Browse a curated database of courts around UH Manoa with real-time info on conditions, player count, and availability before you head out.",
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M40 8C27.85 8 18 17.85 18 30c0 16.5 22 42 22 42s22-25.5 22-42C62 17.85 52.15 8 40 8z"
          stroke="#00DD00"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="40" cy="30" r="8" stroke="#00DD00" strokeWidth="2.5" fill="none" />
        <path d="M33 30 L37 34 L47 24" stroke="#00DD00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Check In",
    desc: "Let the community know you're at a court. See who else is playing in real-time so you never show up to an empty gym again.",
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="26" r="10" stroke="#00DD00" strokeWidth="3" fill="none" />
        <circle cx="52" cy="26" r="10" stroke="#00DD00" strokeWidth="3" fill="none" />
        <path d="M8 66c0-12 9-20 20-20s20 8 20 20" stroke="#00DD00" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M48 46c4-2 8-3 12-3 11 0 20 8 20 20" stroke="#00DD00" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    ),
    title: "Looking For Team",
    desc: "Connect with ballers who want to run. Browse open squads, join a team, or post that you need players to fill out a roster.",
  },
];

function MainContent() {
  return (
    <main
      style={{
        flex: 1,
        background: "#111111",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 40px 60px",
        minHeight: "calc(100vh - 60px - 120px)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px",
          textAlign: "center",
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}
          >
            <div>{f.icon}</div>
            <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
              {f.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#aaaaaa", lineHeight: 1.7, margin: 0, maxWidth: "260px" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#1a1a1a",
        borderTop: "3px solid #00DD00",
        padding: "28px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "14px", color: "#cccccc", margin: "0 0 3px" }}>
        Department of Information and Computer Sciences
      </p>
      <p style={{ fontSize: "14px", color: "#cccccc", margin: "0 0 3px" }}>
        University of Hawaii
      </p>
      <p style={{ fontSize: "14px", color: "#cccccc", margin: "0 0 10px" }}>
        Honolulu, HI 96822
      </p>
      <a
        href="https://ics-software-engineering.github.io/nextjs-application-template/"
        style={{ fontSize: "14px", color: "#00DD00" }}
      >
        Template Home Page
      </a>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#111111" }}>
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}
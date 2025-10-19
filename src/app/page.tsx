"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// These are just placeholders; they’ll pull from your .env.local file automatically
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "anon_key_here";

let supabase: any = null;
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.warn("Supabase credentials missing — authentication disabled.");
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [tier, setTier] = useState("free");

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) return;
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    if (!supabase) return alert("Supabase not initialized.");
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const syncTier = () => {
    try {
      setTier("pro");
    } catch (err) {
      console.error("Tier sync failed:", err);
    }
  };

  const promptPacks: Record<string, { name: string; url: string }[]> = {
    free: [{ name: "Prompt Pack of Legends (Lite)", url: "#" }],
    pro: [
      { name: "Full Prompt Pack of Legends", url: "#" },
      { name: "Debug Toolkit", url: "#" },
      { name: "Signature Frameworks", url: "#" },
      { name: "Viral Growth Hacks", url: "#" },
    ],
    agency: [
      { name: "All Pro Content", url: "#" },
      { name: "White-label Branding Templates", url: "#" },
      { name: "Private Consulting Access", url: "#" },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f0f0f, #000)",
        color: "white",
        padding: "2rem",
      }}
    >
      {!user ? (
        <div style={{ textAlign: "center", marginTop: "10rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            EngineSuite Member Access
          </h1>
          <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
            Sign in to access your prompt packs and subscription tools.
          </p>
          <button
            onClick={handleLogin}
            style={{
              background: "#9333ea",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              fontSize: "1.25rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome, {user.email}</h2>
            <button
              onClick={handleLogout}
              style={{
                background: "#222",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>

          <div
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: "1rem",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", color: "#c084fc" }}>
              Your Plan: {tier.toUpperCase()}
            </h3>
            <p style={{ color: "#aaa", marginBottom: "1rem" }}>
              Manage or upgrade your plan securely via LemonSqueezy.
            </p>
            <button
              onClick={() =>
                window.open("https://enginesuite.lemonsqueezy.com/billing", "_blank")
              }
              style={{
                background: "#4f46e5",
                color: "white",
                width: "100%",
                padding: "1rem",
                borderRadius: "0.75rem",
                marginBottom: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Manage Subscription
            </button>
            <button
              onClick={syncTier}
              style={{
                background: "#222",
                color: "white",
                width: "100%",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Refresh Membership Status
            </button>
          </div>

          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
              Your Downloads
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {promptPacks[tier].map((pack, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111",
                    border: "1px solid #333",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ color: "#c084fc", marginBottom: "1rem" }}>{pack.name}</h4>
                  <button
                    onClick={() => window.open(pack.url, "_blank")}
                    style={{
                      background: "#9333ea",
                      color: "white",
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <footer
        style={{
          textAlign: "center",
          marginTop: "4rem",
          color: "#888",
          borderTop: "1px solid #333",
          paddingTop: "1.5rem",
        }}
      >
        ⚡ Engineered by EngineX + NGIN — world-class prompt design.
      </footer>
    </div>
  );
}

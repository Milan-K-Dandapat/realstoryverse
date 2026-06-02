// src/components/Footer/Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 text-center text-zinc-400">
      <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
        <Link to="/about">About Us</Link>

        <Link to="/privacy-policy">
          Privacy Policy
        </Link>

        <Link to="/terms">
          Terms & Conditions
        </Link>

        <Link to="/contact">
          Contact Us
        </Link>
      </div>

      <p className="text-xs text-zinc-500">
        © {new Date().getFullYear()} Real Storyverse.
        All Rights Reserved.
      </p>
    </footer>
  );
}
import "./globals.css";

export const metadata = {
  title: "DesignSync | Premium Graphics Design & Social Media Curation Portfolio",
  description: "High-impact graphics design portfolio showcasing social media posts, engaging YouTube thumbnails, luxury invitation cards, premium business cards, and result-oriented Instagram account management services.",
  keywords: ["graphics design", "portfolio", "social media post", "youtube thumbnail", "invitation card", "business card", "instagram management", "gsap animations"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

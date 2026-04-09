import "./globals.css";

export const metadata = {
  title: "Hoops Hawaii",
  description: "Find your court. Find your game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#111111", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
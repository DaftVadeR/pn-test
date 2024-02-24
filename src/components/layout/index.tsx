import MenuSettingsContextProvider from "../../lib/contexts/menu";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.className} min-h-dvh h-lvh w-lvw overflow-hidden`}>
      <body className="h-lvh w-lvw overflow-y-auto">
        {children}
      </body>
    </html>
  );
}
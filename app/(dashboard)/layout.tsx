import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/dashboard/navigation/Navbar";
import NprogressProvider from "@/components/providers/nprogress-provider";
import AuthProvider from "@/components/providers/auth-provider";
import { auth } from "@/auth";
import SonnerProvider from "@/components/providers/sonner-provider";
import TopBreadcrumbs from "@/components/dashboard/TopBreadcrumbs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Starterkit",
  description: "Nextjs Starterkit by sisableng",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NprogressProvider>
              <SonnerProvider>
                <Navbar />
                <TopBreadcrumbs className="container mt-32" />
                <main className="container py-12">{children}</main>
              </SonnerProvider>
            </NprogressProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

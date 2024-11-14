// "use client";
// import * as React from "react";
// import { NextUIProvider } from "@nextui-org/system";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { ThemeProviderProps } from "next-themes/dist/types";
// import { Layout } from "../components/layout/layout";

// export interface ProvidersProps {
//   children: React.ReactNode;
//   themeProps?: ThemeProviderProps;
// }

// export function Providers({ children, themeProps }: ProvidersProps) {
//   return (
//     <NextUIProvider>
//       <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
//         <Layout>
//           {children}
//         </Layout>
//       </NextThemesProvider>
//     </NextUIProvider>
//   );
// }

"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { usePathname } from "next/navigation";
import { AdminProvider } from "./context/adminProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class">
        {isLoginPage ?
          children :
          <AdminProvider>
            <Layout>{children}</Layout>
          </AdminProvider>
        }
      </NextThemesProvider>
    </NextUIProvider>
  );
}
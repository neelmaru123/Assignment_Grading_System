import Sidebar from "../sidebar/page";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="antialiased bg-gray-200">
      <Sidebar />
      {children}
    </div>
  );
}
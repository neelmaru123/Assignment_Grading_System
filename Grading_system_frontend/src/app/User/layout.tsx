import Sidebar from "../sidebar/page";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`bg-gray-200`}>
      <Sidebar />
      {children}
    </div>
  );
}

import { Navbar } from "@/components/navbar";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

export default function RoutesLayout({ children }: RoutesLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

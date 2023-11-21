import QueryProvider from "@/context/query";

export default function DashboardLayout({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}

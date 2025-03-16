import { Sidebar } from "@/components/sidebar/sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar userType="barbeiro" />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

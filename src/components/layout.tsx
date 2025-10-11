import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { Outlet } from "react-router";
import { Toaster } from "./ui/sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Outlet />

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}

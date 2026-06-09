"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  User,
  CreditCard,
  Users,
  FolderOpen,
  ShoppingCart,
  BarChart3,
  Tags,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
];

const adminLinks = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/enrollments", label: "Enrollments", icon: FolderOpen },
];

export function DashboardSidebar({ admin = false }: { admin?: boolean }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const links = admin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-card)] min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
      <p className="text-xs text-zinc-500 mb-1">{admin ? "Admin Panel" : "Student Dashboard"}</p>
      <p className="font-medium text-sm mb-6 truncate">{user?.name}</p>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-zinc-400 hover:bg-[var(--color-secondary)] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

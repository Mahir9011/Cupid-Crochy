import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  activeTab: "dashboard" | "products" | "orders" | "settings";
}

export default function AdminLayout({
  children,
  title,
  activeTab,
}: AdminLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/admin",
      id: "dashboard",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Products",
      path: "/admin/products",
      id: "products",
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Orders",
      path: "/admin/orders",
      id: "orders",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/admin/settings",
      id: "settings",
    },
  ];

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5DDEB]/30 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 bg-[#5B1A1A] text-[#E8D7BC] flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold">Cupid Crochy</h1>
          <p className="text-sm text-[#E8D7BC]/80">Admin Panel</p>
        </div>

        <Separator className="bg-[#E8D7BC]/20" />

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === item.id ? "bg-[#E8D7BC]/20" : "hover:bg-[#E8D7BC]/10"}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#E8D7BC]/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-xl font-semibold text-[#5B1A1A]">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Site button removed */}
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#5B1A1A] text-[#E8D7BC] p-4">
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === item.id ? "bg-[#E8D7BC]/20" : "hover:bg-[#E8D7BC]/10"}`}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  </li>
                ))}
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-[#E8D7BC]/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-2">Sign Out</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

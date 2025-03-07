import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import OrderManagement from "../admin/OrderManagement";

export default function AdminOrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <OrderManagement />;
}

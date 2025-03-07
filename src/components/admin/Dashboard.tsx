import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const totalRevenue = orders.reduce(
      (sum: number, order: any) => sum + order.total,
      0,
    );
    const pendingOrders = orders.filter(
      (order: any) => order.status === "Processing",
    ).length;

    setStats({
      totalOrders: orders.length,
      totalProducts: products.length,
      totalRevenue,
      pendingOrders,
    });
  }, []);

  return (
    <AdminLayout title="Dashboard" activeTab="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5B1A1A]">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#5B1A1A]">
              {stats.totalOrders}
            </div>
            <p className="text-xs text-[#5B1A1A]/70">All time orders</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5B1A1A]">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#5B1A1A]">
              {stats.totalProducts}
            </div>
            <p className="text-xs text-[#5B1A1A]/70">Active products</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5B1A1A]">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#5B1A1A]">
              ৳{stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-[#5B1A1A]/70">All time revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5B1A1A]">
              Pending Orders
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#5B1A1A]">
              {stats.pendingOrders}
            </div>
            <p className="text-xs text-[#5B1A1A]/70">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#5B1A1A]">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.totalOrders === 0 ? (
              <p className="text-center py-4 text-[#5B1A1A]/70">
                No orders yet
              </p>
            ) : (
              <div className="space-y-4">
                {JSON.parse(localStorage.getItem("orders") || "[]")
                  .slice(0, 5)
                  .map((order: any) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium text-[#5B1A1A]">{order.id}</p>
                        <p className="text-sm text-[#5B1A1A]/70">
                          {order.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#5B1A1A]">
                          ৳{order.total.toFixed(2)}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#5B1A1A]">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.totalProducts === 0 ? (
              <p className="text-center py-4 text-[#5B1A1A]/70">
                No products yet
              </p>
            ) : (
              <div className="space-y-4">
                {JSON.parse(localStorage.getItem("products") || "[]")
                  .slice(0, 5)
                  .map((product: any) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden mr-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-[#5B1A1A]">
                          {product.name}
                        </p>
                      </div>
                      <p className="font-medium text-[#5B1A1A]">
                        ৳{product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

import { Database } from "@/types/supabase";
import { supabase } from "../../supabase/supabase";

// Re-export the supabase client
export { supabase };

// Products
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to localStorage if Supabase fails
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) return JSON.parse(storedProducts);
    } catch (e) {
      console.error("Error loading products from localStorage:", e);
    }
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    // Fallback to localStorage if Supabase fails
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        return products.find((p: any) => p.id === id);
      }
    } catch (e) {
      console.error("Error loading product from localStorage:", e);
    }
    return null;
  }
}

// Orders
export async function createOrder(orderData: any) {
  try {
    // First create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderData.id,
        email: orderData.email,
        name: orderData.name,
        address: orderData.address,
        phone: orderData.phone,
        city: orderData.city,
        notes: orderData.notes,
        total: orderData.total,
        status: orderData.status,
        date: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Then create order items
    const orderItems = orderData.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  } catch (error) {
    console.error("Error creating order in Supabase:", error);
    // Fallback to localStorage
    try {
      // Get existing orders or initialize empty array
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, orderData]),
      );
      return orderData;
    } catch (e) {
      console.error("Error saving order to localStorage:", e);
      localStorage.setItem("orders", JSON.stringify([orderData]));
      return orderData;
    }
  }
}

export async function getOrderByNumber(orderNumber: string) {
  try {
    // Get the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber)
      .single();

    if (orderError) throw orderError;

    // Get the order items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);

    if (itemsError) throw itemsError;

    return { ...order, items: items || [] };
  } catch (error) {
    console.error("Error fetching order:", error);
    // Fallback to localStorage
    try {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        return orders.find((o: any) => o.id === orderNumber);
      }
    } catch (e) {
      console.error("Error loading order from localStorage:", e);
    }
    return null;
  }
}

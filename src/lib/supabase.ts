import { Database } from "@/types/supabase";
import { supabase } from "../../supabase/supabase";

// Re-export the supabase client
export { supabase };

// Products
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) {
      // Parse JSON fields
      return data.map((product) => ({
        ...product,
        tags:
          typeof product.tags === "string"
            ? JSON.parse(product.tags)
            : Array.isArray(product.tags)
              ? product.tags
              : [],
        features:
          typeof product.features === "string"
            ? JSON.parse(product.features)
            : Array.isArray(product.features)
              ? product.features
              : [],
        careInstructions:
          typeof product.careInstructions === "string"
            ? JSON.parse(product.careInstructions)
            : Array.isArray(product.careInstructions)
              ? product.careInstructions
              : [],
        additionalImages:
          typeof product.additionalImages === "string"
            ? JSON.parse(product.additionalImages)
            : Array.isArray(product.additionalImages)
              ? product.additionalImages
              : [],
      }));
    }

    // If no products in database, create default products
    const defaultProducts = [
      {
        id: "1",
        name: "Daisy Tote Bag",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        category: "Tote",
        tags: ["summer", "floral", "large"],
        isNew: true,
        description:
          "The Daisy Tote Bag is a spacious and stylish accessory perfect for everyday use. Handcrafted with care using premium cotton yarn, this bag features a beautiful daisy pattern that adds a touch of elegance to any outfit.",
        features: [
          "Handmade with premium cotton yarn",
          "Spacious interior with inner pocket",
          "Reinforced handles for durability",
        ],
        careInstructions: [
          "Hand wash in cold water",
          "Lay flat to dry",
          "Do not bleach",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        ],
      },
      {
        id: "2",
        name: "Summer Crossbody",
        price: 64.99,
        image:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        category: "Crossbody",
        tags: ["summer", "small", "casual"],
        description:
          "The Summer Crossbody bag is perfect for those days when you want to travel light. This compact yet stylish bag features an adjustable strap and secure closure to keep your essentials safe.",
        features: [
          "Handcrafted with lightweight cotton yarn",
          "Adjustable crossbody strap",
          "Secure zipper closure",
        ],
        careInstructions: [
          "Spot clean with mild detergent",
          "Air dry only",
          "Do not iron",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
          "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=80",
        ],
      },
      {
        id: "3",
        name: "Boho Bucket Bag",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        category: "Bucket",
        tags: ["boho", "medium", "pattern"],
        isNew: true,
        isSoldOut: true,
        description:
          "Embrace bohemian style with our Boho Bucket Bag. This trendy accessory features intricate pattern work and a drawstring closure for a secure yet easy-access design.",
        features: [
          "Handcrafted with eco-friendly cotton yarn",
          "Drawstring closure with wooden beads",
          "Colorful tassel details",
        ],
        careInstructions: [
          "Hand wash in cold water",
          "Reshape while damp",
          "Air dry away from direct sunlight",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        ],
      },
    ];

    // Try to save default products to database
    try {
      await supabase.from("products").upsert(defaultProducts);
      return defaultProducts;
    } catch (insertError) {
      console.error("Error inserting default products:", insertError);
      return defaultProducts;
    }
  } catch (error) {
    console.error("Error fetching products:", error);

    // Return default products if all else fails
    return [
      {
        id: "1",
        name: "Daisy Tote Bag",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        category: "Tote",
        tags: ["summer", "floral", "large"],
        isNew: true,
        description:
          "The Daisy Tote Bag is a spacious and stylish accessory perfect for everyday use.",
        features: ["Handmade with premium cotton yarn", "Spacious interior"],
        careInstructions: ["Hand wash in cold water", "Lay flat to dry"],
        additionalImages: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        ],
      },
      {
        id: "2",
        name: "Summer Crossbody",
        price: 64.99,
        image:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        category: "Crossbody",
        tags: ["summer", "small", "casual"],
        description:
          "The Summer Crossbody bag is perfect for those days when you want to travel light.",
        features: ["Lightweight cotton yarn", "Adjustable strap"],
        careInstructions: ["Spot clean", "Air dry only"],
        additionalImages: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
          "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=80",
        ],
      },
      {
        id: "3",
        name: "Boho Bucket Bag",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        category: "Bucket",
        tags: ["boho", "medium", "pattern"],
        isNew: true,
        isSoldOut: true,
        description: "Embrace bohemian style with our Boho Bucket Bag.",
        features: ["Eco-friendly cotton yarn", "Drawstring closure"],
        careInstructions: ["Hand wash", "Reshape while damp"],
        additionalImages: [
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        ],
      },
    ];
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    // Parse JSON fields
    if (data) {
      return {
        ...data,
        tags:
          typeof data.tags === "string"
            ? JSON.parse(data.tags)
            : Array.isArray(data.tags)
              ? data.tags
              : [],
        features:
          typeof data.features === "string"
            ? JSON.parse(data.features)
            : Array.isArray(data.features)
              ? data.features
              : [],
        careInstructions:
          typeof data.careInstructions === "string"
            ? JSON.parse(data.careInstructions)
            : Array.isArray(data.careInstructions)
              ? data.careInstructions
              : [],
        additionalImages:
          typeof data.additionalImages === "string"
            ? JSON.parse(data.additionalImages)
            : Array.isArray(data.additionalImages)
              ? data.additionalImages
              : [],
      };
    }
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

    // Return a default product if all else fails
    const defaultProducts = [
      {
        id: "1",
        name: "Daisy Tote Bag",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        category: "Tote",
        tags: ["summer", "floral", "large"],
        isNew: true,
        description:
          "The Daisy Tote Bag is a spacious and stylish accessory perfect for everyday use.",
        features: ["Handmade with premium cotton yarn", "Spacious interior"],
        careInstructions: ["Hand wash in cold water", "Lay flat to dry"],
        additionalImages: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        ],
      },
      {
        id: "2",
        name: "Summer Crossbody",
        price: 64.99,
        image:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        category: "Crossbody",
        tags: ["summer", "small", "casual"],
        description:
          "The Summer Crossbody bag is perfect for those days when you want to travel light.",
        features: ["Lightweight cotton yarn", "Adjustable strap"],
        careInstructions: ["Spot clean", "Air dry only"],
        additionalImages: [
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
          "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=80",
        ],
      },
      {
        id: "3",
        name: "Boho Bucket Bag",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        category: "Bucket",
        tags: ["boho", "medium", "pattern"],
        isNew: true,
        isSoldOut: true,
        description: "Embrace bohemian style with our Boho Bucket Bag.",
        features: ["Eco-friendly cotton yarn", "Drawstring closure"],
        careInstructions: ["Hand wash", "Reshape while damp"],
        additionalImages: [
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        ],
      },
    ];

    return defaultProducts.find((p) => p.id === id) || null;
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
        status: orderData.status || "Processing",
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
    // Return the order data anyway so the UI can continue
    return orderData;
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
    return null;
  }
}

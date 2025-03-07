import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../cart/CartProvider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  ChevronLeft,
  Plus,
  Minus,
  Share2,
  Maximize2,
} from "lucide-react";
import Layout from "../layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  description?: string;
  features?: string[];
  careInstructions?: string[];
  additionalImages?: string[];
}

const getProducts = (): Product[] => {
  // Try to get products from localStorage first
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }

  // Default products if none in localStorage
  const defaultProducts: Product[] = [
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
        "The Daisy Tote Bag is a spacious and stylish accessory perfect for everyday use. Handcrafted with care using premium cotton yarn, this bag features a beautiful daisy pattern that adds a touch of elegance to any outfit. The reinforced handles ensure durability, while the spacious interior provides ample room for all your essentials.",
      features: [
        "Handmade with premium cotton yarn",
        "Spacious interior with inner pocket",
        "Reinforced handles for durability",
        'Dimensions: 16" x 14" x 5"',
        "Fully lined with cotton fabric",
      ],
      careInstructions: [
        "Hand wash in cold water",
        "Lay flat to dry",
        "Do not bleach",
        "Reshape while damp",
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
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
        "The Summer Crossbody bag is perfect for those days when you want to travel light. This compact yet stylish bag features an adjustable strap and secure closure to keep your essentials safe. The vibrant summer-inspired design adds a pop of color to any outfit.",
      features: [
        "Handcrafted with lightweight cotton yarn",
        "Adjustable crossbody strap",
        "Secure zipper closure",
        'Dimensions: 8" x 6" x 2"',
        "Inner lining with small pocket",
      ],
      careInstructions: [
        "Spot clean with mild detergent",
        "Air dry only",
        "Do not iron",
        "Store in dust bag when not in use",
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
        "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
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
      description:
        "Embrace bohemian style with our Boho Bucket Bag. This trendy accessory features intricate pattern work and a drawstring closure for a secure yet easy-access design. Perfect for festivals, beach days, or adding a boho touch to your everyday look.",
      features: [
        "Handcrafted with eco-friendly cotton yarn",
        "Drawstring closure with wooden beads",
        "Colorful tassel details",
        'Dimensions: 10" x 12" (diameter x height)',
        "Adjustable shoulder strap",
      ],
      careInstructions: [
        "Hand wash in cold water",
        "Reshape while damp",
        "Air dry away from direct sunlight",
        "Store stuffed to maintain shape",
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
      ],
    },
  ];

  return defaultProducts;
};

const products = getProducts();

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { openCart, addToCart } = useCart();

  const product = products.find((p) => p.id === id) || products[0];

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen bg-[#F5DDEB]/30">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/shop"
              className="inline-flex items-center text-[#5B1A1A] hover:text-[#5B1A1A]/80 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Shop
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl">
                  <div
                    className={`cursor-zoom-in transition-transform duration-500 ${isZoomed ? "scale-150" : "scale-100"}`}
                    onClick={toggleZoom}
                  >
                    <img
                      src={
                        product.additionalImages?.[selectedImage] ||
                        product.image
                      }
                      alt={product.name}
                      className="w-full h-[400px] object-cover rounded-xl"
                    />
                  </div>
                  <button
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    onClick={toggleZoom}
                  >
                    <Maximize2 className="h-5 w-5 text-[#5B1A1A]" />
                  </button>
                </div>

                {product.additionalImages &&
                  product.additionalImages.length > 0 && (
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {product.additionalImages.map((img, index) => (
                        <button
                          key={index}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-[#5B1A1A] scale-105" : "border-transparent opacity-70"}`}
                          onClick={() => setSelectedImage(index)}
                        >
                          <img
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-[#F5DDEB] text-[#5B1A1A] hover:bg-[#F5DDEB]/90">
                      {product.category}
                    </Badge>
                    {product.isNew && (
                      <Badge className="bg-[#5B1A1A] text-white hover:bg-[#5B1A1A]/90">
                        New Arrival
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-[#5B1A1A] mb-2">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-semibold mb-4">
                    ৳{product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-[#5B1A1A] font-medium">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={handleDecrement}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={handleIncrement}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90 rounded-xl flex-1"
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image:
                            product.image ||
                            product.additionalImages?.[0] ||
                            "",
                          quantity: quantity,
                        });
                        openCart();
                      }}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#5B1A1A] hover:bg-[#F5DDEB]/30"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="p-6 border-t">
              <Tabs defaultValue="features">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="care">Care Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#5B1A1A]">
                    Product Features
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {product.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="care" className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#5B1A1A]">
                    Care Instructions
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {product.careInstructions?.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

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

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    image: "",
    category: "",
    tags: [],
    isNew: false,
    description: "",
    features: [""],
    careInstructions: [""],
    additionalImages: [""],
  });

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // If no products in localStorage, use default products
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
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, isNew: checked });
  };

  const handleArrayInputChange = (
    field: string,
    index: number,
    value: string,
  ) => {
    const newArray = [
      ...((formData[field as keyof Product] as string[]) || []),
    ];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: string) => {
    const newArray = [
      ...((formData[field as keyof Product] as string[]) || []),
      "",
    ];
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [
      ...((formData[field as keyof Product] as string[]) || []),
    ];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setFormData({ ...formData, tags: tagsArray });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      image: "",
      category: "",
      tags: [],
      isNew: false,
      description: "",
      features: [""],
      careInstructions: [""],
      additionalImages: [""],
    });
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
    } as Product;

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? ({ ...formData, id: product.id } as Product)
        : product,
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setIsEditDialogOpen(false);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.filter(
      (product) => product.id !== selectedProduct.id,
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      tags: product.tags,
      isNew: product.isNew || false,
      description: product.description || "",
      features: product.features || [""],
      careInstructions: product.careInstructions || [""],
      additionalImages: product.additionalImages || [""],
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Product Management" activeTab="products">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (৳)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags?.join(", ")}
                    onChange={handleTagsChange}
                    placeholder="summer, floral, large"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="isNew">Mark as New Arrival</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Main Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <Label>Additional Images</Label>
                {formData.additionalImages?.map((url, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={url}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "additionalImages",
                          index,
                          e.target.value,
                        )
                      }
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("additionalImages", index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("additionalImages")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </div>

              <div>
                <Label>Features</Label>
                {formData.features?.map((feature, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "features",
                          index,
                          e.target.value,
                        )
                      }
                      placeholder="Enter feature"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("features", index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("features")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              </div>

              <div>
                <Label>Care Instructions</Label>
                {formData.careInstructions?.map((instruction, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={instruction}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "careInstructions",
                          index,
                          e.target.value,
                        )
                      }
                      placeholder="Enter care instruction"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("careInstructions", index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("careInstructions")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Instruction
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>৳{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.isNew && (
                      <Badge className="bg-[#5B1A1A] text-white">
                        New Arrival
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="edit-price">Price (৳)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>

              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter category"
                />
              </div>

              <div>
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input
                  id="edit-tags"
                  name="tags"
                  value={formData.tags?.join(", ")}
                  onChange={handleTagsChange}
                  placeholder="summer, floral, large"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-isNew"
                  checked={formData.isNew}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="edit-isNew">Mark as New Arrival</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-image">Main Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <Label>Additional Images</Label>
              {formData.additionalImages?.map((url, index) => (
                <div key={index} className="flex items-center mt-2">
                  <Input
                    value={url}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "additionalImages",
                        index,
                        e.target.value,
                      )
                    }
                    placeholder="Enter image URL"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem("additionalImages", index)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("additionalImages")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Image
              </Button>
            </div>

            <div>
              <Label>Features</Label>
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex items-center mt-2">
                  <Input
                    value={feature}
                    onChange={(e) =>
                      handleArrayInputChange("features", index, e.target.value)
                    }
                    placeholder="Enter feature"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem("features", index)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("features")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>

            <div>
              <Label>Care Instructions</Label>
              {formData.careInstructions?.map((instruction, index) => (
                <div key={index} className="flex items-center mt-2">
                  <Input
                    value={instruction}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "careInstructions",
                        index,
                        e.target.value,
                      )
                    }
                    placeholder="Enter care instruction"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem("careInstructions", index)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("careInstructions")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Instruction
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90"
              onClick={handleEditProduct}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete "{selectedProduct?.name}"? This
            action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

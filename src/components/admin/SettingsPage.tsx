import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SiteSettings {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const defaultSettings: SiteSettings = {
  heroImage:
    "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=1200&q=80",
  heroTitle: "Handcrafted Crochet Bags",
  heroSubtitle: "Made with love, carried with pride",
  companyName: "Cupid Crochy",
  companyEmail: "hello@cupidcrochy.com",
  companyPhone: "+880 1234 567890",
  companyAddress: "123 Craft Street, Dhaka, Bangladesh",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = localStorage.getItem("siteSettings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      // If no settings in localStorage, use default settings
      localStorage.setItem("siteSettings", JSON.stringify(defaultSettings));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle nested properties (social links)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent as keyof SiteSettings],
          [child]: value,
        },
      });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  const saveSettings = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AdminLayout title="Settings" activeTab="settings">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="contact">Contact & Social</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90"
              onClick={saveSettings}
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="homepage" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Homepage Settings</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <Input
                  id="heroImage"
                  name="heroImage"
                  value={settings.heroImage}
                  onChange={handleInputChange}
                />
                {settings.heroImage && (
                  <div className="mt-2 rounded-md overflow-hidden h-40">
                    <img
                      src={settings.heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  name="heroTitle"
                  value={settings.heroTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Input
                  id="heroSubtitle"
                  name="heroSubtitle"
                  value={settings.heroSubtitle}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90"
              onClick={saveSettings}
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyEmail">Email Address</Label>
                <Input
                  id="companyEmail"
                  name="companyEmail"
                  value={settings.companyEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="companyPhone">Phone Number</Label>
                <Input
                  id="companyPhone"
                  name="companyPhone"
                  value={settings.companyPhone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={settings.companyAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                <Label htmlFor="socialLinks.facebook" className="w-24">
                  Facebook
                </Label>
                <Input
                  id="socialLinks.facebook"
                  name="socialLinks.facebook"
                  value={settings.socialLinks.facebook}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center">
                <Instagram className="mr-2 h-5 w-5 text-pink-600" />
                <Label htmlFor="socialLinks.instagram" className="w-24">
                  Instagram
                </Label>
                <Input
                  id="socialLinks.instagram"
                  name="socialLinks.instagram"
                  value={settings.socialLinks.instagram}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center">
                <Twitter className="mr-2 h-5 w-5 text-blue-400" />
                <Label htmlFor="socialLinks.twitter" className="w-24">
                  Twitter
                </Label>
                <Input
                  id="socialLinks.twitter"
                  name="socialLinks.twitter"
                  value={settings.socialLinks.twitter}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-[#5B1A1A] hover:bg-[#5B1A1A]/90"
              onClick={saveSettings}
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

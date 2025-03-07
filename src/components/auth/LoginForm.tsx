import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5DDEB]/30">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#5B1A1A]">Cupid Crochy</h1>
          <p className="text-[#5B1A1A]/70 mt-2">Admin Login</p>
        </div>
        <Card className="w-full border-[#5B1A1A]/10 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 text-[#5B1A1A]">
              <LogIn className="h-5 w-5" /> Sign in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#5B1A1A]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#5B1A1A]/20 focus:border-[#5B1A1A] rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#5B1A1A]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#5B1A1A]/20 focus:border-[#5B1A1A] rounded-xl"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#5B1A1A] hover:bg-[#5B1A1A]/90 rounded-xl py-6 mt-2"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

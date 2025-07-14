
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const { signIn, signUp, user, profile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Auth useEffect:', { loading, user, profile });
    if (!loading && user && profile) {
      if (profile.plan === "basic" || profile.plan === "medium") {
        navigate("/dashboard", { replace: true });
        return;
      }
      const pendingPlan = localStorage.getItem("pendingPlan");
      if (pendingPlan === "basic" || pendingPlan === "medium") {
        navigate("/confirm-plan", { replace: true });
        return;
      }
      if (profile.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, profile, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage("");

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!name.trim()) {
          toast({
            title: "Erro",
            description: "Please enter your name",
            variant: "destructive",
          });
          setFormLoading(false);
          return;
        }
        result = await signUp(email, password, name);
      }

      if (result.error) {
        let errorMessage = "An unexpected error occurred";
        
        if (result.error.message) {
          if (result.error.message.includes("Invalid login credentials")) {
            errorMessage = "Incorrect email or password";
          } else if (result.error.message.includes("User already registered")) {
            errorMessage = "This email is already registered";
          } else if (result.error.message.includes("Password should be at least")) {
            errorMessage = "Password must be at least 6 characters long";
          } else if (result.error.message.includes("Unable to validate email address")) {
            errorMessage = "Invalid email";
          } else {
            errorMessage = result.error.message;
          }
        }
        
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        if (isLogin) {
          toast({
            title: "Sucess",
            description: "Login successful!",
          });
          // Não redirecionar aqui, deixar o useEffect cuidar disso
        } else {
          setMessage("Account created successfully! Check your email to confirm your registration before logging in.");
          toast({
            title: "Sucess",
            description: "Account created! Check your email for confirmation.",
          });
          // Reset form
          setEmail("");
          setPassword("");
          setName("");
          setIsLogin(true); // Switch to login mode
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Erro",
        description: "An unexpected error occurred. Please try again..",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Skilabot
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Login to your account' : 'Create your account and get started for free'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passowrd</Label>
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? "Your password" : "Create a password (min. 6 characters)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              disabled={formLoading}
            >
              {formLoading ? "Loading..." : (isLogin ? "To enter" : "Create account")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                {isLogin ? "Register" : "Log in"}
              </button>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

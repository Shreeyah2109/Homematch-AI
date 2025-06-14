import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema with password validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Verify token when component mounts
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(`https://homematch-ai.onrender.com/api/users/reset-password/${token}`);
        const data = await response.json();

        if (response.ok) {
          setIsTokenValid(true);
        } else {
          toast.error("Reset link is invalid or has expired");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        toast.error("Failed to verify reset link");
      } finally {
        setIsVerifying(false);
      }
    }

    verifyToken();
  }, [token]);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!token || !userId) {
      toast.error("Missing required information");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          token,
          password: values.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
      
      toast.success("Password reset successful! You can now log in with your new password.");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while verifying token
  if (isVerifying) {
    return (
      <Layout>
        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <p className="text-lg mb-2">Verifying reset link...</p>
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </Layout>
    );
  }

  // Show error if token is invalid
  if (!isTokenValid && !isVerifying) {
    return (
      <Layout>
        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-destructive">Invalid Reset Link</CardTitle>
              <CardDescription className="text-center">
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/forgot-password">Request New Reset Link</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-10">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

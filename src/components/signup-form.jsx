import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import axios from "@/api/axios";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ className, ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (!role) {
      setError("Role Can't be found.");
      toast.error("Role Can't be found.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("register/", {
        name,
        email,
        role,
        password,
      });

      const data = response.data;

      if (data && data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("isSuperUser", data.isSuperUser);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.userId);
      }

      toast.success("Account created successfully! ✅");

      toast.success("Login Successful! ✅");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.email?.[0] ||
        err.response?.data?.role?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Registration failed.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-balance text-muted-foreground mb-2">
            Fill in the form below to create your account
          </p>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Field>
          <FieldLabel htmlFor="name">Full Name / Company Name</FieldLabel>

          <Input
            id="name"
            type="text"
            placeholder="John Doe or MTN Ghana"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />

          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Account Type</FieldLabel>

          <ToggleGroup
            type="single"
            value={role}
            onValueChange={(value) => {
              if (value) {
                setRole(value);
              }
            }}
            variant="outline"
            className="grid grid-cols-2 gap-3"
          >
            <ToggleGroupItem
              value="student"
              aria-label="Student account"
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                role === "student"
                  ? "border-yellow-500 bg-yellow-500 text-black hover:bg-yellow-500"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              Student
            </ToggleGroupItem>

            <ToggleGroupItem
              value="employer"
              aria-label="Employer account"
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                role === "employer"
                  ? "border-yellow-500 bg-yellow-500 text-black hover:bg-yellow-500"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              Employer
            </ToggleGroupItem>
          </ToggleGroup>

          <FieldDescription>
            Choose Student if you are looking for jobs. Choose Employer if you
            want to post jobs.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background"
          />

          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>

          <Input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-background"
          />

          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <GoogleAuthButton role={role} />

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

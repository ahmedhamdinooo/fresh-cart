"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/lib/api";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const codeSchema = z.object({
  resetCode: z.string().min(4, "Enter the reset code"),
});

type EmailValues = z.infer<typeof emailSchema>;
type CodeValues = z.infer<typeof codeSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
  });

  const codeForm = useForm<CodeValues>({
    resolver: zodResolver(codeSchema),
  });

  const sendCode = async (values: EmailValues) => {
    try {
      await authApi.forgotPassword(values.email);
      setEmail(values.email);
      setStep("code");
      toast.success("Reset code sent to your email");
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || "Failed to send code"
        : "Failed to send code";
      toast.error(message);
    }
  };

  const verifyCode = async (values: CodeValues) => {
    try {
      await authApi.verifyResetCode(values.resetCode);
      toast.success("Code verified");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || "Invalid reset code"
        : "Invalid reset code";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Forgot Password</h1>
        <p className="mt-2 text-sm text-slate-500">
          {step === "email"
            ? "Enter your email to receive a reset code"
            : "Enter the code sent to your email"}
        </p>

        {step === "email" ? (
          <form
            onSubmit={emailForm.handleSubmit(sendCode)}
            className="mt-8 space-y-4"
          >
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register("email")}
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={emailForm.formState.isSubmitting}
            >
              Send Code
            </Button>
          </form>
        ) : (
          <form
            onSubmit={codeForm.handleSubmit(verifyCode)}
            className="mt-8 space-y-4"
          >
            <Input
              id="resetCode"
              label="Reset Code"
              placeholder="Enter code"
              error={codeForm.formState.errors.resetCode?.message}
              {...codeForm.register("resetCode")}
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={codeForm.formState.isSubmitting}
            >
              Verify Code
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

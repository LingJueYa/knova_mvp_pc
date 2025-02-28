"use client";
// 登陆按钮组件

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/icons/Login";

export function CustomSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        className="bg-transparent border-zinc-700
          text-black transition-all duration-300 
          flex items-center justify-center group"
      >
        <Login
          className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />
        注册/登陆
      </Button>
    </SignInButton>
  );
}

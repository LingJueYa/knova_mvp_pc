"use client";
// 登录按钮组件

import { SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/icons/Login";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useSidebarSound } from "@/hooks/useSidebarSound";


export function CustomSignInButton() {
  const { playSound } = useSidebarSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        className={cn(
          "relative overflow-hidden bg-white border-[#e1e1e1] text-[#1d1d1f]",
          "px-5 py-2.5 h-10 rounded-full tracking-wide font-medium text-sm",
          "transition-all duration-300 ease-out",
          "shadow-[0_0_0_rgba(0,0,0,0)]",
          "hover:bg-[#f5f5f7] hover:border-[#d2d2d7] hover:shadow-[0_2px_5px_rgba(0,0,0,0.05)]",
          "active:scale-[0.98] active:shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
          isHovered && "bg-[#f5f5f7] border-[#d2d2d7]",
          isPressed && "scale-[0.98] bg-[#f0f0f2]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={() => playSound("/music/login-button.mp3")}
      >
        <span className={cn(
          "absolute inset-0 bg-gradient-to-b from-white to-[#f5f5f7] opacity-0 dark:bg-white/80",
          "transition-opacity duration-300",
          isHovered && "opacity-100"
        )} />
        
        <span className="relative flex items-center justify-center">
          <Login
            className={cn(
              "mr-2 w-5 h-5 transition-all duration-300",
              isHovered && "text-[#0066cc]"
            )}
            aria-hidden="true"
          />
          <span className={cn(
            "tracking-wider transition-all duration-300",
            isHovered && "text-[#0066cc]"
          )}>
            Login
          </span>
        </span>
        
        <span className={cn(
          "absolute inset-0 rounded-full opacity-0",
          "transition-opacity duration-200 ease-out",
          "pointer-events-none",
          "bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]",
          isPressed && "opacity-30"
        )} />
      </Button>
    </SignInButton>
  );
}

export function CustomUserButton() {
  const { playSound } = useSidebarSound();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  return (
    <div 
      className="flex justify-center items-center outline-none hover:ring-2 hover:ring-offset-2 hover:ring-[#FE7600] rounded-full transition-all ease-in-out duration-300 transform-gpu hover:ring-offset-white border-transparent"
      onClick={() => playSound("/music/login-button.mp3")}
    >
      <UserButton
        userProfileMode="modal"
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
          elements: {
            avatarBox: "w-8 h-8",
            badge: "hidden",
            userButtonPopoverCard: isDarkMode ? "bg-background border-border" : "",
            userButtonPopoverActionButton: isDarkMode ? "text-foreground hover:bg-muted" : "",
            userButtonPopoverActionButtonIcon: isDarkMode ? "text-foreground" : "",
            userButtonPopoverFooter: isDarkMode ? "bg-background" : "",
          },
          variables: {
            colorBackground: isDarkMode ? "#333333" : "#ffffff",
            colorText: isDarkMode ? "#F8FAFC" : "#0F172A",
          }
        }}
      />
    </div>
  );
}

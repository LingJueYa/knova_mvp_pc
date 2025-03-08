"use client";
// 登录按钮组件 - Apple风格设计

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/icons/Login";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// 音效播放函数
const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundPath: string) => {
    if (typeof window !== "undefined") {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundPath);
      } else {
        audioRef.current.src = soundPath;
      }
      
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(err => console.error("音效播放失败:", err));
    }
  }, []);

  return { playSound };
};

export function CustomSignInButton() {
  const { playSound } = useSound();
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
  const { playSound } = useSound();
  
  return (
    <div 
      className="flex justify-center items-center outline-none hover:ring-2 hover:ring-offset-2 hover:ring-[#FE7600] rounded-full transition-all ease-in-out duration-300 transform-gpu hover:ring-offset-white border-transparent"
      onClick={() => playSound("/music/login-button.mp3")}
    >
      <UserButton
        userProfileMode="modal"
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
            badge: "hidden",
          },
        }}
      />
    </div>
  );
}

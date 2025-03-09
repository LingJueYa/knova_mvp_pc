"use client"

import React from "react";
import { motion } from "framer-motion";
import { CustomSignInButton, CustomUserButton } from "@/components/SignInButton";

interface AuthButtonsProps {
  isSignedIn: boolean;
  playSound: (url: string) => void;
}

export default function AuthButtons({ isSignedIn }: AuthButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      {isSignedIn ? <CustomUserButton /> : <CustomSignInButton />}
    </motion.div>
  );
} 
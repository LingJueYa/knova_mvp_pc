"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ClerkThemeProvider({
  children
}: {
  children: ReactNode;
}) {
  // 初始加载状态
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme } = useTheme();

  // 等待客户端挂载完成，避免水合不匹配问题
  useEffect(() => {
    setMounted(true);
    
  }, [resolvedTheme, theme]);

  // 确定是否为深色模式
  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  // 设置详细的主题配置
  const appearance = {
    baseTheme: isDarkMode ? dark : undefined,
    elements: {
      formButtonPrimary: 
        "bg-primary hover:bg-primary/90 text-primary-foreground",
      card: isDarkMode ? "bg-background border-border" : "",
      navbar: isDarkMode ? "bg-background" : "",
      navbarButton: isDarkMode ? "text-foreground" : "",
      userButtonPopoverCard: isDarkMode ? "bg-background border-border" : "",
      userButtonPopoverActionButton: isDarkMode 
        ? "text-foreground hover:bg-muted" 
        : "",
      userButtonPopoverActionButtonIcon: isDarkMode 
        ? "text-foreground" 
        : "",
      userButtonPopoverFooter: isDarkMode ? "bg-background" : "",
      modalBackdrop: isDarkMode ? "bg-background/80" : "",
      modalCloseButton: isDarkMode ? "text-foreground" : "",
      modal: isDarkMode ? "bg-background text-foreground" : "",
      modalContent: isDarkMode ? "bg-background text-foreground" : "",
      dividerLine: isDarkMode ? "bg-border" : "",
      footerActionLink: isDarkMode ? "text-primary hover:text-primary/90" : "",
      headerTitle: isDarkMode ? "text-foreground" : "",
      headerSubtitle: isDarkMode ? "text-muted-foreground" : "",
      formFieldLabel: isDarkMode ? "text-foreground" : "",
      formFieldInput: isDarkMode 
        ? "bg-input text-foreground border-input" 
        : "",
      formFieldErrorText: isDarkMode ? "text-destructive" : "",
      formFieldSuccessText: isDarkMode ? "text-emerald-500" : "",
      identityPreview: isDarkMode ? "bg-background border-border" : "",
      identityPreviewText: isDarkMode ? "text-foreground" : "",
      identityPreviewEditButton: isDarkMode ? "text-primary" : "",
      formResendCodeLink: isDarkMode ? "text-primary" : "",
      formField__signUp: isDarkMode ? "bg-background" : "", 
      form: isDarkMode ? "bg-background" : "",
    },
    variables: {
      colorPrimary: "#0EA5E9",
      colorBackground: isDarkMode ? "#1E293B" : "#ffffff",
      colorText: isDarkMode ? "#F8FAFC" : "#0F172A", 
      colorInputBackground: isDarkMode ? "#334155" : "#F1F5F9",
      colorInputText: isDarkMode ? "#F8FAFC" : "#0F172A",
      colorTextSecondary: isDarkMode ? "#94A3B8" : "#64748B",
      colorAlphaShade: isDarkMode ? "rgba(248,250,252,0.05)" : "rgba(15,23,42,0.05)",
      shadowModal: isDarkMode 
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)" 
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.5rem",
    },
    layout: {
      socialButtonsVariant: "iconButton" as const,
      socialButtonsPlacement: "bottom" as const,
      showOptionalFields: false,
      termsPageUrl: "https://clerk.com/terms",
      privacyPageUrl: "https://clerk.com/privacy",
    },
  };

  if (!mounted) {
    // 避免水合不匹配，在客户端挂载前返回空的提供者
    return <>{children}</>;
  }

  return (
    <ClerkProvider appearance={appearance}>
      {children}
    </ClerkProvider>
  );
} 
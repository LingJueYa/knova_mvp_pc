import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreateBotButtonProps {
  onClick: () => void;
  isFirst?: boolean;
}

export function CreateBotButton({
  onClick,
  isFirst = false,
}: CreateBotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group w-full h-[200px] rounded-[24px] border-2 border-dashed",
        "hover:border-primary/30 transition-colors duration-300",
        "flex flex-col items-center justify-center gap-3",
        isFirst ? "border-gray-200" : "border-gray-200"
      )}
      aria-label="创建新助手"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-[16px] bg-muted",
          "flex items-center justify-center text-3xl",
          "group-hover:bg-primary/5 transition-colors duration-300"
        )}
      >
        🤖
      </div>
      <p
        className={cn(
          "text-muted-foreground text-base font-medium",
          "group-hover:text-primary transition-colors duration-300"
        )}
      >
        创建新助手
      </p>
    </motion.button>
  );
}

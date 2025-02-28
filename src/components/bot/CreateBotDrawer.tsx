import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBotSchema, CreateBotFormData } from "@/schemas/bot";
import { getCurrentUserEmail } from "@/actions/user";
import { type CreateBotParams } from "@/types/bot";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateDefaultBotName } from "@/utils/generators";
import { topics } from "@/data/botTopics";
import { debounce } from "lodash";

interface CreateBotDrawerProps {
  isOpen: boolean; // 控制抽屉的打开状态
  onClose: () => void; // 关闭抽屉的回调函数
  onSubmit: (data: CreateBotFormData) => Promise<void>; // 提交表单的回调
}

export function CreateBotDrawer({
  isOpen,
  onClose,
  onSubmit,
}: CreateBotDrawerProps) {
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const [selectedTopicId, setSelectedTopicId] = useState<string>(""); // 选中的主题ID
  const [defaultName] = useState(generateDefaultBotName); // 默认助手名称
  const [isNameTouched, setIsNameTouched] = useState(false); // 关注领域是否被触碰

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateBotFormData>({
    resolver: zodResolver(createBotSchema),
    defaultValues: {
      name: defaultName,
      data_sources: ["google", "twitter"], // 设置默认值
    },
  });

  const currentName = watch("name") ?? defaultName; // 当前助手名称

  // 处理表单提交
  const handleFormSubmit = async (data: CreateBotFormData) => {
    // console.log("表单提交数据:", data); // 添加调试信息
    // console.log("表单错误:", errors); // 添加调试信息
    if (isLoading) return;

    try {
      setIsLoading(true);
      const submitData: CreateBotParams = {
        name: isNameTouched ? data.name : defaultName,
        topics: data.topics,
        logic_limits: data.logic_limits || undefined,
        data_sources: data.data_sources,
        email: await getCurrentUserEmail(),
      };

      // console.log("提交数据:", submitData); // 添加调试信息

      await onSubmit(submitData);
      reset();
      onClose();
    } catch (error) {
      console.error("创建失败:", error);
      alert("创建助手失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 防抖处理的名称输入
  const debouncedHandleNameChange = debounce((value: string) => {
    setValue("name", value);
  }, 200);

  // 节流处理的主题选择
  const throttledHandleTopicSelect = debounce((topicId: string) => {
    setSelectedTopicId(topicId);
    setValue("topics", topicId);
  }, 200);

  // 组件卸载时清理防抖函数
  useEffect(() => {
    return () => {
      debouncedHandleNameChange.cancel();
      throttledHandleTopicSelect.cancel();
    };
  }, [debouncedHandleNameChange, throttledHandleTopicSelect]);

  return (
    <Drawer modal={true} open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] mt-[15vh] bg-background">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="sticky top-0 z-10 bg-background">
            <DrawerTitle>创建新助手</DrawerTitle>
          </DrawerHeader>

          <div className="scrollbar-none overflow-y-auto px-6 bg-background max-h-[calc(85vh-8rem)]">
            <form id="createBotForm" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* 名称 */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  助手名称
                </label>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="为你的助手起个名字"
                  className="focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                  onFocus={() => {
                    if (!isNameTouched) {
                      setValue("name", "");
                      setIsNameTouched(true);
                    }
                  }}
                  onBlur={() => {
                    if (!currentName.trim()) {
                      setValue("name", defaultName);
                      setIsNameTouched(false);
                    }
                  }}
                  aria-label="助手名称"
                  onChange={(e) => setValue("name", e.target.value)} // 直接更新名称
                />
              </div>

              {/* 关注领域 */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  关注领域 <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {topics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={topic.id}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all",
                          "border-2 border-input hover:border-primary/50",
                          "hover:bg-primary/5",
                          selectedTopicId === topic.id
                            ? "bg-primary/5 border-primary"
                            : "bg-background"
                        )}
                        onClick={() => throttledHandleTopicSelect(topic.id)}
                        aria-label={`选择主题: ${topic.name}`}
                      >
                        <Icon className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{topic.name}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.topics && (
                  <p className="text-sm text-destructive">{errors.topics.message}</p>
                )}
              </div>

              {/* 逻辑限制 */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  行为边界
                </label>
                <textarea
                  {...register("logic_limits")}
                  className={cn(
                    "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-all"
                  )}
                  placeholder="设定助手的行为边界"
                  aria-label="行为边界"
                />
                {errors.logic_limits && (
                  <p className="text-sm text-destructive">
                    {errors.logic_limits.message}
                  </p>
                )}
              </div>

              {/* 数据来源 */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  数据来源 <span className="text-destructive">*</span>
                </label>
                <RadioGroup
                  defaultValue="google,twitter"
                  onValueChange={(value: string) => {
                    setValue("data_sources", [value]);
                  }}
                  className="grid gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google" />
                    <label htmlFor="google" className="text-sm font-medium leading-none cursor-pointer">
                      Google
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="twitter" id="twitter" />
                    <label htmlFor="twitter" className="text-sm font-medium leading-none cursor-pointer">
                      Twitter
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google,twitter" id="both" />
                    <label htmlFor="both" className="text-sm font-medium leading-none cursor-pointer">
                      Google + Twitter
                    </label>
                  </div>
                </RadioGroup>
                {errors.data_sources && (
                  <p className="text-sm text-destructive">
                    {errors.data_sources.message}
                  </p>
                )}
                <div className="h-5"></div>
              </div>
            </form>
          </div>

          <DrawerFooter className="sticky bottom-0 z-10 mt-6 bg-background">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium",
                  "h-10 px-4 py-2 transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                aria-label="取消"
              >
                取消
              </button>
              <button
                type="submit" // 确保类型为 submit
                form="createBotForm" // 确保表单 ID 正确
                disabled={isLoading}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium",
                  "bg-primary text-primary-foreground h-10 px-4 py-2",
                  "hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                aria-label={isLoading ? "创建中..." : "创建助手"}
              >
                {isLoading ? "创建中..." : "创建助手"}
              </button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

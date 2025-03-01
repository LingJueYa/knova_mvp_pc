import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { articles } from '@/data/articles'
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa"



export function ArticleShowcase() {
  return (
    <div className="space-y-8 mt-14">
      {/* 标题部分 */}
      <div className="flex items-center gap-2 justify-center mb-6">
        <Image
          src="/image/love.gif"
          alt="love"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <h2 className="text-xl font-semibold text-gray-800">Result</h2>
      </div>

      {/* 文章轮播 */}
      <div className="carousel carousel-center bg-transparent h-[360px] rounded-box max-w-4xl mx-auto space-x-4 p-4">
        {articles.map((article) => (
          <div key={article.id} className="carousel-item w-[240px]">
            <div className="w-64 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 文章骨架屏 */}
      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {/* 文章标题骨架屏 */}
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        
        {/* 文章内容骨架屏 */}
        <div className="space-y-3 mt-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton 
              key={index} 
              className={`h-4 ${
                index % 3 === 0 ? 'w-full' : 
                index % 3 === 1 ? 'w-11/12' : 'w-4/5'
              }`} 
            />
          ))}
        </div>
      </div>
      <Component />
      {/* 社交媒体按钮 */}
      <div className="flex flex-wrap gap-2">
        <Button className="flex-1" variant="outline" aria-label="Login with Google" size="icon">
          <FaGoogle className="text-[#DB4437] dark:text-primary" size={16} aria-hidden="true" />
        </Button>
        <Button className="flex-1" variant="outline" aria-label="Login with Facebook" size="icon">
          <FaFacebook className="text-[#1877f2] dark:text-primary" size={16} aria-hidden="true" />
        </Button>
        <Button className="flex-1" variant="outline" aria-label="Login with Twitter" size="icon">
          <FaTwitter className="text-[#14171a] dark:text-primary" size={16} aria-hidden="true" />
        </Button>
        <Button className="flex-1" variant="outline" aria-label="Login with GitHub" size="icon">
          <FaGithub className="text-black dark:text-primary" size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";

function Component() {
  const id = useId();

  const items = [
    { value: "1", label: "Angry", icon: "😠" },
    { value: "2", label: "Sad", icon: "🙁" },
    { value: "3", label: "Neutral", icon: "😐" },
    { value: "4", label: "Happy", icon: "🙂" },
    { value: "5", label: "Laughing", icon: "😀" },
  ];

  return (
    <fieldset className="space-y-4 max-w-[400px]">
      <legend className="text-sm font-medium leading-none text-foreground">How did it go?</legend>
      <RadioGroup className="flex gap-1.5" defaultValue="3">
        {items.map((item) => (
          <label
            key={`${id}-${item.value}`}
            className="relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border border-input text-center text-xl shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
          >
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="sr-only after:absolute after:inset-0"
            />
            {item.icon}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

export { Component };

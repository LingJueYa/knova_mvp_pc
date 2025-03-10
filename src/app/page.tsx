import React from 'react'
import HeroBadge from '@/components/ui/hero-badge'
import { TentIcon } from "@/components/icons/TentIcon"
import ArticleList from '@/components/articles/ArticleList';
import { userBotsContents, communityContents } from '@/data/mock/home';

export default function page() {
  return (
    <div className='w-full h-fit min-h-screen overflow-y-auto bg-[#FAFAFA]'>
      <div className="w-full max-w-full">
        {/* Slogan */}
        <HeroBadge
          text="Talk is cheap. Show me the data."
          icon={<TentIcon className="h-4 w-4" />}
        />
        <div className='px-6 md:px-8 lg:px-10'>
        {/* 用户关注的 Bots 内容 - 增加上下间距 */}
        <div className="mt-10 md:mt-12">
          <h2 className="text-2xl font-bold mb-6">关注内容</h2>
          <ArticleList articles={userBotsContents} />
        </div>
        
        {/* 社区推荐内容 - 增加上下间距 */}
        <div className="mt-16 md:mt-20 mb-10">
          <h2 className="text-2xl font-bold mb-6">推荐内容</h2>
          <ArticleList articles={communityContents} />
        </div>
      </div>
      </div>
    </div>
  )
}

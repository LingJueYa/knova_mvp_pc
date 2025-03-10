import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BotsContent } from '@/types/bots';

interface ArticleCardProps {
  article: BotsContent;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // 根据grade值映射显示的文本标签
  const gradeTextMap: Record<string, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };
  
  // 根据grade值映射颜色
  const gradeColorMap: Record<string, string> = {
    low: 'text-green-500 dark:text-green-400',
    medium: 'text-yellow-500 dark:text-yellow-400',
    high: 'text-red-500 dark:text-red-400'
  };

  // 根据grade返回对应的SVG图标
  const getGradeIcon = (grade: string) => {
    const lowerGrade = grade.toLowerCase();
    
    switch(lowerGrade) {
      case 'low':
        return (
          <Image src="/svg/low.svg" alt="Low" width={16} height={16} className='mr-1'/>
        );
      case 'medium':
        return (
          <Image src="/svg/medium.svg" alt="Medium" width={16} height={16} className='mr-1'/>
        );
      case 'high':
        return (
          <Image src="/svg/high.svg" alt="High" width={16} height={16} className='mr-1'/>
        );
      default:
        return null;
    }
  };

  const gradeText = gradeTextMap[article.grade.toLowerCase()] || '技术';
  const gradeColor = gradeColorMap[article.grade.toLowerCase()] || 'text-green-500 dark:text-green-400';
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
  };
  
  return (
    <Link className="w-full" href={article.url}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg md:shadow-none shadow-true-gray-200 col-span-6 md:col-span-3 lg:col-span-2 h-90 md:h-85 flex flex-col group transition duration-500 ease-in-out transform-gpu mobile-hover:hover:scale-95 md:hover:shadow-lg hover:rotate-0 hover:active:scale-95">
        <div className="relative h-48 duration-500 ease-in-out md:filter md:group-hover:brightness-90 transition">
          <Image 
            src={article.imageUrl || '/mock/bot1.jpg'} 
            alt={article.conclusion}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 ease-in-out opacity-100 md:group-hover:scale-105 md:group-hover:opacity-90 transform-gpu"
          />
        </div>
        <div className="flex flex-col justify-between h-40 px-6 py-4">
          <article className="flex flex-col justify-between items-start">
            <p className={`mb-2 text-xs font-bold leading-2 flex items-center ${gradeColor}`}>
              {getGradeIcon(article.grade)}
              {gradeText}
            </p>
            <h2 className="line-clamp-2 text-xl leading-tight md:text-lg md:leading-tight font-bold">{article.conclusion}</h2>
          </article>
          <time dateTime={article.createdAt} className="block mt-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400">
            {formatDate(article.createdAt)}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;


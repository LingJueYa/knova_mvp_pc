import React from 'react';
import ArticleCard from './ArticleCard';
import { BotsContent } from '@/types/bots';

interface ArticleListProps {
  articles: BotsContent[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
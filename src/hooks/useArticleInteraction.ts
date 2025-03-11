import { useState } from 'react';

/**
 * 文章互动功能的自定义Hook
 * 处理点赞、评论、分享和收藏等互动功能
 */
interface ArticleEngagement {
  likes?: number;
  comments?: number;
  shares?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface UseArticleInteractionProps {
  initialEngagement: ArticleEngagement;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onBookmark?: (id: string) => void;
  articleId: string;
}

export const useArticleInteraction = ({
  initialEngagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  articleId
}: UseArticleInteractionProps) => {
  // 状态初始化
  const [isLiked, setIsLiked] = useState(initialEngagement.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState(initialEngagement.isBookmarked ?? false);
  const [likes, setLikes] = useState(initialEngagement.likes ?? 0);
  const [comments, setComments] = useState(initialEngagement.comments ?? 0);
  const [shares, setShares] = useState(initialEngagement.shares ?? 0);

  // 处理点赞
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡 [ 防止点击展开文章 ]
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(articleId);
  };

  // 处理评论
  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setComments(prev => prev + 1);
    onComment?.(articleId);
  };

  // 处理分享
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setShares(prev => prev + 1);
    onShare?.(articleId);
  };

  // 处理收藏
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setIsBookmarked(!isBookmarked);
    onBookmark?.(articleId);
  };

  return {
    isLiked,
    isBookmarked,
    likes,
    comments,
    shares,
    handleLike,
    handleComment,
    handleShare,
    handleBookmark
  };
}; 
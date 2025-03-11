/**
 * 日期格式化工具函数
 */

/**
 * 格式化日期为相对时间（几小时前、几天前）或标准日期
 * @param dateString ISO格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // 计算时间差（毫秒）
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) {
    // 不到一天，显示小时和分钟
    const hours = diffInHours;
    const minutes = diffInMinutes - (diffInHours * 60);
    
    if (hours === 0) {
      return `${minutes} m ago`;
    } else if (minutes === 0) {
      return `${hours} h ago`;
    } else {
      return `${hours} h ${minutes} m ago`;
    }
  } else if (diffInDays < 7) {
    // 1-7天内，显示天数
    return `${diffInDays} d ago`;
  } else {
    // 超过一周，显示完整日期（美国标准格式）
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
};

/**
 * 格式化日期为简短日期格式（用于时间线显示）
 * @param dateString ISO格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatTimelineDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
}; 
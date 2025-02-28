/**
 * 生成短 UUID
 */
export const generateShortUUID = () => {
  return Math.random().toString(36).substring(2, 6);
};

/**
 * 生成默认机器人名称
 */
export const generateDefaultBotName = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}-${generateShortUUID()}`;
};
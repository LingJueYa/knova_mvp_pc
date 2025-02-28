import * as z from "zod";
import { topics } from "@/data/botTopics";

// 获取所有有效的 topic id
const validTopicIds = topics.map(topic => topic.id);

export const createBotSchema = z.object({
  name: z.string().optional(),
  topics: z
    .string()
    .min(1, "请选择关注领域")
    .refine((val) => validTopicIds.includes(val), {
      message: "请选择有效的关注领域",
    }),
  logic_limits: z.string().max(500, "逻辑限制不能超过500个字符").optional(),
  data_sources: z.array(z.string()).min(1, "请至少选择一个数据来源"),
});

export type CreateBotFormData = z.infer<typeof createBotSchema>;

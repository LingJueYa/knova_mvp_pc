import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

// 定义 Dify API 错误响应类型
interface DifyErrorResponse {
  code: string;
  message: string;
  status: number;
}

// 定义 URL
const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai/v1";
// 定义 API_KEY
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // 确保请求体中包含 question 字段
  if (!question) {
    return NextResponse.json({ message: "问题不能为空" }, { status: 400 });
  }

  try {
    console.log('Sending request to Dify API:', {
      url: `${DIFY_API_URL}/workflows/run`,
      inputs: { quesion: question },
      apiKey: DIFY_API_KEY ? '已设置' : '未设置'
    });

    const response = await axios.post(
      `${DIFY_API_URL}/workflows/run`,
      {
        inputs: { quesion: question },
        response_mode: "blocking",
        user: "test-user",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIFY_API_KEY}`,
        },
      }
    );

    // 打印原始响应
    console.log('Raw Dify response:', response.data);

    // 解析输出字符串
    const outputStr = response.data.data.outputs.outputs;
    
    // 清理和解析推荐问题
    const cleanedStr = outputStr
      .replace(/"recommendations":\s*\[/, '')  // 移除开头
      .replace(/\]\s*$/, '')                   // 移除结尾
      .replace(/"/g, '')                       // 移除引号
      .split(',')                              // 分割为数组
      .map((item: string) => item.trim())      // 清理空格，添加类型注解
      .filter((item: string) => item.length > 0); // 移除空项，添加类型注解

    console.log('Cleaned recommendations:', cleanedStr);

    if (cleanedStr.length === 0) {
      throw new Error('No recommendations found');
    }

    // 返回解析后的推荐问题数组
    return NextResponse.json({ recommendations: cleanedStr });

  } catch (error: unknown) {
    console.error("运行工作流错误:", error);

    // 打印详细的错误信息
    if (error instanceof AxiosError) {
      console.error('Detailed error information:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        request: {
          url: error.config?.url,
          method: error.config?.method,
          data: JSON.parse(error.config?.data || '{}'),
          headers: error.config?.headers
        }
      });
    }

    const errorMessage = error instanceof Error ? error.message : '未知错误';
    const errorResponse = error instanceof AxiosError 
      ? (error.response?.data as DifyErrorResponse)
      : undefined;

    console.error('完整错误信息:', {
      message: errorMessage,
      response: errorResponse,
      apiUrl: DIFY_API_URL,
      hasApiKey: !!DIFY_API_KEY
    });

    return NextResponse.json(
      { message: "内容输出错误", error: errorResponse || errorMessage },
      { status: 500 }
    );
  }
}

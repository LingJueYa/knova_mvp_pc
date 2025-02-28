import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

// 定义 Dify API 错误响应类型
interface DifyErrorResponse {
  code: string;
  message: string;
  status: number;
}

// API 配置常量
const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai/v1";
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // 参数验证
  if (!question) {
    return NextResponse.json(
      { message: "问题不能为空" }, 
      { status: 400 }
    );
  }

  try {
    // 记录请求信息
    console.log('Sending request to Dify API:', {
      url: `${DIFY_API_URL}/workflows/run`,
      inputs: { quesion: question },
      apiKey: DIFY_API_KEY ? '已设置' : '未设置'
    });

    // 发送请求到 Dify API
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

    // 记录原始响应
    console.log('Raw Dify response:', response.data);

    // 解析响应数据
    const outputStr = response.data.data.outputs.outputs;
    
    // 处理推荐问题数据
    const cleanedStr = outputStr
      .replace(/"recommendations":\s*\[/, '')
      .replace(/\]\s*$/, '')
      .replace(/"/g, '')
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    console.log('Cleaned recommendations:', cleanedStr);

    // 验证处理结果
    if (cleanedStr.length === 0) {
      throw new Error('No recommendations found');
    }

    // 返回推荐问题
    return NextResponse.json({ recommendations: cleanedStr });

  } catch (error: unknown) {
    console.error("运行工作流错误:", error);

    // 详细错误日志记录
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

    // 错误信息处理
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    const errorResponse = error instanceof AxiosError 
      ? (error.response?.data as DifyErrorResponse)
      : undefined;

    // 记录完整错误信息
    console.error('完整错误信息:', {
      message: errorMessage,
      response: errorResponse,
      apiUrl: DIFY_API_URL,
      hasApiKey: !!DIFY_API_KEY
    });

    // 返回错误响应
    return NextResponse.json(
      { message: "内容输出错误", error: errorResponse || errorMessage },
      { status: 500 }
    );
  }
}

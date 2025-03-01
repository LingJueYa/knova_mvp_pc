// 添加类型定义
interface Option {
  id: string;
  text: string;
}

export interface InvestmentQuestion {
  id: string;
  question: string;
  options: Option[];
  think: string;
}

export const investmentQuestions: InvestmentQuestion[] = [
  {
    id: 'investment-period',
    question: '⏳ Which investment approach for Tesla stock best aligns with your objectives?',
    options: [
      { id: 'A', text: 'Long-term value investment (3-5+ years)' },
      { id: 'B', text: 'Medium-term position trading (6 months-2 years)' },
      { id: 'C', text: 'Short-term trading (1-6 months)' },
      { id: 'D', text: 'Day/Swing trading (Intraday/Weekly)' },
    ],
    think: "When considering Tesla stock investment, it's crucial to first determine the investment timeframe, as different holding periods reflect distinct investment strategies and risk tolerance levels. Long-term investors focus more on company fundamentals, development strategy, and industry position, being able to withstand short-term fluctuations; medium-term investors need to combine market trends with company development cycles; while short-term investors rely more on technical analysis and market sentiment. Understanding the investor's intended holding period helps determine if they suit Tesla's current development stage and market conditions. Therefore, breaking down the time dimension into four intervals helps accurately identify the investor's investment style and strategic needs."
  },
  {
    id: 'investment-amount',
    question: '💰 What is your planned investment amount range?',
    options: [
      { id: 'A', text: 'Below $50,000' },
      { id: 'B', text: '$50,000-$200,000' },
      { id: 'C', text: '$200,000-$500,000' },
      { id: 'D', text: 'Above $500,000' },
    ],
    think: "The investment amount directly relates to risk management strategy and portfolio allocation. Small-scale investors might be more suited for trial participation with controllable risk; medium-scale investments require more rigorous analysis and comprehensive stop-loss strategies; large-scale investments need to consider market liquidity and staged position building. Understanding the investment amount helps assess the investor's actual risk tolerance and provide appropriate position management advice. Additionally, different investment amounts indicate the investor's total asset scale, helping determine the appropriate weight of Tesla stock in their overall investment portfolio."
  },
  {
    id: 'risk-tolerance',
    question: '⚠️ What is your maximum acceptable loss percentage?',
    options: [
      { id: 'A', text: 'Under 10%' },
      { id: 'B', text: '10-20%' },
      { id: 'C', text: '20-30%' },
      { id: 'D', text: 'Above 30%' },
    ],
    think: "An investor's psychological tolerance for losses is key to investment success. Setting specific maximum loss percentages helps investors clearly understand their risk preferences before entering the market. Conservative investors accepting under 10% loss might prefer waiting for better entry points; moderate investors tolerating 10-20% can handle normal market fluctuations; aggressive investors accepting 20-30% can participate in larger market opportunities; while those tolerating over 30% losses might need stricter risk control measures. This question helps investors with self-awareness and prevents irrational decisions during market volatility."
  },
  {
    id: 'investment-frequency',
    question: '🔍 Which Tesla core variable is your primary focus?',
    options: [
      { id: 'A', text: 'EV market competitive landscape' },
      { id: 'B', text: 'Energy storage business development' },
      { id: 'C', text: 'FSD autonomous driving implementation' },
      { id: 'D', text: 'Musk\'s personal decision impact' },
    ],
    think: "The core variables investors focus on reflect their understanding depth and perspective of Tesla's investment value. Those focusing on market competition likely value Tesla's long-term development potential; those watching the energy storage business emphasize company expansion and diversification; those following autonomous driving technology prioritize Tesla's innovation capabilities; while those monitoring Musk's decisions are more sensitive to short-term market sentiment. Understanding investors' focus helps determine if their investment logic is mature and aligns with their investment timeframe and risk tolerance."
  }
]

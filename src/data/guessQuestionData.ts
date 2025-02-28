export interface GuessQuestion {
  id: string;
  text: string;
}

export const guessQuestionData: GuessQuestion[] = [
  {
    id: 'quantum',
    text: 'Explain quantum entanglement simply'
  },
  {
    id: 'app-name',
    text: 'Generate a creative app name for task management'
  },
  {
    id: 'latin',
    text: 'Translate "Better late than never" into Latin'
  },
  {
    id: 'riddle',
    text: 'Write a short riddle with the answer "time"'
  }
]; 
import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useApp, Parent, ExerciseRecord } from './AppContext';
import OwlIcon from './OwlIcon';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotModalProps {
  onClose: () => void;
  context?: 'dashboard' | 'group' | 'exercise';
  currentExercise?: ExerciseRecord;
}

export default function ChatbotModal({ onClose, context = 'dashboard', currentExercise }: ChatbotModalProps) {
  const { currentUser, selectedChild, selectedGroup } = useApp();
  const parent = currentUser as Parent;
  
  const getInitialMessage = () => {
    if (context === 'exercise' && currentExercise) {
      return `I can help you understand this specific question and provide suggestions for improvement. The student ${currentExercise.isCorrect ? 'correctly' : 'incorrectly'} answered this ${currentExercise.subject} question in ${currentExercise.timeSpent} seconds. What would you like to know?`;
    } else if (context === 'group' && selectedChild && selectedGroup) {
      const groupName = selectedGroup === 'correct' ? 'correct exercises' : 
                        selectedGroup === 'timer' ? 'exercises completed within time' : 
                        'incorrect exercises';
      return `I'm here to provide insights about ${selectedChild.name}'s ${groupName}. They have ${
        selectedGroup === 'correct' ? selectedChild.correctCount :
        selectedGroup === 'timer' ? selectedChild.correctWithinTimerCount :
        selectedChild.incorrectCount
      } exercises in this category. How can I help you?`;
    } else {
      return `Hello ${parent.username}! I'm here to help you understand ${selectedChild?.name || 'your children'}'s performance. How can I assist you today?`;
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: getInitialMessage()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (context === 'exercise' && currentExercise) {
      if (lowerQuestion.includes('improve') || lowerQuestion.includes('better')) {
        return `To improve on this type of question, I recommend: 1) Practice similar ${currentExercise.subject} problems daily, 2) Take time to read questions carefully, 3) Review the explanation provided. ${currentExercise.timeSpent > 15 ? 'Also, work on time management by setting a timer during practice.' : 'Great job completing it on time!'}`;
      }
      if (lowerQuestion.includes('why') || lowerQuestion.includes('wrong') || lowerQuestion.includes('mistake')) {
        return `The student chose "${currentExercise.options[currentExercise.userAnswer]}" but the correct answer was "${currentExercise.options[currentExercise.correctAnswer]}". This might be due to misreading the question or needing more practice with this concept. Focus on reinforcing the fundamentals in ${currentExercise.subject}.`;
      }
      return `This ${currentExercise.subject} question was answered ${currentExercise.isCorrect ? 'correctly' : 'incorrectly'} in ${currentExercise.timeSpent} seconds. ${currentExercise.withinTime ? 'Great time management!' : 'Consider practicing with a timer to improve speed.'} What specific aspect would you like to discuss?`;
    }

    if (context === 'group' && selectedChild && selectedGroup) {
      if (lowerQuestion.includes('pattern') || lowerQuestion.includes('trend')) {
        return `Looking at the ${selectedGroup} exercises, ${selectedChild.name} shows ${
          selectedGroup === 'correct' ? 'strong performance and good understanding' :
          selectedGroup === 'timer' ? 'excellent time management skills' :
          'areas that need more practice and attention'
        }. I recommend focusing on consistent practice and reviewing concepts where mistakes occur.`;
      }
      if (lowerQuestion.includes('subject') || lowerQuestion.includes('topic')) {
        return `The exercises are distributed across Maths, English, and Science. To see a breakdown by subject, you can review the exercise list where each question is tagged with its subject area.`;
      }
      return `${selectedChild.name} has ${
        selectedGroup === 'correct' ? selectedChild.correctCount :
        selectedGroup === 'timer' ? selectedChild.correctWithinTimerCount :
        selectedChild.incorrectCount
      } exercises in this category. What specific information would you like to know?`;
    }

    // General dashboard context
    if (lowerQuestion.includes('improvement') || lowerQuestion.includes('progress') || lowerQuestion.includes('better')) {
      return selectedChild 
        ? `${selectedChild.name} shows noticeable improvement! Their accuracy is at ${selectedChild.accuracy}%, with ${selectedChild.correctCount} correct answers. They're completing exercises ${selectedChild.correctWithinTimerCount > selectedChild.correctCount / 2 ? 'efficiently' : 'and could improve time management'}.`
        : "Yes, there's noticeable improvement in both consistency and accuracy. Their average score increased, and they're completing assignments faster with fewer mistakes.";
    }

    if (lowerQuestion.includes('weakness') || lowerQuestion.includes('weak') || lowerQuestion.includes('struggle')) {
      if (selectedChild) {
        return `${selectedChild.name} has ${selectedChild.incorrectCount} incorrect exercises. Focus on these areas for improvement. Review the incorrect exercises list to identify patterns and subjects that need more attention.`;
      }
      return "Review the incorrect exercises section to identify weak areas. Focus on subjects where mistakes are most common and provide additional practice in those topics.";
    }

    if (lowerQuestion.includes('strength') || lowerQuestion.includes('good') || lowerQuestion.includes('best')) {
      return selectedChild
        ? `${selectedChild.name}'s strongest area is their ${selectedChild.correctWithinTimerCount > selectedChild.correctCount * 0.7 ? 'excellent time management and accuracy' : 'ability to solve problems correctly'}. They have ${selectedChild.correctCount} correct answers out of ${selectedChild.correctCount + selectedChild.incorrectCount} total exercises.`
        : "Their strongest area is solving problems within the time limit, showing good time management skills and quick recall.";
    }

    if (lowerQuestion.includes('recommend') || lowerQuestion.includes('suggest') || lowerQuestion.includes('help')) {
      return "I recommend: 1) Review incorrect exercises together, 2) Practice weak subjects daily for 15-20 minutes, 3) Encourage careful reading of questions, 4) Use the timer feature to build time management skills, 5) Celebrate correct answers to build confidence.";
    }

    if (selectedChild) {
      return `${selectedChild.name} is currently at ${selectedChild.accuracy}% accuracy with ${selectedChild.correctCount} correct answers and ${selectedChild.incorrectCount} incorrect ones. They're making good progress! How else can I help you?`;
    }

    return "I can help you understand your children's performance, identify their strengths and weaknesses, and provide recommendations for improvement. What specific information would you like to know?";
  };

  // Determine opacity based on context - lighter for parent dashboard
  const backgroundOpacity = context === 'dashboard' ? 'bg-opacity-20' : 'bg-opacity-30';

  return (
    <div className={`fixed inset-0 bg-black ${backgroundOpacity} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <OwlIcon size={40} />
            <h2 className="text-center">AI Performance Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-start gap-2 mb-2">
                    <OwlIcon size={24} />
                    <span className="text-center">AI Assistant</span>
                  </div>
                )}
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-6 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Write your question here"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

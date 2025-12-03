import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useApp, Parent, ExerciseRecord } from './AppContext';
import OwlIcon from './OwlIcon';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotTabProps {
  context?: 'dashboard' | 'group' | 'exercise';
  currentExercise?: ExerciseRecord;
}

export default function ChatbotTab({ context = 'dashboard', currentExercise }: ChatbotTabProps) {
  const { currentUser, selectedChild, selectedGroup } = useApp();
  const parent = currentUser as Parent;
  const [isExpanded, setIsExpanded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);
  
  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);
  
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

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      scrollToBottom();
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

  return (
    <div ref={chatRef} className={`fixed bottom-6 right-6 z-[998] transition-all duration-300`}>
      {!isExpanded ? (
        // Collapsed Tab
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full w-[60px] h-[60px] shadow-2xl hover:shadow-3xl transition-all hover:scale-110 hover:w-[64px] hover:h-[64px] flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      ) : (
        // Expanded Chat - Improved Design
        <div className="w-[400px] bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-purple-600 to-purple-700 h-[60px] px-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <OwlIcon size={28} />
              <span className="text-white">Bubbles Helper</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="w-10 h-10 rounded-full bg-purple-800 hover:bg-purple-900 hover:rotate-90 flex items-center justify-center text-white transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Body - Fixed shorter height */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-gray-50 to-purple-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-br-none shadow-md'
                      : 'bg-white text-gray-900 rounded-bl-none shadow-md border border-purple-100'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-start gap-2 mb-1">
                      <OwlIcon size={18} />
                      <span className="text-xs text-purple-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form - More compact */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t-2 border-purple-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-full border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-gray-50"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-2 w-10 h-10 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
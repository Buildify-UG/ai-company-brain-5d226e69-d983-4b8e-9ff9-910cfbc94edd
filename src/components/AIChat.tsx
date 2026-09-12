import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';
import { Send, Loader } from 'lucide-react';

const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      'Hello! I\'m your AI Company Assistant. I can help you find information about your company, answer questions about your products, policies, and more. What would you like to know?',
    timestamp: '2024-01-15 10:00 AM',
  },
  {
    id: '2',
    role: 'user',
    content: 'What services do we offer?',
    timestamp: '2024-01-15 10:01 AM',
  },
  {
    id: '3',
    role: 'assistant',
    content:
      'Based on your company information, TechFlow Solutions offers: Cloud solutions, API integrations, custom software development, and DevOps consulting. These services are designed to help businesses streamline operations and accelerate growth through innovative technology solutions.',
    timestamp: '2024-01-15 10:01 AM',
  },
  {
    id: '4',
    role: 'user',
    content: 'Who are our target customers?',
    timestamp: '2024-01-15 10:02 AM',
  },
  {
    id: '5',
    role: 'assistant',
    content:
      'Your target customers are SMBs (small and medium-sized businesses) in the tech, finance, healthcare, and e-commerce sectors. These industries benefit most from your digital transformation and software development services.',
    timestamp: '2024-01-15 10:02 AM',
  },
];

const QUICK_QUESTIONS = [
  'What services do we offer?',
  'Who are our target customers?',
  'What is our refund policy?',
  'How can customers contact us?',
  'Summarize our company info',
  'What are our business policies?',
];

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'what services do we offer?':
          'Based on your company information, TechFlow Solutions offers: Cloud solutions, API integrations, custom software development, and DevOps consulting.',
        'who are our target customers?':
          'Your target customers are SMBs in the tech, finance, healthcare, and e-commerce sectors.',
        'what is our refund policy?': '30-day money back guarantee if not satisfied.',
        'how can customers contact us?':
          'Customers can reach us at hello@techflow.com, +1 (555) 123-4567, or visit our website at www.techflow.com.',
        'summarize our company info':
          'TechFlow Solutions is a digital transformation company founded in 2020. We help businesses streamline operations through innovative technology. Our team of 45 professionals specializes in cloud solutions, API integrations, and custom software development.',
        'what are our business policies?':
          'Our policies include: Data Protection - all customer data is encrypted at rest and in transit. Compliance - SOC 2 Type II certified. Refunds - 30-day money-back guarantee.',
      };

      const lowerInput = messageText.toLowerCase();
      let response = responses[lowerInput];

      if (!response) {
        // Default response for other questions
        response =
          'I can help you with information about our company, services, policies, and more. Try asking questions like "What services do we offer?" or "What is our refund policy?"';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Company Assistant</h1>
          <p className="text-muted-foreground">Ask questions about your company information and documents</p>
        </div>

        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-lg px-6 py-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-500 text-white rounded-br-none'
                    : 'bg-card border border-border text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-indigo-100' : 'text-muted-foreground'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border text-foreground px-6 py-4 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader size={18} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-8 pb-8 max-w-4xl mx-auto w-full">
          <p className="text-sm text-muted-foreground mb-3 font-semibold">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="text-left px-4 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent hover:border-indigo-500 transition-colors text-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-card p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me anything about your company..."
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
            >
              {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              Send
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💡 This AI assistant uses your company information and documents to answer questions. It's ready for integration with OpenAI or other AI APIs.
          </p>
        </div>
      </div>
    </div>
  );
};

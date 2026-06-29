import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, TrendingUp, Users, CreditCard, BarChart3, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; isLoading?: boolean; }

const EXAMPLE_PROMPTS = [
  { icon: CreditCard,  text: 'How much fee is pending across all students?', color: 'text-warning' },
  { icon: Users,       text: 'Which batch has the best attendance this month?', color: 'text-success' },
  { icon: TrendingUp,  text: 'Predict next month\'s expected revenue', color: 'text-brand-500' },
  { icon: BarChart3,   text: 'Who hasn\'t paid fees in the last 30 days?', color: 'text-danger' },
  { icon: Zap,         text: 'Which students are at risk of dropping out?', color: 'text-info' },
  { icon: Sparkles,    text: 'Summarize today\'s business performance', color: 'text-brand-500' },
];

const AI_RESPONSES: Record<string, string> = {
  'default': "I've analyzed your business data. Here's what I found:\n\n• **Total pending fees**: ₹3,20,000 across 12 students\n• **Highest due**: Rohit Kumar (₹26,000) and Dev Sinha (₹32,000)\n• **Collection rate this month**: 82% (target: 90%)\n\nRecommendation: Send automated reminders to 12 students with pending dues. Estimated recovery: ₹2.1L within 7 days.",
};

const getAIResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();
  if (p.includes('pending') || p.includes('fee')) return "Based on your fee records:\n\n💰 **Total Pending: ₹3,20,000**\n\n• Dev Sinha — ₹32,000 (overdue 28 days)\n• Rohit Kumar — ₹26,000 (partial payment)\n• Sneha Gupta — ₹14,000 (overdue 45 days)\n• Aarav Sharma — ₹12,000 (due June 30)\n\n📊 **Collection rate**: 82% (target 90%)\n\n✅ **Suggested action**: Trigger WhatsApp reminders to all 4 students. I can do this automatically.";
  if (p.includes('batch') || p.includes('attendance')) return "📋 **Batch Performance Analysis**\n\n🥇 Batch B — 95% attendance (top performer)\n🥈 Evening Batch — 91%\n🥉 Batch A — 84%\n⚠️ Morning Batch — 78% (below threshold)\n\n**Insight**: Morning Batch has dropped 6% this month. 2 students show consistent absenteeism. Recommend personal follow-up call.";
  if (p.includes('predict') || p.includes('revenue') || p.includes('next month')) return "📈 **Revenue Forecast — July 2024**\n\n| Metric | Projected |\n|---|---|\n| Expected Revenue | ₹3,85,000 |\n| Collection Target | ₹3,50,000 |\n| New Admissions | 12–15 |\n\n**Confidence**: 87%\n\n**Key drivers**:\n• 8 new admissions in pipeline\n• 3 students upgrading courses\n• Seasonal demand increase\n\n⚠️ Risk: ₹87,000 overdue may impact July collection.";
  if (p.includes('paid') || p.includes('haven')) return "⚠️ **Students with Overdue Fees**\n\n| Student | Batch | Pending | Overdue Since |\n|---|---|---|---|\n| Sneha Gupta | Morning | ₹14,000 | 45 days |\n| Dev Sinha | Batch A | ₹32,000 | 28 days |\n| Aarav Sharma | Batch A | ₹12,000 | 4 days |\n\n🤖 **Suggested action**: Auto-send WhatsApp reminders with payment link. I can schedule these right now.";
  if (p.includes('risk') || p.includes('dropout')) return "🚨 **At-Risk Students (AI Analysis)**\n\nBased on attendance + payment patterns:\n\n🔴 **High Risk**\n• Dev Sinha — 71% attendance + ₹32K pending\n• Sneha Gupta — 85% attendance + ₹14K overdue\n\n🟡 **Medium Risk**\n• Arjun Mehta — 65% attendance (inactive)\n\n✅ **Recommended Actions**:\n1. Schedule counseling sessions\n2. Offer EMI payment plans\n3. Assign mentor follow-up";
  if (p.includes('today') || p.includes('summary') || p.includes('performance')) return "📊 **Today's Business Summary — June 28, 2024**\n\n✅ Revenue collected: ₹52,400\n✅ Attendance marked: 4/4 batches\n✅ New admission: 1 (Ananya Singh)\n⚠️ Pending reminders: 12 students\n\n**vs Yesterday**:\n• Revenue: +12.5% 📈\n• Attendance: +2.3% 📈\n• Tasks: 2 pending\n\n🤖 **AI Suggestion**: Send fee due reminders to 3 students due this week to hit 90% collection target.";
  return AI_RESPONSES['default'];
};

export function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm0', role: 'assistant', content: "Hi! I'm your Analytiq AI assistant 🤖\n\nI have real-time access to your student data, fee records, attendance logs, and business analytics. Ask me anything about your institute.", timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: Message = { id: `m${Date.now()}`, role: 'user', content, timestamp: new Date() };
    const loadingMsg: Message = { id: `ml${Date.now()}`, role: 'assistant', content: '', timestamp: new Date(), isLoading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));
    const aiContent = getAIResponse(content);
    setMessages(prev => prev.slice(0, -1).concat({ id: `ma${Date.now()}`, role: 'assistant', content: aiContent, timestamp: new Date() }));
    setLoading(false);
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('🥇') || line.startsWith('🥈') || line.startsWith('🥉'))
        return <div key={i} className="ml-2" dangerouslySetInnerHTML={{ __html: bold }} />;
      if (line.startsWith('• '))
        return <li key={i} className="ml-4" dangerouslySetInnerHTML={{ __html: bold.slice(2) }} />;
      if (line.startsWith('|')) return <div key={i} className="font-mono text-xs text-secondary py-0.5">{line}</div>;
      return <div key={i} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -mt-2">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-glow-brand">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary flex items-center gap-2">
              AI Assistant <Sparkles size={16} className="text-brand-400" />
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live data · Connected
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shrink-0 mr-3 mt-0.5">
                  <Bot size={15} className="text-white" />
                </div>
              )}
              <div className={cn('max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-sm'
                  : 'card-base rounded-bl-sm text-primary'
              )}>
                {msg.isLoading ? (
                  <div className="flex items-center gap-1.5 py-1">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-2 h-2 rounded-full bg-brand-400"
                        animate={{ y: [0, -6, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-0.5">{formatContent(msg.content)}</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Example Prompts */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {EXAMPLE_PROMPTS.map(({ icon: Icon, text, color }) => (
            <button key={text} onClick={() => sendMessage(text)}
              className="flex items-start gap-2.5 p-3 card-base text-left text-xs text-secondary hover:border-brand-500/40 hover:text-primary hover:bg-secondary transition-all group">
              <Icon size={14} className={cn(color, 'shrink-0 mt-0.5')} />
              <span>{text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 card-base flex items-center gap-3 px-4 py-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask me anything about your business…"
            rows={1}
            className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted outline-none resize-none"
          />
        </div>
        <Button onClick={() => sendMessage()} loading={loading} size="lg" icon={<Send size={16} />} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  );
}

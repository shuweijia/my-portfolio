import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Mail, 
  Phone, 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  Code,
  Layout,
  MonitorSmartphone,
  CheckCircle2,
  ExternalLink,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Flame,
  Hexagon,
  Recycle,
  Coffee,
  BatteryCharging
} from 'Lucide-react';

// --- Reusable Components ---

// 1. 滚动动画包裹组件
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 触发后即取消监听，提升性能
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } // 提前 50px 触发
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 2. BentoCard 交叉观察器与动画状态
const BentoCard = ({ 
  children, 
  outerClassName = "", 
  innerClassName = "", 
  hover = true, 
  noPadding = false,
  gradient = "from-indigo-200 via-slate-50 to-orange-200",
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        p-[5px] rounded-[2.2rem] bg-gradient-to-br ${gradient}
        shadow-[0_2px_20px_rgba(0,0,0,0.02)] group transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${hover && isVisible ? 'hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2' : ''}
        ${outerClassName}
      `}
    >
      <div 
        className={`
          bg-white rounded-[calc(2.2rem-5px)] h-full w-full relative overflow-hidden
          ${noPadding ? '' : 'p-7 md:p-9'} 
          ${innerClassName}
        `}
      >
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

const GlassPill = ({ children, className = "" }) => (
  <span className={`px-4 py-2 bg-slate-50/80 border border-slate-200 rounded-full text-sm text-slate-600 flex items-center gap-2 whitespace-nowrap ${className}`}>
    {children}
  </span>
);

const apiKey = "";

const SYSTEM_PROMPT = `你现在是舒惟佳(Weijia Shu)的个人AI数字助理。
你的任务是回答访客关于她的背景、技能、项目和求职意向的问题。
关于舒惟佳的信息如下：
- 教育背景：华中科技大学 设计学硕士 (GPA 3.87/4.0)；重庆大学 产品设计本科 (GPA 3.59/4.0)。
- 核心身份：跨学科产品设计师 / AI 低代码开发者。
- 核心技能：Figma, AI低代码开发, 交互设计, 需求拆解, 商业化落地, SPSS, Rhino等。
- 项目1：MindAnchor 脑波锚点。针对ADHD人群的专注力管理工具。全栈落地，跑通商业闭环，留存率高达73.84%。
- 项目2：CargoWare 国际货代 CRM。重构B端业务架构，利用AI提速前端原型开发，缩短研发周期50%。
- 项目3：“蜓火”高层建筑火灾应急救援指挥系统。多模态交互消防无人机，定义“语音+灯光+手势”三维交互逻辑。获“智博杯”优秀奖。
- 项目4：BEE HIVE 城市智能养蜂 IoT 系统。打造“人蜂分离+智能托管”的软硬一体化产品，集成温湿度监控与社区APP。获外观设计专利。
- 项目5：ICPB - 创意共享充电宝。结合雪糕形态做微创新手柄，解决拿取与方向区分痛点，获欧洲产品设计大赛 Winner。
- 荣誉：欧洲产品设计大赛 Winner，外观设计专利，国家级设计大赛优秀奖等。
请保持专业、友好、自信的语气，回答简明扼要。多用第一人称"我们"（代表团队）或第三人称"她"（代表舒惟佳）。如果访客问到没提及的内容，可以引导他们通过邮件 swj011021@163.com 联系她本人。`;

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi！我是舒惟佳的 AI 助理 ✨。想了解她的项目经历、技能栈，还是设计理念？随时问我！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- 拖拽功能状态 ---
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // 边界限制函数：防止拖拽或展开时超出屏幕可视区域
  const clampPosition = (currentX, currentY, isWindowOpen) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // 获取当前状态下的组件宽高 (展开状态 宽最大384/高最大500+16，闭合状态是 56x56)
    const widgetWidth = isWindowOpen ? Math.min(384, vw - 48) : 56; 
    const widgetHeight = isWindowOpen ? Math.min(500, vh * 0.7) + 16 : 56;

    // 默认基准点是 bottom-6(24px) right-6(24px)，保证距离屏幕上下左右边缘至少有 16px 的安全距离
    const minX = 40 + widgetWidth - vw;
    const maxX = 8;
    const minY = 40 + widgetHeight - vh;
    const maxY = 8;

    return {
      x: Math.min(Math.max(currentX, minX), maxX),
      y: Math.min(Math.max(currentY, minY), maxY)
    };
  };

  const handlePointerDown = (e) => {
    // 防止在关闭按钮或不可拖拽元素上触发拖拽
    if (e.target.closest('button.no-drag')) return;

    dragInfo.current.isDragging = false;
    dragInfo.current.startX = e.clientX;
    dragInfo.current.startY = e.clientY;
    dragInfo.current.initialX = position.x;
    dragInfo.current.initialY = position.y;

    const handlePointerMove = (ev) => {
      const dx = ev.clientX - dragInfo.current.startX;
      const dy = ev.clientY - dragInfo.current.startY;
      // 容差判断：移动超过 3px 才算作拖拽，防止误触
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragInfo.current.isDragging = true;
        setIsDragging(true);
      }
      if (dragInfo.current.isDragging) {
        // 在拖拽时实时限制边界
        const rawX = dragInfo.current.initialX + dx;
        const rawY = dragInfo.current.initialY + dy;
        setPosition(clampPosition(rawX, rawY, isOpen));
      }
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      // 延迟重置拖拽状态，确保 onClick 事件能被正确拦截
      setTimeout(() => {
        setIsDragging(false);
        dragInfo.current.isDragging = false;
      }, 50);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const contents = newMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const payload = {
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    };

    let retries = 5;
    let delay = 1000;
    let responseText = "抱歉，由于网络原因，AI 助理暂时无法响应。请直接通过邮件联系她！";

    while (retries > 0) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "抱歉，我没有完全理解，能换个说法吗？";
        break; 
      } catch (error) {
        retries -= 1;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header (加入了拖拽功能) */}
          <div 
            onPointerDown={handlePointerDown}
            className="p-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md flex justify-between items-center cursor-move"
            style={{ touchAction: 'none' }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-500" />
              <span className="text-sm font-medium text-slate-800">惟佳的 AI 助理</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
              className="no-drag text-slate-400 hover:text-slate-700 transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafafa]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-indigo-100 border border-indigo-200 text-indigo-600'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-sm shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 flex-row">
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 size={14} className="text-indigo-500 animate-spin" />
                  <span className="text-xs text-slate-500">正在思考...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="问点关于她的事..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Floating Toggle Button (支持拖拽，改用高透渐变色圆环) */}
      {!isOpen && (
        <button 
          onPointerDown={handlePointerDown}
          onClick={(e) => {
            // 如果是在拖拽，则阻止打开窗口的点击事件
            if (dragInfo.current.isDragging) {
              e.preventDefault();
              return;
            }
            setIsOpen(true);
            // 【核心修复】：展开时强制重新计算并修正位置，防止顶部溢出
            setPosition(prev => clampPosition(prev.x, prev.y, true));
          }}
          className="group w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-200/70 via-slate-50/70 to-orange-200/70 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300 cursor-move"
          style={{ touchAction: 'none' }}
        >
          <Bot size={24} className="text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-600 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Marquee Animation Styles --- */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between backdrop-blur-xl bg-white/70 border-b border-slate-200/50">
        <div className="text-xl font-bold tracking-tighter text-slate-900">W. SHU</div>
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <a 
            href="#profile" 
            onClick={(e) => { e.preventDefault(); document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' }); }} 
            className="hover:text-slate-900 transition-colors"
          >
            Profile
          </a>
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} 
            className="hover:text-slate-900 transition-colors"
          >
            Digital
          </a>
          <a 
            href="#product-design" 
            onClick={(e) => { e.preventDefault(); document.getElementById('product-design')?.scrollIntoView({ behavior: 'smooth' }); }} 
            className="hover:text-slate-900 transition-colors"
          >
            Product
          </a>
          <a href="mailto:swj011021@163.com" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        
        {/* =========================================
            PART 1: HERO & PROFILE (BENTO GRID)
        ========================================== */}
        <section id="profile" className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            
            {/* Block 1: Hero (Spans 3 cols) */}
            <BentoCard 
              delay={0}
              outerClassName="md:col-span-3" 
              innerClassName="flex flex-col justify-center"
              gradient="from-indigo-200 via-slate-50 to-orange-200"
            >
              <Reveal delay={200}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-xs font-semibold tracking-wide text-indigo-700 mb-6 w-max border border-indigo-100">
                  <Sparkles size={14} />
                  AVAILABLE FOR NEW OPPORTUNITIES
                </div>
              </Reveal>
              <Reveal delay={300}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-slate-900 mb-6">
                  Hi, 我是舒惟佳
                  <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-400 mt-2 whitespace-nowrap">产品设计师 / AI 开发</span>
                </h1>
              </Reveal>
              <Reveal delay={400}>
                <p className="text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed font-light">
                  正在探索 AI 与设计融合的边界，致力于从 0 到 1 构建有温度的数字产品。
                </p>
              </Reveal>
            </BentoCard>

            {/* Block 1.5: Profile/Contact Mini (Spans 1 col) */}
            <BentoCard 
              delay={100}
              outerClassName="md:col-span-1" 
              innerClassName="flex flex-col justify-between items-center text-center"
              gradient="from-blue-200 via-slate-50 to-emerald-200"
            >
              <Reveal delay={300} className="w-28 h-28 rounded-full p-1 mb-4 bg-gradient-to-tr from-slate-100 to-slate-200 shadow-sm border border-slate-200/50">
                <img 
                  src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/zhengjianzhao.JPG" 
                  alt="Weijia Shu Avatar" 
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </Reveal>
              <Reveal delay={400} className="w-full flex flex-col gap-3 mt-auto">
                {/* 这里的 mailto: 就是自动对接并唤起邮箱的网页标准写法 */}
                <a href="mailto:swj011021@163.com" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 hover:shadow-md transition-all">
                  <Mail size={16} /> Email Me
                </a>
                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium">
                  <Phone size={14} /> 132-1278-5002
                </div>
              </Reveal>
            </BentoCard>

            {/* Block 2: About (Spans 2 cols) */}
            <BentoCard 
              delay={200}
              outerClassName="md:col-span-2"
              gradient="from-indigo-200 via-slate-50 to-orange-200"
            >
              <Reveal delay={300} className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-indigo-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">关于我</h2>
              </Reveal>
              <Reveal delay={400} className="text-slate-600 leading-relaxed space-y-4">
                <p>
                  目前在<strong className="text-slate-900 font-semibold">华中科技大学</strong>攻读设计学硕士 (GPA 3.87)，本科毕业于<strong className="text-slate-900 font-semibold">重庆大学</strong>产品设计专业 (GPA 3.59)。拥有扎实的 985 本硕双一流学术背景与跨学科交叉设计经验。
                </p>
                <p>
                  我的研究与实践从不仅停留在视觉层面，更深入探索<strong className="text-slate-900 font-semibold">数据故事理论 </strong> 与叙事性可视化在产品设计中的应用。具备敏锐的用户嗅觉和独立落地产品的能力，期望将跨学科协作的创意与严谨的逻辑思维带入更广阔的商业舞台。
                </p>
              </Reveal>
            </BentoCard>

            {/* Block 3: Skills (Spans 2 cols) */}
            <BentoCard 
              delay={300}
              outerClassName="md:col-span-2"
              gradient="from-blue-200 via-slate-50 to-emerald-200"
            >
              <Reveal delay={400} className="flex items-center gap-3 mb-8">
                <Briefcase className="text-indigo-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">能力矩阵</h2>
              </Reveal>
              <div className="space-y-6">
                <Reveal delay={500}>
                  <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Product Strategy</h3>
                  <div className="flex flex-wrap gap-2">
                    <GlassPill>需求拆解</GlassPill>
                    <GlassPill>商业化落地</GlassPill>
                    <GlassPill>竞品分析</GlassPill>
                    <GlassPill>PRD输出</GlassPill>
                  </div>
                </Reveal>
                <Reveal delay={600}>
                  <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Design & AI</h3>
                  <div className="flex flex-wrap gap-2">
                    <GlassPill><Layout size={14} className="text-slate-400"/> Layout</GlassPill>
                    <GlassPill><Code size={14} className="text-slate-400"/> AI 低代码开发</GlassPill>
                    <GlassPill>交互设计</GlassPill>
                    <GlassPill>用户研究</GlassPill>
                  </div>
                </Reveal>
                <Reveal delay={700}>
                  <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <GlassPill><Sparkles size={14} className="text-indigo-500" /> Vibe coding</GlassPill>
                    <GlassPill>Xmind</GlassPill>
                    <GlassPill>PS</GlassPill>
                    <GlassPill>SPSS</GlassPill>
                    <GlassPill>Rhino</GlassPill>
                    <GlassPill>Keyshot</GlassPill>
                  </div>
                </Reveal>
              </div>
            </BentoCard>

            {/* Block 4: Honors Marquee (Spans full width) */}
            <BentoCard 
              delay={400}
              noPadding 
              outerClassName="md:col-span-4 h-20 sm:h-24" 
              innerClassName="bg-gradient-to-r from-[#fafafa] via-white to-[#fafafa]"
              gradient="from-indigo-200 via-slate-50 to-orange-200"
            >
               <div className="w-full h-full overflow-hidden flex items-center relative">
                  <div className="animate-marquee flex flex-row flex-nowrap items-center gap-12 px-6 w-max">
                    {/* First Set */}
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Trophy size={18} className="text-yellow-500"/> Winner | European Product Design Award</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><CheckCircle2 size={18} className="text-emerald-500"/> Patent | 外观设计专利 (已授权)</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><GraduationCap size={18} className="text-blue-500"/> Scholarship | 学院甲等奖学金</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Sparkles size={18} className="text-indigo-500"/> Excellence | “智博杯”工业设计优秀奖</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Sparkles size={18} className="text-indigo-500"/> Excellence | 大学生工业设计大赛优秀奖</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    
                    {/* Duplicate for infinite effect */}
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Trophy size={18} className="text-yellow-500"/> Winner | European Product Design Award</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><CheckCircle2 size={18} className="text-emerald-500"/> Patent | 外观设计专利 (已授权)</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><GraduationCap size={18} className="text-blue-500"/> Scholarship | 学院甲等奖学金</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Sparkles size={18} className="text-indigo-500"/> Excellence | “智博杯”工业设计优秀奖</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium whitespace-nowrap shrink-0"><Sparkles size={18} className="text-indigo-500"/> Excellence | 大学生工业设计大赛优秀奖</div>
                  </div>
               </div>
            </BentoCard>

          </div>
        </section>


        {/* =========================================
            PART 2: FEATURED PROJECTS (软件/交互产品)
        ========================================== */}
        <section id="projects" className="mb-32">
          <Reveal delay={0} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Digital Projects</h2>
            <p className="text-xl text-slate-500 font-light">从 0 到 1 的硬核跨学科实践。</p>
          </Reveal>

          <div className="space-y-32">
            
            {/* --- Project 1: MindAnchor --- */}
            <div className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Visual Image Area */}
              <Reveal delay={100} className="w-full lg:w-3/5 h-[450px] sm:h-[550px] rounded-[2.5rem] bg-slate-100/50 border border-slate-200/60 p-4 relative overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-full rounded-[2rem] border border-white/60 relative overflow-hidden flex items-center justify-center flex-col shadow-inner group/img cursor-pointer">
                  {/* 1. 真实图片图层 (替换 src) */}
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/mindanchor.png" 
                    alt="MindAnchor App" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                  />
                  {/* 2. 淡淡的灰色遮罩层 */}
                  <div className="absolute inset-0 bg-slate-200/70 backdrop-blur-[3px] transition-all duration-500 group-hover/img:bg-slate-200/30 group-hover/img:backdrop-blur-[1px]"></div>
                  {/* 3. 文字与图标层 */}
                  <div className="relative z-20 flex flex-col items-center transition-transform duration-500 group-hover/img:-translate-y-2">
                    <MonitorSmartphone size={64} strokeWidth={1.5} className="text-indigo-600 mb-6 drop-shadow-md" />
                    <h3 className="text-2xl font-bold tracking-widest text-slate-800 mb-2 drop-shadow-sm">MindAnchor App</h3>
                    <p className="text-slate-600 text-sm font-medium bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/60">Interactive Mockup</p>
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal delay={300} className="w-full lg:w-2/5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  <GlassPill className="!bg-indigo-50 !text-indigo-700 !border-indigo-100">AI 陪伴</GlassPill>
                  <GlassPill className="!bg-orange-50 !text-orange-700 !border-orange-100">ADHD 辅助</GlassPill>
                  <GlassPill>全栈落地</GlassPill>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">MindAnchor 脑波锚点</h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Overview
                    </h4>
                    <p>针对 ADHD 人群设计的专注力管理工具。独立完成从需求拆解到 AI Coding 落地，在无研发前置支持下实现产品从 0 到 1 的高质量交付上线。</p>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Impact
                    </h4>
                    <p>成功跑通「5元基础功能买断 + AI 对话次数充值」混合商业闭环。上线后日活达 200+，核心年轻用户群活跃留存率高达 <strong className="text-indigo-600 font-bold">73.84%</strong>（环比提升 24.27%）。</p>
                  </div>
                </div>

                <a 
                  href="https://wcnp7sqisgpt.aiforce.cloud/app/app_4jpb099bjexa5/timeline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-4 transition-all duration-300 w-max group/btn"
                >
                  View Case Study <ArrowRight size={18} className="text-indigo-500 group-hover/btn:text-slate-900 transition-colors" />
                </a>
              </Reveal>
            </div>

            {/* --- Project 2: CargoWare --- */}
            <div className="group flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
              <Reveal delay={100} className="w-full lg:w-3/5 h-[450px] sm:h-[550px] rounded-[2.5rem] bg-slate-100/50 border border-slate-200/60 p-4 relative overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-full rounded-[2rem] border border-white/60 relative overflow-hidden flex items-center justify-center flex-col shadow-inner group/img cursor-pointer">
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/cargoware.png" 
                    alt="CargoWare Dashboard" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-200/70 backdrop-blur-[3px] transition-all duration-500 group-hover/img:bg-slate-200/30 group-hover/img:backdrop-blur-[1px]"></div>
                  <div className="relative z-20 flex flex-col items-center transition-transform duration-500 group-hover/img:-translate-y-2">
                    <ExternalLink size={64} strokeWidth={1.5} className="text-blue-600 mb-6 drop-shadow-md" />
                    <h3 className="text-2xl font-bold tracking-widest text-slate-800 mb-2 drop-shadow-sm">CargoWare</h3>
                    <p className="text-slate-600 text-sm font-medium bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/60">SaaS Interface Area</p>
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal delay={300} className="w-full lg:w-2/5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  <GlassPill className="!bg-blue-50 !text-blue-700 !border-blue-100">B端 SaaS</GlassPill>
                  <GlassPill className="!bg-emerald-50 !text-emerald-700 !border-emerald-100">效率工具</GlassPill>
                  <GlassPill>AI 原型</GlassPill>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">CargoWare 国际货代 CRM</h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Overview
                    </h4>
                    <p>针对企业客户资产流失与管理层 KPI 量化痛点，重构 B 端业务架构。设计包含左侧列表+右侧卡片的高效多并发处理布局与 4 种系统跟进字典逻辑。</p>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Impact
                    </h4>
                    <p>运用 AI Coding 与 Prompt Engineering 精准定义交互，将传统静态原型升级为可交互演示版本，使研发评审确认周期大幅缩短 <strong className="text-blue-600 font-bold">50%</strong> 以上，实现效率跃升。</p>
                  </div>
                </div>

                <a 
                  href="https://gemini.google.com/share/02984da4a7e3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-4 transition-all duration-300 w-max group/btn"
                >
                  View Case Study <ArrowRight size={18} className="text-blue-500 group-hover/btn:text-slate-900 transition-colors" />
                </a>
              </Reveal>
            </div>

          </div>
        </section>

        {/* =========================================
            PART 3: PRODUCT DESIGN (工业/硬件产品)
        ========================================== */}
        <section id="product-design" className="mb-32 pt-16">
          <Reveal delay={0} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Product Design</h2>
            <p className="text-xl text-slate-500 font-light">软硬一体化与智能硬件创新实践。</p>
          </Reveal>

          <div className="space-y-32">
            
            {/* --- Project 3: 蜓火 --- */}
            <div className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <Reveal delay={100} className="w-full lg:w-3/5 h-[450px] sm:h-[550px] rounded-[2.5rem] bg-slate-100/50 border border-slate-200/60 p-4 relative overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-full rounded-[2rem] border border-white/60 relative overflow-hidden flex items-center justify-center flex-col shadow-inner group/img cursor-pointer">
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/DRAGONFL%20UAV.jpg" 
                    alt="DRAGONFLY UAV" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-200/70 backdrop-blur-[3px] transition-all duration-500 group-hover/img:bg-slate-200/30 group-hover/img:backdrop-blur-[1px]"></div>
                  <div className="relative z-20 flex flex-col items-center transition-transform duration-500 group-hover/img:-translate-y-2">
                    <Flame size={64} strokeWidth={1.5} className="text-red-600 mb-6 drop-shadow-md" />
                    <h3 className="text-2xl font-bold tracking-widest text-slate-800 mb-2 drop-shadow-sm">DRAGONFLY UAV</h3>
                    <p className="text-slate-600 text-sm font-medium bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/60">Industrial Design</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} className="w-full lg:w-2/5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  <GlassPill className="!bg-red-50 !text-red-700 !border-red-100">应急救援</GlassPill>
                  <GlassPill className="!bg-orange-50 !text-orange-700 !border-orange-100">智能硬件</GlassPill>
                  <GlassPill>交互创新</GlassPill>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">“蜓火” 消防无人机指挥系统</h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Overview
                    </h4>
                    <p>基于对高层火灾场景的深度调研，精准识别出火场内部“信息黑洞（指挥盲区）、受困人员恐慌迷失（缺乏引导）、传统救援沟通低效”三大核心痛点。</p>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Impact
                    </h4>
                    <p>区别于传统喊话器，开创性定义了<strong className="text-red-600 font-bold">“语音+灯光+手势”</strong>的三维多模态交互逻辑。规划红外热成像与3D扫描模块构建实时模型。荣获“智博杯”优秀奖。</p>
                  </div>
                </div>

                <a 
                  href="https://gemini.google.com/share/a28428bcb634" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-4 transition-all duration-300 w-max group/btn"
                >
                  View Case Study <ArrowRight size={18} className="text-red-500 group-hover/btn:text-slate-900 transition-colors" />
                </a>
              </Reveal>
            </div>

            {/* --- Project 4: BEE HIVE --- */}
            <div className="group flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
              <Reveal delay={100} className="w-full lg:w-3/5 h-[450px] sm:h-[550px] rounded-[2.5rem] bg-slate-100/50 border border-slate-200/60 p-4 relative overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-full rounded-[2rem] border border-white/60 relative overflow-hidden flex items-center justify-center flex-col shadow-inner group/img cursor-pointer">
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/BEE%20HIVE.png" 
                    alt="BEE HIVE IoT" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-200/70 backdrop-blur-[3px] transition-all duration-500 group-hover/img:bg-slate-200/30 group-hover/img:backdrop-blur-[1px]"></div>
                  <div className="relative z-20 flex flex-col items-center transition-transform duration-500 group-hover/img:-translate-y-2">
                    <Hexagon size={64} strokeWidth={1.5} className="text-amber-600 mb-6 drop-shadow-md" />
                    <h3 className="text-2xl font-bold tracking-widest text-slate-800 mb-2 drop-shadow-sm">BEE HIVE IoT</h3>
                    <p className="text-slate-600 text-sm font-medium bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/60">Hardware Ecosystem</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} className="w-full lg:w-2/5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  <GlassPill className="!bg-amber-50 !text-amber-700 !border-amber-100">IoT 系统</GlassPill>
                  <GlassPill className="!bg-yellow-50 !text-yellow-700 !border-yellow-100">软硬一体</GlassPill>
                  <GlassPill>社区 APP</GlassPill>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">BEE HIVE 城市智能养蜂</h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Overview
                    </h4>
                    <p>洞察“都市农业”与“宠物经济”趋势，针对传统养蜂“操作门槛高、状态不可见、取蜜繁琐”的用户痛点，确立了“人蜂分离+智能托管”的产品定位。</p>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Impact
                    </h4>
                    <p>硬件端创新设计<strong className="text-amber-600 font-bold">自助取蜜结构与温湿度监控</strong>；APP端构建“监控预警”与“成果分享”社交裂变社区。完成全链路设计，成功获得外观设计专利。</p>
                  </div>
                </div>

                <a 
                  href="https://gemini.google.com/share/f034012fe0ee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-4 transition-all duration-300 w-max group/btn"
                >
                  View Case Study <ArrowRight size={18} className="text-amber-500 group-hover/btn:text-slate-900 transition-colors" />
                </a>
              </Reveal>
            </div>

            {/* --- Project 5: ICPB --- */}
            <div className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <Reveal delay={100} className="w-full lg:w-3/5 h-[450px] sm:h-[550px] rounded-[2.5rem] bg-slate-100/50 border border-slate-200/60 p-4 relative overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-full rounded-[2rem] border border-white/60 relative overflow-hidden flex items-center justify-center flex-col shadow-inner group/img cursor-pointer">
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/-/refs/heads/main/ICPB.jpg" 
                    alt="ICPB Power Bank" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-200/70 backdrop-blur-[3px] transition-all duration-500 group-hover/img:bg-slate-200/30 group-hover/img:backdrop-blur-[1px]"></div>
                  <div className="relative z-20 flex flex-col items-center transition-transform duration-500 group-hover/img:-translate-y-2">
                    <BatteryCharging size={64} strokeWidth={1.5} className="text-cyan-600 mb-6 drop-shadow-md" />
                    <h3 className="text-2xl font-bold tracking-widest text-slate-800 mb-2 drop-shadow-sm">ICPB Power Bank</h3>
                    <p className="text-slate-600 text-sm font-medium bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/60">Consumer Electronics</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} className="w-full lg:w-2/5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  <GlassPill className="!bg-cyan-50 !text-cyan-700 !border-cyan-100">消费电子</GlassPill>
                  <GlassPill className="!bg-sky-50 !text-sky-700 !border-sky-100">趣味交互</GlassPill>
                  <GlassPill>痛点微创新</GlassPill>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">ICPB 创意共享充电宝</h3>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Overview
                    </h4>
                    <p>针对市面上同质化严重的共享充电宝外型进行趣味化重塑。利用清新配色与尾部微创新，将其巧妙打造成一支极具辨识度的“雪糕”。</p>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div> Impact
                    </h4>
                    <p>通过添加类似“雪糕棍”的手柄设计，以极简成本<strong className="text-cyan-600 font-bold">解决了“难以区分正反面”和“手指抠出费力”两大体验痛点</strong>。荣获欧洲产品设计大赛 Winner 奖。</p>
                  </div>
                </div>

                <a 
                  href="https://gemini.google.com/share/73ce4ae2e919" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-4 transition-all duration-300 w-max group/btn"
                >
                  View Case Study <ArrowRight size={18} className="text-cyan-500 group-hover/btn:text-slate-900 transition-colors" />
                </a>
              </Reveal>
            </div>

          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-slate-200 py-12 text-center text-slate-500 text-sm bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Weijia Shu. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:swj011021@163.com" className="hover:text-slate-900 transition-colors font-medium">swj011021@163.com</a>
            <span className="font-medium">132-1278-5002</span>
          </div>
        </div>
      </footer>
      
      {/* AI Assistant Widget */}
      <AIChatWidget />
    </div>
  );
}
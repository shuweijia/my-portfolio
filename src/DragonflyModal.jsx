import React, { useState, useEffect } from 'react';
import { 
  Flame, Building, Users, AlertTriangle, 
  Wind, Mic, Hand, ArrowRightLeft, 
  Target, Eye, MapPin, Cpu, Video, Award, Clock, User, X
} from 'lucide-react';

export default function DragonflyModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fadeIn = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
  const transition = "transition-all duration-1000 ease-out";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-gradient-to-br from-red-50 via-white to-orange-50 text-slate-800 font-sans selection:bg-orange-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all shadow-lg hover:shadow-xl"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          
          <nav className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-red-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                DRAGONFLY 蜓火高楼消防无人机
              </div>
              <div className="text-sm text-slate-500">产品设计作品集</div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">

        <section className={`py-12 flex flex-col justify-center ${fadeIn} ${transition}`}>
          <div className="inline-block mb-6 text-orange-600 font-medium tracking-wider text-sm uppercase">
            HIGH RISE FIRE FIGHTING UAV
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">蜓火</span><br />
            高楼消防无人机
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed text-lg">
                有效引导受困者自主逃生、配合救援，辅助消防员顺利完成救援行动。
              </p>
              <p className="text-slate-600 leading-relaxed">
                高楼火灾因为其火势蔓延快、疏散困难、扑救难度大、高楼结构复杂、人员密集等特点，已成为威胁城市公众安全与社会发展的主要灾害之一。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 p-4 rounded-xl border border-red-100 backdrop-blur-md shadow-sm">
                <Award className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-sm text-slate-500">成果获得</div>
                <div className="font-semibold text-slate-800">智博杯工业设计大赛 优秀奖</div>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-red-100 backdrop-blur-md shadow-sm">
                <Users className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-sm text-slate-500">团队人数</div>
                <div className="font-semibold text-slate-800">3 人</div>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-red-100 backdrop-blur-md shadow-sm">
                <Clock className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-sm text-slate-500">制作时长</div>
                <div className="font-semibold text-slate-800">6 周</div>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-red-100 backdrop-blur-md shadow-sm">
                <User className="w-6 h-6 text-orange-500 mb-2" />
                <div className="text-sm text-slate-500">负责部分</div>
                <div className="font-semibold text-slate-800 text-sm">建模、草图、竞品分析、调研</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="w-full rounded-2xl border border-red-200 bg-white overflow-hidden shadow-2xl">
            <img 
              src="/images/DRAGONFL UAV.jpg" 
              alt="蜓火无人机主渲染图" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </section>

        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">城市高楼火灾痛点分析</h2>
            <p className="text-slate-600">现有的高楼火灾救援手段不能适应高楼的建设发展</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Building />, title: "烟囱效应蔓延快", desc: "楼梯、竖井等形成烟囱效应，致使烟雾弥漫，助长火势迅速蔓延。" },
              { icon: <AlertTriangle />, title: "断电与电梯瘫痪", desc: "楼内封闭且极易断电失去照明；电梯在火灾情况下失去正常供电，易将烟气吸入。" },
              { icon: <Flame />, title: "火点难以确认", desc: "高楼结构复杂，火点难以迅速确认，现有消防器材对于高楼火灾作用大打折扣。" },
              { icon: <Users />, title: "人群恐慌疏散难", desc: "人们的恐慌心理容易造成人群疏散困难，甚至在黑暗和烟雾中发生拥挤、踩踏。" },
              { icon: <Target />, title: "自救与决策考验", desc: "对于被困人员自己的逃生知识以及外部消防人员的及时决策都是极大的考验。" },
              { icon: <Eye />, title: "缺乏现场感知", desc: "消防员无法及时了解火场具体状况，信息获取延迟，难以找到所有被困人员。" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white/60 backdrop-blur-md border border-red-100 rounded-xl hover:border-red-300 hover:bg-red-50/50 transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border border-orange-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <img src="/images/user map.png" alt="火灾数据调研图表" className="max-w-full h-auto max-h-[800px] object-contain bg-gradient-to-br from-red-50 to-white p-2 md:p-6 rounded-xl border border-red-100 shadow-[0_0_30px_rgba(239,68,68,0.08)]" />
          </div>
        </section>

        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">功能与交互创新</h2>
            <p className="text-slate-600">建立被困人员与无人机、消防员与无人机之间的全新人机关系</p>
          </div>

          <div className="space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="w-12 h-12 bg-green-50 text-green-600 border border-green-100 rounded-lg flex items-center justify-center shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">1. 信号灯智能交互引导</h3>
                <p className="text-slate-600 leading-relaxed">
                  无人机智能检测高楼中温度、烟气浓度的分布状况，分析人体是否可以安全通过，并通过不同信号灯直观引导被困人员：
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></span>
                    <span><strong>前进信号：</strong>绿色灯光保持亮起，表示道路安全。</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] animate-pulse"></span>
                    <span><strong>等待信号：</strong>黄色灯光缓慢闪烁，提示原地等待。</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-ping"></span>
                    <span><strong>警示信号：</strong>红色灯光快速闪烁，警告前方危险。</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <img src="/images/dengguang.png" alt="信号灯交互界面展示" className="max-w-full h-auto max-h-96 object-contain bg-white/60 p-2 rounded-xl border border-red-100 shadow-sm" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                  <Hand className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">2. 智能手势识别</h3>
                <p className="text-slate-600 leading-relaxed">
                  无人机在姿态捕捉上识别人的动作信息。手势识别摄像头通过对受困者不同手势的识别，接收受困者主观上是否愿意通过当前道路的想法，随时进行逃生路线调整，充分尊重被困人员身体状况与逃生需求。
                </p>
              </div>
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <img src="/images/camera.png" alt="手势识别镜头与交互演示" className="max-w-full h-auto max-h-96 object-contain bg-white/60 p-2 rounded-xl border border-red-100 shadow-sm" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg flex items-center justify-center shadow-sm">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">3. 语音交互与情绪安抚系统</h3>
                <p className="text-slate-600 leading-relaxed">
                  通过麦克风进行语音引导，设置平复情绪的专属语音，从心理上激励人群提高逃生速度。
                  <br/><br/>
                  <strong>关键词捕捉：</strong>当系统识别到受困者语言中的"难受"、"不能"等关键词后，将自动提供针对性的路线转换或应急救治方案，并联通救援人员。
                </p>
              </div>
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <img src="/images/changjing.jpg" alt="语音模块与界面展示" className="max-w-full h-auto max-h-96 object-contain bg-white/60 p-2 rounded-xl border border-red-100 shadow-sm" />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg flex items-center justify-center shadow-sm">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">4. 空陆状态无缝转换</h3>
                <p className="text-slate-600 leading-relaxed">
                  本无人机采用独特的尾部叶轮与折叠结构，可以通过空陆状态的转换，适应现场不同的地形与高度。这使得它不仅能在外部高空飞行，在室内以及狭窄通道空间中也可以稳定地移动、搜救。
                </p>
              </div>
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <img src="/images/sky-land.png" alt="空陆转换姿态" className="max-w-full h-auto max-h-96 object-contain bg-white/60 p-2 rounded-xl border border-red-100 shadow-sm" />
              </div>
            </div>

          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">综合救援与灭火方案</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-white/60 backdrop-blur-md border border-red-100 shadow-sm p-8 rounded-2xl flex flex-col">
              <Wind className="w-10 h-10 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">主动灭火方式</h3>
              <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                无人机不仅限于侦查，更具备直接干预火场的能力。通过声波灭火技术和精准投放干粉灭火球，在火场内部进行一定程度的灭火作业。为消防员提前开辟救援通道，或为被困者扫除逃生障碍。
              </p>
              <img src="/images/toufang.png" alt="灭火模块细节" className="max-w-full h-auto max-h-64 mx-auto block object-contain bg-white/50 p-2 rounded-xl border border-red-50 shadow-sm" />
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-red-100 shadow-sm p-8 rounded-2xl flex flex-col">
              <Activity className="w-10 h-10 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">医疗救治与显示辅助</h3>
              <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                机身搭载紧急医疗物资舱，可在第一时间向被困者投递急救包、防烟面罩等物资。配备高清显示屏幕，可通过视频画面直接为被困者演示急救步骤或展示逃生地图。
              </p>
              <img src="/images/yaopin.png" alt="医疗物资舱与高清显示屏幕细节" className="max-w-full h-auto max-h-64 mx-auto block object-contain bg-white/50 p-2 rounded-xl border border-red-50 shadow-sm" />
            </div>

          </div>
        </section>

        <section className="py-24 bg-white/40 relative overflow-hidden border-t border-red-100 rounded-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-[0.03] pointer-events-none">
            <Cpu className="w-full h-full text-slate-900" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">硬件结构与技术架构</h2>
              <p className="text-slate-600">模块化设计与多维传感器集群，构建高空消防全场景掌控力</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              <div className="lg:w-1/3 space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><Flame className="w-5 h-5 text-orange-500"/> 火灾探测技术</h4>
                  <p className="text-sm text-slate-600">对火情进行实时分析，红外探测房屋内部结构，寻找火源隐患点，为指挥部提供精准信息辅助决策。</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><Eye className="w-5 h-5 text-orange-500"/> 自动避障技术</h4>
                  <p className="text-sm text-slate-600">雷达与视觉双重加持，自动识别并规避火场内坠落物及复杂结构，大幅降低恶劣环境下的操控难度。</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-orange-500"/> 室内外定位技术</h4>
                  <p className="text-sm text-slate-600">消防无人机在执行搜救任务过程中，确保在GPS信号弱的高楼内部也能进行精准三维定位与实时跟踪。</p>
                </div>
              </div>

              <div className="lg:w-1/3 w-full flex justify-center items-center">
                <img src="/images/baozhatu.png" alt="无人机爆炸图" className="max-w-full h-auto max-h-[600px] object-contain bg-white/60 p-4 rounded-xl border border-red-100 shadow-[0_4px_20px_rgba(234,88,12,0.08)]" />
              </div>

              <div className="lg:w-1/3 space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><Cpu className="w-5 h-5 text-orange-500"/> 集群控制技术</h4>
                  <p className="text-sm text-slate-600">多机协同作业，使多台无人机之间能够进行资源共享、通信协同与任务智能分配，提升整体救援效率。</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><Video className="w-5 h-5 text-orange-500"/> 远程监控与测绘</h4>
                  <p className="text-sm text-slate-600">摄像机及红外扫描仪将现场数据传输并进行三维建模还原。实现灭火前、灭火中、灭火后的全流程远程监控与余烬监管。</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-orange-500"/> 场景与定位总结</h4>
                  <p className="text-sm text-slate-600">在浓烟、断电、高温的高层复杂环境中，灵活穿梭，作为桥梁连接被困者与消防员，避免错误自救，提供正确指引。</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-red-200 py-8 text-center text-slate-500 text-sm">
        <p>"蜓火" 高楼消防无人机产品设计作品集展示 © 2024</p>
      </footer>

        </div>
      </div>
    </div>
  );
}

const Activity = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;

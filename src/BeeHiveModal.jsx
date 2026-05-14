import React, { useState, useEffect } from 'react';
import { Hexagon, Droplet, Users, Clock, Award, Activity, Smartphone, Settings, Heart, Search, Layout, X } from 'lucide-react';

export default function BeeHiveModal({ isOpen, onClose }) {
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
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-[#FCFBF7] text-gray-800 font-sans selection:bg-yellow-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all shadow-lg hover:shadow-xl"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          
          <nav className="sticky top-0 w-full z-40 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-yellow-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Hexagon className="w-5 h-5 fill-yellow-400 text-yellow-500" />
                BEE HIVE 城市智能养蜂
              </div>
              <div className="text-sm text-gray-500">产品设计作品集</div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">

            <section className={`py-12 flex flex-col justify-center ${fadeIn} ${transition}`}>
              <div className="inline-block mb-6 text-yellow-600 font-medium tracking-wider text-sm uppercase flex items-center gap-2">
                <Award className="h-4 w-4" />
                获得一项外观专利
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
                BEE HIVE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">未来新型城市私人蜂巢</span>
              </h1>
              
                  <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    随着"人与自然生命共同体"的提出，城市纯业余养蜂兴起。普通蜂箱隔音差、操作复杂、观赏性低。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    本产品具有自助取蜜、人蜂分离、实时监控等功能，结合"蜂巢"仿生设计，融入城市建筑，让城市出现鸟语花香的和谐景象。
                  </p>
                </div>
                    <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-yellow-100 backdrop-blur-md shadow-sm">
                    <Users className="w-6 h-6 text-yellow-500 mb-2" />
                    <div className="text-sm text-gray-500">团队人数</div>
                    <div className="font-semibold text-gray-800">2 人</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-yellow-100 backdrop-blur-md shadow-sm">
                    <Clock className="w-6 h-6 text-yellow-500 mb-2" />
                    <div className="text-sm text-gray-500">制作时长</div>
                    <div className="font-semibold text-gray-800">7 周</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-yellow-100 backdrop-blur-md shadow-sm col-span-2">
                    <Layout className="w-6 h-6 text-yellow-500 mb-2" />
                    <div className="text-sm text-gray-500">负责部分</div>
                    <div className="font-semibold text-gray-800">建模、草图、竞品分析</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-32">
              <div className="w-full rounded-2xl border border-yellow-200 bg-white overflow-hidden shadow-2xl">
                    <img 
                  src="/images/BEE HIVE.png" 
                  alt="BEE HIVE 产品主效果图" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </section>

            <section className="mb-32 bg-yellow-50 rounded-2xl p-8 md:p-12">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">背景与趋势</h2>
                    <p className="text-gray-600">从养蜂促农到城市养蜂兴起的演变历程</p>
                  </div>

              <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-yellow-500 font-bold text-xl mb-2">1970s 中后期</div>
              <h3 className="font-bold mb-3">初级阶段</h3>
              <p className="text-gray-600 text-sm">中国养蜂业发展的主体宣传口号是"养蜂促农"和"养蜂致富奔小康"。后来新增"养蜂脱贫"。</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-yellow-500 font-bold text-xl mb-2">1990s 年代</div>
              <h3 className="font-bold mb-3">产业调整</h3>
              <p className="text-gray-600 text-sm">"养蜂业是促进农业、养殖业结构调整的重要产业"，进入追求经济效益的第二阶段。</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-yellow-300 relative transform md:-translate-y-4">
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">核心趋势</div>
              <div className="text-yellow-600 font-bold text-xl mb-2">进入新世纪</div>
              <h3 className="font-bold mb-3 text-lg">城市养蜂兴起</h3>
              <p className="text-gray-700 text-sm">养蜂业成为"人与自然和谐共处的纽带"。专业养蜂增势减缓，业余养蜂风头兴起，在北京、珠三角等城市尤为明显。</p>
            </div>
          </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">创意点分析</h2>
                    <p className="text-gray-600">从功能、结构、材料多维度创新</p>
              </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                src="/images/zhuanbianfengchao.png" 
                alt="头脑风暴与结构创意" 
                className="rounded-2xl shadow-lg w-full h-auto object-contain bg-white p-4"
              />
            </div>
            
                <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="flex items-center text-xl font-bold mb-3 text-yellow-600">
                  <Settings className="mr-2 h-5 w-5" /> 功能创意
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                  <li>将蜂箱、采蜜机及蜜蜂观察箱结合，提升城市使用可能性。</li>
                  <li>蜂箱造型创意改动，自由组装单元格，吸引年轻客户。</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="flex items-center text-xl font-bold mb-3 text-yellow-600">
                  <Hexagon className="mr-2 h-5 w-5" /> 结构创意
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                  <li>利用两个蜂脾错位的原理，使蜂蜜可以自行流出。</li>
                  <li>把接蜜盒与引蜜管连接，使接蜜过程简便易行。</li>
                </ul>
              </div>

              </div>
            </div>
            </section>

            <section className="mb-32 bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">用户旅程图</h2>
                    <p className="text-gray-600">从准备到收获，探索用户的体验痛点与设计机会</p>
              </div>

                  <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-yellow-100 -translate-y-1/2"></div>
                <div className="grid md:grid-cols-5 gap-6">
              {[
                { title: "箱体准备", acts: ["购买城市蜂箱", "组装蜂箱", "安放蜂箱"], pain: "安装步骤繁琐，耐心差", opp: "简化安装步骤，降低难度" },
                { title: "前期准备", acts: ["引入蜜蜂", "安放蜂后", "观察状态"], pain: "准备周期长，好奇心下降", opp: "增加趣味互动，提高兴趣" },
                { title: "养殖进行", acts: ["定期观察", "监控内部", "恒温调节"], pain: "新鲜感过后容易遗忘", opp: "智能APP提醒，简化管理" },
                { title: "养殖检查", acts: ["智能定时提醒", "消毒除螨", "状态确认"], pain: "缺乏专业知识，手足无措", opp: "健康监管与可视化指导" },
                { title: "蜂蜜收获", acts: ["自动取蜜", "蜂蜜收获", "成果分享"], pain: "传统取蜜极度繁琐危险", opp: "智能技术实现自动取蜜" }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 bg-[#FCFBF7] p-6 rounded-2xl border border-yellow-200 shadow-sm hover:-translate-y-2 transition-transform">
                  <div className="w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto border-4 border-white shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-center mb-4 text-yellow-700">{step.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 mb-1">用户行为</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {step.acts.map((act, i) => <li key={i}>{act}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <h4 className="text-xs font-bold text-red-400 mb-1">痛点</h4>
                      <p className="text-xs text-gray-600">{step.pain}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <h4 className="text-xs font-bold text-green-500 mb-1">设计机会</h4>
                      <p className="text-xs text-gray-600">{step.opp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">设计深化与 CMF</h2>
            <p className="text-gray-600">从草图到爆炸图的设计推演</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">草图推演 (Sketches)</h3>
                  <p className="text-gray-600">通过多次仿生形态探索，最终确立了正六边形的模块化拼接形式，既符合自然界蜂巢的原始美感，又能适应城市阳台的垂直空间组装。</p>
                  <img 
                src="/images/caotufengchao.png" 
                alt="产品草图" 
                className="rounded-2xl shadow-md w-full h-auto object-contain"
              />
            </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">CMF 与爆炸图</h3>
                  <p className="text-gray-600">合理应用 ABS 塑料、防腐木、尼龙网布和亚克力玻璃。兼顾轻量化、耐用性与蜜蜂的生活习性。</p>
                  <img 
                src="/images/baozhatufengchao.png" 
                alt="CMF 爆炸图" 
                className="rounded-2xl shadow-md w-full h-auto object-contain bg-white p-4"
              />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-yellow-100">
                <h3 className="text-xl font-bold mb-6 text-center">主要材质清单</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="block font-bold text-gray-800 mb-1">外壳 / 装饰框</span>
                    <span className="text-gray-500">ABS塑料 (注塑成型)</span>
              </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="block font-bold text-gray-800 mb-1">内部蜂脾</span>
                    <span className="text-gray-500">松木 (切削加工)</span>
              </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="block font-bold text-gray-800 mb-1">观察窗</span>
                    <span className="text-gray-500">有色玻璃 (切割)</span>
              </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="block font-bold text-gray-800 mb-1">导流管</span>
                    <span className="text-gray-500">PP塑料 (无毒无味)</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-32 bg-yellow-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1 flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-yellow-500 rounded-[3rem] transform -rotate-6 scale-105 opacity-60 blur-lg"></div>
                    <img 
                  src="/images/yonghuliuchengfengchao.png" 
                  alt="APP UI界面" 
                  className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white w-full h-auto object-contain bg-yellow-400 p-4"
                />
              </div>
            </div>
                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl font-bold">智能监控 UI 设计</h2>
              <p className="text-gray-600 leading-relaxed">
                配套手机 APP，实现养蜂的数字化与社交化。主要功能分为四个阶段，全程陪伴用户的养蜂体验。
              </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-yellow-500"><Smartphone className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg">第一阶段</h4>
                        <p className="text-sm text-gray-500">创建用户档案与蜂箱绑定</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-yellow-500"><Activity className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg">第二阶段</h4>
                        <p className="text-sm text-gray-500">实时监控筑蜜进度，可视化数据</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-yellow-500"><Search className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg">第三阶段</h4>
                        <p className="text-sm text-gray-500">查看蜂箱温度、健康状态报警</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-yellow-500"><Heart className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg">第四阶段</h4>
                        <p className="text-sm text-gray-500">社区分享，晒出养蜂成果进行交流</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
            <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">城市应用场景</h2>
                  <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-white">
                  <img 
                    src="/images/fengchaochangjing.png" 
                    alt="最终应用场景" 
                    className="w-full h-auto min-h-[400px] object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                    <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">成为城市亮丽的风景线</h3>
                    <p className="text-gray-200 text-lg md:w-2/3">
                      通过安装在外部的植物哺育所养育的蜜蜂，同时能够起到美化环境的作用。整体的六边形作为一个单元格，通过拼接组装可以组成新的造型，充分给予用户自己动手 DIY 的自由，让高楼大厦也拥有鸟语花香。
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </main>

          <footer className="border-t border-yellow-200 py-8 text-center text-gray-500 text-sm">
            <p>BEE HIVE 未来新型城市私人蜂巢设计 © 2024</p>
          </footer>

        </div>
      </div>
    </div>
  );
}

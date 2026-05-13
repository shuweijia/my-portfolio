import React, { useState, useEffect } from 'react';
import { Award, Users, Clock, Edit3, X } from 'lucide-react';

export default function ICPBModal({ isOpen, onClose }) {
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
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-gray-50 text-gray-800 font-sans selection:bg-sky-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all shadow-lg hover:shadow-xl"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          
          <nav className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="font-bold text-sky-600 tracking-tight text-xl">
                ICPB.
              </div>
              <div className="text-sm text-gray-500">产品设计作品集</div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">

            <section className={`py-12 flex flex-col justify-center ${fadeIn} ${transition}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                ICPB <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">创意共享充电宝外观设计</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-600 mb-10 font-medium tracking-wide">
                ICPB Creative Sharing of Power Bank Appearance Design
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    我们在使用共享充电宝时对于其方方正正的单调外型已经感到了乏味，希望能够通过充电宝的创意外形吸引用户使用。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    仅仅只是在充电宝尾部加上一个模仿雪糕的雪糕棍形状的手柄，配上清新的配色，就能让人联想到雪糕，在创意造型的同时，方便了用户区分放入充电箱的方向。
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-sky-100 backdrop-blur-md shadow-sm">
                    <Award className="w-6 h-6 text-sky-500 mb-2" />
                    <div className="text-sm text-gray-500">成果获得</div>
                    <div className="font-semibold text-gray-800">欧洲产品设计大赛 Winner</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-sky-100 backdrop-blur-md shadow-sm">
                    <Users className="w-6 h-6 text-sky-500 mb-2" />
                    <div className="text-sm text-gray-500">团队人数</div>
                    <div className="font-semibold text-gray-800">3 人</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-sky-100 backdrop-blur-md shadow-sm">
                    <Clock className="w-6 h-6 text-sky-500 mb-2" />
                    <div className="text-sm text-gray-500">制作时长</div>
                    <div className="font-semibold text-gray-800">2 周</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-sky-100 backdrop-blur-md shadow-sm">
                    <Edit3 className="w-6 h-6 text-sky-500 mb-2" />
                    <div className="text-sm text-gray-500">负责部分</div>
                    <div className="font-semibold text-gray-800 text-sm">草图绘制、竞品分析、调研分析</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-32">
              <div className="w-full rounded-2xl border border-sky-200 bg-white overflow-hidden shadow-2xl">
                <img 
                  src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/ICPB.jpg" 
                  alt="ICPB主效果图" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-1 bg-sky-500 mr-4 rounded-full"></span>
                  项目背景
                </h2>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="prose prose-lg text-gray-600 mb-8">
                  <p className="mb-4">
                    我们在使用共享充电宝时对于其方方正正的单调外型已经感到了乏味，在市面上各式各样的充电宝通过抢占销售场所的营销策略下，<strong>希望能够通过充电宝的创意外形吸引用户使用。</strong>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-1 bg-sky-500 mr-4 rounded-full"></span>
                  用户需求与痛点分析
                </h2>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="flex mb-8">
                    <div className="w-24 flex-shrink-0 font-bold text-gray-400 flex items-center">阶段</div>
                    <div className="flex-1 flex gap-4">
                      {['电量过低', '寻找充电宝', '租借充电宝', '充电进行', '归还充电宝'].map((step, i) => (
                        <div key={i} className="flex-1 bg-sky-100 text-sky-800 py-3 px-4 rounded-lg text-center font-medium relative">
                          {step}
                          {i < 4 && <div className="absolute top-1/2 -right-3 w-4 h-4 bg-sky-100 transform -translate-y-1/2 rotate-45 z-10 hidden md:block"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex mb-8">
                    <div className="w-24 flex-shrink-0 font-bold text-gray-400 mt-2">行为</div>
                    <div className="flex-1 flex gap-4 text-sm text-gray-600">
                      <div className="flex-1 px-2 text-center">开始焦虑电量<br/>寻找充电宝</div>
                      <div className="flex-1 px-2 text-center">多种充电宝在一起<br/>选择自己更喜欢的一款</div>
                      <div className="flex-1 px-2 text-center">扫码租借<br/>充电宝弹出<br/>拿取充电宝</div>
                      <div className="flex-1 px-2 text-center mt-4">用充电宝进行充电行为</div>
                      <div className="flex-1 px-2 text-center mt-4">在充电箱前归还充电宝</div>
                    </div>
                  </div>

                  <div className="flex mb-12 relative">
                    <div className="w-24 flex-shrink-0 font-bold text-gray-400 mt-4">情感</div>
                    <div className="flex-1 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 rounded-full h-16 flex items-center px-6 text-sm text-sky-900 relative">
                      <span className="w-1/3">电量过低，没有可以充电的地方，心情焦虑</span>
                      <span className="w-1/3 text-center px-4">找到充电站，看到可爱的创意的不同于其他的充电宝很有兴趣</span>
                      <span className="w-1/3 text-right">方便快捷的归还让人心情愉悦</span>
                      
                      <div className="absolute left-[10%] -top-4 text-2xl">😟</div>
                      <div className="absolute left-[45%] -top-6 text-2xl">🤩</div>
                      <div className="absolute right-[10%] -top-4 text-2xl">😊</div>
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className="w-24 flex-shrink-0 font-bold text-gray-400 flex items-center">痛点</div>
                    <div className="flex-1 flex gap-4">
                      <div className="flex-[2] bg-gray-100 py-3 px-4 rounded-lg text-sm text-gray-700 text-center">充电宝多种多样，但是外型都相对单一</div>
                      <div className="flex-[2] bg-gray-100 py-3 px-4 rounded-lg text-sm text-gray-700 text-center">拿取充电宝不方便，弹出的距离不够，需要用手抠出来</div>
                      <div className="flex-[1] bg-gray-100 py-3 px-4 rounded-lg text-sm text-gray-700 text-center">分不清归还充电宝的方向</div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-bold text-gray-400 flex items-center">设计机会</div>
                    <div className="flex-1 flex gap-4">
                      <div className="flex-[2] bg-sky-50 border border-sky-100 py-3 px-4 rounded-lg text-sm text-sky-700 text-center font-medium">造型创新，更趣味更吸引人</div>
                      <div className="flex-[3] bg-sky-50 border border-sky-100 py-3 px-4 rounded-lg text-sm text-sky-700 text-center font-medium">添加雪糕手柄，方便拿取以及放回，通过简单的添加造型获得便利</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-1 bg-sky-500 mr-4 rounded-full"></span>
                  草图构想
                </h2>
                <p className="text-gray-500 max-w-2xl">从概念到实物的探索过程，寻找最符合人机工程学且具有趣味性的雪糕造型。</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                <img 
                  src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/cdb-caotu.png" 
                  alt="草图构想" 
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </section>

            <section className="mb-32">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-1 bg-sky-500 mr-4 rounded-full"></span>
                  最终方案与设计说明
                </h2>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
                  <p className="text-gray-600 leading-relaxed">
                    ICPB 创意充电宝外观设计采用了模仿雪糕的外型的形式，通过雪糕棍的手柄设置区分放入充电箱的方向，用户不需要多余的操作及思考就能分辨方向。增加手柄也让用户拿取和放回充电宝时更加方便，同时这种拿取雪糕的形式增加了用户的趣味性，吸引用户使用本产品，增加用户黏性。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="group rounded-2xl overflow-hidden shadow-md bg-white">
                  <div className="bg-sky-100 text-sky-800 text-center py-3 font-semibold text-sm tracking-wide">
                    扫码弹出充电宝
                  </div>
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/cdb-tanchu.jpg" 
                    alt="扫码弹出充电宝" 
                    className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="group rounded-2xl overflow-hidden shadow-md bg-white">
                  <div className="bg-sky-100 text-sky-800 text-center py-3 font-semibold text-sm tracking-wide">
                    拿出充电宝
                  </div>
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/cdb-naqu.jpg" 
                    alt="拿出充电宝" 
                    className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="group rounded-2xl overflow-hidden shadow-md bg-white">
                  <div className="bg-sky-100 text-sky-800 text-center py-3 font-semibold text-sm tracking-wide">
                    给手机充电
                  </div>
                  <img 
                    src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/cdb-chongdian.jpg" 
                    alt="给手机充电" 
                    className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://raw.githubusercontent.com/shuweijia/portfolio/refs/heads/main/cdbchangjing.jpg" 
                  alt="最终方案渲染图" 
                  className="w-full h-auto object-contain bg-sky-50"
                />
              </div>
            </section>

          </main>

          <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
            <p>ICPB 创意共享充电宝外观设计 © 2024</p>
          </footer>

        </div>
      </div>
    </div>
  );
}


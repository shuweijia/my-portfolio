import React, { useState, useEffect } from 'react';
import { 
  Users, UserCog, User, 
  LayoutTemplate, ListFilter, PenTool, Clock, 
  TrendingUp, ShieldAlert, Link as LinkIcon, Sparkles,
  ChevronRight, Calendar, Phone, CheckCircle2, Search,
  MapPin, MessageSquare, BarChart3, AlertCircle, X
} from 'lucide-react';

export default function CRMCaseStudyModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 点击背景关闭
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC键关闭
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
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-gradient-to-b from-blue-50 via-white to-white text-zinc-800 font-sans selection:bg-indigo-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all shadow-lg hover:shadow-xl"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 可滚动内容区域 */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          
          {/* Navigation */}
          <nav className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                CargoWare UI/UX Case Study
              </div>
              <div className="text-sm text-zinc-500">V1.0 - CRM Module</div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        
        {/* Section 1: Hero (Background & Core Goals) */}
        <section className={`py-12 flex flex-col justify-center ${fadeIn} ${transition}`}>
          <div className="inline-block mb-6 text-indigo-600 font-medium tracking-wider text-sm uppercase">
            Product Requirements Document
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight mb-8">
            CRM 销售跟进<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              管理系统体验重塑
            </span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                业务背景 (Background)
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                在国际货代销售过程中，目前的沟通高度碎片化，销售人员往往依赖个人微信或QQ与客户沟通，导致企业内部缺乏有效的历史追溯机制和量化的KPI评估手段。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                核心目标 (Core Goals)
              </h3>
              <ul className="space-y-3 text-zinc-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <span><strong>沉淀客户资产：</strong>通过结构化录入，将沟通记录从个人社交软件转移并沉淀到企业系统中。</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <span><strong>驱动销售效能：</strong>提供直观的统计看板，量化当月工作量，激发销售动力。</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                  <span><strong>辅助业务决策：</strong>为管理层提供真实、可追溯的过程数据，作为绩效考核的可靠依据。</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Large Prototype Mockup */}
        <section className="mb-32">
          <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-2xl">
            <div className="h-10 border-b border-zinc-200 flex items-center px-4 gap-2 bg-zinc-50">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="ml-4 text-xs text-zinc-500 font-mono">CargoWare 国际货代云平台 - 销售模块原型</div>
            </div>
            <div className="bg-white">
              <img
                src="/images/cargoware.png"
                alt="CargoWare 国际货代 CRM 销售跟进模块界面"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Roles & Permissions (User Personas) */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">角色与权限定义</h2>
            <p className="text-zinc-600">精细化的权限管理，确保数据安全与管理效能。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-8 hover:shadow-lg hover:border-indigo-200 transition-all group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">销售人员</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                一线业务执行者。权限限制为仅能查看、新增、编辑归属于自己的客户跟进记录，保障客户资源的数据隔离与安全性。
              </p>
            </div>

            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-8 hover:shadow-lg hover:border-cyan-200 transition-all group">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">销售主管</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                团队管理者。具备全局视野，可查看下属所有销售的跟进统计数据及具体明细，但<strong>不可修改</strong>记录，确保考核数据的客观真实。
              </p>
            </div>

            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-8 hover:shadow-lg hover:border-emerald-200 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <UserCog className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">系统管理员</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                系统架构维护者。负责维护全局配置，如自定义“跟进方式”、“跟进结果”的配置字典，确保系统契合企业业务发展阶段。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Features Breakdown */}
        <section className="mb-32 space-y-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">核心功能需求解析</h2>
            <p className="text-zinc-600">通过结构化设计提升录入效率，通过可视化设计提升阅读体验。</p>
          </div>

          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold">01</div>
              <h3 className="text-2xl font-bold text-zinc-900">导航与全局布局设计</h3>
              <p className="text-zinc-600 leading-relaxed">
                将功能入口设定在侧边栏“销售”菜单下的二级菜单“跟进记录”。
                最核心的突破在于采用了经典的<strong>“左表右里”（Left-List, Right-Detail）</strong>布局。这种设计能确保销售人员在批量处理多个客户跟进时，无需频繁进行页面跳转，极大提升了操作流畅度。
              </p>
            </div>
            <div className="flex-1 w-full relative">
               <div className="aspect-video bg-white border border-zinc-200 rounded-2xl overflow-hidden flex shadow-lg">
                  <div className="w-1/3 border-r border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-2">
                    <div className="h-4 w-1/2 bg-zinc-200 rounded mb-4"></div>
                    <div className="h-10 w-full bg-indigo-50 border border-indigo-200 rounded"></div>
                    <div className="h-10 w-full bg-white border border-zinc-200 rounded"></div>
                    <div className="h-10 w-full bg-white border border-zinc-200 rounded"></div>
                  </div>
                  <div className="w-2/3 p-6 flex flex-col gap-4">
                    <div className="h-6 w-1/3 bg-zinc-200 rounded mb-2"></div>
                    <div className="h-32 w-full bg-white rounded border border-zinc-200 shadow-sm"></div>
                    <div className="h-24 w-full bg-white rounded border border-zinc-200 shadow-sm"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold">02</div>
              <h3 className="text-2xl font-bold text-zinc-900">左侧：智能客户列表看板</h3>
              <p className="text-zinc-600 leading-relaxed">
                直观展示公司简称、对接人、当前跟进状态及主营业务。
                配备了强大的模糊搜索和快捷标签筛选功能。
                <strong>优化逻辑：</strong>列表默认按照“最后跟进时间”倒序排列，系统智能优先展示那些长期未维护的“沉睡客户”，辅助销售盘活资源。
              </p>
            </div>
            <div className="flex-1 w-full relative">
               <div className="aspect-video bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
                  <div className="flex gap-2 mb-2">
                    <div className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs text-zinc-600">按状态筛选</div>
                    <div className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-full text-xs">长期未维护</div>
                  </div>
                  <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                      <div className="font-medium text-zinc-900">宁波港联运通</div>
                      <div className="text-xs text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded">超30天未跟进</div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                      <div className="font-medium text-zinc-900">北京中铁快运</div>
                      <div className="text-xs text-zinc-400">2天前跟进</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold">03</div>
              <h3 className="text-2xl font-bold text-zinc-900">中区：强管控的跟进操作中心</h3>
              <p className="text-zinc-600 leading-relaxed">
                集成了时间、方式、结果、内容的核心表单。
                <strong>真实性管控：</strong>针对选择“上门拜访”的记录，系统强制要求上传至少1张包含GPS水印的现场照片，作为绩效核查的防伪依据。跟进结果直接关联客户生命周期（如初步意向 → 明确需求 → 正式签约）。
              </p>
            </div>
            <div className="flex-1 w-full relative">
               <div className="aspect-video bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent"></div>
                  <div className="relative z-10 bg-white border border-zinc-200 shadow-sm rounded-xl p-5 w-full h-full flex flex-col justify-center gap-4">
                     <div className="flex gap-4">
                       <div className="h-8 flex-1 bg-zinc-50 rounded border border-zinc-200"></div>
                       <div className="h-8 flex-1 bg-indigo-50 border border-indigo-200 rounded flex items-center px-3 text-xs text-indigo-700 font-medium">✓ 上门拜访</div>
                     </div>
                     <div className="h-20 w-full bg-zinc-50 rounded border border-zinc-200"></div>
                     <div className="p-3 bg-red-50 border border-red-100 rounded flex items-center gap-2 text-xs text-red-600">
                       <AlertCircle className="w-4 h-4" /> 必须上传包含 GPS 水印的拜访现场照片
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </section>

        {/* Section 5: Optimization & Deep Thoughts */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">深度思考与产品体验优化建议</h2>
            <p className="text-zinc-600">不仅仅是记录工具，更是驱动业务增长的引擎。</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "公海池自动流转联动", desc: "若客户被标记为“无效沟通”且超30天未维护，系统自动触发“移入公海池”机制，释放并盘活死客户资源。", icon: <ListFilter className="w-5 h-5"/> },
              { title: "强制下一步计划", desc: "保存记录时强制填写“下次跟进时间”，并自动写入 CargoWare 系统日程，有效防止漏单和遗忘。", icon: <Calendar className="w-5 h-5"/> },
              { title: "智能 SOP 触发", desc: "结合 SOP 引擎，当销售录入“明确需求”状态后，系统自动向销售推送“询价模板”或待办，缩短转化路径。", icon: <Sparkles className="w-5 h-5"/> },
              { title: "移动端与语音识别", desc: "针对户外销售场景，同步开发微信小程序版，并支持“语音转文字”快捷录入，降低填写门槛。", icon: <Phone className="w-5 h-5"/> },
              { title: "防作弊的补录时限", desc: "仅允许回溯录入过去3天内的记录；超期记录需由主管审批解锁，杜绝月末突击造假以应付KPI的现象。", icon: <ShieldAlert className="w-5 h-5"/> },
              { title: "生命周期自动映射", desc: "当跟进结果选择“正式签约”时，自动将基础资料档案状态更替为“合作中”；连续3次无效沟通则提示放弃。", icon: <LinkIcon className="w-5 h-5"/> },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 p-6 rounded-xl hover:shadow-lg transition-all group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-zinc-900 mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Roadmap & Implementations */}
        <section className="border-t border-zinc-200 pt-20">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Roadmap */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-8">产品版本演进规划 (Roadmap)</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    1
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-indigo-200 bg-indigo-50 shadow-md">
                    <div className="flex flex-col items-start mb-3 gap-1">
                      <h4 className="font-bold text-zinc-900">V1.0 (MVP 阶段)</h4>
                      <span className="text-xs text-indigo-600 font-medium bg-indigo-100/50 px-2 py-0.5 rounded border border-indigo-200/50">当前范围</span>
                    </div>
                    <p className="text-sm text-zinc-700">实现结构化录入、客户列表、基础KPI统计看板及历史时间轴。解决业务数字化，“能看到”的问题。</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-zinc-100 text-zinc-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    2
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-zinc-900">V2.0 (智能提效版)</h4>
                    </div>
                    <p className="text-sm text-zinc-600">引入附件/照片支持、智能日程提醒、公海池自动回收及销售龙虎榜。实现流程自动化，“管得住”的问题。</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-zinc-100 text-zinc-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    3
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-zinc-900">V3.0 (生态与AI版)</h4>
                    </div>
                    <p className="text-sm text-zinc-600">集成AI大模型自动提取语音跟进摘要；对接天眼查/企查查实时更新客户资信。实现决策智能化，“卖得好”的问题。</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Implementation Rules */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-8">落地规则与业务联动</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-white border border-zinc-200 shadow-sm rounded-2xl">
                  <h4 className="text-zinc-900 font-medium mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 规则限制 (Risk Mitigation)
                  </h4>
                  <ul className="space-y-3 text-sm text-zinc-600">
                    <li className="flex items-start gap-3"><span className="text-zinc-400 mt-0.5">•</span> <span>记录创建后仅提供 <strong className="text-zinc-800">24小时</strong> 的可编辑窗口，过期即锁定，确保考核严肃性。</span></li>
                    <li className="flex items-start gap-3"><span className="text-zinc-400 mt-0.5">•</span> <span>历史日期补录限制为系统当前日期的 <strong className="text-zinc-800">过去3个自然日</strong> 范围。</span></li>
                    <li className="flex items-start gap-3"><span className="text-zinc-400 mt-0.5">•</span> <span>上门拜访类型必须通过移动端调用相册/相机，强制校验图片的 <strong className="text-zinc-800">EXIF GPS 坐标信息</strong>。</span></li>
                  </ul>
                </div>

                <div className="p-6 bg-white border border-zinc-200 shadow-sm rounded-2xl">
                  <h4 className="text-zinc-900 font-medium mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" /> 数据联动 (Business Linkage)
                  </h4>
                  <ul className="space-y-3 text-sm text-zinc-600">
                    <li className="flex items-start gap-3"><span className="text-zinc-400 mt-0.5">•</span> <span><strong className="text-zinc-800">与基础资料联动：</strong>客户签约状态变更，反向同步至全局客户主档。</span></li>
                    <li className="flex items-start gap-3"><span className="text-zinc-400 mt-0.5">•</span> <span><strong className="text-zinc-800">与销售报表联动：</strong>跟进明细实时推流至 BI 看板，生成《销售员月度勤奋度分析报告》。</span></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-zinc-500 text-sm">
        <p>Case Study Based on Product Requirements Document © 2026</p>
      </footer>

        </div>
      </div>
    </div>
  );
}
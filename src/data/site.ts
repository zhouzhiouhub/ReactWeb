import { NewsItem, Product, TeamMember } from '../types/site';

export const products: Product[] = [
  {
    id: 'cloud-portal',
    name: '云端门户平台',
    summary: '统一承载官网内容、产品入口和客户服务的企业数字门户。',
    description:
      '面向中大型企业官网和业务门户场景，提供页面配置、内容发布、权限协同、数据追踪和多终端适配能力。',
    tags: ['内容管理', '权限协作', '多端适配'],
    metrics: [
      { label: '页面加载', value: '1.2s' },
      { label: '内容发布', value: '5min' },
      { label: '可用性', value: '99.9%' },
    ],
    features: ['可视化页面配置', '多角色内容审核', 'SEO 元信息管理', '移动端响应式适配'],
  },
  {
    id: 'data-growth',
    name: '增长数据中台',
    summary: '汇总官网访问、线索转化和产品使用数据，支持运营决策。',
    description:
      '通过事件埋点、线索归因和看板分析，帮助市场、销售和产品团队统一理解官网增长效果。',
    tags: ['数据看板', '线索归因', '转化分析'],
    metrics: [
      { label: '指标模板', value: '36+' },
      { label: '报表生成', value: '实时' },
      { label: '转化提升', value: '28%' },
    ],
    features: ['访客路径追踪', '线索来源归因', '自定义指标看板', '团队日报自动生成'],
  },
  {
    id: 'service-suite',
    name: '客户服务套件',
    summary: '把咨询、工单、资料下载和售后触点沉淀到统一服务流程。',
    description:
      '为官网访客提供从咨询到售后的完整服务入口，并为企业内部团队提供可追踪、可协作的处理流程。',
    tags: ['在线咨询', '工单流程', '资料中心'],
    metrics: [
      { label: '响应效率', value: '+42%' },
      { label: '工单流转', value: '自动' },
      { label: '满意度', value: '96%' },
    ],
    features: ['在线留言分派', 'FAQ 知识库', '资料下载追踪', '售后处理状态同步'],
  },
];

export const advantages = [
  {
    title: '组件化交付',
    description: '按 Header、Banner、页面区块和业务卡片拆分，便于多人协作和后续复用。',
  },
  {
    title: '工程化结构',
    description: '路由、数据、类型、Hooks 分层明确，更接近真实 React 官网项目。',
  },
  {
    title: '响应式体验',
    description: '桌面端突出内容密度，移动端保证导航、卡片和表单的易读性。',
  },
  {
    title: '可扩展能力',
    description: '预留 CMS、主题切换、多语言和 SEO 的扩展位置，适合继续练习。',
  },
];

export const companyStats = [
  { label: '服务企业客户', value: '260+' },
  { label: '官网模块沉淀', value: '48' },
  { label: '平均交付周期', value: '21天' },
  { label: '线上稳定运行', value: '99.9%' },
];

export const newsItems: NewsItem[] = [
  {
    id: 'react-site-release',
    title: '企业官网新版组件库完成首轮上线',
    date: '2026-07-12',
    category: '产品动态',
    summary: '新版组件库统一了首页、产品页和新闻页的视觉规范，提升多页面维护效率。',
    content: [
      '新版组件库围绕企业官网常见场景进行沉淀，覆盖导航、Banner、数据展示、产品卡片和新闻列表等模块。',
      '本次上线重点优化了响应式布局和暗色主题适配，让内容团队可以在多个页面之间复用一致的展示结构。',
      '后续项目会继续补充多语言字段、SEO 配置和 CMS 发布流程，形成更完整的官网开发闭环。',
    ],
  },
  {
    id: 'cms-workflow',
    title: '模拟 CMS 新闻流程接入 Demo 项目',
    date: '2026-06-28',
    category: '工程实践',
    summary: '通过本地模拟接口管理新闻列表和详情，为后续真实接口联调预留清晰边界。',
    content: [
      'Demo 中的新闻页面采用 api 层进行数据读取，即使当前数据来自本地文件，也能保持和真实项目相似的调用方式。',
      '页面组件不直接关心数据来源，只处理加载、列表渲染和详情展示，这有助于后续替换为真实 CMS 接口。',
      '这种拆分方式适合练习企业项目中的职责边界，也能让简历项目看起来更有工程意识。',
    ],
  },
  {
    id: 'design-system',
    title: '官网设计规范加入主题切换能力',
    date: '2026-05-18',
    category: '设计系统',
    summary: '结合 Tailwind dark mode 和 Ant Design token，实现基础的浅色/深色主题切换。',
    content: [
      '主题切换使用全局状态控制，并同步更新 Tailwind 的 dark class 与 Ant Design 的算法配置。',
      '在企业官网中，主题能力通常不是孤立功能，而是和品牌色、组件状态、图表视觉一起维护。',
      '本 Demo 保留了简洁实现，方便继续扩展为系统主题识别、用户偏好保存和多主题配置。',
    ],
  },
];

export const timeline = [
  {
    year: '2023',
    title: '启动企业数字门户方案',
    description: '从官网改版、产品展示和内容协同三个方向完成第一版能力验证。',
  },
  {
    year: '2024',
    title: '沉淀组件化交付体系',
    description: '建立统一页面组件、交互规范和数据结构，支持多个业务线复用。',
  },
  {
    year: '2025',
    title: '接入增长分析能力',
    description: '将访客行为、线索转化和运营活动纳入统一看板。',
  },
  {
    year: '2026',
    title: '完善多端官网体验',
    description: '持续优化响应式体验、主题策略、SEO 和 CMS 发布流程。',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: '林知远',
    role: '前端负责人',
    description: '负责官网架构、组件规范和性能优化，推动 React 项目工程化落地。',
  },
  {
    name: '许清',
    role: '产品设计师',
    description: '负责官网信息架构、视觉体系和关键转化路径设计。',
  },
  {
    name: '周航',
    role: '增长工程师',
    description: '负责数据埋点、线索分析和运营工具链建设。',
  },
];

export const contactChannels = [
  { label: '商务合作', value: 'business@example.com' },
  { label: '服务热线', value: '400-800-2026' },
  { label: '办公地址', value: '上海市浦东新区云创路 88 号' },
];

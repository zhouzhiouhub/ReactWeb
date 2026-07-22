import { ArrowRightOutlined, CloudServerOutlined, RocketOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
import { advantages, companyStats, newsItems, products } from '../../data/site';

const icons = [<RocketOutlined />, <CloudServerOutlined />, <SafetyCertificateOutlined />, <ArrowRightOutlined />];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-white dark:bg-[#101514]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(255,255,255,0.8))] dark:bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18),_transparent_40%),linear-gradient(180deg,_rgba(16,21,21,0.92),_rgba(16,21,21,0.88))]" />
        <div className="page-shell relative py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal dark:text-teal-200">React 企业官网 Demo</p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-brand-ink dark:text-white sm:text-5xl md:text-6xl">
                用 React + TypeScript 构建企业官网级首页体验
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                这个 Demo 包含首页 Banner、产品展示、业务优势、新闻入口和在线联系表单，重点练习组件拆分、路由、主题切换和响应式布局。
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/product">
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                    查看产品
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="large">了解我们</Button>
                </Link>
              </div>
            </motion.div>

            <div className="rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-[#0f172a]/80">
              <div className="space-y-6">
                <div className="rounded-3xl bg-brand-teal/10 p-6 text-brand-teal dark:bg-teal-400/10 dark:text-teal-200">
                  <p className="text-sm uppercase tracking-[0.24em]">领先解决方案</p>
                  <h2 className="mt-4 text-2xl font-bold">适合企业官网、产品展示与内容运营</h2>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 p-6 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400">组件化结构</p>
                    <p className="mt-3 font-semibold text-brand-ink dark:text-white">Header / Banner / 产品卡片 / Footer 可复用</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-6 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400">主题和路由</p>
                    <p className="mt-3 font-semibold text-brand-ink dark:text-white">支持深色模式，使用 React Router 管理页面导航</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-6 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400">本地模拟接口</p>
                    <p className="mt-3 font-semibold text-brand-ink dark:text-white">新闻列表和详情通过本地 api 层获取数据</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Products"
            title="围绕企业官网常见业务场景组织产品模块"
            description="从内容门户、增长数据到客户服务，页面结构和数据模型都可以继续替换为真实项目接口。"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="h-full shadow-soft" hoverable>
                <div className="flex h-full flex-col">
                  <h3 className="text-xl font-bold text-brand-ink dark:text-white">{product.name}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{product.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Tag key={tag} color="green">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <Link to={`/product/${product.id}`} className="mt-6 inline-flex items-center gap-2 font-medium text-brand-teal">
                    查看详情 <ArrowRightOutlined />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#151c1b]">
        <div className="page-shell">
          <SectionTitle eyebrow="Advantages" title="从 Demo 开始练习真实 React 官网开发流程" description="重点不是堆视觉，而是熟悉组件拆分、Hooks、Router、工程目录和企业官网内容组织。" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-lg border border-slate-200 bg-brand-paper p-6 dark:border-white/10 dark:bg-[#101514]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-xl text-brand-teal dark:bg-teal-400/10 dark:text-teal-200">{icons[index]}</span>
                <h3 className="mt-5 text-lg font-bold text-brand-ink dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-ink py-14 text-white">
        <div className="page-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((item) => (
            <div key={item.label} className="border-l border-white/20 pl-5">
              <p className="text-4xl font-bold">{item.value}</p>
              <p className="mt-2 text-sm text-teal-100">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionTitle eyebrow="News" title="新闻动态" description="模拟企业官网中常见的新闻列表与详情入口。" />
            <Link to="/news">
              <Button icon={<ArrowRightOutlined />}>全部新闻</Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {newsItems.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <article className="h-full rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
                  <p className="text-sm text-brand-teal dark:text-teal-200">{item.category}</p>
                  <h3 className="mt-3 text-xl font-bold leading-7 text-brand-ink dark:text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                  <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

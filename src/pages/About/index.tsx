import { Card, Timeline } from 'antd';
import Banner from '../../components/Banner';
import SectionTitle from '../../components/SectionTitle';
import { teamMembers, timeline } from '../../data/site';

export default function About() {
  return (
    <div>
      <Banner
        eyebrow="About Us"
        title="用组件化和工程化方法交付企业官网"
        description="这个页面模拟真实公司官网的关于我们模块，包含公司介绍、发展历程和团队展示。"
      />

      <section className="py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionTitle
            eyebrow="Company"
            title="我们专注于企业数字门户和官网体验建设"
            description="Demo 中的公司设定为一家企业数字化服务团队，帮助客户把品牌展示、产品说明、线索转化和客户服务连接成一套稳定的官网系统。"
          />
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
            <p className="leading-8 text-slate-600 dark:text-slate-300">
              在真实公司项目里，官网通常不是单纯展示页。它会连接 CMS、CRM、数据分析、SEO、客服系统和多语言策略。
              这个 Demo 用轻量方式保留这些模块边界，适合作为 React 入职前练习项目。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-[#151c1b]">
        <div className="page-shell">
          <SectionTitle eyebrow="Timeline" title="发展历程" description="用 Timeline 表现企业官网常见的公司发展模块。" />
          <div className="mt-10">
            <Timeline
              items={timeline.map((item) => ({
                color: 'green',
                children: (
                  <div>
                    <p className="text-sm font-semibold text-brand-teal dark:text-teal-200">{item.year}</p>
                    <h3 className="mt-1 text-lg font-bold text-brand-ink dark:text-white">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <SectionTitle eyebrow="Team" title="团队展示" description="模拟公司官网里常见的核心团队介绍。" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="h-full shadow-soft">
                <div className="flex h-full flex-col">
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-teal-50 text-xl font-bold text-brand-teal dark:bg-teal-400/10 dark:text-teal-200">
                    {member.name.slice(0, 1)}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-brand-ink dark:text-white">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-teal dark:text-teal-200">{member.role}</p>
                  <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-300">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

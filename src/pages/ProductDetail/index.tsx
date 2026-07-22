import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import { products } from '../../data/site';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <section className="py-20">
        <div className="page-shell">
          <h1 className="text-3xl font-bold text-brand-ink dark:text-white">产品不存在</h1>
          <Link to="/product" className="mt-6 inline-block">
            <Button icon={<ArrowLeftOutlined />}>返回产品列表</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <Banner eyebrow="Product Detail" title={product.name} description={product.summary} />

      <section className="py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Tag key={tag} color="green">
                  {tag}
                </Tag>
              ))}
            </div>
            <p className="mt-8 text-lg leading-9 text-slate-700 dark:text-slate-200">{product.description}</p>
            <h2 className="mt-10 text-2xl font-bold text-brand-ink dark:text-white">核心能力</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-lg border border-slate-200 bg-brand-paper p-4 text-slate-700 dark:border-white/10 dark:bg-[#101514] dark:text-slate-200"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
            <h2 className="text-xl font-bold text-brand-ink dark:text-white">关键指标</h2>
            <div className="mt-5 grid gap-4">
              {product.metrics.map((metric) => (
                <div key={metric.label} className="border-b border-slate-100 pb-4 last:border-none dark:border-white/10">
                  <p className="text-3xl font-bold text-brand-teal dark:text-teal-200">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-8 block">
              <Button type="primary" block>
                咨询方案
              </Button>
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

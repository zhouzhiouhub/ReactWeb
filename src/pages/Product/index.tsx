import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { products } from '../../data/site';

export default function Product() {
  return (
    <div>
      <Banner
        eyebrow="Products"
        title="产品列表"
        description="根据开发文档实现产品列表，并为每个产品提供独立详情页。"
      />

      <section className="py-16">
        <div className="page-shell grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="h-full shadow-soft" hoverable>
              <div className="flex h-full flex-col">
                <h2 className="text-2xl font-bold text-brand-ink dark:text-white">{product.name}</h2>
                <p className="mt-4 flex-1 leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Tag key={tag} color="green">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                  {product.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg font-bold text-brand-ink dark:text-white">{metric.value}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <Link to={`/product/${product.id}`} className="mt-6 inline-flex items-center gap-2 font-medium text-brand-teal">
                  产品详情 <ArrowRightOutlined />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

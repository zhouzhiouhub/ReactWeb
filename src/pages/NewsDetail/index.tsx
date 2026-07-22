import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNewsById } from '../../api/news';
import Banner from '../../components/Banner';
import { NewsItem } from '../../types/site';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getNewsById(id).then(setItem).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="grid min-h-[420px] place-items-center">
        <Spin size="large" />
      </section>
    );
  }

  if (!item) {
    return (
      <section className="py-20">
        <div className="page-shell">
          <h1 className="text-3xl font-bold text-brand-ink dark:text-white">新闻不存在</h1>
          <Link to="/news" className="mt-6 inline-block">
            <Button icon={<ArrowLeftOutlined />}>返回新闻列表</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <Banner eyebrow={item.category} title={item.title} description={item.summary} />

      <section className="py-16">
        <article className="page-shell max-w-3xl rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Tag color="green">{item.category}</Tag>
            <span>{item.date}</span>
          </div>
          <div className="mt-8 grid gap-6 text-base leading-9 text-slate-700 dark:text-slate-200">
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link to="/news" className="mt-10 inline-block">
            <Button icon={<ArrowLeftOutlined />}>返回新闻列表</Button>
          </Link>
        </article>
      </section>
    </div>
  );
}

import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNewsList } from '../../api/news';
import Banner from '../../components/Banner';
import { NewsItem } from '../../types/site';

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsList().then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Banner
        eyebrow="News"
        title="新闻动态"
        description="新闻列表通过本地模拟接口获取，保留未来替换 CMS 接口的空间。"
      />

      <section className="py-16">
        <div className="page-shell">
          {loading ? (
            <div className="grid min-h-52 place-items-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
                  <Card hoverable className="shadow-soft">
                    <div className="grid gap-5 md:grid-cols-[160px_1fr_auto] md:items-center">
                      <div>
                        <p className="text-3xl font-bold text-brand-ink dark:text-white">{item.date.slice(5).replace('-', '.')}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.date.slice(0, 4)}</p>
                      </div>
                      <div>
                        <Tag color="green">{item.category}</Tag>
                        <h2 className="mt-3 text-2xl font-bold text-brand-ink dark:text-white">{item.title}</h2>
                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                      </div>
                      <ArrowRightOutlined className="text-xl text-brand-teal" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

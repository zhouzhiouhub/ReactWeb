import { ArrowRightOutlined, CommentOutlined, FireOutlined } from '@ant-design/icons';
import { Alert, Card, Empty, Spin, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNewsList, NEWS_CATEGORIES } from '../../api/news';
import Banner from '../../components/Banner';
import { NewsItem } from '../../types/site';

function getDisplayDate(date: string) {
  const [year, month, day] = date.split('-');

  return {
    year,
    monthDay: month && day ? `${month}.${day}` : date,
  };
}

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    getNewsList()
      .then((data) => {
        if (active) {
          setItems(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('新闻接口暂时不可用，请稍后刷新页面。');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const groupedItems = useMemo(
    () =>
      NEWS_CATEGORIES.reduce<Record<string, NewsItem[]>>((groups, category) => {
        groups[category] = items.filter((item) => item.category === category);
        return groups;
      }, {}),
    [items],
  );

  return (
    <div>
      <Banner
        eyebrow="Hacker News"
        title="科技新闻动态"
        description="新闻内容从 Hacker News top stories API 实时获取，并按 AI、大模型、编程语言、开源项目、云计算和创业科技展示主要内容。"
      />

      <section className="py-16">
        <div className="page-shell">
          {loading ? (
            <div className="grid min-h-52 place-items-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert type="error" showIcon message="新闻加载失败" description={error} />
          ) : items.length ? (
            <div className="grid gap-12">
              {NEWS_CATEGORIES.map((category) => {
                const categoryItems = groupedItems[category] ?? [];

                return (
                  <section key={category} className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 dark:border-white/10">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-brand-ink dark:text-white">{category}</h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">来自 Hacker News 热门榜的匹配内容</p>
                      </div>
                      <Tag color="green">{categoryItems.length} 条</Tag>
                    </div>

                    {categoryItems.length ? (
                      <div className="grid gap-5">
                        {categoryItems.slice(0, 6).map((item) => {
                          const displayDate = getDisplayDate(item.date);

                          return (
                            <Link key={item.id} to={`/news/${item.id}`}>
                              <Card hoverable className="shadow-soft">
                                <div className="grid gap-5 md:grid-cols-[130px_1fr_auto] md:items-center">
                                  <div>
                                    <p className="text-3xl font-bold text-brand-ink dark:text-white">{displayDate.monthDay}</p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{displayDate.year}</p>
                                  </div>
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                      <Tag color="green">{item.category}</Tag>
                                      <span>{item.source}</span>
                                      <span className="inline-flex items-center gap-1">
                                        <FireOutlined /> {item.score ?? 0}
                                      </span>
                                      <span className="inline-flex items-center gap-1">
                                        <CommentOutlined /> {item.commentCount ?? 0}
                                      </span>
                                    </div>
                                    <h3 className="mt-3 text-xl font-bold leading-7 text-brand-ink dark:text-white md:text-2xl">{item.title}</h3>
                                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                                  </div>
                                  <ArrowRightOutlined className="text-xl text-brand-teal" />
                                </div>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-sm text-slate-500 dark:border-white/10 dark:bg-[#151c1b] dark:text-slate-400">
                        暂未从当前热门榜匹配到该主题内容。
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            <Empty description="暂无新闻内容" />
          )}
        </div>
      </section>
    </div>
  );
}

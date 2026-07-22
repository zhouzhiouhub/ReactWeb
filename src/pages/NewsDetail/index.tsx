import { ArrowLeftOutlined, CommentOutlined, ExportOutlined, FireOutlined } from '@ant-design/icons';
import { Alert, Button, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNewsById } from '../../api/news';
import Banner from '../../components/Banner';
import { NewsItem } from '../../types/site';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (!id) {
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError(null);

    getNewsById(id)
      .then((data) => {
        if (active) {
          setItem(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('新闻详情接口暂时不可用，请稍后重试。');
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
  }, [id]);

  if (loading) {
    return (
      <section className="grid min-h-[420px] place-items-center">
        <Spin size="large" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="page-shell">
          <Alert type="error" showIcon message="新闻加载失败" description={error} />
          <Link to="/news" className="mt-6 inline-block">
            <Button icon={<ArrowLeftOutlined />}>返回新闻列表</Button>
          </Link>
        </div>
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
            <span>{item.source}</span>
            <span className="inline-flex items-center gap-1">
              <FireOutlined /> {item.score ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <CommentOutlined /> {item.commentCount ?? 0}
            </span>
          </div>

          <div className="mt-8 grid gap-6 text-base leading-9 text-slate-700 dark:text-slate-200">
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer">
                <Button type="primary" icon={<ExportOutlined />}>
                  阅读原文
                </Button>
              </a>
            ) : null}
            {item.discussionUrl ? (
              <a href={item.discussionUrl} target="_blank" rel="noreferrer">
                <Button icon={<CommentOutlined />}>查看讨论</Button>
              </a>
            ) : null}
            <Link to="/news">
              <Button icon={<ArrowLeftOutlined />}>返回新闻列表</Button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}

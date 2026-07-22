import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-brand-paper px-6 text-center dark:bg-[#101514]">
      <div>
        <p className="text-sm font-semibold text-brand-teal dark:text-teal-200">404</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink dark:text-white">页面不存在</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">请返回首页继续浏览 Demo 内容。</p>
        <Link to="/" className="mt-8 inline-block">
          <Button type="primary" icon={<HomeOutlined />}>
            回到首页
          </Button>
        </Link>
      </div>
    </section>
  );
}

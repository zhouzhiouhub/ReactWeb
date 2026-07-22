import { contactChannels } from '../../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-[#101514]">
      <div className="page-shell grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-lg font-bold text-brand-ink dark:text-white">React 企业官网 Demo</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            使用 React、TypeScript、Tailwind CSS、Ant Design、Framer Motion 和 Swiper 搭建的多页面企业官网练习项目。
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3 md:grid-cols-1">
          {contactChannels.map((item) => (
            <p key={item.label}>
              <span className="font-medium text-brand-ink dark:text-white">{item.label}：</span>
              {item.value}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

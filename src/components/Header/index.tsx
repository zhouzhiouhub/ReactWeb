import { MenuOutlined, MoonOutlined, ProductOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Drawer, Tooltip } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeMode } from '../../hooks/useThemeMode';

const navItems = [
  { label: '首页', path: '/' },
  { label: '关于我们', path: '/about' },
  { label: '产品', path: '/product' },
  { label: '新闻', path: '/news' },
  { label: '联系我们', path: '/contact' },
];

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-teal-50 text-brand-teal dark:bg-teal-400/10 dark:text-teal-200'
      : 'text-slate-700 hover:bg-slate-100 hover:text-brand-ink dark:text-slate-200 dark:hover:bg-white/10',
  ].join(' ');

export default function Header() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#101514]/95">
      <div className="page-shell flex h-[72px] items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3" aria-label="React 企业官网 Demo 首页">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-teal text-white">
            <ProductOutlined />
          </span>
          <span>
            <span className="block text-base font-bold text-brand-ink dark:text-white">React Demo</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Enterprise Website</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getNavClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Tooltip title={mode === 'dark' ? '切换浅色主题' : '切换深色主题'}>
            <Button
              aria-label={mode === 'dark' ? '切换浅色主题' : '切换深色主题'}
              shape="circle"
              icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleMode}
            />
          </Tooltip>
          <Tooltip title="打开导航">
            <Button
              className="md:hidden"
              aria-label="打开导航"
              shape="circle"
              icon={<MenuOutlined />}
              onClick={() => setOpen(true)}
            />
          </Tooltip>
        </div>
      </div>

      <Drawer title="导航" placement="right" open={open} onClose={() => setOpen(false)} width={280}>
        <nav className="flex flex-col gap-2" aria-label="移动端导航">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getNavClass} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}

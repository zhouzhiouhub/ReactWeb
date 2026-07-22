import { MailOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Banner from '../../components/Banner';
import { contactChannels } from '../../data/site';

interface ContactFormValues {
  name: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [form] = Form.useForm<ContactFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: ContactFormValues) => {
    messageApi.success(`${values.name}，你的留言已保存到本地模拟队列`);
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <Banner
        eyebrow="Contact"
        title="联系我们"
        description="展示企业官网常见联系方式和在线留言表单，当前提交逻辑为本地模拟。"
      />

      <section className="py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
            <h2 className="text-2xl font-bold text-brand-ink dark:text-white">联系信息</h2>
            <div className="mt-8 grid gap-5">
              {contactChannels.map((item, index) => (
                <div key={item.label} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-400/10 dark:text-teal-200">
                    {index === 0 ? <MailOutlined /> : <PhoneOutlined />}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-ink dark:text-white">{item.label}</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-[#151c1b]">
            <h2 className="text-2xl font-bold text-brand-ink dark:text-white">在线留言</h2>
            <Form form={form} layout="vertical" className="mt-8" onFinish={onFinish}>
              <div className="grid gap-4 md:grid-cols-2">
                <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                  <Input size="large" placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item name="phone" label="联系方式" rules={[{ required: true, message: '请输入联系方式' }]}>
                  <Input size="large" placeholder="手机号或邮箱" />
                </Form.Item>
              </div>
              <Form.Item name="message" label="留言内容" rules={[{ required: true, message: '请输入留言内容' }]}>
                <Input.TextArea rows={6} placeholder="简单描述你的需求" />
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" icon={<SendOutlined />}>
                提交留言
              </Button>
            </Form>
          </section>
        </div>
      </section>
    </div>
  );
}

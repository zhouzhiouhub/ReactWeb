export interface Product {
  id: string;
  name: string;
  summary: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

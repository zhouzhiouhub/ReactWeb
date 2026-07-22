import { NewsItem } from '../types/site';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';
const TOP_STORIES_URL = `${HN_API_BASE}/topstories.json`;
const STORY_FETCH_LIMIT = 60;
const REQUEST_TIMEOUT_MS = 10000;

export const NEWS_CATEGORIES = ['AI', '大模型', '编程语言', '开源项目', '云计算', '创业科技'] as const;

type NewsCategory = (typeof NEWS_CATEGORIES)[number];

interface HackerNewsStory {
  id: number;
  type?: string;
  by?: string;
  time?: number;
  title?: string;
  text?: string;
  url?: string;
  score?: number;
  descendants?: number;
  deleted?: boolean;
  dead?: boolean;
}

const categoryRules: Array<{ category: NewsCategory; keywords: RegExp[] }> = [
  {
    category: '大模型',
    keywords: [
      /\bllms?\b/i,
      /large language model/i,
      /chatgpt/i,
      /openai/i,
      /\bgpt[- ]?\d*\b/i,
      /claude/i,
      /gemini/i,
      /llama/i,
      /mistral/i,
      /deepseek/i,
      /qwen/i,
      /anthropic/i,
      /prompt/i,
      /transformer/i,
    ],
  },
  {
    category: 'AI',
    keywords: [
      /\bai\b/i,
      /\bml\b/i,
      /artificial intelligence/i,
      /machine learning/i,
      /neural/i,
      /computer vision/i,
      /diffusion/i,
      /agentic/i,
      /\bagents?\b/i,
      /inference/i,
      /robot/i,
      /gpu/i,
      /cuda/i,
    ],
  },
  {
    category: '编程语言',
    keywords: [
      /javascript/i,
      /typescript/i,
      /python/i,
      /\brust\b/i,
      /\bgolang\b/i,
      /\bgo\b/i,
      /\bjava\b/i,
      /c\+\+/i,
      /\bc#\b/i,
      /swift/i,
      /kotlin/i,
      /ruby/i,
      /php/i,
      /zig/i,
      /elixir/i,
      /haskell/i,
      /compiler/i,
      /programming language/i,
      /webassembly/i,
      /\bwasm\b/i,
    ],
  },
  {
    category: '开源项目',
    keywords: [
      /open source/i,
      /github/i,
      /gitlab/i,
      /linux/i,
      /postgres/i,
      /sqlite/i,
      /redis/i,
      /kubernetes/i,
      /docker/i,
      /framework/i,
      /library/i,
      /release/i,
      /license/i,
      /self[- ]?host/i,
    ],
  },
  {
    category: '云计算',
    keywords: [
      /\bcloud\b/i,
      /\baws\b/i,
      /amazon web services/i,
      /azure/i,
      /\bgcp\b/i,
      /google cloud/i,
      /serverless/i,
      /lambda/i,
      /\bedge\b/i,
      /\bcdn\b/i,
      /database/i,
      /data[ -]?center/i,
      /compute/i,
      /storage/i,
      /devops/i,
      /observability/i,
      /terraform/i,
    ],
  },
  {
    category: '创业科技',
    keywords: [
      /startup/i,
      /founders?/i,
      /\byc\b/i,
      /y combinator/i,
      /funding/i,
      /venture/i,
      /product/i,
      /\bsaas\b/i,
      /business/i,
      /market/i,
      /\btech\b/i,
      /security/i,
      /privacy/i,
      /fintech/i,
    ],
  },
];

let newsListCache: NewsItem[] | null = null;
const newsByIdCache = new Map<string, NewsItem>();

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function isValidStory(story: HackerNewsStory | null): story is HackerNewsStory {
  return Boolean(story && !story.deleted && !story.dead && story.type === 'story' && story.title);
}

function stripHtml(value = '') {
  if (!value) {
    return '';
  }

  const parser = new DOMParser();
  return parser.parseFromString(value, 'text/html').documentElement.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

function getSource(url?: string) {
  if (!url) {
    return 'news.ycombinator.com';
  }

  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '外部链接';
  }
}

function classifyStory(story: HackerNewsStory): NewsCategory {
  const searchableText = `${story.title ?? ''} ${story.url ?? ''} ${stripHtml(story.text)}`;
  const matchedRule = categoryRules.find((rule) => rule.keywords.some((keyword) => keyword.test(searchableText)));

  return matchedRule?.category ?? '创业科技';
}

function formatDate(timestamp?: number) {
  if (!timestamp) {
    return new Date().toISOString().slice(0, 10);
  }

  return new Date(timestamp * 1000).toISOString().slice(0, 10);
}

function buildSummary(story: HackerNewsStory, source: string) {
  const text = truncate(stripHtml(story.text), 160);

  if (text) {
    return text;
  }

  const score = story.score ?? 0;
  const comments = story.descendants ?? 0;
  return `${source} 的 Hacker News 热门内容，目前 ${score} 分、${comments} 条评论。`;
}

function mapStoryToNewsItem(story: HackerNewsStory): NewsItem {
  const source = getSource(story.url);
  const category = classifyStory(story);
  const summary = buildSummary(story, source);
  const score = story.score ?? 0;
  const comments = story.descendants ?? 0;
  const discussionUrl = `https://news.ycombinator.com/item?id=${story.id}`;

  return {
    id: String(story.id),
    title: story.title ?? 'Untitled',
    date: formatDate(story.time),
    category,
    summary,
    source,
    url: story.url,
    author: story.by,
    score,
    commentCount: comments,
    discussionUrl,
    content: [
      summary,
      `这条内容来自 Hacker News top stories，已根据标题、正文和链接信息归入「${category}」。`,
      `来源：${source}。作者：${story.by ?? 'unknown'}，得分：${score}，评论：${comments}。`,
    ],
  };
}

async function fetchStory(id: number) {
  return fetchJson<HackerNewsStory | null>(`${HN_API_BASE}/item/${id}.json`);
}

export async function getNewsList() {
  if (newsListCache) {
    return newsListCache;
  }

  const ids = await fetchJson<number[]>(TOP_STORIES_URL);
  const stories = await Promise.all(ids.slice(0, STORY_FETCH_LIMIT).map((id) => fetchStory(id).catch(() => null)));
  const items = stories.filter(isValidStory).map(mapStoryToNewsItem);

  if (!items.length) {
    throw new Error('No Hacker News stories were loaded.');
  }

  newsListCache = items;
  items.forEach((item) => newsByIdCache.set(item.id, item));

  return items;
}

export async function getNewsById(id: string) {
  const cachedItem = newsByIdCache.get(id);

  if (cachedItem) {
    return cachedItem;
  }

  const story = await fetchStory(Number(id));

  if (!isValidStory(story)) {
    return null;
  }

  const item = mapStoryToNewsItem(story);
  newsByIdCache.set(item.id, item);

  return item;
}

import { newsItems } from '../data/site';

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function getNewsList() {
  await delay(260);
  return newsItems;
}

export async function getNewsById(id: string) {
  await delay(180);
  return newsItems.find((item) => item.id === id) ?? null;
}

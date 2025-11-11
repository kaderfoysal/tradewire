export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  publishedAt: string;
  readingTime: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Author = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
};

export type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

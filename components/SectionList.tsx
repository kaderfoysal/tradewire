import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { Article } from '@/types';

type SectionListProps = {
  title: string;
  articles: Article[];
  viewAllLink?: string;
  className?: string;
};

const SectionList = ({ 
  title, 
  articles, 
  viewAllLink, 
  className = '' 
}: SectionListProps) => {
  if (!articles.length) return null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-blue-700 hover:text-blue-900 font-medium text-sm transition-colors"
            >
              View All
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              slug={article.slug}
              title={article.title}
              excerpt={article.summary}
              category={article.category}
              imageUrl={article.image}
              author={article.author}
              date={article.publishedAt}
              readTime={article.readingTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionList;

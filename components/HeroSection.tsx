import ArticleCard from './ArticleCard';
import { Article } from '@/types';

type HeroSectionProps = {
  featuredArticle: Article;
  secondaryArticles: Article[];
};

const HeroSection = ({ featuredArticle, secondaryArticles }: HeroSectionProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main featured article */}
          <div className="lg:col-span-2">
            <ArticleCard
              id={featuredArticle.id}
              slug={featuredArticle.slug}
              title={featuredArticle.title}
              excerpt={featuredArticle.summary}
              category={featuredArticle.category}
              imageUrl={featuredArticle.image}
              author={featuredArticle.author}
              date={featuredArticle.publishedAt}
              readTime={featuredArticle.readingTime}
              variant="featured"
              className="h-full"
            />
          </div>
          
          {/* Secondary articles */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Latest Updates</h2>
            {secondaryArticles.map((article) => (
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
                variant="small"
              />
            ))}
            
            {/* Newsletter signup */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest news and updates in your inbox</p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

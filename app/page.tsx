import { getFeaturedArticles, getLatestArticles, getArticlesByCategory } from '@/data/articles';
import HeroSection from '@/components/HeroSection';
import SectionList from '@/components/SectionList';

export default function Home() {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles(6);
  const businessArticles = getArticlesByCategory('Business');
  const techArticles = getArticlesByCategory('Tech');
  const marketsArticles = getArticlesByCategory('Markets');
  
  // Get the main featured article and secondary articles for the hero section
  const [mainArticle, ...secondaryArticles] = featuredArticles;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection 
        featuredArticle={mainArticle} 
        secondaryArticles={secondaryArticles.slice(0, 3)} 
      />
      
      {/* Latest News Section */}
      <SectionList 
        title="Latest News" 
        articles={latestArticles} 
        viewAllLink="/latest"
        className="bg-white border-t border-b border-gray-200"
      />
      
      {/* Business Section */}
      <SectionList 
        title="Business" 
        articles={businessArticles} 
        viewAllLink="/business"
      />
      
      {/* Markets Section */}
      <SectionList 
        title="Markets" 
        articles={marketsArticles} 
        viewAllLink="/markets"
        className="bg-gray-100"
      />
      
      {/* Tech Section */}
      <SectionList 
        title="Technology" 
        articles={techArticles} 
        viewAllLink="/tech"
      />
    </main>
  );
}
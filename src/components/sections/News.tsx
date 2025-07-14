
import { Button } from "@/components/ui/button";

const News = () => {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop",
      date: "February 19, 2025",
      author: "ADMIN",
      title: "How AI is Revolutionizing Customer Service",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius turpis..."
    },
    {
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop",
      date: "February 19, 2025", 
      author: "ADMIN",
      title: "How AI is Shaping the Future of Work",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius turpis..."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <span className="text-pink-400 text-sm uppercase tracking-wider ml-2">FROM OUR BLOG</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Recent <span className="text-pink-400">News</span> & <span className="text-teal-400">Updates</span>
          </h2>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2">
            More Articles
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-3xl overflow-hidden border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 hover:scale-105">
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                <button className="text-pink-500 font-semibold hover:text-pink-600 transition-colors">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

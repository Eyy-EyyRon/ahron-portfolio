import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPostType } from '../types';

interface BlogProps {
  onBlogClick: (blog: BlogPostType) => void;
}

const Blog: React.FC<BlogProps> = ({ onBlogClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);

  const blogPosts: BlogPostType[] = [
    {
      id: 1,
      title: "Warmup Morning Mountain Bike Ride",
      excerpt: "A quick morning ride to warm up the legs and enjoy the fresh air.",
      content: "Morning Ride Going to Vitali, Zamboanga City. This ride was a great way to start the day, with beautiful views and a refreshing breeze. I took it easy, focusing on enjoying the scenery and warming up my legs for the day ahead.",
      date: "February 7, 2022",
      author: "Ahron Pasadilla",
      images: [
        "assets/Vitali ride.png",
        "assets/view.png"
      ],
      
      tags: ["Outdoor", "Sports", "Mountain Biking"]
    },
    {
      id: 2,
      title: "Black and White Photography",
      excerpt: "Exploring the beauty of monochrome photography.",
      content: "Black and white photography has a unique charm that can evoke strong emotions. In this post, I share some of my favorite black and white shots, discussing the techniques I used to capture them and the stories behind each image.",
      date: "April 22, 2023",
      author: "Ahron Pasadilla",
      images: [
        "assets/night traffic.png",
        "assets/haiku.png"
      ],
      tags: ["Photography", "Web Design"]
    },
    {
      id: 3,
      title: "Pueblo / Zamboanga City",
      excerpt: "A glimpse into the vibrant culture and history of Zamboanga City.",
      content: "Zamboanga City is known for its rich culture and history. In this post, I share my experiences exploring the city, from its beautiful parks to its bustling markets. I also discuss the unique blend of cultures that make Zamboanga City a fascinating place to visit.",
      date: "March 15, 2023",
      author: "Ahron Pasadilla",
      images: [
        "assets/pueblo.png",
        "assets/pueblo 2.png"
      ],
      tags: ["POV", "Zamboanga City"]
    },
    {
      id: 4,
      title: "Research Forum",
      excerpt: "Recognizing the hard work and dedication of students in their research projects.",
      content: "The Research Forum is an event that showcases the hard work and dedication of students in their research projects. In this post, I share my experiences attending the forum, highlighting some of the most impressive projects and the students behind them. It's a great opportunity to see the future of research and innovation.",
      date: "May 2, 2025",
      author: "Ahron Pasadilla",
      images: [
        "assets/research.png",
       
      ],
      tags: ["Forum", "Research"]
    },
    {
      id: 5,
      title: "Coffee hangout with friends",
      excerpt: "A relaxing day spent with friends over coffee.",
      content: "Spending time with friends is always a great way to unwind. In this post, I share my experience of a coffee hangout with friends, discussing our favorite coffee spots and the conversations that made the day memorable. It's moments like these that remind us of the importance of friendship and connection.",
      date: "April 30, 2025",
      author: "Ahron Pasadilla",
      images: [
        "assets/alegre.png",
      ],
      tags: [ "Caffeine", "Coffee"]
    },
    {
      id: 6,
      title: "College of Computing Studies",
      excerpt: "A look into the College of Computing Studies and its impact on students.",
      content: "The College of Computing Studies is a hub of innovation and learning. In this post, I discuss the various programs and initiatives that the college offers to students, highlighting the impact it has on their education and career prospects. From cutting-edge research to hands-on projects, the college is shaping the future of technology.",
      date: "August 3, 2023",
      author: "Ahron Pasadilla",
      images: [
        "assets/wmsu.png",
      ],
      tags: ["College"]
    },
    {
      id: 7,
      title: "Biking Adventures",
      excerpt: "Exploring the great outdoors on two wheels.",
      content: "Biking is not just a mode of transportation; it's an adventure. In this post, I share my biking adventures, from scenic trails to challenging terrains. I discuss the gear I use, the places I've explored, and the joy of being in nature while riding. Whether you're a seasoned cyclist or a beginner, there's something for everyone in the world of biking.",
      date: "August 15, 2023",
      author: "Ahron Pasadilla",
      images: [
        "assets/biking era.png",
      ],
      tags: ["Outdoors", "Performance", "Adveture", "Mountain Biking"]
    },
    {
      id: 8,
      title: "Crochet Collections",
      excerpt: "A showcase of beautiful crochet pieces.",
      content: "Come Visit our Page Crochet Collections. FB Page: https://www.facebook.com/profile.php?id=61551776632530",
      date: "October 25, 2023",
      author: "Ahron Pasadilla",
      images: [
        "assets/Crochet Collections.png",
        
      ],
      tags: ["Yarns", "Business", "Crochet"]
    },
  ];

  // Number of cards to show at once based on screen size
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, blogPosts.length - visibleCards);

  const nextSlide = () => {
    setCurrentSlide(current => Math.min(current + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(current => Math.max(current - 1, 0));
  };

  // Autoplay
  useEffect(() => {
    if (isHovering) {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = window.setInterval(() => {
      setCurrentSlide(current => {
        // Loop back to the beginning when reaching the end
        if (current >= maxSlide) return 0;
        return current + 1;
      });
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
      }
    };
  }, [isHovering, maxSlide]);

  return (
    <section id="blog" className="pt-24 pb-16 bg-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            <span className="text-gold"></span> Blog
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
          <p className="text-slate-light mt-6 max-w-2xl mx-auto">
            I share my knowledge and experiences through these blog posts. Click on any post to read more.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden" ref={sliderRef}>
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleCards)}%)` }}
            >
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="w-full sm:w-1/2 lg:w-1/3 flex-none px-4"
                >
                  <div 
                    className="bg-navy-light rounded-lg overflow-hidden shadow-lg h-full cursor-pointer transform transition hover:-translate-y-2 hover:shadow-xl"
                    onClick={() => onBlogClick(post)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={post.images[0]} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-navy-dark bg-opacity-30 hover:bg-opacity-0 transition-all duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="text-gold text-sm mb-2">{post.date}</div>
                      <h3 className="text-xl font-heading font-semibold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-light mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-navy text-gold px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs bg-navy text-gold px-2 py-1 rounded">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:-ml-6 bg-navy-dark p-2 rounded-full shadow-lg ${
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <ArrowLeft size={24} className="text-gold" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:-mr-6 bg-navy-dark p-2 rounded-full shadow-lg ${
              currentSlide >= maxSlide ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <ArrowRight size={24} className="text-gold" />
          </button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-gold' : 'bg-slate-dark hover:bg-slate'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
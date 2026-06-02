import { useEffect, useState } from "react";
import { getStories } from "../../services/storyService";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import "../../components/Navbar/Navbar.css";
import { Sparkles, Compass,Eye, Heart, Smile, Ghost, Flame } from "lucide-react";
import AdBanner from "../../components/AdBanner/AdBanner";


export default function Home() {
  const [stories, setStories] = useState([]);
  const [continueWatching, setContinueWatching] =
  useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadStories = async () => {
      const data = await getStories();
      setStories(data);
      const recentStories =
  JSON.parse(
    localStorage.getItem(
      "continueWatching"
    ) || "[]"
  );

setContinueWatching(
  recentStories
);
    };

    loadStories();
  }, []);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoId =
      url.split("v=")[1]?.split("&")[0] ||
      url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const feedCategories = ["All", "Mystery", "Romantic", "Emotional", "Horror", "Thriller"];
  
  const getCategoryIcon = (category, isActive) => {
    const iconProps = { className: "w-4 h-4 transition-transform duration-300 group-hover:scale-110 shrink-0" };
    switch (category) {
      case "All": return <Sparkles {...iconProps} />;
      case "Mystery": return <Compass {...iconProps} />;
      case "Romantic": return <Heart {...iconProps} />;
      case "Emotional": return <Smile {...iconProps} />;
      case "Horror": return <Ghost {...iconProps} />;
      case "Thriller": return <Flame {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  const featuredStory =
    stories.find(
      (story) => story.featured
    ) || stories[0];

    const filteredStories =
  activeCategory === "All"
    ? stories
    : stories.filter(
        (story) =>
          story.category ===
          activeCategory
      );

  return (
    <>
      {/* INJECTED STYLES & ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .custom-font { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes cinematicFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-up {
          animation: cinematicFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Navbar />
      <div className="custom-font min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050508] text-[#f1f1f1] antialiased selection:bg-rose-500 selection:text-white relative pb-36 md:pb-0">
        
        {/* SPATIAL AMBIENT MESH GLOWS */}
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-rose-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none animate-float" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[40vw] max-w-[800px] max-h-[800px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />

        <div className="flex relative z-10 max-w-[1920px] mx-auto">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:flex flex-col items-center pt-8 gap-4 text-[11px] text-zinc-500 font-bold shrink-0 w-24 min-h-[calc(100vh-80px)] sticky top-[80px] z-50">
            <div className="bg-[#12121a]/60 border border-white/5 rounded-[2rem] p-3 flex flex-col gap-4 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
              <div className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-rose-500/20 to-rose-500/5 border border-rose-500/30 w-16 h-16 cursor-pointer transition-all duration-500 relative shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]">
                <svg width="24" height="24" className="w-6 h-6 mb-1.5 text-rose-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="text-rose-400 transition-colors text-[9px] uppercase tracking-widest font-extrabold">Home</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/5 w-16 h-16 cursor-pointer transition-all duration-500 border border-transparent hover:border-white/10">
                <svg width="24" height="24" className="w-6 h-6 mb-1.5 group-hover:text-white group-hover:-translate-y-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <span className="group-hover:text-white transition-colors text-[9px] uppercase tracking-widest font-bold">Vault</span>
              </div>
            </div>
          </aside>

          {/* MAIN FEED SECTION */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 lg:px-12 pt-36 lg:pt-40 w-full box-border">
           
            {featuredStory && (
              <div className="mb-8 lg:mb-12 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#12121a]/90 to-[#0a0a0f]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-fade-up relative group" style={{ animationDelay: '100ms' }}>
                <div className="flex flex-col lg:grid lg:grid-cols-2 relative z-10">
                  
                  {/* Image container */}
                  <a href={`/story/${featuredStory.id}`} className="w-full aspect-[4/3] sm:aspect-video relative overflow-hidden block">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent lg:bg-gradient-to-r lg:from-[#12121a] lg:via-transparent z-10" />
                    <img
                      src={featuredStory.thumbnail}
                      alt={featuredStory.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                  </a>

                  {/* Text Container */}
                  <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-end lg:justify-center relative z-20 -mt-28 sm:-mt-32 lg:mt-0">
                    <div className="mb-3 lg:mb-5 flex items-center gap-3">
                      <span className="bg-white/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 lg:px-3.5 lg:py-1.5 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                        Featured Premiere
                      </span>
                    </div>
                    <a href={`/story/${featuredStory.id}`} className="hover:underline decoration-rose-500 decoration-2">
                      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-2 lg:mb-4 leading-tight tracking-tight text-white/90 drop-shadow-lg lg:drop-shadow-none">
                        {featuredStory.title}
                      </h1>
                    </a>
                    <p className="text-zinc-300 lg:text-zinc-400 mb-5 lg:mb-8 text-sm lg:text-lg leading-relaxed max-w-xl font-medium line-clamp-2 lg:line-clamp-none">
                      {featuredStory.description}
                    </p>
                    <a href={`/story/${featuredStory.id}`} className="inline-block w-max">
                      <button className="px-6 py-3 lg:px-7 lg:py-3.5 bg-white text-black hover:bg-zinc-200 rounded-xl lg:rounded-2xl text-sm lg:text-base font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 flex items-center gap-2 lg:gap-3">
                        Watch Now
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </a>
                  </div>

                </div>
              </div>
            )}
            
            {/* ====== FIXED WHITE BACKGROUND CATEGORY ROW ====== */}
            <div className="flex gap-3 overflow-x-auto pb-5 lg:pb-6 mb-8 scrollbar-hide items-center animate-fade-up" style={{ animationDelay: '200ms' }}>
              {feedCategories.map((category, idx) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      group flex items-center gap-2.5 
                      text-xs sm:text-[13px] font-extrabold tracking-wider uppercase
                      px-5 py-3 sm:px-6 sm:py-3.5 rounded-md
                      whitespace-nowrap transition-all duration-300 ease-out
                      cursor-pointer border
                      ${
                        isActive
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_8px_25px_rgba(244,63,94,0.4)] border-transparent -translate-y-0.5"
                          : "bg-white text-neutral-800 border-neutral-200 shadow-md hover:bg-neutral-50 hover:text-black hover:border-neutral-300 hover:-translate-y-0.5"
                      }
                    `}
                  >
                    <span className={`${isActive ? "text-white" : "text-rose-500 group-hover:scale-110"} transition-all duration-300`}>
                      {getCategoryIcon(category)}
                    </span>
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-3">
                <div id="latest">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white/90">
    Latest Additions
  </h2>
</div>
                <div className="bg-white/5 border border-white/10 text-zinc-300 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center h-fit mt-1">
                  {stories.length} Items
                </div>
              </div>
            </div>

            {stories.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 lg:gap-y-10">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="w-full space-y-4 animate-pulse">
                    <div className="w-full aspect-video bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="space-y-3 px-1">
                      <div className="h-4 bg-white/5 rounded-md w-[85%]" />
                      <div className="h-3 bg-white/5 rounded-md w-[55%]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 lg:gap-y-10">
                {filteredStories.map((story, index) => (
                  <div 
                    key={story.id} 
                    className="group relative transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                    style={{ animationDelay: `${300 + (index * 50)}ms` }}
                  >
                    <div className="relative z-10 h-full flex flex-col bg-transparent">
                      
                      {/* Clicking the Image / Thumbnail Container directs to story details */}
                      <a 
                        href={`/story/${story.id}`}
                        className="w-full aspect-video relative overflow-hidden bg-[#0a0a0f] rounded-2xl shadow-lg group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:ring-1 group-hover:ring-white/10 transition-all duration-300 mb-3 lg:mb-4 block"
                      >
                        {story.featured && (
                          <div className="absolute top-3 left-3 z-20 bg-rose-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg">
                            Featured
                          </div>
                        )}
                        
                        {story.thumbnail ? (
                          <>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                            <img
                              src={story.thumbnail}
                              alt={story.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          </>
                        ) : (
                          <div className="w-full h-full pointer-events-none">
                            <iframe
                              src={getYoutubeEmbedUrl(story.youtubeUrl)}
                              title={story.title}
                              className="w-full h-full scale-[1.05]"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </a>

                      <div className="flex flex-col flex-1 px-1">
                        <a href={`/story/${story.id}`}>
                          <h3 className="text-base lg:text-lg font-bold text-white/90 mb-1.5 line-clamp-2 group-hover:text-rose-400 transition-colors duration-300 leading-snug">
                            {story.title}
                          </h3>

                         <div className="flex items-center gap-4 text-xs text-zinc-400 mb-2">
                          <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-2">
  <span>
    🎭 {story.category || "Mystery"}
  </span>

  <span>•</span>

<span>
  {story.createdAt?.seconds
    ? new Date(
        story.createdAt.seconds * 1000
      ).toLocaleDateString()
    : "Today"}
</span>
</div>
  <div className="flex items-center gap-1">
    <Eye size={14} />
    <span>{story.views || 0}</span>
  </div>

  <div className="flex items-center gap-1">
    <Heart size={14} />
    <span>{story.likes || 0}</span>
  </div>
</div>

                        </a>
                        <p className="text-zinc-400 text-xs lg:text-[13px] line-clamp-2 mb-4 flex-1 font-medium leading-relaxed">
                          {story.description}
                        </p>

                        <a href={`/story/${story.id}`} className="mt-auto inline-block">
                          <span className="text-xs lg:text-sm font-semibold text-white/70 group-hover:text-white transition-colors flex items-center gap-1.5">
                            Play Now 
                            <svg width="14" height="14" className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[420px] bg-[#12121a]/95 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-2xl flex justify-between items-center z-50 shadow-[0_20px_40px_rgba(0,0,0,0.9)] supports-[backdrop-filter]:bg-[#12121a]/70 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <a
  href="/"
  className="flex flex-col items-center gap-1 text-white relative group"
>
            <svg width="22" height="22" className="group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></div>
          </a>
          
          <a
  href="/#latest"
  className="flex items-center justify-center -mt-7 relative group"
>
  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-pulse"></div>

  <div className="relative w-12 h-12 bg-white rounded-full border-[3px] border-[#050508] flex items-center justify-center text-black shadow-lg">
    <svg
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
</a>

          <a
  href="/"
  className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors group"
>
            <svg width="22" height="22" className="group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </a>
        </div>
      </div>
    </>
  );
}
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import {
  getStories,
  incrementViews,
  incrementLikes,
  incrementShares,
  incrementRequests
} from "../../services/storyService";
import {
  ThumbsUp,
  Eye,
  Share2
} from "lucide-react";

export default function Story() {
  // ==========================================
  // ORIGINAL LOGIC (UNTOUCHED)
  // ==========================================
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [stories, setStories] = useState([]);
  const viewTracked = useRef(false);
useEffect(() => {

  const loadStory = async () => {

    const allStories = await getStories();

    setStories(allStories);

    const selectedStory =
      allStories.find(
        (item) => item.id === id
      );

    if (!selectedStory) return;

    await incrementViews(
      selectedStory.id
    );

    setStory({
      ...selectedStory,
      views:
        (selectedStory.views || 0) + 1
    });
  };

  loadStory();

}, [id]);

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  let videoId = "";

  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }
  else if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1];
  }

  return `https://www.youtube.com/embed/${videoId}`;
};
useEffect(() => {

  if (!story) return;

  const watchedStories =
    JSON.parse(
      localStorage.getItem(
        "continueWatching"
      ) || "[]"
    );

  const filtered =
    watchedStories.filter(
      (item) =>
        item.id !== story.id
    );

  filtered.unshift({
    id: story.id,
    title: story.title,
    thumbnail:
      story.thumbnail
  });

  localStorage.setItem(
    "continueWatching",
    JSON.stringify(
      filtered.slice(0, 10)
    )
  );

}, [story]);

  // ==========================================
  // PREMIUM YOUTUBE-STYLE UI UPDATES
  // ==========================================

  if (!story) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-6 font-sans">
        {/* PREMIUM LOADING SPINNER */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-[3px] border-white/5 rounded-full"></div>
          <div className="absolute inset-0 border-[3px] border-red-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase animate-pulse">
          Loading Cinematic Universe...
        </p>
      </div>
    );
  }

  const relatedStories = stories
    .filter((item) => item.id !== id)
    .slice(0, 4);

    const currentSeries =
  story?.title
    ?.replace(/Part\s*\d+/i, "")
    .trim();

const otherParts =
  stories.filter(
    (item) =>
      item.id !== story?.id &&
      item.title
        ?.replace(/Part\s*\d+/i, "")
        .trim() === currentSeries
  );

const handleLike =
  async () => {

    const storageKey =
      `liked_${story.id}`;

    const alreadyLiked =
      localStorage.getItem(
        storageKey
      );

    if (
      alreadyLiked
    ) {

      alert(
        "You already liked this story ❤️"
      );

      return;
    }

    await incrementLikes(
      story.id
    );

    localStorage.setItem(
      storageKey,
      Date.now()
    );

    setStory(
      (prev) => ({
        ...prev,
        likes:
          (prev.likes || 0) + 1
      })
    );
};

const handleShare =
  async () => {

    await incrementShares(
      story.id
    );

    if (
      navigator.share
    ) {

      navigator.share({
        title:
          story.title,

        text:
          story.description,

        url:
          window.location.href,
      });

    } else {

      navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Link copied"
      );
    }

    setStory(
      (prev) => ({
        ...prev,
        shares:
          (prev.shares || 0) + 1
      })
    );
};

const handleRequest =
  async () => {

    const storageKey =
      `requested_${story.id}`;

    const alreadyRequested =
      localStorage.getItem(
        storageKey
      );

    if (
      alreadyRequested
    ) {

      alert(
        "You already requested the next part 🚀"
      );

      return;
    }

    await incrementRequests(
      story.id
    );

    localStorage.setItem(
      storageKey,
      Date.now()
    );

    setStory(
      (prev) => ({
        ...prev,
        requests:
          (prev.requests || 0) + 1
      })
    );
};

  return (
    <div className="font-sans min-h-screen w-full bg-[#0f0f0f] text-[#f1f1f1] antialiased selection:bg-red-600 selection:text-white relative pb-24 overflow-x-hidden">
      
      {/* AMBIENT THUMBNAIL GLOW (Cinematic Backdrop) */}
      {story.thumbnail && (
        <div 
          className="absolute top-0 left-0 w-full h-[60vh] opacity-15 blur-[100px] pointer-events-none z-0 mix-blend-screen transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${story.thumbnail})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center' 
          }}
        />
      )}

      {/* FLOATING NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 lg:p-6 flex justify-between items-center pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto group flex items-center gap-2.5 bg-[#212121]/80 hover:bg-[#282828] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg shadow-black/40"
        >
          <svg className="w-4 h-4 text-zinc-200 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-medium tracking-wide text-zinc-200">Back</span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-2 bg-[#212121]/80 border border-white/5 px-3.5 py-2 rounded-full backdrop-blur-md shadow-lg shadow-black/40">
           <svg className="w-3.5 h-3.5 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
           </svg>
           <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Storyverse</span>
        </div>
      </nav>

      {/* MAIN CINEMATIC STAGE */}
      <main className="relative z-10 pt-24 lg:pt-28 px-4 md:px-6 lg:px-12 max-w-[1740px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: THEATRE PLAYER & METADATA */}
        <div className="xl:col-span-2 flex flex-col">
          {/* THEATRE PLAYER */}
          <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/80 relative">
            <iframe
              src={getYoutubeEmbedUrl(story.youtubeUrl)}
              onLoad={() => {

  const watchedStories =
    JSON.parse(
      localStorage.getItem(
        "continueWatching"
      ) || "[]"
    );

  const exists =
    watchedStories.find(
      (item) =>
        item.id === story.id
    );

  if (!exists) {

    watchedStories.unshift({
      id: story.id,
      title: story.title,
      thumbnail:
        story.thumbnail
    });

    localStorage.setItem(
      "continueWatching",
      JSON.stringify(
        watchedStories.slice(0, 10)
      )
    );
  }

}}
              title={story.title}
              className="w-full h-full absolute inset-0"
              allowFullScreen
            />
          </div>
{/* AD BANNER */}
{false && (
<div className="mt-4 mb-4 bg-[#212121] border border-white/10 rounded-xl p-4 text-center">

  <p className="text-zinc-500 text-xs mb-2">
    Advertisement
  </p>

  <div style={{ minHeight: "100px" }}>
    Ad Banner Here
  </div>

</div>
)}
          {/* STORY METADATA */}
          <div className="mt-5 flex flex-col items-start">
            <div className="flex gap-2 items-center mb-3">
              <span className="bg-red-600/10 text-red-500 border border-red-600/20 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                Now Playing
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-snug">
              {story.title}
            </h1>
            
            {/* EXPANDABLE-STYLE DESCRIPTION BOX */}
            <div className="w-full bg-[#212121] hover:bg-[#282828] border border-white/5 p-4 rounded-xl transition-colors duration-200">
              <p className="text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
                {story.description}
              </p>
            </div>

            {/* ACTION BAR */}

<div className="mt-5 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">

  <button
    onClick={handleLike}
    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#212121] hover:bg-[#303030] transition"
  >
   <ThumbsUp size={18} />
    <span>
      {story.likes || 0}
    </span>
  </button>

  <div
    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#212121]"
  >
    <Eye size={18} />
    <span>
      {story.views || 0}
    </span>
  </div>

  <button
    onClick={handleShare}
    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#212121] hover:bg-[#303030] transition"
  >
    <Share2 size={18} />
    <span>
      {story.shares || 0}
    </span>
  </button>
<button
  onClick={handleRequest}
  className="flex items-center gap-2 px-4 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold whitespace-nowrap transition"
>
  🚀
  <span>
    Request Next
  </span>

  <span>
    ({story.requests || 0})
  </span>
</button>
<a
  href="https://www.youtube.com/@myrealstoryverse"
  target="_blank"
  rel="noreferrer"
>
  <button
    className="flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-bold whitespace-nowrap"
  >
    🔔Subscribe
  </button>
</a>

</div>
          </div>
        </div>

        {/* RIGHT COLUMN: RELATED STORIES SECTION (YOUTUBE SIDEBAR STYLE) */}
        <div className="xl:col-span-1">
          {relatedStories.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mb-2 px-1">
                Up Next
              </h2>

              <div className="flex flex-col gap-3">
                {relatedStories.map((item) => (
                  <Link
                    to={`/story/${item.id}`}
                    key={item.id}
                    className="group relative flex flex-col sm:flex-row gap-3 p-2 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all duration-200"
                  >
                    
                    {/* THUMBNAIL */}
                    <div className="w-full sm:w-40 aspect-video relative overflow-hidden bg-zinc-900 rounded-lg flex-shrink-0">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Mini Hover Play Indicator */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-start pt-1">
                      <h3 className="text-sm font-medium text-zinc-100 line-clamp-2 group-hover:text-white transition-colors leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-normal">
                        Storyverse Original
                      </p>
                    </div>

                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
{false && (
<div className="mt-8 bg-[#212121] border border-white/10 rounded-xl p-4 text-center">

  <p className="text-zinc-500 text-xs mb-2">
    Advertisement
  </p>

  <div style={{ minHeight: "120px" }}>
    Episode Ad Here
  </div>

</div>
)}
{otherParts.length > 0 && (

<div className="mt-10 px-4">

<h2 className="text-xl font-bold mb-4">
📺 Other Parts
</h2>

<div className="grid gap-3">

{otherParts.map((part) => (

<Link
  key={part.id}
  to={`/story/${part.id}`}
  className="
    bg-[#212121]
    hover:bg-[#303030]
    p-4
    rounded-xl
    border
    border-white/10
    transition
  "
>

<div className="font-bold">
  {part.title}
</div>

</Link>

))}

</div>

</div>

)}

      </main>

    </div>
  );
}
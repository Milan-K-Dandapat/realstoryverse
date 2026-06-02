import { useState, useEffect } from "react";
import { getStories } from "../../services/storyService";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X, LayoutDashboard, PlaySquare } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
const [stories, setStories] = useState([]);
const [showResults, setShowResults] = useState(false);
const [showNotifications, setShowNotifications] =
  useState(false);
  const [readNotifications,
setReadNotifications] =
useState(
  JSON.parse(
    localStorage.getItem(
      "readNotifications"
    ) || "[]"
  )
);
  const location = useLocation();

  // Close mobile menu automatically when a route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
  const loadStories = async () => {
    const data = await getStories();

    console.log("Stories:", data);

    setStories(data);
  };

  loadStories();
}, []);
  // Prevent background scrolling when the mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const unreadStories =
stories.filter(
  (story) =>
    !readNotifications.includes(
      story.id
    )
);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] w-full box-border bg-[#030305]/95 backdrop-blur-2xl border-b border-white/[0.05]">
        
        {/* Top Cinematic Highlight Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>

        {/* MAIN NAVBAR CONTAINER */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* LEFT: Logo Section (YouTube Style) */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2 sm:gap-3 focus:outline-none">
              
              {/* Premium App Logo Mark */}
              <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 shadow-[0_0_20px_rgba(225,29,72,0.3)] group-hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-300">
                <PlaySquare className="w-5 h-5 text-white fill-white/20" />
              </div>
              
              {/* Two-Tone Brand Text */}
              <div className="flex flex-col justify-center">
                <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5">
                  <span className="text-white">Real</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
                    Storyverse
                  </span>
                </h1>
              </div>
            </Link>
          </div>

          {/* RIGHT: Search, Notifications, Actions */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            
            {/* Desktop Center Search Bar (Hidden on Mobile) */}
            <div className="hidden lg:flex relative items-center bg-white/[0.03] border border-white/10 rounded-full px-4 py-2 w-[350px] focus-within:border-rose-500/50 focus-within:bg-white/[0.05] transition-all duration-300">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
  type="text"
  placeholder="Search for stories..."
  
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setShowResults(true);
  }}
  className="bg-transparent outline-none text-white ml-3 w-full placeholder:text-zinc-500 text-sm font-medium"
/>
{showResults && search && (

  <div className="absolute top-14 left-0 w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50">

    {stories
      .filter((story) =>
        story.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice(0, 5)
      .map((story) => (

        <Link
          key={story.id}
          to={`/story/${story.id}`}
          onClick={() => {
            setSearch("");
            setShowResults(false);
          }}
          className="block px-4 py-3 hover:bg-white/10 text-white border-b border-white/5"
        >
          {story.title}
        </Link>

      ))}

  </div>

)}
            </div>

            {/* Mobile Search */}
<div className="lg:hidden relative">

  <button
    onClick={() =>
      setShowResults(
        !showResults
      )
    }
    className="p-2 text-zinc-400 hover:text-white transition-colors"
  >
    <Search className="w-6 h-6" />
  </button>

  {showResults && (

    <div className="absolute right-0 top-12 w-[280px] bg-[#111] border border-white/10 rounded-xl p-3 z-[999]">

      <input
        type="text"
        placeholder="Search stories..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
      />

      <div className="mt-2 max-h-[250px] overflow-y-auto">

        {stories
          .filter((story) =>
            story.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .slice(0, 5)
          .map((story) => (

            <Link
              key={story.id}
              to={`/story/${story.id}`}
              onClick={() => {
                setShowResults(false);
                setSearch("");
              }}
              className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg"
            >
              {story.title}
            </Link>

          ))}

      </div>

    </div>

  )}

</div>

            {/* Notification Bell (YouTube Style) */}
            <div className="relative">

  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
    className="relative p-2 text-zinc-400 hover:text-white transition-colors group"
  >
    <Bell className="w-6 h-6" />

    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
  {unreadStories.length}
</span>

  </button>

  {showNotifications && (

    <div className="absolute right-0 top-12 w-[320px] bg-[#111] border border-white/10 rounded-xl overflow-hidden z-[999]">

      <div className="px-4 py-3 border-b border-white/10 font-bold text-white">
        Latest Stories
      </div>

     {unreadStories
  .slice(0, 5)
  .map((story) => (

          <Link
            key={story.id}
            to={`/story/${story.id}`}
            onClick={() => {

  const updated =
  [
    ...readNotifications,
    story.id
  ];

  setReadNotifications(
    updated
  );

  localStorage.setItem(
    "readNotifications",
    JSON.stringify(
      updated
    )
  );

  setShowNotifications(
    false
  );

}}
            className="block px-4 py-3 hover:bg-white/10 border-b border-white/5"
          >

            <div className="text-white text-sm font-semibold">
              {story.title}
            </div>

            <div className="text-zinc-400 text-xs mt-1">
              New Story Available
            </div>

          </Link>

      ))}

    </div>

  )}

</div>

            {/* Desktop Dashboard Button */}
            <Link to="/admin" className="hidden md:block">
              <button className="group relative px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm overflow-hidden hover:border-rose-500/50 transition-all duration-300">
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </span>
              </button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu className="w-7 h-7" />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* MOBILE DRAWER MENU */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-[280px] bg-[#0a0a0e] border-l border-white/10 z-[210] transform transition-transform duration-400 ease-out flex flex-col md:hidden shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
          <h1 className="text-lg font-black text-white tracking-wide">Menu</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-2">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-bold flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${location.pathname === "/" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              <PlaySquare className="w-5 h-5" />
              Home
            </Link>

            <a 
              href="/#latest" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-bold flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard className="w-5 h-5" />
              Stories
            </a>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-white/5 bg-[#050505] shrink-0">
          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-rose-600 hover:bg-rose-500 transition-colors py-3.5 rounded-xl text-white font-bold text-sm shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
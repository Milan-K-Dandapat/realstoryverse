import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary }
from "../../services/cloudinaryService";
import {
  addStory,
  getStories,
  deleteStory,
  updateStory,
  makeFeaturedStory
} from "../../services/storyService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] =
  useState("Mystery");
const [uploading,
setUploading] =
useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [stories, setStories] = useState([]);
  const totalViews =
  stories.reduce(
    (sum, story) =>
      sum + (story.views || 0),
    0
  );

const totalLikes =
  stories.reduce(
    (sum, story) =>
      sum + (story.likes || 0),
    0
  );

const totalShares =
  stories.reduce(
    (sum, story) =>
      sum + (story.shares || 0),
    0
  );

const totalRequests =
  stories.reduce(
    (sum, story) =>
      sum + (story.requests || 0),
    0
  );
  const [editingId, setEditingId] =
  useState(null);
  const [searchTerm, setSearchTerm] =
  useState("");

  useEffect(() => {

  loadStories();

}, []);

const loadStories = async () => {

  const data =
    await getStories();

  setStories(data);
};
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const videoId =
        url.split("v=")[1]?.split("&")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return "";
    }
  };

const publishStory = async (e) => {

  e.preventDefault();

  setLoading(true);
  setSuccess("");

  try {

    if (editingId) {

      await updateStory(
  editingId,
  {
    title,
    description,
    youtubeUrl,
    thumbnail,
    category,
  }
);

      setSuccess(
        "✅ Story Updated Successfully"
      );

      setEditingId(null);

    } else {

     await addStory({
  title,
  description,
  youtubeUrl,
  thumbnail,
  category,
  createdAt:
    new Date().toISOString(),
});

      setSuccess(
        "✅ Story Published Successfully"
      );
    }

    await loadStories();

    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    setThumbnail("");
    setCategory(
  "Mystery"
);

  } catch (error) {

    console.log(error);

    alert(
      "Something went wrong"
    );
  }

  setLoading(false);
};

const handleEdit = (
  story
) => {

  setEditingId(
    story.id
  );

  setTitle(
    story.title
  );

  setDescription(
    story.description
  );

  setYoutubeUrl(
    story.youtubeUrl
  );

  setThumbnail(
    story.thumbnail || ""
  );
  setCategory(
  story.category ||
  "Mystery"
);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleDelete = async (
  id
) => {

  const confirmDelete =
    window.confirm(
      "Delete this story?"
    );

  if (!confirmDelete) return;

  await deleteStory(id);

  await loadStories();
};

const handleFeatured =
  async (storyId) => {

    await makeFeaturedStory(
      storyId
    );

    await loadStories();
};

const totalStories =
  stories.length;

const handleLogout = async () => {

  await signOut(auth);

  navigate("/admin");
};

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          <h2>REAL STORYVERSE</h2>
        </div>

        <ul>
          <li className="active">
            📚 Publish Story
          </li>

          <li>
            📈 Analytics
          </li>

          <li>
            🎬 Stories
          </li>

          <li>
            ⚙ Settings
          </li>
        </ul>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* TOP BAR */}

        <div className="topbar">

          <h1>
            Story Publishing Dashboard
          </h1>

          <button
  className="profile-btn"
  onClick={handleLogout}
>
  Logout
</button>

        </div>

        {/* STATS */}

<div className="stats-grid">

  <div className="stat-card">
    <h3>Stories</h3>
    <span>{totalStories}</span>
  </div>

  <div className="stat-card">
    <h3>Total Views</h3>
    <span>{totalViews}</span>
  </div>

  <div className="stat-card">
    <h3>Total Likes</h3>
    <span>{totalLikes}</span>
  </div>

  <div className="stat-card">
    <h3>Total Shares</h3>
    <span>{totalShares}</span>
  </div>

  <div className="stat-card">
    <h3>Part Requests</h3>
    <span>{totalRequests}</span>
  </div>

</div>

        {/* FORM */}

        <div className="dashboard-grid">

          <div className="publish-card">

            <h2>
              Publish New Story
            </h2>

            <form
              onSubmit={publishStory}
              className="publish-form"
            >

              <input
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

              <textarea
                placeholder="Story Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="YouTube URL"
                value={youtubeUrl}
                onChange={(e) =>
                  setYoutubeUrl(e.target.value)
                }
                required
              />
              <select
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
  required
>
  <option value="Mystery">
    Mystery
  </option>

  <option value="Romantic">
    Romantic
  </option>

  <option value="Emotional">
    Emotional
  </option>

  <option value="Horror">
    Horror
  </option>

  <option value="Thriller">
    Thriller
  </option>
</select>

     <input
  type="file"
  accept="image/*"
  onChange={async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setUploading(true);

    const imageUrl =
      await uploadToCloudinary(
        file
      );

    if (imageUrl) {

      setThumbnail(
        imageUrl
      );
    }

    setUploading(false);
  }}
/>
{uploading && (

  <div
    className="uploading-text"
  >
    Uploading Image...
  </div>

)}

              {success && (
                <div className="success-box">
                  {success}
                </div>
              )}

             <button
  type="submit"
  className="publish-btn"
  disabled={
    loading ||
    uploading
  }
>
  {loading
    ? "Saving..."
    : editingId
      ? "✏️ Update Story"
      : "🚀 Publish Story"}
</button>

            </form>

          </div>

          {/* PREVIEW */}

          <div className="preview-card">

            <h2>
              Live Preview
            </h2>

            {youtubeUrl ? (

              <iframe
                src={getYoutubeEmbedUrl(
                  youtubeUrl
                )}
                title="Preview"
                allowFullScreen
              />

            ) : (

              <div className="preview-placeholder">
                Paste a YouTube link to
                preview the story.
              </div>

            )}

{thumbnail && (
  <img
    src={thumbnail}
    alt="Thumbnail Preview"
    className="thumbnail-preview"
  />
)}
            <div className="preview-info">

              <h3>
                {title || "Story Title"}
              </h3>
<p>
  {description ||
    "Story description preview will appear here."}
</p>

<small
  style={{
    color:"#ff4d6d",
    fontWeight:"600"
  }}
>
  {category}
</small>

            </div>

          </div>

        </div>

<div className="all-stories-card">

  <div className="stories-header">

  <h2>
    Published Stories
  </h2>

  <input
  type="text"
  placeholder="Search Story..."
  className="search-input"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(
      e.target.value
    )
  }
/>

</div>

  {stories
  .filter((story) =>
    story.title
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  )
  .map((story) => (

<div
  className="story-row"
  key={story.id}
>

  <div>

    <h4>

  {story.title}

  {story.featured && (
    <span
      className="featured-badge"
    >
      ⭐ Featured
    </span>
  )}

</h4>

   <>
  <p>
    {story.description}
  </p>

  <div
    style={{
      marginTop:"8px",
      fontSize:"13px",
      color:"#888"
    }}
  >
    👁 {story.views || 0}
    {" | "}
    ❤️ {story.likes || 0}
    {" | "}
    🔗 {story.shares || 0}
    {" | "}
    🚀 {story.requests || 0}
  </div>
</>

  </div>

  <div className="action-buttons">

  <button
    className="featured-btn"
    onClick={() =>
      handleFeatured(
        story.id
      )
    }
  >
    ⭐
  </button>

  <button
    className="edit-btn"
    onClick={() =>
      handleEdit(story)
    }
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      handleDelete(story.id)
    }
  >
    Delete
  </button>

  </div>

</div>

  ))}

</div>
      </main>

    </div>
  );
}

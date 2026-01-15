import { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Image, 
  Video, 
  MapPin, 
  Send,
  MoreHorizontal,
  Calendar,
  X,
  Check,
  Users
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Post, Comment, User, Pet, defaultPosts, defaultUser, defaultPets } from '@/lib/storage';
import { toast } from 'sonner';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'advice', label: 'Advice' },
  { id: 'playdates', label: 'Playdates' },
  { id: 'lost-found', label: 'Lost & Found' },
  { id: 'recommendations', label: 'Recommendations' },
];

const suggestedUsers = [
  { id: 'u1', name: 'Emma Wilson', petTag: 'Husky Mom', distance: '0.5 mi' },
  { id: 'u2', name: 'David Lee', petTag: 'Cat Dad', distance: '0.8 mi' },
  { id: 'u3', name: 'Sophie Brown', petTag: 'Multi-pet Parent', distance: '1.2 mi' },
];

const upcomingEvents = [
  { id: 'e1', title: 'Poodle Meetup', date: 'Sunday, 10 AM', location: 'Central Park' },
  { id: 'e2', title: 'Training Workshop', date: 'Next Tue, 2 PM', location: 'PetSmart Downtown' },
  { id: 'e3', title: 'Adoption Fair', date: 'Jan 25, 11 AM', location: 'City Hall Plaza' },
];

const TownSquarePage = () => {
  const [posts, setPosts] = useLocalStorage<Post[]>('posts', defaultPosts);
  const [user] = useLocalStorage<User>('user', defaultUser);
  const [pets] = useLocalStorage<Pet[]>('pets', defaultPets);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<Post['category']>('general');

  const activePet = pets[0];

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return posts;
    return posts.filter(post => post.category === activeFilter);
  }, [posts, activeFilter]);

  const handlePawUp = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      
      const hasPawed = post.pawedBy.includes(user.id);
      return {
        ...post,
        pawUps: hasPawed ? post.pawUps - 1 : post.pawUps + 1,
        pawedBy: hasPawed 
          ? post.pawedBy.filter(id => id !== user.id)
          : [...post.pawedBy, user.id]
      };
    }));
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleComment = (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    const newComment: Comment = {
      id: 'comment-' + Date.now(),
      authorId: user.id,
      authorName: user.name,
      content,
      createdAt: new Date().toISOString(),
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    toast.success('Comment added!');
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.success('Link copied to clipboard!');
  };

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: 'post-' + Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorPetTag: `${activePet?.breed || 'Pet'} Parent`,
      content: newPostContent,
      category: newPostCategory,
      location: 'Your location',
      pawUps: 0,
      pawedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    toast.success('Posted to Town Square!');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Layout>
      <div className="content-container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">Town Square</h1>
              <p className="text-muted-foreground">Connect with your neighborhood pet community</p>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`filter-chip ${activeFilter === cat.id ? 'filter-chip-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Post Composer */}
            <div className="card-premium p-6 mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🐾</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={`What's on ${activePet?.name || 'your pet'}'s mind?`}
                    className="w-full bg-transparent resize-none outline-none text-lg placeholder:text-muted-foreground min-h-[80px]"
                  />
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Image className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Video className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as Post['category'])}
                        className="ml-2 py-1 px-3 rounded-lg bg-muted text-sm border-none outline-none"
                      >
                        <option value="general">General</option>
                        <option value="advice">Advice</option>
                        <option value="playdates">Playdates</option>
                        <option value="recommendations">Recommendations</option>
                      </select>
                    </div>
                    <button 
                      onClick={handleNewPost}
                      disabled={!newPostContent.trim()}
                      className="btn-primary py-2 px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="post-card">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.authorName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {post.authorPetTag}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatTimeAgo(post.createdAt)}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {post.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-1 pt-4 border-t border-border">
                    <button 
                      onClick={() => handlePawUp(post.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 ${
                        post.pawedBy.includes(user.id)
                          ? 'bg-accent/10 text-accent'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <span className="text-lg">🐾</span>
                      <span className="font-medium">{post.pawUps}</span>
                    </button>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-all active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button 
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-all active:scale-95"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments.includes(post.id) && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      {/* Existing Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">👤</span>
                              </div>
                              <div className="flex-1 bg-muted rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{comment.authorName}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimeAgo(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">🐾</span>
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({ 
                              ...prev, 
                              [post.id]: e.target.value 
                            }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <button 
                            onClick={() => handleComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Local Events */}
            <div className="card-premium p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Local Barking News
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="group cursor-pointer">
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {event.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.location}
                    </p>
                  </div>
                ))}
              </div>
              <button className="text-sm text-primary mt-4 hover:underline">
                View all events →
              </button>
            </div>

            {/* Suggested Friends */}
            <div className="card-premium p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Suggested Furry Friends
              </h3>
              <div className="space-y-4">
                {suggestedUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary" />
                      <div>
                        <p className="font-medium text-sm">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.petTag}</p>
                      </div>
                    </div>
                    <button className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TownSquarePage;

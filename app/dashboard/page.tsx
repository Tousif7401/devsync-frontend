'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Save, Search, Clock, GitCommit, ExternalLink, CheckCircle2, XCircle, Edit2, Share2, Zap, FileText, TrendingUp, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EditModal from '@/components/dashboard/EditModal';
import { Button } from '@/components/ui/neon-button';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

interface GeneratedContent {
  linkedin: string;
  twitter: string;
  instagram: string;
  hashtags: string[];
}

interface Post {
  id: string;
  commitMessage: string;
  commitUrl: string;
  authorName: string;
  repository: string;
  linkedinPost: string;
  twitterPost: string;
  instagramPost: string;
  hashtags: string[];
  generatedAt: string;
  isPublished: boolean;
  platformPublished: string[];
}

interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface PlatformCard {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  content: string;
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [inputPrompt, setInputPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [githubCommits, setGithubCommits] = useState<GitHubCommit[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<GitHubCommit | null>(null);

  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSave = (updatedPost: Partial<Post>) => {
    if (editingPost) {
      setPosts(posts.map(p =>
        p.id === editingPost.id ? { ...p, ...updatedPost } : p
      ));
      setEditingPost(null);
    }
  };

  const handlePublish = async (postId: string, platforms: string[]) => {
    try {
      await fetch(`http://localhost:4000/posts/${postId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platforms }),
      });
      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, isPublished: true, platformPublished: platforms }
          : p
      ));
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const handleGenerate = async () => {
    if (!inputPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:4000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedContent({
          linkedin: data.platforms.linkedin,
          twitter: data.platforms.twitter,
          instagram: data.platforms.instagram,
          hashtags: data.hashtags,
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePost = async () => {
    if (!generatedContent || !inputPrompt.trim()) return;

    try {
      const response = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commitMessage: inputPrompt,
          commitId: Date.now().toString(),
          commitUrl: selectedCommit?.url || '',
          authorName: selectedCommit?.author || 'Manual Entry',
          repository: selectedCommit?.url?.split('/').slice(0, 5).join('/') || '',
          linkedinPost: generatedContent.linkedin,
          twitterPost: generatedContent.twitter,
          instagramPost: generatedContent.instagram,
          hashtags: generatedContent.hashtags,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newPost: Post = {
          id: data.data.id,
          commitMessage: inputPrompt,
          commitUrl: data.data.commitUrl || '',
          authorName: data.data.authorName || 'Manual Entry',
          repository: data.data.repository || '',
          linkedinPost: data.data.linkedinPost,
          twitterPost: data.data.twitterPost,
          instagramPost: data.data.instagramPost,
          hashtags: data.data.hashtags,
          generatedAt: data.data.generatedAt,
          isPublished: data.data.isPublished,
          platformPublished: data.data.platformPublished,
        };
        setPosts([newPost, ...posts]);
        setGeneratedContent(null);
        setInputPrompt('');
        setSelectedCommit(null);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleSelectCommit = (commit: GitHubCommit) => {
    setSelectedCommit(commit);
    setInputPrompt(commit.message);
  };

  const filteredPosts = posts.filter(post => {
    return searchQuery === '' ||
      post.commitMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    const mockCommits: GitHubCommit[] = [
      {
        sha: 'abc123',
        message: 'feat: add user authentication system with OAuth 2.0',
        author: 'John Doe',
        date: '2026-04-01',
        url: 'https://github.com/user/repo/commit/abc123',
      },
      {
        sha: 'def456',
        message: 'fix: resolve memory leak in websocket connection',
        author: 'Jane Smith',
        date: '2026-03-31',
        url: 'https://github.com/user/repo/commit/def456',
      },
      {
        sha: 'ghi789',
        message: 'refactor: migrate database to PostgreSQL',
        author: 'Mike Johnson',
        date: '2026-03-30',
        url: 'https://github.com/user/repo/commit/ghi789',
      },
      {
        sha: 'jkl012',
        message: 'feat: implement real-time collaboration feature',
        author: 'Sarah Williams',
        date: '2026-03-29',
        url: 'https://github.com/user/repo/commit/jkl012',
      },
    ];
    setGithubCommits(mockCommits);
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 md:p-8 overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="font-geist font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-4">
              Turn commits into
              <span className="block bg-gradient-to-r from-[#00d2ff] via-[#A4F4FD] to-[#00d2ff] bg-clip-text text-transparent animate-shiny">
                Social Stories
              </span>
            </h1>
            <p className="font-geist text-white/60 text-lg max-w-2xl">
              Transform your GitHub commits into engaging content across LinkedIn, X, and Instagram — automatically.
            </p>
          </div>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: easings.smooth }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Posts', value: posts.length, icon: FileText, color: 'from-blue-500 to-cyan-500' },
            { label: 'Published', value: posts.filter(p => p.isPublished).length, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
            { label: 'Drafts', value: posts.filter(p => !p.isPublished).length, icon: XCircle, color: 'from-yellow-500 to-orange-500' },
            { label: 'This Week', value: '12', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: easings.smooth }}
              whileHover={{ y: -4 }}
              className="liquid-glass rounded-cards p-5 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
              <div className="relative z-10">
                <stat.icon className={`w-5 h-5 mb-3 text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`} />
                <p className="text-3xl font-bold text-white font-geist mb-1">{stat.value}</p>
                <p className="text-white/40 text-sm font-geist">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Generated Posts */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="liquid-glass rounded-cards p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-geist flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00d2ff]" />
                  Your Posts
                </h2>
                <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full font-geist">
                  {posts.length}
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-cards pl-11 pr-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00d2ff] transition-colors font-geist"
                />
              </div>

              {/* Posts List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-white/10 mx-auto mb-3" />
                    <p className="text-white/40 text-sm font-geist">No posts yet</p>
                    <p className="text-white/20 text-xs font-geist mt-1">Generate your first post</p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      whileHover={{ x: 4 }}
                      className="bg-white/5 border border-white/5 rounded-cards p-4 hover:border-[#00d2ff]/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                          ${post.isPublished
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                          }
                        `}>
                          {post.isPublished ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white mb-1 truncate font-geist">
                            {post.commitMessage}
                          </p>
                          <p className="text-xs text-white/40 font-geist">{post.authorName}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Middle Column - Input & Preview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-6 space-y-6"
          >
            {/* AI Input */}
            <div className="liquid-glass rounded-cards p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d2ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d2ff] to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white font-geist">Generate Content</h2>
                </div>

                {selectedCommit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex items-center justify-between bg-[#00d2ff]/10 border border-[#00d2ff]/20 rounded-medium p-3"
                  >
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-[#00d2ff]" />
                      <span className="text-sm text-[#00d2ff] font-geist">{selectedCommit.message}</span>
                    </div>
                    <button
                      onClick={() => setSelectedCommit(null)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                <textarea
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Paste a commit message or describe your changes..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-cards px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff] transition-colors resize-none mb-4 font-geist"
                />

                <Button
                  onClick={handleGenerate}
                  variant="solid"
                  size="lg"
                  disabled={isGenerating || !inputPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 font-geist"
                >
                  <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
                  {isGenerating ? 'Generating Magic...' : 'Generate Content'}
                </Button>
              </div>
            </div>

            {/* Generated Content Preview */}
            <AnimatePresence>
              {generatedContent && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easings.smooth }}
                  className="space-y-4"
                >
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleGenerate}
                      variant="ghost"
                      size="default"
                      disabled={isGenerating}
                      className="flex-1 font-geist"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                      Regenerate
                    </Button>
                    <Button
                      onClick={handleSavePost}
                      variant="solid"
                      size="default"
                      className="flex-1 font-geist"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Post
                    </Button>
                  </div>

                  {/* Platform Cards */}
                  {[
                    { id: 'linkedin', name: 'LinkedIn', icon: '📘', gradient: 'from-blue-600 to-blue-800', content: generatedContent.linkedin },
                    { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', gradient: 'from-gray-800 to-gray-900', content: generatedContent.twitter },
                    { id: 'instagram', name: 'Instagram', icon: '📸', gradient: 'from-pink-500 via-purple-500 to-orange-400', content: generatedContent.instagram },
                  ].map((platform, i) => (
                    <motion.div
                      key={platform.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: easings.smooth }}
                      onMouseEnter={() => setHoveredPlatform(platform.id)}
                      onMouseLeave={() => setHoveredPlatform(null)}
                      className="liquid-glass rounded-cards p-6 relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-5 transition-opacity duration-300
                          ${hoveredPlatform === platform.id ? 'opacity-10' : ''}
                        `}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-lg transition-transform duration-300
                              ${hoveredPlatform === platform.id ? 'scale-110' : ''}
                            `}
                          >
                            {platform.icon}
                          </div>
                          <h3 className="text-lg font-bold text-white font-geist">{platform.name}</h3>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-geist">
                          {platform.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Hashtags */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: easings.smooth }}
                    className="liquid-glass rounded-cards p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-[#00d2ff]" />
                      <h3 className="text-sm font-bold text-white font-geist uppercase tracking-wider">Generated Hashtags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[#00d2ff] rounded-full text-sm font-medium font-geist"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - GitHub Commits */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="liquid-glass rounded-cards p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white font-geist flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-green-400" />
                  Recent Commits
                </h2>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {githubCommits.map((commit, index) => (
                  <motion.div
                    key={commit.sha}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectCommit(commit)}
                    whileHover={{ x: 4 }}
                    className={`bg-white/5 border rounded-cards p-4 transition-all cursor-pointer
                      ${selectedCommit?.sha === commit.sha
                        ? 'border-[#00d2ff] bg-[#00d2ff]/10'
                        : 'border-white/5 hover:border-white/10'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {commit.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white mb-2 leading-snug font-geist">
                          {commit.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40 font-geist">{commit.author}</span>
                          <a
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                size="default"
                className="w-full mt-4 font-geist flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Commits
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="liquid-glass rounded-cards p-6">
              <h2 className="text-lg font-bold text-white mb-4 font-geist">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { label: 'View All Posts', href: '/dashboard/posts', icon: FileText },
                  { label: 'Schedule Content', href: '/dashboard/schedule', icon: Clock },
                  { label: 'View Analytics', href: '/dashboard/analytics', icon: TrendingUp },
                ].map((action, i) => (
                  <motion.a
                    key={i}
                    href={action.href}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-cards hover:border-[#00d2ff]/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-4 h-4 text-white/60 group-hover:text-[#00d2ff] transition-colors" />
                      <span className="text-white/80 text-sm font-geist">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        post={editingPost}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
}
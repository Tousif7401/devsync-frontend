'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Save, Search, Clock, GitCommit, ExternalLink, CheckCircle2, XCircle, Edit2, Share2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EditModal from '@/components/dashboard/EditModal';
import { Button } from '@/components/ui/neon-button';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
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

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate state
  const [inputPrompt, setInputPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // GitHub commits state
  const [githubCommits, setGithubCommits] = useState<GitHubCommit[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<GitHubCommit | null>(null);

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

  // Fetch posts on mount
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

    // Mock GitHub commits - replace with actual GitHub API call
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
      <div className="p-6 md:p-8 h-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easings.smooth }}
          className="mb-6"
        >
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Generate Content
          </h1>
          <p
            className="text-gray-400"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Select a commit from your repository or enter custom text to generate social media content
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Generated Posts History */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
              <h2
                className="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Clock className="w-5 h-5 text-[#8B5CF6]" />
                Generated Posts ({posts.length})
              </h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>

              {/* Posts List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      No posts yet
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium text-white mb-1 truncate"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {post.commitMessage}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            {post.authorName}
                          </p>
                        </div>
                        <span className={`ml-2 shrink-0 ${post.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                          {post.isPublished ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEdit(post); }}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs py-1.5 rounded-lg transition-all flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        {!post.isPublished && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePublish(post.id, ['linkedin', 'twitter', 'instagram']); }}
                            className="flex-1 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] text-xs py-1.5 rounded-lg transition-all flex items-center justify-center gap-1"
                          >
                            <Share2 className="w-3 h-3" />
                            Publish
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Middle Column - AI Input Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-6 space-y-4"
          >
            {/* AI Input Form */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
              {selectedCommit && (
                <div className="mb-4 flex items-center justify-between bg-[#8B5CF6]/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-sm text-[#8B5CF6]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Selected: {selectedCommit.message}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCommit(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}

              <label className="block text-sm font-medium text-gray-300 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Enter commit message or text
              </label>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="e.g., feat: add user authentication system with OAuth 2.0 support"
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
              <Button
                onClick={handleGenerate}
                variant="solid"
                size="default"
                disabled={isGenerating || !inputPrompt.trim()}
                className="w-full flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>
            </div>

            {/* Generated Content Preview */}
            {generatedContent && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: easings.smooth }}
                className="space-y-4"
              >
                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerate}
                    variant="ghost"
                    size="default"
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleSavePost}
                    variant="solid"
                    size="default"
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Post
                  </Button>
                </div>

                {/* Platform Cards */}
                <div className="space-y-4">
                  {/* LinkedIn */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      LinkedIn
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {generatedContent.linkedin}
                    </p>
                  </motion.div>

                  {/* Twitter */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-gray-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      X (Twitter)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {generatedContent.twitter}
                    </p>
                  </motion.div>

                  {/* Instagram */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-pink-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Instagram
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {generatedContent.instagram}
                    </p>
                  </motion.div>

                  {/* Hashtags */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="bg-[#111111] border border-white/10 rounded-xl p-5"
                  >
                    <h4 className="text-sm font-medium text-gray-300 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Generated Hashtags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg text-sm font-medium"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - GitHub Commit History */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
              <h2
                className="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <GitCommit className="w-5 h-5 text-green-400" />
                Recent Commits
              </h2>

              {/* Commits List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {githubCommits.map((commit, index) => (
                  <motion.div
                    key={commit.sha}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectCommit(commit)}
                    className={`bg-[#0a0a0a] border rounded-xl p-4 transition-all cursor-pointer
                      ${selectedCommit?.sha === commit.sha
                        ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                        : 'border-white/5 hover:border-white/10'
                      }
                    `}
                  >
                    <p
                      className="text-sm font-medium text-white mb-2 leading-snug"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {commit.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                          {commit.author.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {commit.author}
                        </span>
                      </div>
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}

                <Button
                  variant="ghost"
                  size="default"
                  className="w-full flex items-center justify-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Commits
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
              <h2
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Quick Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Total Posts
                  </span>
                  <span className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {posts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Published
                  </span>
                  <span className="text-green-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {posts.filter(p => p.isPublished).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Drafts
                  </span>
                  <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {posts.filter(p => !p.isPublished).length}
                  </span>
                </div>
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

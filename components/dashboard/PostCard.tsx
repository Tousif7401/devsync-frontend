'use client';

import { motion } from 'framer-motion';
import { Edit2, Share2, ExternalLink, Clock, CheckCircle2, XCircle } from 'lucide-react';

export interface Post {
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

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onPublish: (postId: string, platforms: string[]) => void;
}

const statusColors = {
  published: 'bg-green-500/10 text-green-400 border-green-500/30',
  draft: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

const easings = {
  smooth: [0.16, 1, 0.3, 1],
};

export default function PostCard({ post, onEdit, onPublish }: PostCardProps) {
  const status = post.isPublished ? 'published' : 'draft';
  const statusConfig = statusColors[status];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: easings.smooth }}
      className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig}`}>
              {post.isPublished ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Published
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  Draft
                </span>
              )}
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(post.generatedAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-white font-semibold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {post.commitMessage}
          </h3>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            by {post.authorName} · {post.repository}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(post)}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {!post.isPublished && (
            <button
              onClick={() => onPublish(post.id, ['linkedin', 'twitter', 'instagram'])}
              className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
          <a
            href={post.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Platform previews */}
      <div className="space-y-3">
        {post.linkedinPost && (
          <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 text-sm font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>LinkedIn</span>
              {post.platformPublished?.includes('linkedin') && (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {post.linkedinPost}
            </p>
          </div>
        )}

        {post.twitterPost && (
          <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-300 text-sm font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>X (Twitter)</span>
              {post.platformPublished?.includes('twitter') && (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {post.twitterPost}
            </p>
          </div>
        )}

        {post.instagramPost && (
          <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-pink-400 text-sm font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>Instagram</span>
              {post.platformPublished?.includes('instagram') && (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              )}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {post.instagramPost}
            </p>
          </div>
        )}
      </div>

      {/* Hashtags */}
      {post.hashtags && post.hashtags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.hashtags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg text-xs font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

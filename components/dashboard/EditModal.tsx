'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Twitter, Instagram, Save } from 'lucide-react';

import { Post } from './PostCard';

interface EditModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: Partial<Post>) => void;
}

const easings = {
  smooth: [0.16, 1, 0.3, 1],
};

export default function EditModal({ post, isOpen, onClose, onSave }: EditModalProps) {
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setLinkedin(post.linkedinPost || '');
      setTwitter(post.twitterPost || '');
      setInstagram(post.instagramPost || '');
      setHashtags(post.hashtags?.join(', ') || '');
    }
  }, [post]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSave = () => {
    const updatedPost = {
      linkedinPost: linkedin,
      twitterPost: twitter,
      instagramPost: instagram,
      hashtags: hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    onSave(updatedPost);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: easings.smooth }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111111] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#111111] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Edit Post
                </h2>
                <p className="text-gray-400 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {post.commitMessage}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Platform Selectors */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Select Platforms
                </label>
                <div className="flex gap-3">
                  {[
                    { id: 'linkedin', icon: Linkedin, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
                    { id: 'twitter', icon: Twitter, color: 'text-gray-300', bg: 'bg-gray-400/10 border-gray-400/30' },
                    { id: 'instagram', icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/30' },
                  ].map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all
                        ${selectedPlatforms.includes(platform.id)
                          ? `${platform.bg} ${platform.color}`
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }
                      `}
                    >
                      <platform.icon className="w-5 h-5" />
                      <span className="font-medium capitalize" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {platform.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* LinkedIn Post */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  LinkedIn Post
                </label>
                <textarea
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  placeholder="Write your LinkedIn post..."
                />
              </div>

              {/* Twitter Post */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  X (Twitter) Post
                </label>
                <textarea
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  placeholder="Write your Twitter post..."
                />
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {twitter.length}/280 characters
                </p>
              </div>

              {/* Instagram Post */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Instagram Caption
                </label>
                <textarea
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  placeholder="Write your Instagram caption..."
                />
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Hashtags (comma separated)
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  placeholder="#devops, #ai, #programming"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#111111] border-t border-white/10 p-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7c4aed] text-white font-medium flex items-center gap-2 transition-all"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

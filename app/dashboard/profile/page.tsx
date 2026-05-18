'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Save, LogOut, Github, Camera, Linkedin, Twitter, Instagram, Check, Settings, Shield, Zap, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/neon-button';
import Image from 'next/image';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.46, 0.45, 0.94],
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  githubId: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SocialConnection {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'github';
  name: string;
  icon: React.ElementType;
  color: string;
  hoverColor: string;
  connected: boolean;
  username?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: 'github', name: 'GitHub', icon: Github, color: 'from-gray-600 to-gray-800', hoverColor: '#64748b', connected: false },
    { platform: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-500 to-blue-700', hoverColor: '#0a66c2', connected: false },
    { platform: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'from-gray-800 to-gray-900', hoverColor: '#1da1f2', connected: false },
    { platform: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 via-purple-500 to-orange-400', hoverColor: '#e1306c', connected: false },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name);
      setAvatar(userData.avatar || '');
    }
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:4000/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, avatar }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleConnect = (platform: string) => {
    setSocialConnections(prev =>
      prev.map(conn =>
        conn.platform === platform
          ? { ...conn, connected: !conn.connected, username: !conn.connected ? '@user_' + platform : undefined }
          : conn
      )
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-[#00d2ff] border-t-transparent rounded-full"
          />
        </div>
      </DashboardLayout>
    );
  }

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
              Your
              <span className="block bg-gradient-to-r from-[#00d2ff] via-[#A4F4FD] to-[#00d2ff] bg-clip-text text-transparent animate-shiny">
                Identity Hub
              </span>
            </h1>
            <p className="font-geist text-white/60 text-lg max-w-xl">
              Connect your platforms and craft your digital presence across the web.
            </p>
          </div>
        </motion.div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Avatar Card */}
            <div className="liquid-glass rounded-cards p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <motion.div
                  className="relative group mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-cards bg-gradient-to-br from-[#00d2ff] to-blue-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold overflow-hidden shadow-2xl shadow-[#00d2ff]/20">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={user?.name ?? "User avatar"}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 md:w-20 md:h-20" />
                    )}
                  </div>
                  <AnimatePresence>
                    {editMode && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-cards flex items-center justify-center gap-2 text-white cursor-pointer hover:bg-black/70 transition-colors"
                        onClick={() => {/* Handle avatar upload */}}
                      >
                        <Camera className="w-6 h-6" />
                        <span className="text-sm font-geist">Change</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>

                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2 font-geist">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-medium px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff] transition-colors font-geist"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2 font-geist">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-medium px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff] transition-colors resize-none font-geist"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white font-geist">
                      {user?.name}
                    </h2>
                    <p className="text-white/40 font-geist">{user?.email}</p>
                    {bio && <p className="text-white/60 font-geist mt-2">{bio}</p>}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {editMode ? (
                    <>
                      <Button
                        onClick={() => setEditMode(false)}
                        variant="ghost"
                        size="default"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        variant="solid"
                        size="default"
                        disabled={isSaving}
                        className="flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setEditMode(true)}
                      variant="hollow"
                      size="default"
                      className="w-full"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="liquid-glass rounded-cards p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-geist flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00d2ff]" />
                Overview
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Connected Platforms', value: socialConnections.filter(s => s.connected).length, total: socialConnections.length },
                  { label: 'Account Type', value: 'Free', total: '' },
                  { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A', total: '' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-white/60 text-sm font-geist">{stat.label}</span>
                    <span className="text-white font-semibold font-geist">
                      {stat.value}{stat.total && `/${stat.total}`}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Social Connections */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easings.smooth }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Social Connections Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white font-geist">Social Connections</h2>
                <span className="text-sm text-white/40 font-geist">
                  {socialConnections.filter(s => s.connected).length} of {socialConnections.length} connected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialConnections.map((social, index) => (
                  <motion.div
                    key={social.platform}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: easings.smooth }}
                    onMouseEnter={() => setHoveredCard(social.platform)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`liquid-glass rounded-cards p-6 relative overflow-hidden transition-all duration-300
                        ${social.connected ? 'border-[#00d2ff]/30' : 'border-white/5'}
                        ${hoveredCard === social.platform ? 'scale-[1.02]' : ''}
                      `}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-5 rounded-cards transition-opacity duration-300
                          ${hoveredCard === social.platform ? 'opacity-10' : ''}
                        `}
                      />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center transition-transform duration-300
                              ${hoveredCard === social.platform ? 'scale-110' : ''}
                            `}
                          >
                            <social.icon className="w-6 h-6 text-white" />
                          </div>

                          {social.connected ? (
                            <div className="flex items-center gap-1 text-green-400 text-sm font-geist">
                              <Check className="w-4 h-4" />
                              <span>Connected</span>
                            </div>
                          ) : (
                            <span className="text-white/40 text-sm font-geist">Not connected</span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-1 font-geist">{social.name}</h3>
                        {social.connected && social.username ? (
                          <p className="text-white/60 text-sm font-geist mb-4">{social.username}</p>
                        ) : (
                          <p className="text-white/40 text-sm font-geist mb-4">Connect your {social.name} account</p>
                        )}

                        <motion.button
                          onClick={() => handleConnect(social.platform)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-medium font-geist text-sm font-medium transition-all flex items-center justify-center gap-2
                            ${social.connected
                              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                              : `bg-gradient-to-r ${social.color} text-white hover:opacity-90 shadow-lg`
                            }
                          `}
                        >
                          {social.connected ? (
                            <>
                              Disconnect
                              <ChevronRight className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              Connect
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Account Details */}
            <div className="liquid-glass rounded-cards p-6">
              <h2 className="text-xl font-bold text-white mb-6 font-geist flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00d2ff]" />
                Account Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-medium p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm font-geist">Email</span>
                  </div>
                  <p className="text-white font-medium font-geist text-sm">{user?.email}</p>
                </div>

                <div className="bg-white/5 rounded-medium p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm font-geist">Joined</span>
                  </div>
                  <p className="text-white font-medium font-geist text-sm">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>

                <div className="bg-white/5 rounded-medium p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm font-geist">User ID</span>
                  </div>
                  <p className="text-white font-mono text-sm truncate">{user?.id?.slice(0, 8)}...</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: easings.smooth }}
            >
              <button
                onClick={handleLogout}
                className="w-full liquid-glass rounded-cards p-6 group hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 transition-colors flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold font-geist">Sign Out</h3>
                      <p className="text-white/40 text-sm font-geist">You'll be redirected to the login page</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
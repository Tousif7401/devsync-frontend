'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Save, LogOut, Github, Camera } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/neon-button';
import Image from 'next/image';

const easings = {
  smooth: [0.16, 1, 0.3, 1],
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

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // Get user from localStorage
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
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easings.smooth }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Profile
            </h1>
            <p
              className="text-gray-400"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: easings.smooth }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8"
            >
              {/* Avatar Section */}
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold overflow-hidden">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={user?.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 md:w-16 md:h-16" />
                    )}
                  </div>
                  {editMode && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Avatar URL (optional)
                        </label>
                        <input
                          type="text"
                          value={avatar}
                          onChange={(e) => setAvatar(e.target.value)}
                          placeholder="https://example.com/avatar.jpg"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2
                        className="text-2xl font-bold text-white mb-1"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {user?.name}
                      </h2>
                      <p
                        className="text-gray-400"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {user?.email}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {editMode ? (
                    <>
                      <Button
                        onClick={() => setEditMode(false)}
                        variant="ghost"
                        size="default"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        variant="solid"
                        size="default"
                        disabled={isSaving}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setEditMode(true)}
                      variant="outline"
                      size="default"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3
                        className="text-white font-medium"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Account Type
                      </h3>
                      <p
                        className="text-gray-400 text-sm"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Free Account
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Github className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3
                        className="text-white font-medium"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        GitHub
                      </h3>
                      <p
                        className="text-gray-400 text-sm"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {user?.githubId ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  {!user?.githubId && (
                    <button className="text-sm text-[#8B5CF6] hover:text-[#7c4aed] transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Connect GitHub account
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Account Information */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-6 space-y-4"
              >
                <h3
                  className="text-lg font-semibold text-white mb-4"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span
                        className="text-sm text-gray-400"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Email Address
                      </span>
                    </div>
                    <p
                      className="text-white font-medium"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {user?.email}
                    </p>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span
                        className="text-sm text-gray-400"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Member Since
                      </span>
                    </div>
                    <p
                      className="text-white font-medium"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span
                      className="text-sm text-gray-400"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      User ID
                    </span>
                  </div>
                  <p
                    className="text-gray-400 text-sm font-mono"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {user?.id}
                  </p>
                </div>
              </motion.div>

              {/* Danger Zone */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <h3
                  className="text-lg font-semibold text-red-400 mb-4"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Danger Zone
                </h3>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-medium transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

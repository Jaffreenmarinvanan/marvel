// @ts-nocheck
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Shield, Key, Lock, Unlock, Plus, Edit2, Trash2, Upload,
  Image as ImageIcon, Box, Film, Skull, Swords, Clock,
  CheckCircle, AlertTriangle, ArrowRight, X, Search, RefreshCw,
  ExternalLink, LogOut, ChevronRight
} from 'lucide-react';
import {
  getMergedMovies,
  getMergedHeroes,
  getMergedVillains,
  getMergedWeapons,
  getMergedTimeline,
  getMergedMediaMap,
  setClientCustomData,
  getClientCustomData
} from '@/data/dynamicData';

const REQUIRED_PASSCODE = '04062005';
const VALID_PASSCODES = ['04062005', '040605'];

type Category = 'heroes' | 'villains' | 'movies' | 'weapons' | 'timeline' | 'mediaMap' | 'uploads';

export default function AdminDashboardPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<Category>('heroes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedFilesList, setUploadedFilesList] = useState<Array<{ name: string; url: string; size: number }>>([]);

  // Data cache
  const [dataVersion, setDataVersion] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);

  // Form inputs
  const [formData, setFormData] = useState<any>({
    title: '',
    name: '',
    slug: '',
    realName: '',
    type: 'hero',
    status: 'alive',
    category: 'weapon',
    phase: 5,
    year: 2026,
    director: '',
    actor: '',
    species: 'Human',
    homeworld: 'Earth',
    affiliation: 'Avengers',
    description: '',
    synopsis: '',
    biography: '',
    powers: '',
    imageUrl: '',
    model3dUrl: '',
    model3dType: 'glb',
    accentColor: '#c9a84c',
    runtime: 120,
    releaseOrder: 80,
    chronologicalOrder: 80,
    image: '',
    accent: '#c9a84c',
  });

  // Check saved authentication on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('marvel_admin_auth');
    if (savedAuth === 'authenticated' || savedAuth === REQUIRED_PASSCODE) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch initial custom data from server
  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/admin/data')
        .then((res) => (res.ok ? res.json() : null))
        .then((payload) => {
          if (payload?.success && payload.data) {
            setClientCustomData(payload.data);
            setDataVersion((v) => v + 1);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  // Auth submission
  const handleAuthSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    const trimmed = passcode.trim();
    if (VALID_PASSCODES.includes(trimmed)) {
      try {
        await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: trimmed }),
        });
      } catch (err) {
        // Continue even if offline
      }
      localStorage.setItem('marvel_admin_auth', 'authenticated');
      document.cookie = `marvel_admin_auth=${REQUIRED_PASSCODE}; path=/; max-age=2592000; SameSite=Lax`;
      setIsAuthenticated(true);
      showToast('Level 9 Security Clearance Granted. Welcome Commander.', 'success');
    } else {
      setAuthError('CLEARANCE DENIED // INCORRECT UNIQUE PASSCODE');
      setPasscode('');
    }
    setIsVerifying(false);
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'clear') {
      setPasscode('');
      setAuthError('');
    } else if (val === 'backspace') {
      setPasscode((prev) => prev.slice(0, -1));
    } else if (passcode.length < 10) {
      const nextCode = passcode + val;
      setPasscode(nextCode);
      if (VALID_PASSCODES.includes(nextCode)) {
        setTimeout(() => {
          localStorage.setItem('marvel_admin_auth', 'authenticated');
          document.cookie = `marvel_admin_auth=${REQUIRED_PASSCODE}; path=/; max-age=2592000; SameSite=Lax`;
          setIsAuthenticated(true);
          showToast('Clearance Verified.', 'success');
        }, 150);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('marvel_admin_auth');
    document.cookie = 'marvel_admin_auth=; path=/; max-age=0;';
    setIsAuthenticated(false);
    setPasscode('');
    showToast('Admin Session Terminated.', 'success');
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Upload handler for photos / images / 3D models
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'imageUrl' | 'model3dUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setFormData((prev: any) => ({
          ...prev,
          [fieldName]: data.url,
          ...(fieldName === 'model3dUrl' ? { model3dType: file.name.endsWith('.obj') ? 'obj' : 'glb' } : {}),
        }));

        setUploadedFilesList((prev) => [
          { name: data.originalName, url: data.url, size: data.size },
          ...prev,
        ]);

        showToast(`Asset "${file.name}" uploaded successfully!`, 'success');
      } else {
        showToast(data.message || 'File upload failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'File upload error', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Open modal for creation
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      name: '',
      slug: '',
      realName: '',
      type: activeTab === 'villains' ? 'villain' : 'hero',
      status: 'alive',
      category: 'weapon',
      phase: 5,
      year: 2026,
      director: '',
      actor: '',
      species: activeTab === 'villains' ? 'Titan / Cosmic' : 'Human',
      homeworld: 'Earth',
      affiliation: 'Avengers',
      description: '',
      synopsis: '',
      biography: '',
      powers: '',
      imageUrl: '',
      model3dUrl: '',
      model3dType: 'glb',
      accentColor: activeTab === 'villains' ? '#ef4444' : '#3b82f6',
      runtime: 120,
      releaseOrder: 80,
      chronologicalOrder: 80,
      image: '',
      accent: '#c9a84c',
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      ...item,
      title: item.title || item.name || '',
      name: item.name || item.title || '',
      powers: Array.isArray(item.powers) ? item.powers.join(', ') : item.powers || '',
      affiliation: Array.isArray(item.affiliation) ? item.affiliation.join(', ') : item.affiliation || '',
      accentColor: item.portraitColor || item.posterColor || item.accentColor || item.accent || '#c9a84c',
      imageUrl: item.imageUrl || item.posterUrl || item.image || '',
      model3dUrl: item.model3dUrl || '',
      model3dType: item.model3dType || 'glb',
      description: item.description || item.biography || item.synopsis || '',
      biography: item.biography || item.description || '',
      synopsis: item.synopsis || item.description || '',
      image: item.image || item.posterUrl || item.imageUrl || '',
      accent: item.accent || item.posterColor || '#c9a84c',
    });
    setIsModalOpen(true);
  };

  // Form submission (Save / Update item)
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const cat = activeTab === 'uploads' ? 'mediaMap' : activeTab;
    const finalSlug = (
      formData.slug ||
      (formData.title || formData.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    ).trim();

    if (!finalSlug) {
      showToast('Slug or Title/Name is required', 'error');
      return;
    }

    // Process fields into structured item
    const structuredItem: any = {
      id: editingItem?.id || `custom_${cat}_${Date.now()}`,
      slug: finalSlug,
      title: formData.title || formData.name || finalSlug,
      name: formData.name || formData.title || finalSlug,
      realName: formData.realName || undefined,
      type: cat === 'movies' ? (formData.type === 'series' ? 'series' : 'movie') : formData.type,
      status: formData.status || 'alive',
      species: formData.species || 'Human',
      homeworld: formData.homeworld || 'Earth',
      phase: Number(formData.phase || 5),
      year: Number(formData.year || 2026),
      director: formData.director || 'Various',
      actor: formData.actor || undefined,
      runtime: Number(formData.runtime || 120),
      releaseOrder: Number(formData.releaseOrder || 80),
      chronologicalOrder: Number(formData.chronologicalOrder || 80),
      portraitColor: formData.accentColor || '#c9a84c',
      posterColor: formData.accentColor || '#c9a84c',
      accentColor: formData.accentColor || '#c9a84c',
      imageUrl: formData.imageUrl || undefined,
      posterUrl: formData.imageUrl || undefined,
      image: formData.imageUrl || formData.image || undefined,
      accent: formData.accentColor || '#c9a84c',
      model3dUrl: formData.model3dUrl || undefined,
      model3dType: formData.model3dType || 'glb',
      biography: formData.description || formData.biography || formData.synopsis || '',
      description: formData.description || formData.biography || formData.synopsis || '',
      synopsis: formData.description || formData.biography || formData.synopsis || '',
      powers: typeof formData.powers === 'string'
        ? formData.powers.split(',').map((p: string) => p.trim()).filter(Boolean)
        : formData.powers || [],
      affiliation: typeof formData.affiliation === 'string'
        ? formData.affiliation.split(',').map((a: string) => a.trim()).filter(Boolean)
        : formData.affiliation || ['Avengers'],
      category: formData.category || 'weapon',
      origin: formData.origin || 'Earth',
      date: formData.date || String(formData.year || 2026),
      characters: [finalSlug],
      writers: ['Marvel Studios'],
      cast: formData.actor ? [{ actor: formData.actor, character: formData.name }] : [],
    };

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat, item: structuredItem }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setClientCustomData(json.data);
        setDataVersion((v) => v + 1);
        setIsModalOpen(false);
        showToast(`Saved! "${structuredItem.title || structuredItem.name}" is now live on main pages.`, 'success');
      } else {
        showToast(json.message || 'Failed to save', 'error');
      }
    } catch (err: any) {
      // Local fallback
      const current = getClientCustomData();
      if (cat === 'mediaMap') {
        current.mediaMap = current.mediaMap || {};
        current.mediaMap[finalSlug] = {
          image: structuredItem.imageUrl || '',
          accent: structuredItem.accentColor || '#c9a84c',
        };
      } else {
        current[cat] = current[cat] || [];
        const idx = current[cat].findIndex((x: any) => x.slug === finalSlug || x.id === structuredItem.id);
        if (idx >= 0) {
          current[cat][idx] = { ...current[cat][idx], ...structuredItem };
        } else {
          current[cat].unshift(structuredItem);
        }
      }
      setClientCustomData(current);
      setDataVersion((v) => v + 1);
      setIsModalOpen(false);
      showToast(`Saved locally! Entry is live on main pages.`, 'success');
    }
  };

  // Delete item handler
  const handleDeleteItem = async (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title || item.name || item.slug}" from custom archives?`)) {
      return;
    }

    const cat = activeTab === 'uploads' ? 'mediaMap' : activeTab;
    try {
      const res = await fetch(`/api/admin/data?category=${cat}&slug=${item.slug}&id=${item.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success && json.data) {
        setClientCustomData(json.data);
        setDataVersion((v) => v + 1);
        showToast(`Deleted "${item.title || item.name || item.slug}".`, 'success');
      }
    } catch (err: any) {
      const current = getClientCustomData();
      if (cat === 'mediaMap' && current.mediaMap) {
        delete current.mediaMap[item.slug];
      } else if (current[cat]) {
        current[cat] = current[cat].filter((x: any) => x.slug !== item.slug && x.id !== item.id);
      }
      setClientCustomData(current);
      setDataVersion((v) => v + 1);
      showToast(`Deleted from local cache.`, 'success');
    }
  };

  // Current category data items
  const items = useMemo(() => {
    let list: any[] = [];
    if (activeTab === 'heroes') list = getMergedHeroes();
    else if (activeTab === 'villains') list = getMergedVillains();
    else if (activeTab === 'movies') list = getMergedMovies();
    else if (activeTab === 'weapons') list = getMergedWeapons();
    else if (activeTab === 'timeline') list = getMergedTimeline();
    else if (activeTab === 'mediaMap') {
      const mm = getMergedMediaMap();
      list = Object.entries(mm).map(([slug, val]) => ({
        slug,
        title: slug.replace(/-/g, ' ').toUpperCase(),
        imageUrl: val.image,
        accentColor: val.accent,
        logo: val.logo,
      }));
    }

    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((i) =>
      (i.title && i.title.toLowerCase().includes(q)) ||
      (i.name && i.name.toLowerCase().includes(q)) ||
      (i.slug && i.slug.toLowerCase().includes(q)) ||
      (i.actor && i.actor.toLowerCase().includes(q)) ||
      (i.species && i.species.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery, dataVersion]);

  // =========================================================================
  // VIEW 1: AUTHENTICATION LOCK SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-shield-logo">
            <Shield size={44} className="shield-icon" />
          </div>

          <div className="auth-eyebrow">S.H.I.E.L.D. PROTOCOL // CLASSIFIED</div>
          <h1 className="auth-title">ARCHIVAL COMMAND CENTER</h1>
          <p className="auth-subtitle">
            Enter the unique 6-8 digit security PIN to access the MCU database administration panel.
          </p>

          <form onSubmit={handleAuthSubmit} className="auth-form">
            <div className="pin-display">
              <Key size={18} className="pin-key-icon" />
              <input
                type="password"
                maxLength={10}
                placeholder="ENTER PASSCODE..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError('');
                }}
                className="pin-input"
                autoFocus
              />
              <button type="submit" disabled={isVerifying || !passcode} className="pin-submit-btn">
                {isVerifying ? <RefreshCw size={16} className="spin" /> : <Unlock size={16} />}
                <span>ACCESS</span>
              </button>
            </div>

            {authError && <div className="auth-error-msg">{authError}</div>}

            {/* Interactive Tactile Keypad */}
            <div className="keypad-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeypadPress(key)}
                  className={`keypad-btn ${key === 'clear' || key === 'backspace' ? 'keypad-action-btn' : ''}`}
                >
                  {key === 'clear' ? 'CLR' : key === 'backspace' ? '⌫' : key}
                </button>
              ))}
            </div>

            <div className="auth-hint">
              <span>Security Clearance Required. Authorized Personnel Only.</span>
            </div>
          </form>
        </div>

        <style jsx>{`
          .auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000000;
            padding: 1.5rem;
            color: #f8fafc;
            font-family: var(--font-body, system-ui, sans-serif);
          }
          .auth-card {
            width: 100%;
            max-width: 440px;
            background: rgba(5, 5, 5, 0.95);
            border: 1px solid rgba(201, 168, 76, 0.3);
            border-radius: 16px;
            padding: 2.5rem 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(201, 168, 76, 0.1);
            backdrop-filter: blur(12px);
            text-align: center;
          }
          .auth-shield-logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: rgba(201, 168, 76, 0.12);
            border: 2px solid #c9a84c;
            color: #c9a84c;
            margin-bottom: 1.25rem;
            box-shadow: 0 0 25px rgba(201, 168, 76, 0.3);
          }
          .auth-eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            color: #c9a84c;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .auth-title {
            font-size: 1.4rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            margin: 0 0 0.5rem;
            font-family: var(--font-heading, system-ui, sans-serif);
            color: #ffffff;
          }
          .auth-subtitle {
            font-size: 0.85rem;
            color: #94a3b8;
            margin: 0 0 1.75rem;
            line-height: 1.5;
          }
          .pin-display {
            display: flex;
            align-items: center;
            background: rgba(3, 7, 18, 0.8);
            border: 1px solid rgba(201, 168, 76, 0.4);
            border-radius: 10px;
            padding: 0.5rem 0.75rem;
            margin-bottom: 1rem;
            gap: 0.6rem;
          }
          .pin-key-icon {
            color: #c9a84c;
          }
          .pin-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #ffffff;
            font-size: 1.1rem;
            font-family: monospace;
            letter-spacing: 0.25em;
            text-align: center;
          }
          .pin-input::placeholder {
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: #64748b;
          }
          .pin-submit-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #c9a84c;
            color: #0b0d14;
            border: none;
            border-radius: 6px;
            font-weight: 700;
            font-size: 0.8rem;
            padding: 0.5rem 0.9rem;
            cursor: pointer;
            transition: all 0.15s;
          }
          .pin-submit-btn:hover:not(:disabled) {
            background: #e5c158;
            box-shadow: 0 0 15px rgba(201, 168, 76, 0.5);
          }
          .auth-error-msg {
            color: #f87171;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
            background: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 6px;
            padding: 0.45rem;
          }
          .keypad-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.6rem;
            margin-bottom: 1.5rem;
          }
          .keypad-btn {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border-radius: 8px;
            padding: 0.85rem 0;
            font-size: 1.15rem;
            font-weight: 700;
            font-family: monospace;
            cursor: pointer;
            transition: all 0.15s;
          }
          .keypad-btn:hover {
            background: rgba(201, 168, 76, 0.2);
            border-color: #c9a84c;
            color: #c9a84c;
          }
          .keypad-btn:active {
            transform: scale(0.96);
          }
          .keypad-action-btn {
            font-size: 0.85rem;
            color: #94a3b8;
          }
          .auth-hint {
            font-size: 0.75rem;
            color: #64748b;
          }
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED COMMAND CENTER
  // =========================================================================
  return (
    <div className="admin-root">
      {/* Toast alert */}
      {toastMessage && (
        <div className={`toast-banner toast-${toastMessage.type}`}>
          {toastMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Hidden file uploaders */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload(e, 'imageUrl')}
      />
      <input
        type="file"
        ref={modelInputRef}
        accept=".glb,.gltf,.obj"
        style={{ display: 'none' }}
        onChange={(e) => handleFileUpload(e, 'model3dUrl')}
      />

      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-area">
            <div className="admin-badge">
              <span className="pulse-dot" />
              <span>S.H.I.E.L.D. COMMAND // LEVEL 9 CLEARANCE ACTIVE</span>
            </div>
            <h1 className="admin-headline">Marvel Archives Command Center</h1>
            <p className="admin-subtext">
              Direct live database administration — Add & edit heroes, villains, movies, weapons, 3D elements, and photos.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link href="/" target="_blank" className="btn-hud-link">
              <span>View Main Site</span>
              <ExternalLink size={14} />
            </Link>
            <button onClick={handleLogout} className="btn-hud-logout">
              <LogOut size={14} />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tabs-nav">
          {[
            { id: 'heroes', label: 'Heroes', icon: Shield, count: getMergedHeroes().length },
            { id: 'villains', label: 'Villains', icon: Skull, count: getMergedVillains().length },
            { id: 'movies', label: 'Movies & Series', icon: Film, count: getMergedMovies().length },
            { id: 'weapons', label: 'Weapons & Artifacts', icon: Swords, count: getMergedWeapons().length },
            { id: 'timeline', label: 'Timeline Milestones', icon: Clock, count: getMergedTimeline().length },
            { id: 'mediaMap', label: 'Media Map & Posters', icon: ImageIcon, count: Object.keys(getMergedMediaMap()).length },
            { id: 'uploads', label: 'Asset Uploader', icon: Box, count: uploadedFilesList.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Category);
                  setSearchQuery('');
                }}
                className={`tab-btn ${isActive ? 'tab-btn-active' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body */}
      <main className="admin-main">
        {/* Controls Bar */}
        <div className="toolbar-row">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="toolbar-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-btn">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="toolbar-actions">
            {activeTab !== 'uploads' && (
              <button onClick={handleOpenCreateModal} className="btn-add-primary">
                <Plus size={16} />
                <span>Add New {activeTab.slice(0, -1).toUpperCase()}</span>
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-upload-secondary"
              title="Quickly upload a photo or image to /uploads/"
            >
              <Upload size={14} />
              <span>Upload Photo</span>
            </button>
            <button
              onClick={() => modelInputRef.current?.click()}
              className="btn-upload-secondary"
              title="Quickly upload a 3D model (.glb or .obj)"
            >
              <Box size={14} />
              <span>Upload 3D Model</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Asset Uploader */}
        {activeTab === 'uploads' ? (
          <div className="uploader-view">
            <div className="uploader-drop-card">
              <div className="drop-icon-ring">
                <Upload size={32} />
              </div>
              <h3>Direct Marvel Asset Uploader</h3>
              <p>Upload photos, official posters, character art, or 3D files (.glb / .obj) to include automatically in your pages.</p>

              <div className="drop-buttons-row">
                <button onClick={() => fileInputRef.current?.click()} className="btn-add-primary">
                  <ImageIcon size={16} />
                  <span>Upload Image (.jpg, .png, .webp)</span>
                </button>
                <button onClick={() => modelInputRef.current?.click()} className="btn-upload-secondary">
                  <Box size={16} />
                  <span>Upload 3D Object (.glb, .obj)</span>
                </button>
              </div>

              {isUploading && (
                <div className="uploading-indicator">
                  <RefreshCw size={16} className="spin" />
                  <span>Uploading to server storage...</span>
                </div>
              )}
            </div>

            {uploadedFilesList.length > 0 && (
              <div className="uploaded-list-card">
                <h4>Recently Uploaded in Current Session:</h4>
                <div className="uploaded-items-grid">
                  {uploadedFilesList.map((f, i) => (
                    <div key={i} className="uploaded-file-row">
                      <span className="file-name">{f.name}</span>
                      <code className="file-url">{f.url}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(f.url);
                          showToast(`Copied URL: ${f.url}`, 'success');
                        }}
                        className="copy-url-btn"
                      >
                        Copy URL
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab Content 2: Data Items Table/Cards */
          <div className="items-table-wrapper">
            <div className="table-header-meta">
              <span>Showing <strong>{items.length}</strong> entries</span>
              <div className="quick-nav-links">
                <span className="quick-nav-label">Live page preview:</span>
                <Link href={`/${activeTab === 'movies' ? 'movies' : activeTab}`} target="_blank" className="live-pill-link">
                  <span>Open /{activeTab === 'movies' ? 'movies' : activeTab}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            <div className="items-grid">
              {items.map((item: any) => {
                const title = item.title || item.name || item.slug;
                const photo = item.imageUrl || item.posterUrl || item.image;
                const model = item.model3dUrl;
                const accent = item.portraitColor || item.posterColor || item.accentColor || item.accent || '#c9a84c';

                return (
                  <div key={item.id || item.slug} className="admin-item-card">
                    <div className="card-thumb-wrap" style={{ borderColor: accent }}>
                      {photo ? (
                        <img src={photo} alt={title} className="card-thumb-img" />
                      ) : (
                        <div className="thumb-placeholder" style={{ background: `${accent}15`, color: accent }}>
                          {title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      {model && (
                        <span className="badge-3d-tag" title={`3D Model: ${model}`}>
                          <Box size={10} />
                          <span>3D</span>
                        </span>
                      )}
                    </div>

                    <div className="card-meta">
                      <div className="card-top-tags">
                        <span className="item-slug-tag">{item.slug}</span>
                        {item.phase !== undefined && <span className="phase-badge">Phase {item.phase}</span>}
                        {item.status && <span className="status-badge">{item.status}</span>}
                      </div>

                      <h3 className="item-title">{title}</h3>
                      {item.realName && <p className="item-sub">{item.realName}</p>}
                      {item.actor && <p className="item-sub">Cast: {item.actor}</p>}

                      <p className="item-desc">
                        {item.description || item.biography || item.synopsis || 'No description provided.'}
                      </p>

                      <div className="card-bottom-bar">
                        <button onClick={() => handleOpenEditModal(item)} className="btn-edit-item">
                          <Edit2 size={13} />
                          <span>Edit</span>
                        </button>
                        <button onClick={() => handleDeleteItem(item)} className="btn-delete-item" title="Delete custom item">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* ADD / EDIT MODAL DRAWER */}
      {/* ===================================================================== */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-eyebrow">
                  {editingItem ? 'DATABASE UPDATE // EDIT RECORD' : 'NEW ENTRY // ARCHIVAL INGESTION'}
                </span>
                <h2>{editingItem ? `Edit ${editingItem.title || editingItem.name}` : `Add New ${activeTab.toUpperCase()}`}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="modal-form">
              <div className="form-grid">
                {/* Name / Title */}
                <div className="form-group full-span">
                  <label>Title / Character Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doctor Doom, Nova, Thor: Love and Thunder"
                    value={formData.title || formData.name || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((p: any) => ({
                        ...p,
                        title: val,
                        name: val,
                        slug: p.slug ? p.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                      }));
                    }}
                    className="form-input"
                  />
                </div>

                {/* Slug */}
                <div className="form-group">
                  <label>Slug Identifier (URL friendly)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. doctor-doom"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Real Name or Actor */}
                <div className="form-group">
                  <label>{activeTab === 'movies' ? 'Director' : 'Real Name / Actor'}</label>
                  <input
                    type="text"
                    placeholder={activeTab === 'movies' ? 'e.g. Anthony & Joe Russo' : 'e.g. Victor von Doom / Robert Downey Jr.'}
                    value={activeTab === 'movies' ? formData.director || '' : formData.realName || formData.actor || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeTab === 'movies') {
                        setFormData({ ...formData, director: val });
                      } else {
                        setFormData({ ...formData, realName: val, actor: val });
                      }
                    }}
                    className="form-input"
                  />
                </div>

                {/* Photo / Image URL & Direct Upload */}
                <div className="form-group full-span">
                  <label>Photo / Image URL</label>
                  <div className="upload-input-combo">
                    <input
                      type="text"
                      placeholder="Paste image URL (https://...) or click Upload"
                      value={formData.imageUrl || formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, image: e.target.value })}
                      className="form-input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-upload-inline"
                    >
                      <Upload size={14} />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                  {formData.imageUrl && (
                    <div className="image-preview-chip">
                      <img src={formData.imageUrl} alt="Preview" className="img-preview" />
                      <span>Image loaded</span>
                    </div>
                  )}
                </div>

                {/* 3D Element Model (.glb / .obj) */}
                <div className="form-group full-span">
                  <label>3D Element Model (.glb or .obj path / URL)</label>
                  <div className="upload-input-combo">
                    <input
                      type="text"
                      placeholder="e.g. /models/mjolnir.glb or click Upload 3D File"
                      value={formData.model3dUrl || ''}
                      onChange={(e) => setFormData({ ...formData, model3dUrl: e.target.value })}
                      className="form-input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => modelInputRef.current?.click()}
                      className="btn-upload-inline"
                    >
                      <Box size={14} />
                      <span>Upload 3D Object</span>
                    </button>
                  </div>
                  <div className="model-type-row">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="model3dType"
                        value="glb"
                        checked={formData.model3dType !== 'obj'}
                        onChange={() => setFormData({ ...formData, model3dType: 'glb' })}
                      />
                      <span>GLB / GLTF</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="model3dType"
                        value="obj"
                        checked={formData.model3dType === 'obj'}
                        onChange={() => setFormData({ ...formData, model3dType: 'obj' })}
                      />
                      <span>Wavefront OBJ</span>
                    </label>
                  </div>
                </div>

                {/* Description / Content / Biography */}
                <div className="form-group full-span">
                  <label>Content Description / Biography / Synopsis *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide full archival biography, lore, powers, and pivotal storyline details..."
                    value={formData.description || formData.biography || formData.synopsis || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      description: e.target.value,
                      biography: e.target.value,
                      synopsis: e.target.value
                    })}
                    className="form-textarea"
                  />
                </div>

                {/* Accent Color */}
                <div className="form-group">
                  <label>Accent Color</label>
                  <div className="color-picker-row">
                    <input
                      type="color"
                      value={formData.accentColor || '#c9a84c'}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value, accent: e.target.value })}
                      className="color-input"
                    />
                    <input
                      type="text"
                      value={formData.accentColor || '#c9a84c'}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value, accent: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Phase / Year */}
                <div className="form-group">
                  <label>{activeTab === 'movies' ? 'Release Year' : 'MCU Phase'}</label>
                  <input
                    type="number"
                    value={activeTab === 'movies' ? formData.year || 2026 : formData.phase || 5}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (activeTab === 'movies') setFormData({ ...formData, year: val });
                      else setFormData({ ...formData, phase: val });
                    }}
                    className="form-input"
                  />
                </div>

                {/* Powers / Abilities */}
                <div className="form-group full-span">
                  <label>Powers, Skills, or Key Items (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Energy blasts, Sorcery, Vibranium armor, Telekinesis"
                    value={formData.powers || ''}
                    onChange={(e) => setFormData({ ...formData, powers: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit-save">
                  <CheckCircle size={16} />
                  <span>Save Automatically to Main Pages</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Admin Styles */}
      <style jsx>{`
        .admin-root {
          min-height: 100vh;
          background: #000000;
          color: #f1f5f9;
          font-family: var(--font-body, system-ui, sans-serif);
          padding-bottom: 5rem;
        }
        .toast-banner {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.2s ease-out;
        }
        .toast-success {
          background: rgba(16, 185, 129, 0.95);
          color: #032d1f;
          border: 1px solid #10b981;
        }
        .toast-error {
          background: rgba(239, 68, 68, 0.95);
          color: #fff;
          border: 1px solid #ef4444;
        }
        @keyframes slideIn {
          from { transform: translateY(-15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Header */
        .admin-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(5, 8, 17, 0.95) 100%);
          backdrop-filter: blur(8px);
        }
        .admin-header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem 1.25rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #10b981;
          margin-bottom: 0.5rem;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .admin-headline {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          margin: 0 0 0.4rem;
          color: #ffffff;
        }
        .admin-subtext {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0;
          max-width: 600px;
        }
        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-hud-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border: 1px solid rgba(201, 168, 76, 0.4);
          background: rgba(201, 168, 76, 0.08);
          color: #c9a84c;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s;
        }
        .btn-hud-link:hover {
          background: #c9a84c;
          color: #0b0d14;
        }
        .btn-hud-logout {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border: 1px solid rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.08);
          color: #f87171;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-hud-logout:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* Tabs */
        .tabs-nav {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.1rem;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
        }
        .tab-btn-active {
          color: #c9a84c !important;
          border-bottom-color: #c9a84c;
          background: rgba(201, 168, 76, 0.05);
        }
        .tab-count {
          font-size: 0.7rem;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
        }
        .tab-btn-active .tab-count {
          background: rgba(201, 168, 76, 0.2);
          color: #c9a84c;
        }

        /* Main layout */
        .admin-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* Toolbar */
        .toolbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 240px;
        }
        .search-icon {
          color: #64748b;
        }
        .toolbar-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.9rem;
        }
        .toolbar-search-input::placeholder {
          color: #64748b;
        }
        .clear-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
        }
        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .btn-add-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #c9a84c;
          color: #0b0d14;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-add-primary:hover {
          background: #e5c158;
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.4);
        }
        .btn-upload-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(30, 41, 59, 0.7);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 0.5rem 0.9rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-upload-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        /* Items list */
        .table-header-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .table-header-meta strong {
          color: #ffffff;
        }
        .quick-nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .live-pill-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #38bdf8;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .live-pill-link:hover {
          text-decoration: underline;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem;
        }
        .admin-item-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: border-color 0.15s;
        }
        .admin-item-card:hover {
          border-color: rgba(201, 168, 76, 0.3);
        }
        .card-thumb-wrap {
          width: 80px;
          height: 110px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid;
          position: relative;
          background: #000000;
        }
        .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 900;
        }
        .badge-3d-tag {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(56, 189, 248, 0.9);
          color: #031e2e;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .card-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 0;
        }
        .card-top-tags {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }
        .item-slug-tag {
          font-family: monospace;
          font-size: 0.68rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }
        .phase-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: #c9a84c;
        }
        .status-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #10b981;
        }
        .item-title {
          font-size: 1.05rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-sub {
          font-size: 0.78rem;
          color: #94a3b8;
          margin: 0;
        }
        .item-desc {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.4;
          margin: 0.25rem 0 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-bottom-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: auto;
        }
        .btn-edit-item {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(201, 168, 76, 0.15);
          border: 1px solid rgba(201, 168, 76, 0.4);
          color: #c9a84c;
          border-radius: 4px;
          padding: 0.3rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-edit-item:hover {
          background: #c9a84c;
          color: #0b0d14;
        }
        .btn-delete-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          border-radius: 4px;
          padding: 0.3rem 0.5rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-delete-item:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* Uploader View */
        .uploader-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .uploader-drop-card {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(0, 0, 0, 0.85);
          border: 2px dashed rgba(201, 168, 76, 0.4);
          border-radius: 16px;
        }
        .drop-icon-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.12);
          color: #c9a84c;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .uploader-drop-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 0.5rem;
          color: #ffffff;
        }
        .uploader-drop-card p {
          color: #94a3b8;
          font-size: 0.9rem;
          max-width: 520px;
          margin: 0 auto 1.5rem;
        }
        .drop-buttons-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .uploading-indicator {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #38bdf8;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .uploaded-list-card {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .uploaded-list-card h4 {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          color: #c9a84c;
        }
        .uploaded-items-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .uploaded-file-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          background: rgba(3, 7, 18, 0.6);
          border-radius: 6px;
          font-size: 0.8rem;
          gap: 1rem;
        }
        .file-name {
          font-weight: 700;
          color: #ffffff;
        }
        .file-url {
          color: #38bdf8;
          font-family: monospace;
          background: rgba(56, 189, 248, 0.08);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }
        .copy-url-btn {
          background: #c9a84c;
          border: none;
          color: #0b0d14;
          font-weight: 700;
          font-size: 0.72rem;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-dialog {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0b1120;
          border: 1px solid rgba(201, 168, 76, 0.4);
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
          padding: 2rem;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .modal-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: #c9a84c;
          font-weight: 800;
        }
        .modal-title-wrap h2 {
          font-size: 1.35rem;
          font-weight: 900;
          margin: 0.25rem 0 0;
          color: #ffffff;
        }
        .modal-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }
        .modal-close-btn:hover {
          color: #ffffff;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .full-span {
          grid-column: 1 / -1;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-input, .form-textarea {
          background: rgba(3, 7, 18, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          color: #ffffff;
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: #c9a84c;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.2);
        }
        .upload-input-combo {
          display: flex;
          gap: 0.5rem;
        }
        .flex-1 {
          flex: 1;
        }
        .btn-upload-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
          border-radius: 6px;
          padding: 0.5rem 0.8rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-upload-inline:hover {
          background: #c9a84c;
          color: #0b0d14;
        }
        .image-preview-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #10b981;
        }
        .img-preview {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #10b981;
        }
        .model-type-row {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.4rem;
        }
        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #94a3b8;
          cursor: pointer;
        }
        .color-picker-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .color-input {
          width: 44px;
          height: 38px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .modal-actions-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.8rem;
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .btn-cancel {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94a3b8;
          padding: 0.6rem 1.25rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-cancel:hover {
          color: #ffffff;
          border-color: #ffffff;
        }
        .btn-submit-save {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #c9a84c;
          border: none;
          color: #0b0d14;
          padding: 0.6rem 1.4rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-submit-save:hover {
          background: #e5c158;
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.4);
        }
      `}</style>
    </div>
  );
}

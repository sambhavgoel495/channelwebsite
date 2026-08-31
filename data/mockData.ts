import { Bundle, Category, Purchase, User, VideoItem } from '@/types';

// High quality placeholder video thumbnails & real MP4 video previews
export const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'demo-1',
    title: 'Roblox Viral Parkour Reel 🎮',
    duration: '0:15',
    thumbnail: '/roblox_reels_bundle.jpg',
    videoUrl: '/robloxdemo1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '2.5M'
  },
  {
    id: 'demo-2',
    title: 'Roblox Speed Challenge 🚀',
    duration: '0:18',
    thumbnail: '/roblox_reels_bundle.jpg',
    videoUrl: '/robloxdemo2.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '3.8M'
  },
  {
    id: 'demo-3',
    title: 'BeamNG Car Crash Jump Test 💥',
    duration: '0:16',
    thumbnail: '/car_crash_bundle.jpg',
    videoUrl: '/carcrashdemo1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '4.2M'
  },
  {
    id: 'demo-4',
    title: 'Highway Supercar Crash Reel 🚘',
    duration: '0:18',
    thumbnail: '/car_crash_bundle.jpg',
    videoUrl: '/carcrashdemo2.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '5.1M'
  },
  {
    id: 'demo-7',
    title: 'Stickman Epic Action Reel 🥷',
    duration: '0:18',
    thumbnail: '/stickman_content_bundle.jpg',
    videoUrl: '/stickmandemo1.mp4',
    format: '9:16 Vertical HD',
    category: 'Action',
    viewsCount: '6.4M'
  },
  {
    id: 'demo-8',
    title: 'Stickman Stunts & Battles ⚔️',
    duration: '0:22',
    thumbnail: '/stickman_content_bundle.jpg',
    videoUrl: '/stickmandemo2.mp4',
    format: '9:16 Vertical HD',
    category: 'Action',
    viewsCount: '8.1M'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Available Bundles', iconName: 'Grid', count: 4 },
  { id: 'Trending', name: 'Trending Bundles', iconName: 'TrendingUp', count: 2 },
  { id: 'Combo', name: 'Combos', iconName: 'Flame', count: 1 },
];

export const MOCK_BUNDLES: Bundle[] = [
  {
    id: '1',
    title: 'Roblox Reels Bundle',
    slug: 'roblox-reels-bundle',
    tagline: '3000+ High Quality Viral Roblox Reels',
    description: 'Boost your content, grow your page, go viral with 3000+ viral Roblox reels ready to post.',
    price: 49,
    originalPrice: 299,
    videoCount: 3000,
    category: 'Trending',
    categoryBadge: 'VIRAL ROBLOX',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/roblox_reels_bundle.jpg',
    previewVideoUrl: '/robloxdemo1.mp4',
    isPopular: true,
    isTrending: true,
    rating: 5.0,
    reviewsCount: 482,
    freeDemos: [SAMPLE_VIDEOS[0], SAMPLE_VIDEOS[1]],
    lockedVideosCount: 48,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `tc-${i + 1}`,
      title: `Toddler Comedy Clip #${i + 1}`,
      duration: `0:${12 + (i % 10)}`,
      thumbnail: [
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80'
      ][i % 4],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-little-girl-playing-with-a-toy-in-a-park-41551-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Comedy'
    })),
    whatsInside: [
      '50 High-Definition 1080p MP4 Clips',
      'Perfect 9:16 Vertical Aspect Ratio for Reels/Shorts',
      'No Watermarks or Logo Overlays',
      'Instant Download & Drive Link Access',
      'Commercial License for Content Creators',
      'Organized into Clean Scene Directories'
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB',
  },
  {
    id: '2',
    title: '8000+ Car Crash Bundle',
    slug: 'car-crash-video-bundle',
    tagline: '8000+ Viral BeamNG.drive Car Crash Videos',
    description: 'Ultimate BeamNG.drive collection of 8000+ viral car crash videos, ready to post for short-form content creators.',
    price: 39,
    originalPrice: 399,
    videoCount: 8000,
    category: 'Trending',
    categoryBadge: 'CAR CRASH',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/car_crash_bundle.jpg',
    previewVideoUrl: '/carcrashdemo1.mp4',
    isPopular: true,
    isTrending: true,
    rating: 4.9,
    reviewsCount: 395,
    freeDemos: [SAMPLE_VIDEOS[2], SAMPLE_VIDEOS[3]],
    lockedVideosCount: 73,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `cr-${i + 1}`,
      title: `Cute Reaction Clip #${i + 1}`,
      duration: `0:${10 + (i % 8)}`,
      thumbnail: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-toddler-smiling-and-playing-outdoors-42861-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Trending'
    })),
    whatsInside: [
      '75 Hand-Picked Reaction Clips',
      '9:16 Full HD Ultra Sharp Visuals',
      'Commercial Usage Included',
      'Instant One-Click Google Drive Sync',
      'Sorted by Mood (Shock, Joy, Confusion)'
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV',
  },
  {
    id: '3',
    title: '3000+ AI Girls Dancing Reels Bundle',
    slug: 'ai-girls-dancing-reels-bundle',
    tagline: '3,000+ High Quality AI Girls Dancing Reels',
    description: '3,000+ HD dancing reels, crisp, clear & professional videos optimized for viral short-form growth.',
    price: 69,
    originalPrice: 399,
    videoCount: 3000,
    category: 'Trending',
    categoryBadge: 'AI GIRLS DANCING',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/ai_girls_dancing_bundle.png',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-blocks-42646-large.mp4',
    isPopular: false,
    rating: 4.9,
    reviewsCount: 189,
    freeDemos: [SAMPLE_VIDEOS[3], SAMPLE_VIDEOS[0]],
    lockedVideosCount: 58,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `tc2-${i + 1}`,
      title: `Conversation Clip #${i + 1}`,
      duration: `0:${15 + (i % 12)}`,
      thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-blocks-42646-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Conversations'
    })),
    whatsInside: [
      '60 High Retention Conversation Clips',
      'Crisp Audio & Clear Speech Moments',
      'Vertical 9:16 Format for Shorts & Reels',
      'Commercial Content Rights Included',
      'Ready to overlay text & captions'
    ]
  },
  {
    id: '4',
    title: '1000+ Stickman Content Bundle',
    slug: 'stickman-content-bundle',
    tagline: '1,000+ High Quality Viral Stickman Videos',
    description: 'Massive collection of entertaining Stickman action clips made specifically for short-form content creators.',
    price: 39,
    originalPrice: 399,
    videoCount: 1000,
    category: 'Action',
    categoryBadge: 'STICKMAN ACTION',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/stickman_content_bundle.jpg',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-robot-character-42991-large.mp4',
    isPopular: true,
    isTrending: true,
    rating: 5.0,
    reviewsCount: 512,
    freeDemos: [SAMPLE_VIDEOS[4], SAMPLE_VIDEOS[5]],
    lockedVideosCount: 998,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `sm-${i + 1}`,
      title: `Stickman Action Clip #${i + 1}`,
      duration: `0:${10 + (i % 15)}`,
      thumbnail: '/stickman_content_bundle.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-robot-character-42991-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Action'
    })),
    whatsInside: [
      '1,000+ Short-Form Stickman Videos',
      'Designed for Shorts, Reels & TikTok',
      'High-Quality Stickman Animations & Action Clips',
      'No Watermarks or Logos',
      'Organized Google Drive Library'
    ]
  },
  {
    id: '5',
    title: '🔥 Ultimate 4-in-1 Creator Combo Pack',
    slug: 'ultimate-4-in-1-creator-combo-pack',
    tagline: 'Get ALL 4 Mega Bundles (15,000+ Total Videos)',
    description: 'Unlock lifetime access to Roblox (3,000+), BeamNG Car Crash (8,000+), AI Girls Dancing (3,000+), and Stickman Action (1,000+) bundles in one massive combo!',
    price: 149,
    originalPrice: 1499,
    videoCount: 15000,
    category: 'Combo',
    categoryBadge: '🔥 4-IN-1 MEGA COMBO',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/roblox_reels_bundle.jpg',
    previewVideoUrl: '/robloxdemo1.mp4',
    isPopular: true,
    isTrending: true,
    rating: 5.0,
    reviewsCount: 840,
    freeDemos: [SAMPLE_VIDEOS[0], SAMPLE_VIDEOS[2]],
    lockedVideosCount: 14990,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `combo-${i + 1}`,
      title: `Combo Clip #${i + 1}`,
      duration: `0:${10 + (i % 15)}`,
      thumbnail: '/roblox_reels_bundle.jpg',
      videoUrl: '/robloxdemo1.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Combo'
    })),
    whatsInside: [
      '3,000+ Roblox Viral Video Clips',
      '8,000+ BeamNG Car Crash Videos',
      '3,000+ AI Girls Dancing Reels',
      '1,000+ Stickman Action Videos',
      'Instant Google Drive Access to All 4 Folders',
      'Full Commercial Rights & Lifetime Access'
    ],
    driveUrl: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
  }
];

export const MOCK_PURCHASES: Purchase[] = [
  {
    id: 'ORD-98421',
    userEmail: 'creator.alex@gmail.com',
    userName: 'Alex Rivers',
    bundleId: '1',
    bundleTitle: 'Roblox Reels Bundle',
    amount: 49,
    paymentMethod: 'UPI / Razorpay',
    status: 'Completed',
    date: '2026-08-22 19:42'
  },
  {
    id: 'ORD-98420',
    userEmail: 'sarah.reels@outlook.com',
    userName: 'Sarah Jenkins',
    bundleId: '4',
    bundleTitle: 'Viral Toddler Collection',
    amount: 149,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    date: '2026-08-22 18:15'
  },
  {
    id: 'ORD-98419',
    userEmail: 'vikram.shorts@gmail.com',
    userName: 'Vikram Sharma',
    bundleId: '2',
    bundleTitle: '8000+ Car Crash Bundle',
    amount: 39,
    paymentMethod: 'UPI / GPay',
    status: 'Completed',
    date: '2026-08-21 21:04'
  },
  {
    id: 'ORD-98418',
    userEmail: 'priya.creator@yahoo.com',
    userName: 'Priya Patel',
    bundleId: '3',
    bundleTitle: 'Toddler Conversations',
    amount: 119,
    paymentMethod: 'Net Banking',
    status: 'Completed',
    date: '2026-08-21 14:30'
  }
];

export const DEFAULT_USER: User = {
  id: 'usr_123',
  name: 'Demo Creator',
  email: 'creator@littlevault.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isAdmin: false,
  purchasedBundleIds: ['1'] // Default purchased Toddler Comedy Pack for quick demo
};

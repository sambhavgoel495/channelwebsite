import { Bundle, Category, Purchase, User, VideoItem } from '@/types';

// High quality placeholder video thumbnails & real MP4 video previews
export const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'demo-1',
    title: 'Roblox Viral Parkour Reel 🎮',
    duration: '0:15',
    thumbnail: '/roblox_reels_bundle.jpg',
    videoUrl: '/roblox_demo_video_1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '2.5M'
  },
  {
    id: 'demo-2',
    title: 'Roblox Speed Challenge 🚀',
    duration: '0:18',
    thumbnail: '/roblox_reels_bundle.jpg',
    videoUrl: '/roblox_demo_video_1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '3.8M'
  },
  {
    id: 'demo-3',
    title: 'BeamNG Car Crash Jump Test 💥',
    duration: '0:16',
    thumbnail: '/car_crash_bundle.jpg',
    videoUrl: '/car_crash_demo_1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '4.2M'
  },
  {
    id: 'demo-4',
    title: 'Highway Supercar Crash Reel 🚘',
    duration: '0:18',
    thumbnail: '/car_crash_bundle.jpg',
    videoUrl: '/car_crash_demo_1.mp4',
    format: '9:16 Vertical HD',
    category: 'Trending',
    viewsCount: '5.1M'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Available Bundles', iconName: 'Grid', count: 6 },
  { id: 'Trending', name: 'Trending Bundles', iconName: 'TrendingUp', count: 2 },
];

export const MOCK_BUNDLES: Bundle[] = [
  {
    id: '1',
    title: 'Roblox Reels Bundle',
    slug: 'roblox-reels-bundle',
    tagline: '3000+ High Quality Viral Roblox Reels',
    description: 'Boost your content, grow your page, go viral with 3000+ viral Roblox reels ready to post.',
    price: 99,
    originalPrice: 299,
    videoCount: 3000,
    category: 'Trending',
    categoryBadge: 'VIRAL ROBLOX',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/roblox_reels_bundle.jpg',
    previewVideoUrl: '/roblox_demo_video_1.mp4',
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
    ]
  },
  {
    id: '2',
    title: '8000+ Car Crash Bundle',
    slug: 'car-crash-video-bundle',
    tagline: '8000+ Viral BeamNG.drive Car Crash Videos',
    description: 'Ultimate BeamNG.drive collection of 8000+ viral car crash videos, ready to post for short-form content creators.',
    price: 129,
    originalPrice: 399,
    videoCount: 8000,
    category: 'Trending',
    categoryBadge: 'CAR CRASH',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: '/car_crash_bundle.jpg',
    previewVideoUrl: '/car_crash_demo_1.mp4',
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
      category: 'Cute Reactions'
    })),
    whatsInside: [
      '75 Hand-Picked Reaction Clips',
      '9:16 Full HD Ultra Sharp Visuals',
      'Commercial Usage Included',
      'Instant One-Click Google Drive Sync',
      'Sorted by Mood (Shock, Joy, Confusion)'
    ]
  },
  {
    id: '3',
    title: 'Toddler Conversations',
    slug: 'toddler-conversations',
    tagline: 'Funny toddler arguments, logic & babble talks',
    description: 'Funny toddler conversations, witty back-and-forth chatter, and unexpected philosophical statements.',
    price: 119,
    originalPrice: 349,
    videoCount: 60,
    category: 'Conversations',
    categoryBadge: 'TALK & AUDIO',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
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
    title: 'Viral Toddler Collection',
    slug: 'viral-toddler-collection',
    tagline: 'Top performing high-retention toddler moments',
    description: 'A mixed collection of entertaining toddler moments proven to generate high watch time and engagement.',
    price: 149,
    originalPrice: 499,
    videoCount: 100,
    category: 'Trending',
    categoryBadge: 'VIRAL BESTSELLER',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-baby-playing-with-a-stuffed-animal-42358-large.mp4',
    isPopular: true,
    isTrending: true,
    rating: 5.0,
    reviewsCount: 512,
    freeDemos: [SAMPLE_VIDEOS[2], SAMPLE_VIDEOS[3]],
    lockedVideosCount: 98,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `vt-${i + 1}`,
      title: `Viral Clip #${i + 1}`,
      duration: `0:${10 + (i % 15)}`,
      thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-baby-playing-with-a-stuffed-animal-42358-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Trending'
    })),
    whatsInside: [
      '100 Ultimate Viral Toddler Clips',
      'Curated for High Retention Algorithms',
      '9:16 1080p Clean MP4 Files',
      'Includes Music-Ready Silent & Audio Tracks',
      'Unrestricted Social Media Monetization'
    ]
  },
  {
    id: '5',
    title: 'Daily Toddler Antics',
    slug: 'daily-toddler-antics',
    tagline: 'Relatable everyday toddler chaos & playtime',
    description: 'Everyday silly antics, playground fun, and relatable toddler chaos that parents love to share.',
    price: 89,
    originalPrice: 249,
    videoCount: 40,
    category: 'Funny Moments',
    categoryBadge: 'PLAYTIME',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-blocks-42646-large.mp4',
    isPopular: false,
    rating: 4.7,
    reviewsCount: 140,
    freeDemos: [SAMPLE_VIDEOS[3], SAMPLE_VIDEOS[1]],
    lockedVideosCount: 38,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `dta-${i + 1}`,
      title: `Playtime Antics Clip #${i + 1}`,
      duration: `0:${12 + (i % 6)}`,
      thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-blocks-42646-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Funny Moments'
    })),
    whatsInside: [
      '40 Relatable Daily Life Videos',
      'Clean 9:16 Aspect Ratio',
      'High Contrast Colors & Clear Motion',
      'Commercial License Included'
    ]
  },
  {
    id: '6',
    title: 'Wholesome Baby Moments',
    slug: 'wholesome-baby-moments',
    tagline: 'Heartwarming bonding, hugs & gentle laughter',
    description: 'Heartwarming interactions, baby laughter, animal interactions, and wholesome family moments.',
    price: 139,
    originalPrice: 379,
    videoCount: 80,
    category: 'Cute Reactions',
    categoryBadge: 'WHOLESOME',
    formatBadge: '9:16 VERTICAL HD',
    quality: '1080p 9:16 Vertical',
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-baby-playing-with-a-stuffed-animal-42358-large.mp4',
    isPopular: false,
    rating: 4.9,
    reviewsCount: 275,
    freeDemos: [SAMPLE_VIDEOS[2], SAMPLE_VIDEOS[0]],
    lockedVideosCount: 78,
    sampleVideos: Array.from({ length: 12 }).map((_, i) => ({
      id: `wbm-${i + 1}`,
      title: `Wholesome Clip #${i + 1}`,
      duration: `0:${14 + (i % 7)}`,
      thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-baby-playing-with-a-stuffed-animal-42358-large.mp4',
      format: '9:16 Vertical HD',
      isLocked: true,
      category: 'Cute Reactions'
    })),
    whatsInside: [
      '80 Heartwarming Video Clips',
      '9:16 HD Vertical MP4 Files',
      'No Watermarks',
      'Commercial Usage Approved'
    ]
  }
];

export const MOCK_PURCHASES: Purchase[] = [
  {
    id: 'ORD-98421',
    userEmail: 'creator.alex@gmail.com',
    userName: 'Alex Rivers',
    bundleId: '1',
    bundleTitle: 'Toddler Comedy Pack',
    amount: 99,
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
    bundleTitle: 'Cute Reactions Pack',
    amount: 129,
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

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  format: '9:16 Vertical HD' | '1080p MP4';
  isLocked?: boolean;
  category: string;
  viewsCount?: string;
}

export interface Bundle {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  price: number; // in INR ₹
  originalPrice: number;
  videoCount: number;
  category: 'Comedy' | 'Cute Reactions' | 'Conversations' | 'Funny Moments' | 'Trending';
  categoryBadge: string;
  formatBadge: string;
  quality: string; // e.g. "1080p 9:16 Vertical"
  thumbnail: string;
  previewVideoUrl: string;
  isPopular?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewsCount: number;
  freeDemos: VideoItem[];
  lockedVideosCount: number;
  sampleVideos: VideoItem[];
  whatsInside: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

export interface Purchase {
  id: string;
  userEmail: string;
  userName: string;
  bundleId: string;
  bundleTitle: string;
  amount: number;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  purchasedBundleIds: string[];
}

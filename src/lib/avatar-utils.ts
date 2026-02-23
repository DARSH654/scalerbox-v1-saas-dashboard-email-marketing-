/**
 * Avatar color utility - uses stored color index from Firestore
 */

// 10 beautiful, solid color combinations
const AVATAR_BG_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-cyan-500',
];

/**
 * Get avatar background color from stored index
 * For users: pass their avatarColorIndex from Firestore
 * For workspaces: pass workspace.id to generate consistent color
 */
export function getAvatarBgColor(idOrIndex: string | number | undefined): string {
  // If it's a number (stored index), use it directly
  if (typeof idOrIndex === 'number') {
    const index = idOrIndex % AVATAR_BG_COLORS.length;
    return AVATAR_BG_COLORS[index];
  }
  
  // If it's a string (workspace/entity ID), hash it
  if (idOrIndex && typeof idOrIndex === 'string') {
    let hash = 0;
    for (let i = 0; i < idOrIndex.length; i++) {
      const char = idOrIndex.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const colorIndex = Math.abs(hash) % AVATAR_BG_COLORS.length;
    return AVATAR_BG_COLORS[colorIndex];
  }
  
  // Fallback: random color
  return AVATAR_BG_COLORS[0];
}

/**
 * Get the first letter of a name in uppercase
 */
export function getAvatarInitial(name: string | undefined): string {
  if (!name || name.trim().length === 0) {
    return 'U';
  }
  return name.trim().charAt(0).toUpperCase();
}

/**
 * Get text color - ALWAYS WHITE for both light and dark mode
 */
export function getAvatarTextColor(): string {
  return 'text-white';
}

/**
 * Reputation Utility for PactFlow
 * Handles 10-tier trust badge logic and RPT calculations.
 */

export const TIERS = [
  { level: 0, minRpt: 0, label: 'Neophyte', color: '#666', description: 'Just started the journey.' },
  { level: 1, minRpt: 2, label: 'Bronze', color: '#cd7f32', description: 'First steps in the protocol.' },
  { level: 2, minRpt: 4, label: 'Silver', color: '#c0c0c0', description: 'Reliable executor/partner.' },
  { level: 3, minRpt: 8, label: 'Gold', color: '#ffd700', description: 'Proven track record.' },
  { level: 4, minRpt: 16, label: 'Platinum', color: '#e5e4e2', description: 'High-tier professional.' },
  { level: 5, minRpt: 32, label: 'Emerald', color: '#50c878', description: 'Expert node in the network.' },
  { level: 6, minRpt: 64, label: 'Sapphire', color: '#0f52ba', description: 'Elite contributor.' },
  { level: 7, minRpt: 128, label: 'Ruby', color: '#e0115f', description: 'Master of the pacts.' },
  { level: 8, minRpt: 256, label: 'Diamond', color: '#b9f2ff', description: 'Legendary status.' },
  { level: 9, minRpt: 512, label: 'Master', color: '#ff00ff', description: 'Top 1% of the protocol.' },
  { level: 10, minRpt: 1024, label: 'Grandmaster', color: '#00ffff', description: 'Stellar presence.' },
];

export const getReputationInfo = (rpt) => {
  let currentTier = TIERS[0];
  let nextTier = TIERS[1];

  for (let i = 0; i < TIERS.length; i++) {
    if (rpt >= TIERS[i].minRpt) {
      currentTier = TIERS[i];
      nextTier = TIERS[i + 1] || null;
    } else {
      break;
    }
  }

  let progress = 0;
  if (nextTier) {
    const range = nextTier.minRpt - currentTier.minRpt;
    const currentProgress = rpt - currentTier.minRpt;
    progress = (currentProgress / range) * 100;
  } else {
    progress = 100; // Max tier reached
  }

  return {
    currentTier,
    nextTier,
    progress: Math.min(100, Math.max(0, progress)),
    totalRpt: rpt
  };
};

// docs: add inline JSDoc comments to reputation utility [v3.1.0-2026-05-07]

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Zap, Star, Lock, RefreshCw, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useWallet } from '../context/WalletContext';

const NFT_CONTRACT_ID = 'CCHZEMKRQ7MJ6XZBUR5XTCF6X2G2A56ZSMKQZPTKXDPPH5CXETAPK444';
const XLM_TOKEN_ID = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';

// Genesis collection metadata — art & descriptions live client-side
const GENESIS_META = {
  // Glitched Legacy (1-24)
  1: { name: "Zero Fragment", series: "Glitched Legacy", image: "/assets/nfts/glitched/fragment_01.png", gradient: "linear-gradient(135deg, #000 0%, #333 100%)", description: "The first bit of data recovered after the Great Desync.", glowColor: "#00ff88" },
  2: { name: "Echo Logic", series: "Glitched Legacy", image: "/assets/nfts/glitched/logic_02.png", gradient: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)", description: "A recursive thought loop frozen in time.", glowColor: "#00ff88" },
  3: { name: "Corrupted Aegis", series: "Glitched Legacy", image: "/assets/nfts/glitched/aegis_03.png", gradient: "linear-gradient(135deg, #400 0%, #000 100%)", description: "A defensive sub-routine with massive data leaks.", glowColor: "#ff4444" },
  4: { name: "Static Wraith", series: "Glitched Legacy", image: "/assets/nfts/glitched/wraith_04.png", gradient: "linear-gradient(135deg, #222 0%, #000 100%)", description: "A ghostly signature that haunts the lower network layers.", glowColor: "#fff" },
  5: { name: "Bit-Rot Relic", series: "Glitched Legacy", image: "/assets/nfts/glitched/relic_05.png", gradient: "linear-gradient(135deg, #321 0%, #111 100%)", description: "An ancient storage module slowly decaying into entropy.", glowColor: "#ff9900" },
  6: { name: "Null Sector", series: "Glitched Legacy", image: "/assets/nfts/glitched/sector_06.png", gradient: "linear-gradient(135deg, #000 0%, #111 100%)", description: "A void within the data stream where nothing can exist.", glowColor: "#555" },
  7: { name: "Glitch Harbinger", series: "Glitched Legacy", image: "/assets/nfts/glitched/harbinger_07.png", gradient: "linear-gradient(135deg, #200 0%, #000 100%)", description: "A herald of the protocol's instability.", glowColor: "#ff0000" },
  8: { name: "Monochrome Mind", series: "Glitched Legacy", image: "/assets/nfts/glitched/mind_08.png", gradient: "linear-gradient(135deg, #111 0%, #eee 100%)", description: "A binary consciousness with only two states of being.", glowColor: "#888" },
  9: { name: "Entropy Key", series: "Glitched Legacy", image: "/assets/nfts/glitched/key_09.png", gradient: "linear-gradient(135deg, #002 0%, #000 100%)", description: "A key that unlocks nothing but more disorder.", glowColor: "#4444ff" },
  10: { name: "Fragmented Soul", series: "Glitched Legacy", image: "/assets/nfts/glitched/soul_10.png", gradient: "linear-gradient(135deg, #013 0%, #000 100%)", description: "A shattered AI core looking for its missing sectors.", glowColor: "#00bbff" },
  11: { name: "Signal Ghost", series: "Glitched Legacy", image: "/assets/nfts/glitched/ghost_11.png", gradient: "linear-gradient(135deg, #111 0%, #000 100%)", description: "A weak transmission from a civilization long gone.", glowColor: "#00ff88" },
  12: { name: "Data Scar", series: "Glitched Legacy", image: "/assets/nfts/glitched/scar_12.png", gradient: "linear-gradient(135deg, #300 0%, #000 100%)", description: "A permanent mark on the ledger caused by the initial crash.", glowColor: "#ff3333" },
  13: { name: "Logic Leak", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #020 0%, #000 100%)", description: "A faulty algorithm that produces unpredictable results.", glowColor: "#00ff00" },
  14: { name: "Phantom Packet", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #002 0%, #111 100%)", description: "A piece of data that travels without an origin or destination.", glowColor: "#4444ff" },
  15: { name: "Void Cipher", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #000 0%, #111 100%)", description: "An encryption method that hides data by deleting it.", glowColor: "#fff" },
  16: { name: "Glitch Weave", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #222 0%, #000 100%)", description: "A fabric of reality knitted together with broken code.", glowColor: "#aaa" },
  17: { name: "Unstable Uplink", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #123 0%, #000 100%)", description: "A connection that only works when you aren't looking.", glowColor: "#00ffff" },
  18: { name: "Bit-Stream Burn", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #310 0%, #000 100%)", description: "The physical residue left by a high-intensity data transfer.", glowColor: "#ff6600" },
  19: { name: "Recursive Nightmare", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #202 0%, #000 100%)", description: "A loop that gets tighter with every iteration.", glowColor: "#ff00ff" },
  20: { name: "Static Sentry", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #111 0%, #000 100%)", description: "A guardian that only sees the noise between the signals.", glowColor: "#888" },
  21: { name: "Fragmented Aurora", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #012 0%, #000 100%)", description: "A beautiful but broken visual phenomenon in the cloud.", glowColor: "#00ccff" },
  22: { name: "Code Fracture", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #111 0%, #000 100%)", description: "A split in the logic that allows for parallel realities.", glowColor: "#fff" },
  23: { name: "Noise Catalyst", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #111 0%, #000 100%)", description: "A spark that turns orderly data into pure static.", glowColor: "#fff" },
  24: { name: "Legacy Leak", series: "Glitched Legacy", image: "/assets/nfts/data_fragment_04.png", gradient: "linear-gradient(135deg, #111 0%, #000 100%)", description: "The final fragment of the old world's internet.", glowColor: "#fff" },

  // Whale Series (Premium)
  25: { name: "Neural Nexus", series: "Whale Series", image: "/assets/nfts/genesis/nexus.png", gradient: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)", description: "A pulsating hub of synthetic synaptic connections.", glowColor: "#00d2ff" },
  26: { name: "Quantum Sentinel", series: "Whale Series", image: "/assets/nfts/genesis/sentinel.png", gradient: "linear-gradient(135deg, #9d50bb 0%, #6e48aa 100%)", description: "A floating observer maintaining the quantum ledger.", glowColor: "#9d50bb" },
  47: { name: "Titan Core", series: "Whale Series", image: "/assets/nfts/genesis/titan_v2.png", gradient: "linear-gradient(135deg, #f5a623 0%, #f76b1c 100%)", description: "The pulsing heart of an ancient colossus.", glowColor: "#f5a623" },

  // Genesis Stable (27-46)
  27: { name: "Cybernetic Aegis", series: "Genesis Stable Series", image: "/assets/nfts/cybernetic_aegis.png", gradient: "linear-gradient(135deg, #e1eec3 0%, #f05053 100%)", description: "Reinforced shielding for high-intensity protection.", glowColor: "#f05053" },
  28: { name: "Orbital Relay", series: "Genesis Stable Series", image: "/assets/nfts/orbital_relay.png", gradient: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)", description: "High-altitude signal booster for orbital communication.", glowColor: "#4e4376" },
  29: { name: "Data Monolith", series: "Genesis Stable Series", image: "/assets/nfts/data_monolith.png", gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)", description: "An ancient storage array of pre-collapse history.", glowColor: "#ffffff" },
  30: { name: "Plasma Overdrive", series: "Genesis Stable Series", image: "/assets/nfts/plasma_overdrive.png", gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)", description: "A module that pushes hardware to its absolute limit.", glowColor: "#ff5e62" },
  31: { name: "Void Singularity", series: "Genesis Stable Series", image: "/assets/nfts/void_singularity.png", gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)", description: "Localized anomaly used for sub-atomic compression.", glowColor: "#302b63" },
  32: { name: "Neon Catalyst", series: "Genesis Stable Series", image: "/assets/nfts/neon_catalyst.png", gradient: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)", description: "Biological interface for regional data growth.", glowColor: "#93f9b9" },
  33: { name: "System Override", series: "Genesis Stable Series", image: "/assets/nfts/system_override.png", gradient: "linear-gradient(135deg, #614385 0%, #516395 100%)", description: "Tool for bypassing administrative lockouts silently.", glowColor: "#614385" },
  34: { name: "Protocol Ghost", series: "Genesis Stable Series", image: "/assets/nfts/protocol_ghost.png", gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)", description: "Untraceable telemetry signature mimicking noise.", glowColor: "#888888" },
  35: { name: "Encryption Key Alpha", series: "Genesis Stable Series", image: "/assets/nfts/encryption_key_alpha.png", gradient: "linear-gradient(135deg, #ffd89b 0%, #19033d 100%)", description: "Primary key for Tier-1 military data vaults.", glowColor: "#ffd89b" },
  36: { name: "Nano-Swarm", series: "Genesis Stable Series", image: "/assets/nfts/nano_swarm.png", gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)", description: "Distributed cloud of repair bots for maintaining physical network nodes.", glowColor: "#bdc3c7" },
  37: { name: "Holo-Map", series: "Genesis Stable Series", image: "/assets/nfts/holo_map.png", gradient: "linear-gradient(135deg, #00bf8f 0%, #001510 100%)", description: "Real-time 3D visualization of the global infrastructure.", glowColor: "#00bf8f" },
  38: { name: "Pulse Cannon", series: "Genesis Stable Series", image: "/assets/nfts/pulse_cannon.png", gradient: "linear-gradient(135deg, #c31432 0%, #240b36 100%)", description: "Energy-based deterrent for repelling brute-force intrusions.", glowColor: "#c31432" },
  39: { name: "Binary Sword", series: "Genesis Stable Series", image: "/assets/nfts/binary_sword.png", gradient: "linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)", description: "A logic-based cutting edge used to sever corrupted data streams.", glowColor: "#4ca1af" },
  40: { name: "Vector Shield", series: "Genesis Stable Series", image: "/assets/nfts/vector_shield.png", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", description: "Adaptive shielding that redirects incoming malicious packets.", glowColor: "#38ef7d" },
  41: { name: "Static Pulse", series: "Genesis Stable Series", image: "/assets/nfts/static_pulse.png", gradient: "linear-gradient(135deg, #b91d73 0%, #fdbb2d 100%)", description: "Short-range burst of interference to scramble nearby trackers.", glowColor: "#b91d73" },
  42: { name: "Copper Link", series: "Genesis Stable Series", image: "/assets/nfts/copper_link.png", gradient: "linear-gradient(135deg, #b79891 0%, #94716b 100%)", description: "Essential physical bridge for legacy analog-to-digital systems.", glowColor: "#b79891" },
  43: { name: "Basic Uplink", series: "Genesis Stable Series", image: "/assets/nfts/basic_uplink.png", gradient: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", description: "Standard networking module for low-priority communication tasks.", glowColor: "#4b6cb7" },
  44: { name: "Scrap Drone", series: "Genesis Stable Series", image: "/assets/nfts/scrap_drone.png", gradient: "linear-gradient(135deg, #5D4157 0%, #A8CABA 100%)", description: "A humble maintenance drone cobbled together from salvaged parts.", glowColor: "#A8CABA" },
  45: { name: "Rusty Cipher", series: "Genesis Stable Series", image: "/assets/nfts/rusty_cipher.png", gradient: "linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)", description: "An antiquated encryption unit that still holds its own against simple tools.", glowColor: "#DECBA4" },
  46: { name: "Patch-Work Shield", series: "Genesis Stable Series", image: "/assets/nfts/patchwork_shield.png", gradient: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)", description: "Basic defensive layer reinforced with various scavenged materials.", glowColor: "#606c88" },
};

const RARITY_COLORS = {
  MYTHIC:    { bg: 'rgba(255,0,255,0.2)', border: '#ff00ff', text: '#ff00ff', tagText: '#000', cardClass: 'mythic-card' },
  LEGENDARY: { bg: 'rgba(255,68,68,0.15)', border: '#f5a623', text: '#f5a623', tagText: '#000', cardClass: 'legendary-card' },
  ELITE:     { bg: 'rgba(0,242,255,0.15)', border: '#00f2ff', text: '#00f2ff', tagText: '#000', cardClass: 'elite-card' },
  EPIC:      { bg: 'rgba(168,85,247,0.15)', border: '#a855f7', text: '#a855f7', tagText: '#000', cardClass: 'epic-card' },
  RARE:      { bg: 'rgba(59,130,246,0.15)', border: '#3b82f6', text: '#3b82f6', tagText: '#fff' },
  UNCOMMON:  { bg: 'rgba(0,255,136,0.15)', border: '#00ff88', text: '#00ff88', tagText: '#000' },
  COMMON:    { bg: 'rgba(148,163,184,0.15)', border: '#94a3b8', text: '#cbd5e1', tagText: '#000' },
};

const getRarityByPrice = (priceStroops) => {
  const xlm = Number(priceStroops) / 10_000_000;
  if (xlm >= 100000) return 'MYTHIC';
  if (xlm >= 80000) return 'LEGENDARY';
  if (xlm >= 50000) return 'ELITE';
  if (xlm >= 25000) return 'EPIC';
  if (xlm >= 15000) return 'RARE';
  if (xlm >= 5000) return 'UNCOMMON';
  return 'COMMON';
};

export default function NFTShop({ role }) {
  const { publicKey, callContract } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null);
  const [relisting, setRelisting] = useState(null);
  const [relistPrice, setRelistPrice] = useState('');
  const [viewMode, setViewMode] = useState('market'); // 'market' | 'collection'
  const [notification, setNotification] = useState(null);

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      // Fetch total counter from contract
      const counterRes = await callContract(NFT_CONTRACT_ID, 'get_counter', [], true);
      const total = Number(counterRes?.result ?? 0);
      const fetched = [];
      // We only show IDs >= 25 (The Official v2.0 Collection)
      // IDs 1-24 are from a duplicate minting event during script failure and are considered "Legacy/Glitched"
      for (let i = 1; i <= total; i++) {
        try {
          const res = await callContract(NFT_CONTRACT_ID, 'get_nft', [{ type: 'u64', value: BigInt(i) }], true);
          if (res?.result) {
            fetched.push(res.result);
          }
        } catch (err) {
          console.warn(`NFT ID ${i} not found:`, err);
        }
      }
      // Also fetch ID 1 if it exists and show it as the "Genesis Legacy"
      // Actually, let's keep it clean. IDs 25-47 are the 23 items requested.
      setNfts(fetched);
    } catch (e) {
      console.error('Failed to fetch NFTs:', e);
      showNotif('Failed to load NFTs from chain.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNFTs(); }, []);

  const handleBuy = async (nft) => {
    if (!publicKey) return showNotif('Wallet not connected.', 'error');
    setBuying(nft.id);
    try {
      await callContract(NFT_CONTRACT_ID, 'buy', [
        publicKey,
        { type: 'u64', value: BigInt(nft.id) }
      ]);
      showNotif(`✅ "${nft.name}" is now yours!`, 'success');
      fetchNFTs();
    } catch (e) {
      showNotif(`Purchase failed: ${e.message}`, 'error');
    } finally {
      setBuying(null);
    }
  };

  const handleRelist = async (nft) => {
    if (!publicKey || !relistPrice) return;
    setRelisting(nft.id);
    try {
      const priceInStroops = BigInt(Math.floor(parseFloat(relistPrice) * 10_000_000));
      await callContract(NFT_CONTRACT_ID, 'relist', [
        publicKey,
        { type: 'u64', value: BigInt(nft.id) },
        { type: 'i128', value: priceInStroops }
      ]);
      showNotif(`✅ "${nft.name}" relisted for ${relistPrice} XLM.`, 'success');
      setRelistPrice('');
      fetchNFTs();
    } catch (e) {
      showNotif(`Relist failed: ${e.message}`, 'error');
    } finally {
      setRelisting(null);
    }
  };

  const stropToXLM = (stroops) => {
    if (stroops === undefined || stroops === null) return '0';
    return (Number(stroops) / 10_000_000).toFixed(2);
  };

  const isOwner = (nft) => {
    if (!nft.owner || !publicKey) return false;
    const owner = typeof nft.owner === 'string' ? nft.owner : nft.owner?.toString?.() ?? '';
    return owner === publicKey;
  };

  const displayNFTs = viewMode === 'collection'
    ? nfts.filter(nft => isOwner(nft))
    : nfts.filter(nft => nft.is_for_sale || nft.is_for_sale === undefined);

  return (
    <div style={{ color: '#fff' }}>
      {/* Global Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '90px', right: '30px', zIndex: 9999,
          background: notification.type === 'success' ? 'rgba(0,255,136,0.1)' : 'rgba(255,68,68,0.1)',
          border: `1px solid ${notification.type === 'success' ? '#00ff88' : '#ff4444'}`,
          color: notification.type === 'success' ? '#00ff88' : '#ff4444',
          padding: '14px 22px', fontWeight: 'bold', fontSize: '0.9rem',
          fontFamily: 'monospace', letterSpacing: '0.5px',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
          backdropFilter: 'blur(10px)', maxWidth: '400px',
        }}>
          {notification.msg}
        </div>
      )}

      <div style={{ padding: '30px 25px', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
              <ShoppingBag size={32} color="var(--primary)" />
              NFT <span style={{ color: 'var(--primary)' }}>SHOP</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '1px', margin: 0, opacity: 0.8, fontWeight: 'bold' }}>
                GENESIS COLLECTION — {displayNFTs.length} PROTOCOL ASSETS
              </p>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', 
                color: '#000', padding: '6px 16px', borderRadius: '50px', fontSize: '0.75rem', 
                fontWeight: '900', letterSpacing: '1px', boxShadow: '0 0 20px rgba(243,243,5,0.3)'
              }}>
                <AlertTriangle size={14} />
                <span>10% FEE ON EVERY TRANSACTION</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={fetchNFTs}
              title="Refresh Collection"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}
            >
              <RefreshCw size={14} />
            </button>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-ghost)', borderRadius: '4px', overflow: 'hidden' }}>
              {[['market', 'MARKET'], ['collection', 'MY COLLECTION']].map(([mode, label]) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{
                  padding: '7px 15px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', border: 'none',
                  background: viewMode === mode ? 'rgba(243,243,5,0.1)' : 'transparent',
                  color: viewMode === mode ? 'var(--primary)' : 'var(--text-dim)',
                  transition: 'all 0.2s',
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info row */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={12} color="var(--primary)" />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>All purchases route XLM directly to Protocol Treasury on-chain.</span>
        </div>

        {/* NFT Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="cyber-card" style={{ height: '420px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : displayNFTs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-dim)' }}>
            <ShoppingBag size={48} color="var(--text-dim)" style={{ marginBottom: '20px', opacity: 0.4 }} />
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {viewMode === 'collection' ? 'NO ASSETS IN YOUR COLLECTION' : 'MARKETPLACE EMPTY'}
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              {viewMode === 'collection' ? 'Purchase NFTs from the market to build your collection.' : 'All assets have been acquired. Check back later.'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {displayNFTs.map(nft => {
              const meta = GENESIS_META[Number(nft.id)] || {
                name: nft.name || "Unknown Asset",
                image: "/assets/nfts/titan_core.png", // Fallback image
                gradient: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
                description: "Official protocol asset. Metadata pending synchronization.",
                glowColor: "#ffffff"
              };
              const rarityKey = getRarityByPrice(nft.price);
              const rarity = RARITY_COLORS[rarityKey] || RARITY_COLORS.COMMON;
              const owned = isOwner(nft);
              const price = stropToXLM(nft.price);

              return (
                <div key={nft.id} 
                  style={{
                    background: 'rgba(10,10,20,0.8)', backdropFilter: 'blur(12px)',
                    border: `1px solid ${rarity.border}33`,
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
                    overflow: 'hidden', transition: 'transform 0.25s, box-shadow 0.25s',
                    boxShadow: `0 4px 30px ${meta.glowColor}22`,
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 10px 40px ${rarity.border}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 30px ${rarity.border}22`; }}
                >
                  {/* Art panel */}
                  <div style={{ height: '180px', background: meta.gradient, position: 'relative', overflow: 'hidden' }}>
                    {/* MINT ID LABEL */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                      <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1px' }}>MINT ID</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: '900', color: '#fff', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        #{String(nft.id).padStart(4, '0')}
                      </div>
                    </div>

                    {meta.image ? (
                      <img src={meta.image} alt={nft.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: meta.filter || 'none' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: meta.gradient }} />
                    )}

                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                      <span 
                        className={rarity.cardClass || ""}
                        style={{
                          padding: '3px 10px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px',
                          background: rarity.bg, border: `1px solid ${rarity.border}`, color: rarity.tagText,
                          backdropFilter: 'blur(4px)', borderRadius: '2px'
                        }}
                      >
                        {rarityKey}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                      {meta.series && (
                        <span style={{ 
                          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
                          color: '#fff', padding: '2px 8px', fontSize: '0.55rem', fontWeight: '900', 
                          letterSpacing: '1px', textTransform: 'uppercase', backdropFilter: 'blur(4px)' 
                        }}>
                          {meta.series}
                        </span>
                      )}
                      {owned ? (
                        <span style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid #00ff88', color: '#00ff88', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CheckCircle size={9} /> OWNED
                        </span>
                      ) : nft.is_for_sale ? (
                        <span style={{ background: '#00ff88', color: '#000', padding: '3px 10px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.5px' }}>
                          AVAILABLE
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid #ff4444', color: '#ff4444', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Lock size={9} /> ACQUIRED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '6px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {meta.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {meta.description}
                    </p>

                    {/* Price row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.5px', marginBottom: '1px' }}>PRICE</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '900', color: rarity.text, fontFamily: 'monospace' }}>
                          {price} <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>XLM</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.5px', marginBottom: '1px' }}>PROVENANCE</div>
                        <a 
                          href={`https://stellar.expert/explorer/testnet/tx/${meta.mintTx}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)' }}
                        >
                          TX:{meta.mintTx?.slice(0, 6)}...
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    {!owned && nft.is_for_sale && (
                      <button
                        onClick={() => handleBuy(nft)}
                        disabled={!!buying}
                        style={{
                          width: '100%', padding: '10px', fontWeight: '800', fontSize: '0.8rem',
                          letterSpacing: '1px', textTransform: 'uppercase', cursor: buying ? 'wait' : 'pointer',
                          background: buying === nft.id ? 'rgba(243,243,5,0.05)' : `${rarity.bg}`,
                          border: `1px solid ${rarity.border}`,
                          color: rarity.text, transition: 'all 0.2s',
                          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
                        }}
                        onMouseEnter={e => { if (!buying) { e.currentTarget.style.background = `${rarity.border}22`; e.currentTarget.style.color = '#fff'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = rarity.bg; e.currentTarget.style.color = rarity.text; }}
                      >
                        {buying === nft.id ? '⏳ PROCESSING...' : `BUY NOW`}
                      </button>
                    )}

                    {owned && viewMode === 'collection' && (
                      <div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <input
                            type="number"
                            placeholder="New price (XLM)"
                            value={relistPrice}
                            onChange={e => setRelistPrice(e.target.value)}
                            style={{
                              flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-ghost)',
                              color: '#fff', padding: '10px', fontSize: '0.85rem', fontFamily: 'monospace',
                            }}
                          />
                          <button
                            onClick={() => handleRelist(nft)}
                            disabled={!!relisting || !relistPrice}
                            style={{
                              padding: '10px 16px', background: 'rgba(255,255,255,0.05)',
                              border: '1px solid var(--border-ghost)', color: 'var(--text-dim)',
                              cursor: relisting || !relistPrice ? 'not-allowed' : 'pointer',
                              fontSize: '0.8rem', fontWeight: 'bold', whiteSpace: 'nowrap',
                            }}
                          >
                            {relisting === nft.id ? '⏳' : 'RELIST'}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                          Relisting will transfer custody back to the Smart contract.
                        </div>
                      </div>
                    )}

                    {!nft.is_for_sale && !owned && (
                      <div style={{ textAlign: 'center', padding: '12px', color: 'var(--text-dim)', fontSize: '0.82rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Lock size={14} style={{ marginRight: '6px' }} />
                        This asset has been acquired by another operator.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// docs: update README with local setup instructions [v7.7.2-2026-05-04]

// chore: update vite to latest patch version [v8.0.89-2026-05-09]

// style: fix alignment of dashboard stat cards on tablet [v5.4.42-2026-05-09]

// docs: add architecture overview to README [v5.5.63-2026-05-09]

import { useWallet } from '../context/WalletContext';

const Header = ({ onFeedbackClick, onAuthClick, onConnectClick }) => {
  const { isConnected, publicKey, balance, disconnectWallet } = useWallet();

  return (
    <nav className="glass-nav" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
      <div className="cyber-scanline" style={{ opacity: 0.3 }}></div>
      <div style={{ width: '100%', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/assets/img/pactflow.png" 
            alt="PactFlow Logo" 
            className="pactflow-logo"
            style={{ height: '40px', width: 'auto' }} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>

            <button 
              className="btn-outline" 
              onClick={() => window.open('https://stellar-network-pgt.vercel.app/', '_blank')}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              PAYMENTS
            </button>
            <button className="btn-outline" onClick={onFeedbackClick} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              FEEDBACK
            </button>
            {window.location.pathname.includes('/dashboard') ? (
              <button className="btn-luxury" onClick={() => window.location.href = '/'} style={{ padding: '8px 25px', fontSize: '0.9rem', fontWeight: 'bold', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444' }}>
                LOG OUT
              </button>
            ) : (
              <button className="btn-luxury" onClick={onAuthClick} style={{ padding: '8px 25px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                LOGIN/SIGNUP
              </button>
            )}
          </div>

          {!isConnected && (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255, 107, 0, 0.03)', padding: '4px 15px', border: '1px solid rgba(255, 107, 0, 0.2)', position: 'relative' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 'bold', letterSpacing: '1px' }}>
                STATUS: <span style={{ color: '#ff4444' }}>OFFLINE</span>
              </div>
              <button 
                onClick={onConnectClick} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--primary)', 
                  fontSize: '0.85rem', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  padding: '5px 0',
                  borderBottom: '1px solid var(--primary)'
                }}
              >
                Link Wallet
              </button>
            </div>
          )}

          {isConnected && (
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              alignItems: 'center', 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '4px 4px 4px 15px', 
              border: '1px solid rgba(255, 107, 0, 0.2)', 
              position: 'relative',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
            }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'baseline' }}>
                <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {typeof publicKey === 'string' && publicKey.length > 10 ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : '---'}
                </div>
                <div style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 'bold' }}>
                  {balance} <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>XLM</span>
                </div>
              </div>
              <button 
                onClick={disconnectWallet}
                style={{ 
                  background: '#ff4444', 
                  border: 'none', 
                  color: '#fff', 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  fontWeight: '900',
                  padding: '6px 12px',
                  clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
                  transition: 'all 0.3s',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => { e.target.style.background = '#cc0000'; e.target.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.target.style.background = '#ff4444'; e.target.style.transform = 'scale(1)'; }}
              >
                DISCONNECT
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

// test: add unit tests for reputation score calculation [v8.1.34-2026-06-07]

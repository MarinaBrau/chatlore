import { ImageResponse } from 'next/og';

export const alt = 'ChatLore — Universal AI Context Hub';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0F0A1F, #1E1B4B)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Glow */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '600px',
            height: '600px',
            background: 'rgba(139, 92, 246, 0.15)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        {/* Logo Icon */}
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C16.4183 22 20 18.4183 20 14C20 11.5 18.5 9 17 7.5V4H7V7.5C5.5 9 4 11.5 4 14C4 18.4183 7.58172 22 12 22Z"
              fill="rgba(139, 92, 246, 0.2)"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <path
              d="M9 13.5C9.5 14.5 10.5 15 12 15C13.5 15 14.5 14.5 15 13.5"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M8 4H16M10 2H14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text */}
        <div
          style={{
            fontSize: '84px',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          Chat<span style={{ color: '#8B5CF6', fontStyle: 'italic', marginLeft: '4px' }}>Lore</span>
        </div>
        
        <div
          style={{
            fontSize: '32px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '20px',
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          Sync your AI memory between ChatGPT, Claude, and Gemini.
        </div>

        {/* Footer badges */}
        <div style={{ display: 'flex', marginTop: '60px', gap: '24px' }}>
          {['ChatGPT', 'Gemini', 'Claude', 'Cursor'].map((ai) => (
            <div
              key={ai}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '8px 20px',
                borderRadius: '100px',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '18px',
                fontWeight: '500',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {ai}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

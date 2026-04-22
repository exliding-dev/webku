'use client'

import React from 'react'

/**
 * Custom Logout / Exit Button for Payload CMS Admin Sidebar.
 * Renders a prominent red "EXIT" button at the bottom of the nav.
 */
const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    // Redirect to Payload's built-in logout route
    window.location.href = '/admin/logout'
  }

  return (
    <div style={{ padding: '12px 20px 24px' }}>
      <button
        onClick={handleLogout}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#dc2626',
          color: '#ffffff',
          border: '2px solid #222',
          borderRadius: '4px',
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#b91c1c'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Keluar / Exit
      </button>
    </div>
  )
}

export default LogoutButton

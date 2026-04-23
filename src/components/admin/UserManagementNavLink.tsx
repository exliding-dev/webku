'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

const UserManagementNavLink: React.FC = () => {
  const pathname = usePathname()
  const isActive = pathname?.includes('/user-management')

  return (
    <div style={{ padding: '0 12px 4px' }}>
      <a
        href="/admin/user-management"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600,
          color: isActive ? '#ffffff' : '#a1a1aa',
          background: isActive
            ? 'linear-gradient(135deg, #1e40af, #7c3aed)'
            : 'transparent',
          border: isActive ? 'none' : '1px solid transparent',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'rgba(129, 140, 248, 0.1)'
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.2)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#a1a1aa'
            e.currentTarget.style.borderColor = 'transparent'
          }
        }}
      >
        {/* Users icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, opacity: 0.85 }}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        Manajemen User
      </a>
    </div>
  )
}

export default UserManagementNavLink

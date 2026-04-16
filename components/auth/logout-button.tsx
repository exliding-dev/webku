"use client"

import { useTransition } from "react"
import { logoutAction } from "@/lib/actions/auth.actions"

interface LogoutButtonProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={className}
      style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", padding: 0 }}
    >
      {isPending ? "Keluar..." : children ?? "Logout"}
    </button>
  )
}

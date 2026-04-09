"use client"

import { useEffect, useState } from "react"
import { VideoEditor } from "@/components/video-editor"
import { MatrixBot } from "@/components/matrix-bot"
import { AuthForm } from "@/components/auth/auth-form"

export type ModuleType = "studio" | "bot"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [activeModule, setActiveModule] = useState<ModuleType>("studio")

  useEffect(() => {
    let mounted = true

    const restoreSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (mounted && response.ok) {
          setIsAuthenticated(true)
        }
      } finally {
        if (mounted) {
          setIsCheckingAuth(false)
        }
      }
    }

    restoreSession()

    return () => {
      mounted = false
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    setIsAuthenticated(false)
    setActiveModule("studio")
  }

  const handleSwitchModule = () => {
    setActiveModule((prev) => (prev === "studio" ? "bot" : "studio"))
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f11] text-[#f0f0f5]">
        <div className="text-sm text-[#9898b0]">Đang kiểm tra phiên đăng nhập...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />
  }

  if (activeModule === "bot") {
    return (
      <MatrixBot 
        onLogout={handleLogout} 
        onSwitchModule={handleSwitchModule}
      />
    )
  }

  return (
    <VideoEditor 
      onLogout={handleLogout}
      onSwitchModule={handleSwitchModule}
    />
  )
}

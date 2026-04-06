"use client"

import { useState } from "react"
import { VideoEditor } from "@/components/video-editor"
import { MatrixBot } from "@/components/matrix-bot"
import { AuthForm } from "@/components/auth/auth-form"

export type ModuleType = "studio" | "bot"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeModule, setActiveModule] = useState<ModuleType>("studio")

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleSwitchModule = () => {
    setActiveModule((prev) => (prev === "studio" ? "bot" : "studio"))
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

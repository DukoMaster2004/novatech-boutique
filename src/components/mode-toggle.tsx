"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-lg transition-all"
          title={`Tema actual: ${theme}`}
        >
          {theme === 'light' ? (
            <div className="flex items-center justify-center">
              <Sun className="h-5 w-5 text-yellow-500 drop-shadow-lg" />
            </div>
          ) : theme === 'dark' ? (
            <div className="flex items-center justify-center">
              <Moon className="h-5 w-5 text-blue-300 drop-shadow-lg" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="relative w-5 h-5">
                <Sun className="h-5 w-5 text-yellow-500 absolute opacity-50" />
                <Moon className="h-5 w-5 text-blue-300 absolute opacity-50" />
              </div>
            </div>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-48 bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 text-white rounded-xl shadow-lg"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`hover:bg-white/10 cursor-pointer rounded-lg mx-1 my-1 px-3 py-2 flex items-center gap-3 transition-all ${
            theme === 'light' ? 'bg-yellow-500/20 border border-yellow-500/50' : ''
          }`}
        >
          <Sun className="h-4 w-4 text-yellow-500" />
          <span>☀️ Modo Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`hover:bg-white/10 cursor-pointer rounded-lg mx-1 my-1 px-3 py-2 flex items-center gap-3 transition-all ${
            theme === 'dark' ? 'bg-blue-500/20 border border-blue-500/50' : ''
          }`}
        >
          <Moon className="h-4 w-4 text-blue-300" />
          <span>🌙 Modo Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`hover:bg-white/10 cursor-pointer rounded-lg mx-1 my-1 px-3 py-2 flex items-center gap-3 transition-all ${
            theme === 'system' ? 'bg-purple-500/20 border border-purple-500/50' : ''
          }`}
        >
          <div className="h-4 w-4 rounded-full border-2 border-purple-400 flex items-center justify-center text-xs">💻</div>
          <span>💻 Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
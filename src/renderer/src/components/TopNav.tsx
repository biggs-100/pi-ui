import { Plus, Sun, Moon, PanelLeftClose, PanelLeft, Settings, X } from 'lucide-react'
import { useStore } from '../store/store'

export function TopNav(): JSX.Element {
  const harnesses = useStore((s) => s.harnesses)
  const view = useStore((s) => s.view)
  const theme = useStore((s) => s.theme)
  const zen = useStore((s) => s.zen)
  const setView = useStore((s) => s.setView)
  const toggleTheme = useStore((s) => s.toggleTheme)
  const toggleZen = useStore((s) => s.toggleZen)
  const setAddModal = useStore((s) => s.setAddModal)
  const removeHarness = useStore((s) => s.removeHarness)

  const activeId = view === 'dashboard' ? null : view.harnessId

  return (
    <header className="topnav">
      <span className="brand">Hephaestus</span>
      {/* Sidebar toggle — anchored near the left sidebar it controls */}
      {view !== 'dashboard' && (
        <button
          className="zen-toggle"
          title={zen ? 'Show sidebar' : 'Hide sidebar'}
          onClick={toggleZen}
        >
          {zen ? <PanelLeft size={17} /> : <PanelLeftClose size={17} />}
        </button>
      )}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${view === 'dashboard' ? 'active' : ''}`}
          onClick={() => setView('dashboard')}
        >
          Dashboard
        </button>
        {harnesses.map((h) => (
          <button
            key={h.id}
            className={`nav-tab ${activeId === h.id ? 'active' : ''}`}
            onClick={() => setView({ harnessId: h.id })}
            onAuxClick={(e) => {
              // Middle-click to close
              if (e.button === 1) {
                e.preventDefault()
                void removeHarness(h.id)
              }
            }}
          >
            {h.label}
            <span
              className="tab-close"
              title="Remove harness"
              onClick={(e) => {
                e.stopPropagation()
                void removeHarness(h.id)
              }}
            >
              <X size={12} />
            </span>
          </button>
        ))}
        <button className="nav-add" title="Register harness" onClick={() => setAddModal(true)}>
          <Plus size={16} />
        </button>
      </nav>
      <div className="nav-right">
        <button className="icon-btn" title="Toggle theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="icon-btn" title="Settings" onClick={() => useStore.getState().setSettingsModalOpen(true)}>
          <Settings size={17} />
        </button>
      </div>
    </header>
  )
}

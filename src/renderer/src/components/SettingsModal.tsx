import { X } from 'lucide-react'
import { useStore } from '../store/store'

export function SettingsModal(): JSX.Element | null {
  const open = useStore((s) => s.settingsModalOpen)
  const setOpen = useStore((s) => s.setSettingsModalOpen)
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)
  const messageSpacing = useStore((s) => s.messageSpacing)
  const showThinking = useStore((s) => s.showThinking)
  const showTools = useStore((s) => s.showTools)
  const showToolResults = useStore((s) => s.showToolResults)
  const autoAttachFile = useStore((s) => s.autoAttachFile)
  const reduceMotion = useStore((s) => s.reduceMotion)
  const updateSettings = useStore((s) => s.updateSettings)

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={() => setOpen(false)}>
      <div className="modal settings-modal" onClick={(e) => e.stopPropagation()}>
        <header className="settings-head">
          <h3>Configuración</h3>
          <button className="icon-btn" title="Cerrar" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </header>

        <div className="settings-body">
          <section className="settings-group">
            <div className="settings-group-title">Apariencia</div>

            <SettingRow label="Tema">
              <Segmented
                value={theme}
                onChange={(v) => setTheme(v as 'dark' | 'light')}
                options={[
                  { value: 'dark', label: 'Oscuro' },
                  { value: 'light', label: 'Claro' }
                ]}
              />
            </SettingRow>

            <SettingRow label="Espaciado de mensajes">
              <select
                value={messageSpacing}
                onChange={(e) => updateSettings({ messageSpacing: e.target.value as 'compact' | 'cozy' | 'comfortable' })}
              >
                <option value="compact">Compacto</option>
                <option value="cozy">Cómodo</option>
                <option value="comfortable">Espacioso</option>
              </select>
            </SettingRow>

            <SettingRow label="Reducir animación" desc="Detener la animación del martillo de forja">
              <Toggle on={reduceMotion} onChange={(v) => updateSettings({ reduceMotion: v })} />
            </SettingRow>
          </section>

          <section className="settings-group">
            <div className="settings-group-title">Conversación</div>

            <SettingRow label="Mostrar pensamiento del modelo" desc="Razonamiento mostrado en un carril colapsable">
              <Toggle on={showThinking} onChange={(v) => updateSettings({ showThinking: v })} />
            </SettingRow>

            <SettingRow label="Mostrar invocaciones de herramientas" desc="Invocaciones de Bash, Lectura/Escritura y otras herramientas">
              <Toggle on={showTools} onChange={(v) => updateSettings({ showTools: v })} />
            </SettingRow>

            <SettingRow label="Mostrar resultados de herramientas" desc="Salida devuelta por cada herramienta">
              <Toggle on={showToolResults} onChange={(v) => updateSettings({ showToolResults: v })} />
            </SettingRow>
          </section>

          <section className="settings-group">
            <div className="settings-group-title">Comportamiento</div>

            <SettingRow
              label="Adjuntar archivo visto automáticamente"
              desc="Referenciar el archivo abierto en nuevos mensajes por defecto"
            >
              <Toggle on={autoAttachFile} onChange={(v) => updateSettings({ autoAttachFile: v })} />
            </SettingRow>
          </section>
        </div>

        <div className="modal-actions">
          <button className="btn primary" onClick={() => setOpen(false)}>
            Listo
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingRow({
  label,
  desc,
  children
}: {
  label: string
  desc?: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className="set-row">
      <div className="set-label">
        <span>{label}</span>
        {desc && <span className="set-desc">{desc}</span>}
      </div>
      <div className="set-control">{children}</div>
    </div>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }): JSX.Element {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`switch ${on ? 'on' : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className="knob" />
    </button>
  )
}

function Segmented({
  value,
  options,
  onChange
}: {
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}): JSX.Element {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={value === o.value ? 'active' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

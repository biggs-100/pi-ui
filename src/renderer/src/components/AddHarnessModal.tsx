import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/store'
import type { HarnessPresetStatus } from '@shared/types'

export function AddHarnessModal(): JSX.Element {
  const setAddModal = useStore((s) => s.setAddModal)
  const addHarness = useStore((s) => s.addHarness)
  const presets = useStore((s) => s.harnessPresets)
  const loadPresets = useStore((s) => s.loadHarnessPresets)
  const [label, setLabel] = useState('')
  const [agentDir, setAgentDir] = useState('')
  const [busy, setBusy] = useState(false)

  // Ensure status is fresh whenever the modal opens.
  useEffect(() => {
    void loadPresets()
  }, [loadPresets])

  const submit = async () => {
    if (!label.trim() || !agentDir.trim()) return
    setBusy(true)
    try {
      await addHarness({ label: label.trim(), agentDir: agentDir.trim() })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={() => setAddModal(false)}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <h3>Añadir un Harness</h3>

        <div className="label-tech" style={{ marginBottom: 8 }}>
          Instalar
        </div>
        <div className="install-grid">
          {presets.map((p) => (
            <InstallCard key={p.preset.id} status={p} />
          ))}
        </div>

        <div className="label-tech" style={{ margin: '20px 0 8px' }}>
          Registrar existente
        </div>
        <div className="field">
          <label className="label-tech">Etiqueta</label>
          <input value={label} placeholder="ej. Investigación" onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="field">
          <label className="label-tech">Directorio del agente</label>
          <input
            value={agentDir}
            placeholder="~/.mi-harness/agent"
            onChange={(e) => setAgentDir(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void submit()}
          />
          <div className="muted" style={{ fontSize: 10.5, marginTop: 6 }}>
            Ruta a un directorio <code>agent/</code> estilo pi/forge que contenga <code>sessions/</code>.{' '}
            <code>models.json</code> es opcional (pi base usa un backend alojado/login). Los harnesses
            en tu directorio personal se detectan automáticamente al iniciar.
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={() => setAddModal(false)}>
            Cerrar
          </button>
          <button className="btn primary" disabled={busy} onClick={() => void submit()}>
            {busy ? 'Añadiendo…' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function InstallCard({ status }: { status: HarnessPresetStatus }): JSX.Element {
  const { preset, installed, registered } = status
  const installHarness = useStore((s) => s.installHarness)
  const addHarness = useStore((s) => s.addHarness)
  const log = useStore((s) => s.installLogs[preset.id])
  const logRef = useRef<HTMLPreElement>(null)
  const running = log?.status === 'running'

  // Keep the streamed log scrolled to the bottom.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [log?.lines.length])

  const action = (() => {
    if (!installed) return { text: 'Instalar', run: () => void installHarness(preset.id, 'install') }
    if (!registered)
      return {
        text: 'Registrar',
        run: () => void addHarness({ label: preset.label, agentDir: preset.agentDir })
      }
    return { text: 'Actualizar', run: () => void installHarness(preset.id, 'update') }
  })()

  return (
    <div className="install-card">
      <div className="install-card-head">
        <h4>{preset.label}</h4>
        {installed && registered && <span className="install-badge">Instalado ✓</span>}
        {installed && !registered && <span className="install-badge muted-badge">En disco</span>}
      </div>
      <p className="muted" style={{ fontSize: 11, margin: '4px 0 8px' }}>
        {preset.description}
      </p>
      <div className="chip-row">
        {preset.prerequisites.map((req) => (
          <span className="chip" key={req}>
            {req}
          </span>
        ))}
      </div>
      <code className="install-cmd" title="Comando que se ejecutará">
        {action.text === 'Update' ? preset.updateCommand : preset.installCommand}
      </code>
      <button className="btn primary install-btn" disabled={running} onClick={action.run}>
        {running ? 'Ejecutando…' : action.text}
      </button>
      {log && log.lines.length > 0 && (
        <pre ref={logRef} className={`install-log ${log.status}`}>
          {log.lines.join('\n')}
        </pre>
      )}
    </div>
  )
}

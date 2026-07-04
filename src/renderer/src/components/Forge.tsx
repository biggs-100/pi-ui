import { useEffect, useRef, useState } from 'react'
import { Send, Square, Flame, Paperclip, X, Info, AlertTriangle, XCircle } from 'lucide-react'
import {
  useStore,
  selectCurrentRun,
  isWorking,
  promptsForRun,
  type PendingPrompt,
  type Notice
} from '../store/store'
import { MarkdownView } from './MarkdownView'
import { ForgeAnvil } from './ForgeAnvil'
import { BallPeenHammer } from './BallPeenHammer'
import type { ThreadMessage } from '@shared/types'

export function Forge(): JSX.Element {
  const session = useStore((s) => s.session)
  const loading = useStore((s) => s.loadingSession)
  const run = useStore(selectCurrentRun)
  const selectedSessionPath = useStore((s) => s.selectedSessionPath)
  const selectedCwd = useStore((s) => s.selectedCwd)
  const messageSpacing = useStore((s) => s.messageSpacing)
  const pendingPrompts = useStore((s) => s.pendingPrompts)
  const notices = useStore((s) => s.notices)
  const bottomRef = useRef<HTMLDivElement>(null)

  const prompts = promptsForRun(pendingPrompts, run?.runId)
  const streamingText = run?.text ?? ''
  const streamingThinking = run?.thinking ?? ''
  const working = !!run && isWorking(run.status)
  // The turn has finished streaming but the authoritative session hasn't swapped
  // in yet — keep the text on screen as a settled assistant bubble (no hammer).
  const settling = !!run && run.status === 'finalizing' && !!(streamingText || streamingThinking)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [
    session?.messages.length,
    streamingText,
    streamingThinking,
    working,
    settling,
    prompts.length,
    notices.length
  ])

  // Nothing selected at all — the cold forge.
  if (!selectedSessionPath && !selectedCwd && !run) {
    return (
      <div className="pane forge">
        <div className="empty">
          <div>
            <Flame className="glyph" />
            <h2>La forja está fría</h2>
            <p>Seleccioná una conversación de un proyecto, o iniciá una nueva.</p>
          </div>
        </div>
      </div>
    )
  }

  // A project is open but nothing has been sent yet (no session, no live run) —
  // show the "ready" placeholder. Once a prompt is sent the optimistic session /
  // run appears and we fall through to the live thread below, even before the
  // session file has been written and adopted from disk.
  if (!selectedSessionPath && !session && !run) {
    return (
      <div className="pane forge">
        <div className="pane-header">
          <BallPeenHammer size={14} className="copper" />
          <span className="label-tech">Forja — Nueva Sesión</span>
        </div>
        <div className="pane-body">
          <div className="empty">
            <div>
              <Flame className="glyph" />
              <h2>Listo para forjar</h2>
              <p>Escribí un mensaje abajo para iniciar una nueva conversación en este proyecto.</p>
            </div>
          </div>
        </div>
        <Composer />
      </div>
    )
  }

  return (
    <div className="pane forge">
      <div className="pane-header">
        <BallPeenHammer size={14} className="copper" />
        <span className="label-tech">{selectedSessionPath ? 'Forja — Sesión' : 'Forja — Nueva Sesión'}</span>
      </div>
      <div className="pane-body">
        {loading && !session ? (
          <div className="empty">
            <span className="muted">Cargando sesión…</span>
          </div>
        ) : (
          <div className={`thread spacing-${messageSpacing}`}>
            {session?.messages.map((m) => (
              <Message key={m.id} m={m} />
            ))}
            {run && working && (
              <WorkingRow
                status={run.status}
                startedAt={run.startedAt}
                currentTool={run.currentTool}
                text={streamingText}
                thinking={streamingThinking}
                waiting={prompts.length > 0}
              />
            )}
            {settling && <SettledAssistant text={streamingText} thinking={streamingThinking} />}
            {prompts.map((p) => (
              <InteractivePrompt key={p.id} prompt={p} />
            ))}
            {notices.map((n) => (
              <NoticeRow key={n.id} notice={n} />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      <Composer />
    </div>
  )
}

function WorkingRow({
  status,
  startedAt,
  currentTool,
  text,
  thinking,
  waiting
}: {
  status: string
  startedAt: number
  currentTool?: string
  text: string
  thinking: string
  waiting?: boolean
}): JSX.Element {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000))
  const label = waiting
    ? 'Esperando tu respuesta'
    : status === 'finalizing'
      ? 'Finalizando'
      : currentTool
        ? `Ejecutando ${currentTool}`
        : thinking && !text
          ? 'Pensando'
          : 'Forjando'

  return (
    <div className="msg assistant working">
      <div className="avatar">
        <ForgeAnvil size={26} />
      </div>
      <div className="body">
        <div className="working-head">
          <span className="working-label">{label}…</span>
          <span className="working-elapsed">{fmtElapsed(elapsed)}</span>
        </div>
        {thinking && !text && (
          <details className="thinking" open>
            <summary>✦ pensamiento</summary>
            <div className="content">{thinking}</div>
          </details>
        )}
        {text && <MarkdownView source={text} />}
        {text && <span className="muted">▍</span>}
      </div>
    </div>
  )
}

function fmtElapsed(s: number): string {
  const m = Math.floor(s / 60)
  const r = s % 60
  return m ? `${m}m ${r}s` : `${r}s`
}

/**
 * The just-finished streamed reply, shown as a calm assistant bubble while the
 * authoritative session reload swaps in. Identical layout to a persisted
 * assistant message so the handoff is visually seamless — and it guarantees the
 * text never blinks out between "done streaming" and "reloaded".
 */
function SettledAssistant({ text, thinking }: { text: string; thinking: string }): JSX.Element {
  const showThinking = useStore((s) => s.showThinking)
  return (
    <div className="msg assistant">
      <div className="avatar">
        <BallPeenHammer size={16} />
      </div>
      <div className="body">
        {thinking && showThinking && !text && (
          <details className="thinking">
            <summary>✦ pensamiento</summary>
            <div className="content">{thinking}</div>
          </details>
        )}
        {text && <MarkdownView source={text} />}
      </div>
    </div>
  )
}

/**
 * A rich, inline card for an interactive prompt the harness raised mid-turn
 * (RPC extension_ui_request). Answering writes an extension_ui_response back on
 * the same channel, resuming the paused turn. Every variant offers a Cancel that
 * sends `{cancelled:true}` so the turn can always be released.
 */
function InteractivePrompt({ prompt }: { prompt: PendingPrompt }): JSX.Element {
  const answer = useStore((s) => s.answerPrompt)
  const req = prompt.request
  const cancel = (): void => void answer(prompt.id, { cancelled: true })

  // input/editor local draft (editor seeds from prefill). Hooks run for every
  // variant; only input/editor read the value.
  const [draft, setDraft] = useState(() =>
    req.method === 'editor' ? (req.prefill ?? '') : ''
  )
  const taRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 260)}px`
  }, [draft])

  return (
    <div className="msg assistant">
      <div className="avatar">
        <BallPeenHammer size={16} />
      </div>
      <div className="body">
        <div className={`prompt-card ${req.method}`}>
          <div className="prompt-title">{req.title}</div>

          {req.method === 'select' && (
            <div className="prompt-options">
              {req.options.map((opt) => (
                <button
                  key={opt}
                  className="btn"
                  onClick={() => void answer(prompt.id, { value: opt })}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {req.method === 'confirm' && req.message && (
            <div className="prompt-message">{req.message}</div>
          )}

          {req.method === 'input' && (
            <div className="field">
              <input
                autoFocus
                placeholder={req.placeholder}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    void answer(prompt.id, { value: draft })
                  }
                }}
              />
            </div>
          )}

          {req.method === 'editor' && (
            <textarea
              ref={taRef}
              className="prompt-editor"
              autoFocus
              rows={3}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          )}

          <div className="prompt-actions">
            {req.method === 'confirm' ? (
              <>
                <button
                  className="btn primary"
                  onClick={() => void answer(prompt.id, { confirmed: true })}
                >
                  Confirmar
                </button>
                <button
                  className="btn"
                  onClick={() => void answer(prompt.id, { confirmed: false })}
                >
                  Rechazar
                </button>
              </>
            ) : req.method === 'input' || req.method === 'editor' ? (
              <>
                <button
                  className="btn primary"
                  onClick={() => void answer(prompt.id, { value: draft })}
                >
                  Enviar
                </button>
                <button className="btn ghost" onClick={cancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn ghost" onClick={cancel}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** A transient, auto-dismissing notice from the harness (`notify`). */
function NoticeRow({ notice }: { notice: Notice }): JSX.Element {
  const dismiss = useStore((s) => s.dismissNotice)
  useEffect(() => {
    const t = setTimeout(() => dismiss(notice.id), 8000)
    return () => clearTimeout(t)
  }, [notice.id, dismiss])
  const Icon = notice.kind === 'error' ? XCircle : notice.kind === 'warning' ? AlertTriangle : Info
  return (
    <div className={`notice ${notice.kind}`}>
      <Icon size={14} />
      <span className="notice-msg">{notice.message}</span>
      <button className="notice-close" title="Descartar" onClick={() => dismiss(notice.id)}>
        <X size={12} />
      </button>
    </div>
  )
}

function Message({ m }: { m: ThreadMessage }): JSX.Element | null {
  const showThinking = useStore((s) => s.showThinking)
  const showTools = useStore((s) => s.showTools)
  const showToolResults = useStore((s) => s.showToolResults)

  if (m.role === 'user') {
    return (
      <div className="msg user">
        <div className="bubble">
          {m.text}
          {m.attachedFile && (
            <div className="attach-chip" title={m.attachedFile}>
              <Paperclip size={11} />
              {basename(m.attachedFile)}
            </div>
          )}
        </div>
      </div>
    )
  }
  if (m.role === 'system') {
    return (
      <div className="msg assistant">
        <div className="body copper" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          {m.text}
        </div>
      </div>
    )
  }
  if (m.role === 'toolResult') {
    if (!showToolResults) return null
    return (
      <details className={`toolblock ${m.toolResult?.isError ? 'err' : ''}`}>
        <summary>
          ▸ resultado — {m.toolResult?.toolName ?? 'tool'} {m.toolResult?.isError ? '(error)' : ''}
        </summary>
        <div className="content">
          <div className="toolout">{truncate(m.toolResult?.text ?? '', 6000)}</div>
        </div>
      </details>
    )
  }
  // assistant
  const showThinkingBlock = !!m.thinking && showThinking
  const showToolBlocks = !!m.toolCalls && m.toolCalls.length > 0 && showTools
  // Nothing visible to render (e.g. a thinking/tool-only turn with those panes
  // toggled off) — skip the row entirely instead of leaving a lone avatar glyph.
  if (!m.text && !showThinkingBlock && !showToolBlocks) return null
  return (
    <div className="msg assistant">
      <div className="avatar">
        <BallPeenHammer size={16} />
      </div>
      <div className="body">
        {showThinkingBlock && (
          <details className="thinking">
            <summary>✦ pensamiento</summary>
            <div className="content">{m.thinking}</div>
          </details>
        )}
        {m.text && <MarkdownView source={m.text} />}
        {showToolBlocks &&
          m.toolCalls!.map((tc) => (
            <details className="toolblock" key={tc.id}>
              <summary>⚙ {tc.name}</summary>
              <div className="content">
                <div className="toolargs">{formatArgs(tc.arguments)}</div>
              </div>
            </details>
          ))}
        <MsgStats m={m} />
      </div>
    </div>
  )
}

/** Compact per-response stats line: output tokens, throughput, model. */
function MsgStats({ m }: { m: ThreadMessage }): JSX.Element | null {
  const parts: string[] = []
  if (m.outputTokens) parts.push(`${fmtTok(m.outputTokens)} salida`)
  if (m.tps) parts.push(`${m.tps >= 100 ? Math.round(m.tps) : m.tps.toFixed(1)} tok/s`)
  if (m.usage?.cacheRead) parts.push(`${fmtTok(m.usage.cacheRead)} en caché`)
  if (m.model) parts.push(m.model)
  if (parts.length === 0) return null
  return <div className="msg-stats">{parts.join('  ·  ')}</div>
}

function fmtTok(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

const COMPOSER_MAX_H = 160

function Composer(): JSX.Element {
  const [text, setText] = useState('')
  const sendPrompt = useStore((s) => s.sendPrompt)
  const abort = useStore((s) => s.abort)
  const run = useStore(selectCurrentRun)
  const harnesses = useStore((s) => s.harnesses)
  const view = useStore((s) => s.view)
  const selectedCwd = useStore((s) => s.selectedCwd)
  const selectedFile = useStore((s) => s.selectedFile)
  const attachViewedFile = useStore((s) => s.attachViewedFile)
  const setAttachViewedFile = useStore((s) => s.setAttachViewedFile)
  const taRef = useRef<HTMLTextAreaElement>(null)

  const harnessId = view === 'dashboard' ? null : view.harnessId
  const harness = harnesses.find((h) => h.id === harnessId)
  const canSend = !!harness?.cli && !!selectedCwd
  const showAttach = canSend && !!selectedFile

  // Grow the textarea to fit its content (up to a cap, then scroll) so typed
  // lines are never clipped at the top of the box.
  useEffect(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, COMPOSER_MAX_H)}px`
  }, [text])

  const submit = () => {
    const t = text.trim()
    if (!t || !canSend) return
    void sendPrompt(t)
    setText('')
  }

  const running = !!run && isWorking(run.status)

  return (
    <div className="composer">
      {showAttach && (
        <div className={`attach-bar ${attachViewedFile ? 'on' : 'off'}`}>
          <Paperclip size={12} />
          {attachViewedFile ? (
            <>
              <span>
                Haciendo referencia a <span className="copper">{basename(selectedFile as string)}</span> — el
                agente sabrá que te referís a este archivo
              </span>
              <button className="attach-toggle" title="No adjuntar" onClick={() => setAttachViewedFile(false)}>
                <X size={12} />
              </button>
            </>
          ) : (
            <>
              <span className="muted">{basename(selectedFile as string)} no adjunto</span>
              <button className="attach-toggle" onClick={() => setAttachViewedFile(true)}>
                adjuntar
              </button>
            </>
          )}
        </div>
      )}
      <div className="box">
        <textarea
          ref={taRef}
          rows={1}
          placeholder={canSend ? 'Encendé la forja…' : 'Solo vista — no hay lanzador RPC para este harness'}
          value={text}
          disabled={!canSend}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
        />
        {running ? (
          <button className="send-btn" title="Detener" onClick={() => void abort()}>
            <Square size={15} />
          </button>
        ) : (
          <button className="send-btn" title="Enviar" disabled={!canSend || !text.trim()} onClick={submit}>
            <Send size={16} />
          </button>
        )}
      </div>
      {!canSend && selectedCwd && (
        <div className="note">
          Este harness no tiene un lanzador CLI resuelto, por lo que los mensajes están deshabilitados. La navegación y el seguimiento aún funcionan.
        </div>
      )}
    </div>
  )
}

function formatArgs(args: unknown): string {
  if (args && typeof args === 'object' && 'command' in args) {
    return String((args as { command: unknown }).command)
  }
  try {
    return JSON.stringify(args, null, 2)
  } catch {
    return String(args)
  }
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + `\n… (${s.length - n} caracteres más)` : s
}

function basename(p: string): string {
  return p.split('/').pop() ?? p
}

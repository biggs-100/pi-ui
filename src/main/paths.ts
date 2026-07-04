import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Extra directories where harness launchers commonly live but which a
 * GUI-launched Electron app may not inherit on PATH (it doesn't see the user's
 * login-shell PATH). Notably `~/.hermes/node/bin` holds the globally-installed
 * `pi` CLI. Shared by the spawn env (`augmentedPath`) and CLI resolution
 * (`whichInPath`) so there is one source of truth.
 */
export function extraBinDirs(): string[] {
  const bins = ['/usr/local/bin', '/opt/homebrew/bin', `${process.env.HOME}/.hermes/node/bin`]
  // Windows: add npm global and pip scripts dirs
  if (process.platform === 'win32') {
    bins.push(
      `${process.env.USERPROFILE}\\AppData\\Roaming\\npm`,
      `${process.env.USERPROFILE}\\AppData\\Roaming\\Python\\Scripts`,
      `${process.env.LOCALAPPDATA}\\pip\\Scripts`
    )
  }
  return bins
}

/** Ensure common node/launcher install locations are on PATH for spawned processes. */
export function augmentedPath(current: string | undefined): string {
  const sep = path.delimiter
  const parts = (current ?? '').split(sep).filter(Boolean)
  for (const p of extraBinDirs()) if (!parts.includes(p)) parts.push(p)
  return parts.join(sep)
}

/**
 * `which`-style lookup of an executable by name across the augmented PATH.
 * Returns the absolute path to the first executable match, or null.
 */
/**
 * Try resolving a file path, appending common Windows extensions if the bare
 * name doesn't exist as-is.
 */
async function tryResolve(base: string, name: string): Promise<string | null> {
  const full = path.join(base, name)
  try {
    const st = await fs.stat(full)
    if (st.isFile()) return full
  } catch {
    // not found — fall through
  }
  // Windows: try with common extensions
  if (process.platform === 'win32') {
    for (const ext of ['.cmd', '.bat', '.exe', '.ps1']) {
      const withExt = full + ext
      try {
        const st = await fs.stat(withExt)
        if (st.isFile()) return withExt
      } catch { /* keep looking */ }
    }
  }
  return null
}

export async function whichInPath(name: string): Promise<string | null> {
  const sep = path.delimiter
  const dirs = augmentedPath(process.env.PATH).split(sep).filter(Boolean)
  for (const dir of dirs) {
    const resolved = await tryResolve(dir, name)
    if (!resolved) continue
    if (process.platform === 'win32') return resolved
    // Unix: verify executable bit
    try {
      const st = await fs.stat(resolved)
      if ((st.mode & 0o100) !== 0) return resolved
    } catch { /* not executable; keep looking */ }
  }
  return null
}

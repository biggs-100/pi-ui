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
export async function whichInPath(name: string): Promise<string | null> {
  const sep = path.delimiter
  const dirs = augmentedPath(process.env.PATH).split(sep).filter(Boolean)
  for (const dir of dirs) {
    const full = path.join(dir, name)
    try {
      const st = await fs.stat(full)
      if (st.isFile()) {
        // Windows: no real executable bit; trust the file exists + has a known extension
        if (process.platform === 'win32') return full
        if ((st.mode & 0o100) !== 0) return full
      }
    } catch {
      // not here; keep looking
    }
  }
  return null
}

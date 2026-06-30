// Helpers for the "currently-viewed file" context feature.
//
// When the user sends a prompt while a file is open in the preview pane, we wrap
// their message with a small directive block naming that file, so the agent can
// resolve references like "this file" / "the second section" without being told
// the path. The block is prepended to the message we SEND to the harness; the UI
// strips it back out (via parseViewingContext) so the chat bubble shows only the
// human text plus an attachment chip. Because the harness persists the wrapped
// message to the session JSONL, the parser must round-trip the same format.

export const VIEWING_CONTEXT_TAG = 'viewing-context'

/** Wrap a user message with a directive naming the file they're viewing. */
export function wrapWithViewingContext(text: string, filePath: string): string {
  const directive =
    `The user is currently viewing this file in the Hephaestus preview pane:\n${filePath}\n` +
    `If they refer to "this file", "this", "here", "above", or mention a section, symbol, ` +
    `function, or name without specifying a file, assume they mean this file and read it ` +
    `with your tools as needed.`
  return `<${VIEWING_CONTEXT_TAG} file="${filePath}">\n${directive}\n</${VIEWING_CONTEXT_TAG}>\n\n${text}`
}

const RE = new RegExp(`^<${VIEWING_CONTEXT_TAG} file="([^"]*)">[\\s\\S]*?</${VIEWING_CONTEXT_TAG}>\\n*`)

/**
 * Strip a leading viewing-context block, returning the attached file path (if
 * any) and the remaining human text. Safe to call on any user message.
 */
export function parseViewingContext(raw: string): { file?: string; text: string } {
  const m = raw.match(RE)
  if (!m) return { text: raw }
  return { file: m[1], text: raw.slice(m[0].length) }
}

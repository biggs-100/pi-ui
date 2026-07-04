# Propuesta: Españolizar Forge (chat)

## Intención

Traducir todos los strings visibles al usuario en el componente `Forge.tsx` (panel de chat principal) al español neutro profesional.

## Alcance

### In Scope
- Empty states: "The forge is cold", "Ready to forge", "Loading session…"
- Working labels: "Waiting for you", "Thinking", "Forging", "Finishing", "Running X"
- Botones de prompt: "Confirm", "Decline", "Submit", "Cancel", "Stop", "Send"
- Placeholder del compositor: "Fire up the forge…"
- Barra de archivo adjunto: "Referencing…", "not attached", "attach"
- Nota de harness sin CLI
- Labels de stats: "out", "cached", separadores
- "✦ thinking" → "✦ pensamiento"
- "▸ result" → "▸ resultado"
- Tooltip "Dismiss" → "Descartar"

### Out of Scope
- Inspector.tsx, Projects.tsx (siguiente cambio)
- SettingsModal, AddHarnessModal (siguiente cambio)
- Comentarios de código (cambio final)

## Enfoque

Edición directa de strings JSX literales en `Forge.tsx`. Sin cambios de lógica ni estructura.

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `src/renderer/src/components/Forge.tsx` | ~25-30 strings traducidos |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Error en string JSX | Baja | Typecheck + revisión visual |

## Plan de Rollback

`git checkout -- src/renderer/src/components/Forge.tsx`

## Criterios de Éxito

- [ ] `npm run typecheck` pasa sin errores
- [ ] Todos los strings visibles están en español neutro

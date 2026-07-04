# Tasks: Españolizar Forge (chat)

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: single-pr
400-line budget risk: Low

| Field | Value |
|-------|-------|
| Líneas estimadas cambiadas | ~120 |
| Riesgo de presupuesto (800 líneas) | Bajo |
| PRs encadenados recomendados | No |
| División sugerida | PR único |

## Fase 1: Empty states y placeholders

- [x] 1.1 "The forge is cold" → "La forja está fría"
- [x] 1.2 "Select a conversation…" → "Seleccioná una conversación…"
- [x] 1.3 "Ready to forge" → "Listo para forjar"
- [x] 1.4 "Type a prompt below…" → "Escribí un mensaje abajo…"
- [x] 1.5 "Loading session…" → "Cargando sesión…"
- [x] 1.6 "Forge — Session" / "Forge — New Session" → "Forja — Sesión" / "Forja — Nueva Sesión"

## Fase 2: Working labels

- [x] 2.1 "Waiting for you" → "Esperando tu respuesta"
- [x] 2.2 "Finishing" → "Finalizando"
- [x] 2.3 "Running {tool}" → "Ejecutando {tool}"
- [x] 2.4 "Thinking" → "Pensando"
- [x] 2.5 "Forging" → "Forjando"
- [x] 2.6 "✦ thinking" → "✦ pensamiento" (x3 apariciones)

## Fase 3: Botones de prompt y notificaciones

- [x] 3.1 "Confirm" → "Confirmar"
- [x] 3.2 "Decline" → "Rechazar"
- [x] 3.3 "Submit" → "Enviar"
- [x] 3.4 "Cancel" → "Cancelar" (x3 apariciones)
- [x] 3.5 title="Dismiss" → title="Descartar"

## Fase 4: Tool results y stats

- [x] 4.1 "▸ result" → "▸ resultado"
- [x] 4.2 "{n} out" → "{n} salida"
- [x] 4.3 "{n} cached" → "{n} en caché"

## Fase 5: Composer (input y attach)

- [x] 5.1 "Fire up the forge…" → "Encendé la forja…"
- [x] 5.2 "Viewing only — no RPC launcher…" → "Solo vista — no hay lanzador RPC…"
- [x] 5.3 "Referencing {file} — the agent will know…" → "Haciendo referencia a {file} — el agente sabrá…"
- [x] 5.4 title="Don't attach" → title="No adjuntar"
- [x] 5.5 "{file} not attached" → "{file} no adjunto"
- [x] 5.6 "attach" → "adjuntar"
- [x] 5.7 title="Stop" → title="Detener"
- [x] 5.8 title="Send" → title="Enviar"

## Fase 6: Notas y misc

- [x] 6.1 Nota de CLI → "Este harness no tiene un lanzador CLI resuelto…"
- [x] 6.2 "{n} more chars" → "{n} caracteres más"

## Fase 7: Verificación

- [x] 7.1 Ejecutar `npm run typecheck` — sin errores

# Tasks: Españolizar navegación del dashboard

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: single-pr
400-line budget risk: Low

| Field | Value |
|-------|-------|
| Líneas estimadas cambiadas | ~45 |
| Riesgo de presupuesto (800 líneas) | Bajo |
| PRs encadenados recomendados | No |
| División sugerida | PR único |

## Fase 1: TopNav.tsx — Tooltips y labels

- [x] 1.1 Traducir tooltip `"Show sidebar"` / `"Hide sidebar"` → `"Mostrar barra lateral"` / `"Ocultar barra lateral"` (línea 24)
- [x] 1.2 Traducir label `"Dashboard"` → `"Panel"` (línea 35)
- [x] 1.3 Traducir tooltip `"Remove harness"` → `"Eliminar harness"` (línea 53)
- [x] 1.4 Traducir tooltip `"Register harness"` → `"Registrar harness"` (línea 63)
- [x] 1.5 Traducir tooltip `"Toggle theme"` → `"Cambiar tema"` (línea 68)
- [x] 1.6 Traducir tooltip `"Settings"` → `"Configuración"` (línea 71)

## Fase 2: StatusBar.tsx — Estados y métricas

- [x] 2.1 Traducir labels de estado: `"BACKEND ONLINE"` → `"BACKEND CONECTADO"`, `"HARNESS READY"` → `"HARNESS LISTO"`, `"BACKEND OFFLINE"` → `"BACKEND DESCONECTADO"`, `"NO BACKEND"` → `"SIN BACKEND"` (líneas 31–37)
- [x] 2.2 Traducir `"HARNESSES LIVE"` → `"HARNESSES ACTIVOS"` (línea 49)
- [x] 2.3 Traducir `"RUNNING"` → `"EJECUTANDO"` (línea 54)
- [x] 2.4 Traducir `"reconnecting…"` → `"reconectando…"` (línea 56)
- [x] 2.5 Traducir `"SESSION TOTAL"` → `"TOTAL SESIÓN"` (línea 60)

## Fase 3: Dashboard.tsx — Títulos, etiquetas y botones

- [x] 3.1 Traducir título `"The Workshop"` → `"El Taller"` (línea 43)
- [x] 3.2 Traducir descripción `"Overview across {n} registered …"` → `"Resumen de {n} {harness/harnesses} registrados."` (línea 45)
- [x] 3.3 Traducir label de métrica `"projects"` → `"proyectos"` (línea 71)
- [x] 3.4 Traducir label de métrica `"sessions"` → `"sesiones"` (línea 72)
- [x] 3.5 Traducir label de métrica `"tokens"` → `"tokens"` (se mantiene, línea 73)
- [x] 3.6 Traducir label `"Recent"` → `"Reciente"` (línea 76)
- [x] 3.7 Traducir empty state `"No sessions yet."` → `"Aún no hay sesiones."` (línea 78)
- [x] 3.8 Traducir botón `"Open workspace"` → `"Abrir espacio de trabajo"` (línea 99)

## Fase 4: Verificación

- [x] 4.1 Ejecutar `npm run typecheck` — sin errores de tipo
- [x] 4.2 Ejecutar `npm run typecheck` — sin errores (build requiere electron-builder, no disponible en CLI)
- [x] 4.3 Revisión visual: tooltips, estados, títulos y botones en español neutro — OK

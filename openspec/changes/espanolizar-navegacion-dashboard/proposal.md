# Propuesta: Españolizar navegación del dashboard

## Intención

Traducir a español neutro profesional todo el texto visible al usuario en los componentes TopNav, StatusBar y Dashboard. Es el cambio 2 de 5 en la españolización del fork Hefesto, continuando la transformación de identidad del cambio 1.

## Alcance

### In scope
- TopNav.tsx: tooltips ("Show/Hide sidebar", "Remove/Register harness", "Toggle theme", "Settings") y label "Dashboard"
- StatusBar.tsx: estados ("BACKEND ONLINE/OFFLINE", "HARNESS READY", "NO BACKEND", "HARNESSES LIVE", "RUNNING", "reconnecting…"), métricas ("SESSION TOTAL")
- Dashboard.tsx: título "The Workshop", descripción "Overview across...", labels ("projects", "sessions", "tokens", "Recent"), empty state ("No sessions yet."), botón ("Open workspace")

### Out of scope
- Comentarios de código (cambio 5)
- Forge.tsx, Projects.tsx, Inspector.tsx (cambios 3 y 4)
- SettingsModal, AddHarnessModal (cambio 4)
- README, RELEASE_NOTES (ya traducidos en cambio 1)

## Capacidades

### Nuevas capacidades
Ninguna. No se introducen nuevas capacidades de sistema; solo se traduce UI existente.

### Capacidades modificadas
Ninguna. No hay cambios en requisitos a nivel de especificación. Refactorización pura de texto visible.

## Enfoque

Edición directa archivo por archivo. Reemplazo de strings literales en JSX/TSX. Sin infraestructura i18n. Traducción a español neutro profesional, sin regionalismos.

## Áreas afectadas

| Archivo | Impacto | Descripción |
|---------|---------|-------------|
| `src/renderer/src/components/TopNav.tsx` | Modificado | ~10 tooltips y labels |
| `src/renderer/src/components/StatusBar.tsx` | Modificado | ~15 estados y etiquetas |
| `src/renderer/src/components/Dashboard.tsx` | Modificado | ~20 textos de UI |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Error de tipeo en string JSX | Baja | `npm run build` de verificación |
| Traducción inconsistente con cambios 3-5 | Baja | Revisión cruzada antes de archivar |

## Plan de rollback

`git revert` del commit del cambio. Verificar con `npm run build`.

## Dependencias

Ninguna.

## Criterios de éxito

- [ ] `npm run build` compila sin errores
- [ ] TopNav.tsx: tooltips y "Dashboard" → "Panel" en español
- [ ] StatusBar.tsx: todos los indicadores de estado en español
- [ ] Dashboard.tsx: título, métricas, empty state y botón en español

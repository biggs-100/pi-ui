# Tasks: Españolizar identidad del proyecto

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~120 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | force-chained |
| Chain strategy | single-pr |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: single-pr
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Traducir metadatos, UI y documentación a español | PR único | Los 6 archivos son independientes pero tienen el mismo objetivo; un solo PR es suficiente (~120 líneas) |

## Fase 1: Metadatos de empaquetado

- [x] 1.1 Editar `package.json` — cambiar `name` a `"hefesto"`, `productName` a `"Hefesto"`, `appId` a `"com.ellianeorwyn.hefesto"`, `description` a español neutro
- [x] 1.2 Editar `openspec/config.yaml` — traducir `context` description a español (ya está mayormente en español, verificar coherencia)

## Fase 2: Identidad en UI

- [x] 2.1 Editar `src/renderer/index.html` — cambiar `lang="en"` a `lang="es"`, `<title>Hephaestus</title>` a `<title>Hefesto</title>`
- [x] 2.2 Editar `src/renderer/src/components/TopNav.tsx` — cambiar `<span className="brand">Hephaestus</span>` a `<span className="brand">Hefesto</span>`

## Fase 3: Documentación fundacional

- [x] 3.1 Traducir `README.md` completo a español neutro profesional — preservar estructura, enlaces, secciones, autor, licencia
- [x] 3.2 Traducir `RELEASE_NOTES_0.1.0.md` completo a español neutro profesional — preservar mismos encabezados y estructura

## Fase 4: Verificación

- [x] 4.1 Ejecutar `npm run typecheck` — verificar que no hay errores de tipos tras los cambios
- [x] 4.2 Verificar que los archivos traducidos estén completos y consistentes (URLs preservadas, sin "Hephaestus" fuera de URLs, package.json refleja hefesto/Hefesto/nuevo appId, lang="es" en index.html)
- [x] 4.3 Marcar tareas como completadas en tasks.md

# Propuesta: Españolizar identidad del proyecto

## Intención

Establecer la identidad raíz del fork españolizado de Hephaestus. El proyecto pasa a llamarse "Hefesto" y toda la documentación fundacional (README, release notes, metadatos de empaquetado) se traduce a español neutro profesional. Este cambio sienta la base para los 4 cambios siguientes de UI, tooltips, comentarios y naming.

## Alcance

### In scope
- `package.json` — name, productName, appId, description
- `index.html` — lang="es", title "Hefesto"
- `TopNav.tsx` — marca "Hefesto" en navegación
- `README.md` — traducción completa
- `RELEASE_NOTES_0.1.0.md` — traducción completa
- `openspec/config.yaml` — descripción en español

### Out of scope
- Labels y tooltips de otros componentes (TopNav, StatusBar, Dashboard, etc.)
- Comentarios de código fuente
- Comentarios de CSS
- Renombre de variables, funciones o tipos

## Capacidades

### Nuevas capacidades
Ninguna. Este cambio no introduce nuevas capacidades de sistema; solo transforma identidad y documentación existente.

### Capacidades modificadas
Ninguna. No hay cambios en requisitos a nivel de especificación.

## Enfoque

Edición directa archivo por archivo. Sin i18n ni infraestructura nueva. Se preservan estructura, autor, licencia y metadatos existentes. Traducción a español neutro profesional, sin regionalismos.

## Áreas afectadas

| Archivo | Impacto | Descripción |
|---------|---------|-------------|
| `package.json` | Modificado | name, productName, appId, description |
| `src/renderer/index.html` | Modificado | lang, title |
| `src/renderer/src/components/TopNav.tsx` | Modificado | Marca "Hefesto" |
| `README.md` | Modificado | Traducción completa |
| `RELEASE_NOTES_0.1.0.md` | Modificado | Traducción completa |
| `openspec/config.yaml` | Modificado | Descripción en español |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Ruptura del build por cambios en package.json | Baja | `npm run build` de verificación |
| Error de tipeo en appId afecta firmas | Baja | Verificar appId manualmente |
| README traducido pierde enlaces | Baja | Verificar enlaces después de traducción |

## Plan de rollback

`git revert` del commit del cambio. Si hay commits intermedios, revertir en orden inverso. Verificar con `npm run build` y `npm run typecheck`.

## Dependencias

Ninguna.

## Criterios de éxito

- [ ] `npm run build` compila sin errores
- [ ] `npm run typecheck` pasa sin errores
- [ ] `package.json` refleja "hefesto" / "Hefesto" / nuevo appId
- [ ] `index.html` tiene `lang="es"` y `<title>Hefesto</title>`
- [ ] `TopNav.tsx` muestra "Hefesto" como marca
- [ ] `README.md` completo en español
- [ ] `RELEASE_NOTES_0.1.0.md` completo en español

# Propuesta: Españolizar Projects + Inspector

## Intención

Traducir todos los strings visibles en los componentes Projects (barra lateral de proyectos) e Inspector (explorador de archivos y vista previa).

## Alcance

**Projects.tsx:** "Proyectos", "Añadir carpeta de proyecto", "Seleccionar/Cancelar selección", "Soltá la carpeta…", tooltips de acciones, "Archivo", "Harness Activo", "Archivar", etc.

**Inspector.tsx:** "Archivos", "Acoplar panel abajo/derecha", "Actualizar archivos", "Ningún proyecto seleccionado", "Vista previa", "Seleccioná un archivo…", "Archivo binario…", "Archivo truncado…"

## Enfoque

Edición directa de strings JSX.

## Archivos

| Archivo | ~strings |
|---------|---------|
| `Projects.tsx` | ~14 |
| `Inspector.tsx` | ~9 |

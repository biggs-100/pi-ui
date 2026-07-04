# Hefesto

Hefesto es una interfaz gráfica de escritorio para gestionar y monitorear agentes LLM locales a través de múltiples entornos pi-harness. En lugar de interactuar con tus agentes únicamente desde la línea de comandos o archivos de log, Hefesto lee tu estructura de trabajo existente y proporciona una interfaz centralizada para la interacción con agentes y la supervisión de procesos.

![Dashboard de Hefesto](assets/screenshot.png)

Está construido para integrarse de forma nativa con [Ellian-Eorwyn/pi-forge](https://github.com/Ellian-Eorwyn/pi-forge), pero es completamente agnóstico y puede utilizarse con cualquier configuración personalizada de pi-harness.

## Funcionalidades

- **Gestión centralizada de agentes:** Visualiza todos los agentes activos, monitorea sus procesos en curso y sigue su estado desde un único panel.
- **Visor de archivos en vivo:** Visualiza y monitorea al instante la salida de logs, configuraciones y archivos de trabajo de los agentes en tiempo real.
- **Espacios de trabajo por arrastrar y soltar:** Arrastra cualquier carpeta directamente desde el Finder o Explorer al panel de proyectos para comenzar a conversar con un modelo de IA sobre su contenido y transformar tus archivos y datos.
- **Integración directa con harness:** Funciona directamente con tu sistema de archivos. Lee tus configuraciones de harness existentes y datos de agentes sin necesidad de una base de datos o archivo de configuración separado.
- **Agnóstico de harness:** Soporte nativo para `pi-forge`, con la flexibilidad de conectarse a cualquier instalación personalizada de pi-harness.
- **Multiplataforma:** Disponible para Windows, macOS y Linux.

## Instalación

Puedes descargar los binarios precompilados directamente desde la [página de Releases](https://github.com/Ellian-Eorwyn/Hephaestus/releases).

- **Windows:** Descarga el instalador `.exe`.
- **macOS:** Descarga el archivo `.dmg`.
- **Linux:** Descarga el `.AppImage`.

Simplemente descarga el archivo correspondiente a tu sistema operativo y ejecútalo para instalar Hefesto.

## Configuración y uso

La configuración es completamente zero-config:

1. **Instala** Hefesto usando el comando correspondiente a tu sistema operativo.
2. **Ejecuta** la aplicación.
3. **Apunta** a tu carpeta de agentes pi existente.

Hefesto analizará automáticamente la estructura del harness y poblará la interfaz con tus agentes y sus datos.

# FabLab Explorer — paquete integrado de simulación 3D

## Arranque

1. Instala Node.js LTS.
2. En esta carpeta, ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre la URL local que indique Vite.

## Qué cambió

- Los 11 GLB están en `public/models/` y se seleccionan con el ID de máquina.
- `src/components/MachineScene.tsx` carga la geometría real del archivo GLB en lugar de dibujar únicamente cajas esquemáticas.
- La cámara encuadra cada ensamblaje; se incluye órbita, iluminación, sombras y modos sólido, wireframe y transparente.
- Los JSON BOM e índice están en `public/model-data/`.
- `MODEL_ASSETS_AND_LIMITS.md` registra dimensiones calculadas de los archivos, fuentes externas y límites de fidelidad.

## Importante para la integración final

Los modelos que se han integrado son GLB paramétricos de referencia ya disponibles en el proyecto. Se ven como ensamblajes con muchas mallas, pero no son modelos CAD de fabricante verificados. Las dimensiones que se reportan son los límites de la geometría generada, no medidas oficiales. Para afirmar “exactamente como los planos” hay que escoger una revisión y un fabricante por máquina, descargar sus archivos CAD y planos, verificar licencia, escala, unidades, BOM y revisión, y sustituir los GLB de referencia por conversiones de esos archivos fuente.

La sesión de trabajo no pudo descargar los binarios externos de GitHub/Onshape por falta de acceso de red desde el entorno de archivos. Por eso se entregan enlaces originales trazables, no se afirma que los CAD de esos sitios estén dentro del ZIP.

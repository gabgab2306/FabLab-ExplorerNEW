# FabLab Explorer — modelos 3D integrados

## Qué está integrado

La aplicación React/Vite ahora carga los 11 archivos GLB en `public/models/` según el identificador de máquina seleccionado. El visor tiene cámara que encuadra el modelo, órbita, iluminación de estudio, sombras, modo sólido/alámbrico/transparente y separación visual de mallas. Los inventarios de referencia están en `public/model-data/`.

## Dimensiones geométricas de los archivos GLB

Las dimensiones siguientes son los límites geométricos calculados desde los meshes del archivo generado, en milímetros del modelo. **No son medidas verificadas de máquinas comerciales ni deben presentarse como dimensiones de fabricante.** Los modelos se generaron proceduralmente y sus cotas son representativas.

| ID | Archivo | Envolvente GLB X × Y × Z (mm) | Mallas/geometrías | Nivel de fidelidad |
|---|---|---:|---:|---|
| cnc-3018 | `models/cnc-3018.glb` | 380 × 300 × 234.21 | 284 | Arquitectura de referencia |
| cnc-4040 | `models/cnc-4040.glb` | 500 × 450 × 270.21 | 282 | Arquitectura de referencia |
| cnc-6040 | `models/cnc-6040.glb` | 700 × 500 × 306.21 | 281 | Arquitectura de referencia |
| cnc-4axis | `models/cnc-4axis.glb` | 540 × 420 × 270.21 | 289 | Concepto de cuarto eje |
| cnc-5axis | `models/cnc-5axis.glb` | 440 × 380 × 291.81 | 286 | Concepto de cinco ejes |
| cnc-laser-diode | `models/cnc-laser-diode.glb` | 520 × 440 × 270.21 | 287 | Concepto CNC + diodo |
| laser-diode-10w | `models/laser-diode-10w.glb` | 660 × 560 × 167.5 | 197 | Arquitectura de referencia |
| laser-co2-50w | `models/laser-co2-50w.glb` | 718 × 490 × 320 | 659 | Arquitectura de referencia |
| laser-fiber-30w | `models/laser-fiber-30w.glb` | 447.5 × 290 × 404.5 | 101 | Arquitectura galvo de referencia |
| laser-uv-5w | `models/laser-uv-5w.glb` | 447.5 × 290 × 404.5 | 101 | Arquitectura galvo de referencia |
| laser-hybrid | `models/laser-hybrid.glb` | 540 × 460 × 167.5 | 201 | Concepto híbrido |

El número de geometrías/mallas no equivale al número de piezas físicas. Algunos meshes son detalles visuales, tornillería representativa o agrupaciones de elementos.

## Integración

Los modelos están en `public/models/` para que Vite los sirva desde `/models/<id>.glb`. La asociación `id -> URL` está en `src/components/MachineScene.tsx`. Si se reemplaza un GLB por un CAD oficial, conservar el nombre o actualizar `MODEL_FILES`.

### Código utilizado

- React 18 + TypeScript
- Vite 6
- Three.js 0.171
- React Three Fiber 8
- Drei (`useGLTF`, `OrbitControls`, `ContactShadows`, `Environment`)
- Formato de entrega visual: glTF Binary (`.glb`)

Para incorporar CAD real, exportar el ensamblaje del fabricante a STEP y convertirlo a GLB conservando nombres de pieza, jerarquía y escala en milímetros. Mantener el STEP y los planos PDF como fuente maestra; GLB es para visualización web y no conserva toda la intención paramétrica del CAD.

## Fuentes CAD externas para descargar el diseño original

Los siguientes son enlaces de origen para que el equipo obtenga archivos CAD originales. No se incluyeron en este paquete como si ya se hubieran descargado. El entorno de construcción de esta sesión no tuvo acceso de red para recuperar los binarios externos, así que el paquete integra los 11 GLB de referencia existentes y deja los enlaces trazables.

- Humphrey2, router de gran formato, STEP, FreeCAD y BOM: https://github.com/Fabricatable-Machines/Humphrey2
- CNC4060, FreeCAD y documentación: https://github.com/Shkolik/CNC4060
- AltMill MK1/MK2, CAD oficial Onshape y archivos de diseño: https://resources.sienci.com/view/am-open-source/
- LongMill MK3, CAD oficial y dibujos cuando estén disponibles: https://resources.sienci.com/view/lmk3-open-source/
- LongMill MK3, especificaciones/dimensiones oficiales: https://resources.sienci.com/view/lmk3-specifications/
- CNC 3018, modelo CAD de referencia: https://www.shanhu3d.com/model/10590631
- CNC 3018, manual de ensamblaje: https://www.manualslib.com/manual/2122738/Cnc-3018.html
- VEVOR CNC4040-SS1, manual de montaje: https://www.manualslib.com/manual/4189527/Vevor-Cnc4040-Ss1.html
- CNC 6040, manual de usuario: https://www.manualslib.com/manual/1216186/Cncdiy-Cnc-6040.html
- CNC 4/5 ejes, manuales de familia y listas de piezas: https://www.china-cncrouter.com/download_page2.html
- Cortadora CO₂ 50 W, producto/manuales de referencia: https://omtech.es/products/50w-laser-co2-cortadora-y-grabadora
- Marcadora de fibra SH-F30, manual de referencia: https://manuals.plus/m/a7f8d93312a4988697204b43ead5803e8d29c029a251307d3d1bf5ce4e4845b3
- Marcadora UV 5 W, manual de referencia: https://manuals.plus/asin/B0DFCLQZ5H

## Licencia y seguridad

Verificar licencia y condiciones de redistribución antes de incorporar CAD de terceros a un producto comercial. Las geometrías GLB incluidas aquí son referencias visuales, no documentación de fabricación, verificación de interferencias, seguridad, tolerancias ni compatibilidad eléctrica.

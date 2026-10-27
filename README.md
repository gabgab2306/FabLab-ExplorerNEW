# FabLab Explorer

Aplicación educativa para explorar configuraciones representativas de máquinas de fabricación digital, inspeccionar un ensamblaje procedural 3D, revisar componentes, comparar tecnologías y construir un presupuesto editable.

## Requisitos
- Node.js 20 o posterior recomendado
- npm

## Instalación y ejecución
```bash
npm install
npm run dev
```
Vite mostrará la URL local en la terminal.

## Compilación y pruebas
```bash
npm run test
npm run build
npm run preview
```

## Qué funciona en esta versión
- Navegación por módulos: universo, cortadoras láser, routers CNC, laboratorio 3D, comparador, presupuesto/BOM, materiales, recomendador, seguridad y metodología.
- Catálogo local con 11 configuraciones representativas.
- Visor 3D procedural con órbita, zoom, selección de piezas, modo sólido/alámbrico/transparente y despiece reversible mediante slider.
- Selección sincronizada entre inspector y BOM.
- Edición de cantidades, inclusión de líneas, envío/impuestos/otros costes, cálculo de subtotales y total, persistencia local del presupuesto, copia y exportación CSV UTF-8 con mitigación de fórmulas.
- Comparador con gráficos orientativos; recomendador local basado en reglas.
- Alertas explícitas de seguridad de materiales y estados de precio.
- Diseño responsivo y preferencia de movimiento reducido.

## Límites conocidos y honestidad técnica
- El ensamblaje 3D es procedural y esquemático. No es CAD dimensional exacto ni representa todas las piezas de todas las máquinas. Las piezas base se comparten como conjunto de demostración; la ficha lo indica.
- Los precios y componentes son datos de ejemplo orientativos en USD, no precios de mercado confirmados ni cotizaciones. No se consulta ninguna tienda automáticamente en esta versión.
- Las integraciones Amazon/AliExpress están preparadas conceptualmente en el backend, pero no conectadas a APIs. Para activarlas, implementar un adaptador autorizado en el servidor y configurar credenciales mediante variables de entorno seguras. No poner secretos en variables `VITE_*`.
- Las dimensiones, puntuaciones comparativas y recomendaciones son heurísticas educativas. No sustituyen manuales, evaluación de riesgos, diseño eléctrico ni asesoría profesional.
- La interfaz usa Google Fonts como mejora visual opcional; el resto de páginas y datos se sirven localmente. Si se requiere funcionamiento completamente sin red, reemplazar esas fuentes por fuentes del sistema.
- No se ha verificado compatibilidad técnica entre piezas para construir una máquina real. Las combinaciones se deben validar con documentación del fabricante.

## Arquitectura
- `src/data/catalog.ts`: catálogo de máquinas, componentes y materiales.
- `src/store/useAppStore.ts`: estado global Zustand y persistencia de presupuesto.
- `src/components/MachineScene.tsx`: escena procedural React Three Fiber.
- `src/domain/pricing.ts`: cálculos monetarios probados.
- `server/providers/`: contrato para adaptadores de precios autorizados.

## Seguridad
No cortar ni grabar PVC con láser. No procesar vinilo ni plásticos de composición desconocida. Una parada de emergencia aislada no convierte una máquina en segura. Verificar el manual del equipo, extracción, protección, interlocks, sujeción y evaluación de riesgos antes de operar.

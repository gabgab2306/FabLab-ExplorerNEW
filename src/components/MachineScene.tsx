import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';

type ViewMode = 'solid' | 'wireframe' | 'transparent';
type Props = { explode: number; selectedPart: string; onSelect: (id: string) => void; mode: ViewMode; modelId?: string };
const FALLBACK = '/models/cnc-3018.glb';
const MODEL_FILES: Record<string,string> = {
  'laser-diode-10w':'/models/laser-diode-10w.glb', 'laser-co2-50w':'/models/laser-co2-50w.glb',
  'laser-fiber-30w':'/models/laser-fiber-30w.glb', 'laser-uv-5w':'/models/laser-uv-5w.glb',
  'laser-hybrid':'/models/laser-hybrid.glb', 'cnc-3018':'/models/cnc-3018.glb',
  'cnc-4040':'/models/cnc-4040.glb', 'cnc-6040':'/models/cnc-6040.glb',
  'cnc-4axis':'/models/cnc-4axis.glb', 'cnc-5axis':'/models/cnc-5axis.glb',
  'cnc-laser-diode':'/models/cnc-laser-diode.glb'
};
function LoadedMachine({modelId,explode,mode,onSelect}:{modelId:string;explode:number;mode:ViewMode;onSelect:(id:string)=>void}) {
  const url = MODEL_FILES[modelId] ?? FALLBACK;
  const { scene } = useGLTF(url);
  const { camera, controls } = useThree() as any;
  const root = useMemo(() => {
    const copy = scene.clone(true);
    copy.updateMatrixWorld(true);
    const whole = new THREE.Box3().setFromObject(copy);
    const center = whole.getCenter(new THREE.Vector3());
    const size = whole.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x,size.y,size.z) || 1;
    copy.position.sub(center);
    copy.scale.setScalar(3.2/maxDim);
    copy.traverse((obj:any) => {
      if (!obj.isMesh) return;
      obj.castShadow = true; obj.receiveShadow = true;
      obj.userData.originalMaterial = obj.material;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      obj.material = mats.map((m:any) => { const c=m.clone(); if ('metalness' in c) c.metalness=Math.max(c.metalness ?? 0.2,0.42); if ('roughness' in c) c.roughness=Math.min(c.roughness ?? 0.6,0.48); return c; });
      if (!Array.isArray(obj.userData.originalMaterial)) obj.material=obj.material[0];
      obj.userData.home = obj.position.clone();
      const b = new THREE.Box3().setFromObject(obj); obj.userData.partCenter=b.getCenter(new THREE.Vector3());
    });
    return {copy,center,size,maxDim};
  },[scene]);
  useEffect(()=>{
    const box = new THREE.Box3().setFromObject(root.copy); const s=box.getSize(new THREE.Vector3());
    const maxDim=Math.max(s.x,s.y,s.z)||3; const dist=maxDim*1.65;
    camera.position.set(dist*1.15,dist*.82,dist*1.35); camera.near=.01; camera.far=1000; camera.updateProjectionMatrix();
    if (controls?.target) { controls.target.set(0,0,0); controls.update(); }
  },[root, camera, controls, modelId]);
  useEffect(()=>{
    root.copy.traverse((obj:any)=>{
      if (!obj.isMesh) return;
      const home=obj.userData.home as THREE.Vector3; const c=obj.userData.partCenter as THREE.Vector3;
      if (!home || !c) return;
      const direction=c.clone().normalize(); if(direction.lengthSq()<0.001) direction.set((obj.id%3)-1,1,((obj.id+1)%3)-1).normalize();
      obj.position.copy(home).addScaledVector(direction,explode*0.55);
      const original=obj.userData.originalMaterial;
      const apply=(mat:any)=>{ if (!mat) return; mat.wireframe=mode==='wireframe'; mat.transparent=mode==='transparent'; mat.opacity=mode==='transparent'?0.24:1; mat.depthWrite=mode!=='transparent'; mat.needsUpdate=true; };
      (Array.isArray(original)?original:[original]).forEach(apply);
    });
  },[root,explode,mode]);
  return <primitive object={root.copy} onClick={(e:any)=>{e.stopPropagation(); const obj=e.object; onSelect(String(obj.name || obj.userData?.name || `MESH-${obj.id}`));}} />;
}
function SceneContents(props:Props){return <>
  <color attach="background" args={['#0a1118']} />
  <ambientLight intensity={1.15}/><hemisphereLight args={['#d9ecff','#25303b',1.25]}/>
  <directionalLight position={[5,8,6]} intensity={3.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
  <directionalLight position={[-5,3,-4]} intensity={1.6} color="#59baff"/>
  <pointLight position={[2,2,4]} intensity={18} color="#e8f4ff"/>
  <gridHelper args={[8,32,'#2b4659','#172a37']} position={[0,-1.25,0]}/>
  <Suspense fallback={<Html center><div className="scene-tag">Cargando ensamblaje 3D…</div></Html>}><LoadedMachine {...props}/></Suspense>
  <ContactShadows position={[0,-1.26,0]} opacity={.42} scale={8} blur={2.2} far={4}/>
  <OrbitControls makeDefault enableDamping dampingFactor={.075} minDistance={1.1} maxDistance={16} maxPolarAngle={Math.PI*.93}/>
</>}
export default function MachineScene(props:Props){return <div className="scene"><Canvas shadows camera={{position:[4,3,5],fov:38,near:.01,far:1000}} dpr={[1,2]} gl={{antialias:true,alpha:false,preserveDrawingBuffer:true}}><SceneContents {...props}/></Canvas><div className="scene-crosshair">+</div><div className="scene-coordinate">3D · GLB ASSEMBLY <span>REFERENCE GEOMETRY</span></div></div>}
Object.values(MODEL_FILES).forEach(url=>useGLTF.preload(url));

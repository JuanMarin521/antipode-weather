import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { getSubsolarPoint } from '../utils/sunPosition';

export default function GlobeViewer({ originCoords, antipodeCoords, onGlobeClick }) {
  const globeEl = useRef();

  useEffect(() => {
    if (!globeEl.current) return;

    const setupLighting = () => {
      try {
        const scene = globeEl.current?.scene();
        if (!scene) return;

        // Limpiar luces por defecto
        const defaultLights = scene.children.filter(child => child.isLight);
        defaultLights.forEach(light => scene.remove(light));

        // Posición del Sol en tiempo real
        const subsolar = getSubsolarPoint();
        const radLat = subsolar.latitude * (Math.PI / 180);
        const radLng = subsolar.longitude * (Math.PI / 180);
        const distance = 450;

        const sunX = distance * Math.cos(radLat) * Math.sin(radLng);
        const sunY = distance * Math.sin(radLat);
        const sunZ = distance * Math.cos(radLat) * Math.cos(radLng);

        const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
        sunLight.position.set(sunX, sunY, sunZ);
        scene.add(sunLight);

        // Luz de penumbra nocturna
        const ambientLight = new THREE.AmbientLight(0x64748b, 0.65);
        scene.add(ambientLight);

        // Textura con luces nocturnas urbanas
        const globeMaterial = globeEl.current.globeMaterial();
        if (globeMaterial) {
          globeMaterial.bumpScale = 1.5;

          new THREE.TextureLoader().load(
            '//unpkg.com/three-globe/example/img/earth-night.jpg',
            (nightTexture) => {
              globeMaterial.emissiveMap = nightTexture;
              globeMaterial.emissive = new THREE.Color(0xffd166);
              globeMaterial.emissiveIntensity = 0.6;
              globeMaterial.needsUpdate = true;
            }
          );
        }
      } catch (err) {
        console.error("Lighting error:", err);
      }
    };

    const timer = setTimeout(setupLighting, 150);
    return () => clearTimeout(timer);
  }, []);

  // Animación de cámara al buscar
  useEffect(() => {
    if (originCoords && globeEl.current) {
      globeEl.current.pointOfView(
        { lat: Number(originCoords.latitude), lng: Number(originCoords.longitude), altitude: 2.2 },
        2000
      );
    }
  }, [originCoords]);

  // Construcción de los marcadores HTML pulsantes (CSS animate-ping)
  const htmlData = [];

  if (originCoords) {
    htmlData.push({
      id: 'origin-marker',
      lat: Number(originCoords.latitude),
      lng: Number(originCoords.longitude),
      color: 'bg-blue-500',
      pingColor: 'bg-blue-400'
    });
  }

  if (antipodeCoords) {
    htmlData.push({
      id: 'antipode-marker',
      lat: Number(antipodeCoords.latitude),
      lng: Number(antipodeCoords.longitude),
      color: 'bg-red-500',
      pingColor: 'bg-red-400'
    });
  }

  return (
    <div className="w-full h-screen bg-slate-950">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showAtmosphere={true}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.18}

        /* Marcadores HTML con Pulso CSS NATIVO (100% libre de bugs WebGL) */
        htmlElementsData={htmlData}
        htmlElement={(d) => {
          const el = document.createElement('div');
          el.className = 'relative flex items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2';
          el.innerHTML = `
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full ${d.pingColor} opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 ${d.color} shadow-md shadow-black/80"></span>
          `;
          return el;
        }}
        htmlTransitionDuration={1000}
        
        onGlobeClick={({ lat, lng }) => onGlobeClick && onGlobeClick(lat, lng)}
      />
    </div>
  );
}
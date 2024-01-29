import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import './App.css';
import { NaverMapMesh } from './components/NaverMapMesh';
import ThreeMap from './libs/ThreeMap';
import mathUtil from './utils/mathUtil';

const CAMERA_Z_POS = 500;
const CONTROL_MIN_DISTANCE = 100;
const CONTROL_MAX_DISTANCE = 1700;
const CONTROL_MIN_POLAR = 0;
const CONTROL_MAX_POLAR = 40;

function App() {
    const viewRef = useRef<HTMLDivElement>(null);
    const threeMapRef = useRef<ThreeMap | null>(null);
    useEffect(() => {
        if (viewRef.current && !threeMapRef.current) {
            threeMapRef.current = new ThreeMap(viewRef.current);
        }

        return () => {
            if (threeMapRef.current) {
                threeMapRef.current.destroy();
                threeMapRef.current = null;
            }
        };
    }, []);

    return (
        <div id="canvas-container">
            <div id="map"></div>
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    aspect={1200 / 600}
                    fov={50}
                    near={0.1}
                    far={10000}
                    position={[0, CAMERA_Z_POS, CAMERA_Z_POS]}
                />
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI}
                />

                <NaverMapMesh position={[0, 0, 0]} />
                <OrbitControls
                    minDistance={CONTROL_MIN_DISTANCE}
                    maxDistance={CONTROL_MAX_DISTANCE}
                    minPolarAngle={mathUtil.toRadian(CONTROL_MIN_POLAR)}
                    maxPolarAngle={mathUtil.toRadian(CONTROL_MAX_POLAR)}
                />
            </Canvas>
        </div>
    );
}

export default App;

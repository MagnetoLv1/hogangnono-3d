import React from 'react';
import * as THREE from 'three';

interface Props {
    url: string;
    position: [number, number, number];
}
export const Tile = ({ url, position }: Props) => {
    // const texture = textureLoader.load(tileInfo.src);
    // const material = new THREE.MeshBasicMaterial({
    //     map: texture,
    //     wireframe: false
    // });

    // // 메시가 없는 경우에는 새로 생성합니다.
    // // 평면 지오메트리를 생성합니다.
    // const geometry = new THREE.PlaneGeometry(
    //     tileInfo.width,
    //     tileInfo.height
    // );
    //
    // // 타일의 좌표에 메시를 배치합니다.
    // mesh.position.set(
    //     tileInfo.x + tileInfo.width / 2,
    //     -tileInfo.y - tileInfo.height / 2,
    //     0
    // );

    const texmgr = new THREE.TextureLoader();
    const texture = texmgr.load(url);

    return (
        <mesh position={position}>
            <planeGeometry args={[256, 256]} />
            <meshBasicMaterial wireframe={false} map={texture} />
        </mesh>
    );
};

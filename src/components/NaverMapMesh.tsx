import { useEffect, useState } from 'react';
import { Box } from './Box';
import { Tile } from './Tile';
import NaverMap from '../libs/NaverMap';

interface Props {
    position: [number, number, number];
}
export const NaverMapMesh = (props: Props) => {
    // Return the view, these are regular Threejs elements expressed in JSX
    const [tileInfo, setTileInfo] = useState<Array<TileInfo>>([]);

    useEffect(() => {
        const naverMap = new NaverMap();
        naverMap.onTilesChange(tilesChangeHandler);
        naverMap.load();
    }, []);

    const tilesChangeHandler = (tileInfo: Array<TileInfo>) => {
        setTileInfo(tileInfo);
    };

    console.log('props', props, tileInfo);
    return (
        <group rotation={[-90, 0, 0]}>
            {tileInfo.map((tileInfo, index) => {
                console.log([
                    tileInfo.x + tileInfo.width / 2,
                    -tileInfo.y - tileInfo.height / 2,
                    0
                ]);
                return (
                    <Tile
                        key={index}
                        url={tileInfo.src}
                        position={[
                            tileInfo.x + tileInfo.width / 2,
                            -tileInfo.y - tileInfo.height / 2,
                            0
                        ]}
                    ></Tile>
                );
            })}
            <Box position={[1.2, 0, 0]} />
        </group>
    );
};

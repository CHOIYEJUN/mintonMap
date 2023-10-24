import React, { useEffect, useRef, useState } from 'react';
import {  Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import {inspect} from "util";
import styled from "styled-components";



const CoodBox = styled.div`
    position : fixed;
    bottom : 0px;
    right : 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid gray;
  
`

function MapContainer() {

    const mapRef = useRef(null);

    const locations = [
        { title: '카카오', latlng: { lat: 33.450705, lng: 126.570677 } },
        { title: '생태연못', latlng: { lat: 33.450936, lng: 126.569477 } },
        { title: '텃밭', latlng: { lat: 33.450879, lng: 126.56994 } },
        { title: '근린공원', latlng: { lat: 33.451393, lng: 126.570738 } },
    ];

    const [coordinates, setCoordinates] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let clickTitle = "";

    const getCoordinates = () => {
        const map = mapRef.current;

        if (map) {
            setCoordinates({
                center: {
                    lat: map.getCenter().getLat(),
                    lng: map.getCenter().getLng(),
                },
            });
        }
    };

    const markerClick = (title) => {
        clickTitle = title;
        setModalIsOpen(true);


    }

    return (
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{
                width: '100%',
                height: '100%',
                position : 'absolute',
                top : '0',
                left : '0',
                zIndex : 0

            }}
            level={3}
            ref={mapRef}
        >
            {locations.map((loc, idx) => (
                <MapMarker
                    key={`${loc.title}-${loc.latlng.lat}-${loc.latlng.lng}`}
                    position={loc.latlng}
                    image={{
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                        size: { width: 24, height: 35 },
                    }}
                    title={loc.title}
                    onClick={() => markerClick(loc.title)}
                />
            ))}
            <CoodBox>
                <button onClick={getCoordinates} style={{}}>현재 위치 좌표 얻기</button>
                {coordinates && (
                    <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',

                    }}>
                        <p>위도: {coordinates.center.lat}</p>
                        <p>경도: {coordinates.center.lng}</p>
                    </div>
                )}
            </CoodBox>

            <Modal isOpen={true}>
                <p>{clickTitle}</p>
                <button onClick={()=> setModalIsOpen(false)}>Modal close</button>
            </Modal>

        </Map>
    );
}

export default MapContainer;

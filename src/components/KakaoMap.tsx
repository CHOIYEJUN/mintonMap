import React, { useEffect, useRef, useState } from 'react';
import {  Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import {inspect} from "util";
import styled from "styled-components";
import Modal from 'react-modal';

interface Location {
    title: string;
    content : string;
    latlng: { lat: number; lng: number };
}

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
let clickTitle = "";
let clickContent = "";
function MapContainer() {
    // @ts-ignore
    const mapRef = useRef<CustomOverlayMap | null>(null)!;

    const locations: Location[] = [
        { title: '카카오', content : '내용입니다', latlng: { lat: 33.450705, lng: 126.570677 } },
        { title: '생태연못', content : '내용입니다', latlng: { lat: 33.450936, lng: 126.569477 } },
        { title: '텃밭', content : '내용입니다',latlng: { lat: 33.450879, lng: 126.56994 } },
        { title: '근린공원',content : '내용입니다', latlng: { lat: 33.451393, lng: 126.570738 } },
        { title: '블라블라',content : '내용입니다', latlng: { lat: 33.45296977050732, lng: 126.57501685329325 } },
    ];

    const [coordinates, setCoordinates] = useState<{ center: { lat: number; lng: number } } | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);


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

    const markerClick = (title: string, content : string) => {
        setModalIsOpen(true);
        clickTitle = title;
        clickContent = content;

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
                    onClick={() => markerClick(loc.title, loc.content)}
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

            <Modal
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex : 99
                    },
                    content: {
                        width: '300px',
                        height: '300px',
                        margin: 'auto',
                    },
                }}

            >
                <p>{clickTitle}</p>
                <p>{clickContent}</p>
                <button onClick={()=> setModalIsOpen(false)}>Modal close</button>
            </Modal>

        </Map>
    );
}

export default MapContainer;

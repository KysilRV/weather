import React from 'react'
import GoogleMapReact from 'google-map-react';

import './map.scss';

function Map({lat, lng}) {
    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                center={{lat, lng}}
                defaultZoom={10}
            />
        </div>
    );  
}

export default Map
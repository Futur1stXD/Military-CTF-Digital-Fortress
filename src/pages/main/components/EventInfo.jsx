import { Card, Flex } from 'antd';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '50vh',
    height: '63vh',
    borderRadius: 10,
};

const center = {
    lat: 51.092836,
    lng: 71.421642,
};

const EventInfo = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBeCKp1lWZ5rWDNyYDyPeMT1wOXMh9J4l8',
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <Card style={{ width: '80%', display: 'flex', margin: 'auto', height: 600, marginBottom: 20 }}>
            <Flex>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={16}
                    center={center}
                    mapTypeId='hybrid'
                    
                >
                  
                  <Marker position={center} />
                </GoogleMap>
                <Flex vertical>

                </Flex>
            </Flex>
        </Card>
    );
};

export default EventInfo;

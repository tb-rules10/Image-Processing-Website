
import { useEffect } from 'react'
import SideNav from '../components/SideNav'
import { useParams } from "react-router-dom"
import ImageProcessing from '../components/ImageProcessing';
import { featureRoutes } from '../utils/APIRoutes';

function Images() {
  let id = useParams()
  const noParams = Object.keys(id).length === 0;
  const feature = featureRoutes[id.id];
  
  return (
    <>
      {noParams ? (
        <>
          <SideNav />
          <div className="h-screen flex p-7">
            <h1 className="text-2xl font-semibold">Image Processing</h1>
          </div>
        </>
      ) : (
        <ImageProcessing  heading={feature.name} serverRoute={feature.route} />
      )}
    </>
  );
}

export default Images

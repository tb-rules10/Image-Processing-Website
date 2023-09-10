export const host = `${import.meta.env.VITE_APP_BASE_URL}`;

export const invertColorRoute = `${host}/api/invert-color`

export const flipImageRoute = `${host}/api/flip-image`

export const imageHistogramRoute = `${host}/api/image-histogram`



export const featureRoutes = {
    'invert-color': { name: 'Invert Colors', route: invertColorRoute },
    'flip-image': { name: 'Flip Image', route: flipImageRoute },
    'histogram': { name: 'Image Histogram', route: imageHistogramRoute },
  };

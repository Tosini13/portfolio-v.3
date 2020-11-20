import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
      mobile: width < 600,
      iPad: width < 800,
    }; 
}

export default useWindowSize;
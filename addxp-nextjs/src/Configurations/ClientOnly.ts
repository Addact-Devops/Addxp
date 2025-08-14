import { useEffect, useState } from 'react';

const ClientOnly = ({ children }:any) => {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
      setHasMounted(true);
    }, []);
  
    if (!hasMounted) {
      return null;
    } else return  children
    
  };
export default ClientOnly;
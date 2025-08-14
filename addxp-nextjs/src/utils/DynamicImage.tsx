"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DynamicImage = ({ imageSrc, imageAlt }: any) => {
    const pathname = usePathname();
    const [classname, setclassname] = useState("")
    useEffect(() => {
        if (pathname == '/umbraco-development-service') {
            setclassname('w-auto');
        }
    }, [])
    
    return (
        <img
            className={classname}
            src={imageSrc}
            loading='lazy'
            alt={imageAlt}
        />
    )
}

export default DynamicImage
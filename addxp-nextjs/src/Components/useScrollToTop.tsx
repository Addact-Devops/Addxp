"use client";
import { useEffect } from "react";

const UseScrollToTop = (props: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    return null;
};

export default UseScrollToTop;

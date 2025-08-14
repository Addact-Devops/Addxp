"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichText from "@/Components/Common";
import Link from "next/link";
import moment from "moment";

function CaseDetail() {
   const [userDetails, setUserDetails] = useState<UserData>();
   const searchParams = useParams();

   const [isOpen, setIsOpen] = useState(false);

   const handleButtonClick = () => {
      setIsOpen(!isOpen);
   };
   useEffect(() => {
      //fetchdata();
      document.body.classList.add("blog-detail-body");
   }, []);

   return (
      <>
        <h1>hello</h1>
      </>
   );
}

export default CaseDetail;

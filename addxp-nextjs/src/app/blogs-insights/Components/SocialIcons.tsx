"use client";
import React, { useState } from "react";
import Link from "../../../../node_modules/next/link";

interface SocialItem {
   id: string;
   attributes: {
      SocialIcons: {
         Links: {
            href: string;
         };
         ClassName: string;
         Icons: {
            data: {
               attributes: {
                  url: string;
                  alternativeText: string;
               };
            };
         };
         HoverIcon: {
            data: {
               attributes: {
                  url: string;
                  alternativeText: string;
               };
            };
         };
      };
   };
}

interface SocialIconsProps {
   socialitem: SocialItem[];
   isOpen: boolean;
}

const SocialIcons: React.FC<SocialIconsProps> = (props: any) => {
   const [isOpen, setIsOpen] = useState(false);
   const handleButtonClick = () => {
      setIsOpen(!isOpen);
   };

   //const [socialitem, setSocialItem] = useState(props);
   return (
      <>
         <li className={`share-icon ${isOpen ? "open" : ""}`} onClick={handleButtonClick}>
            <img
               src={"https://d1ousucuxrlllk.cloudfront.net/src/images/social-open.svg"}
               alt='social-open'
               className={`social-open ${isOpen ? "d-none" : ""}`}
               style={{
                  left: isOpen ? "68px" : "10px",
                  top: isOpen ? "38px" : "0",
               }}
               loading='lazy'
            />
            <img
               src={"https://d1ousucuxrlllk.cloudfront.net/src/images/social-close.svg"}
               alt='social-close'
               className={`social-close ${isOpen ? "d-block" : ""}`}
               loading='lazy'
            />
         </li>

         {props.socialitem.map((socialitem: any, index: any) => (
            <li key={socialitem.id}>
               <a
                  href={socialitem.attributes.SocialIcons.Links.href}
                  className={socialitem.attributes.SocialIcons.ClassName.replaceAll("_", "-")}
                  style={
                     index === 0
                        ? {
                             left: isOpen ? "0" : "10px",
                             top: isOpen ? "-48px" : "0",
                          }
                        : index === 1
                        ? {
                             left: isOpen ? "40px" : "10px",
                             top: isOpen ? "-38px" : "0",
                          }
                        : index === 2
                        ? {
                             left: isOpen ? "72px" : "10px",
                             top: isOpen ? "-16px" : "0",
                          }
                        : index === 3
                        ? {
                             left: isOpen ? "86px" : "10px",
                             top: isOpen ? "17px" : "0",
                          }
                        : undefined
                  }
               >
                  <img
                     src={socialitem.attributes.SocialIcons.Icons.data.attributes.url}
                     alt={socialitem.attributes.SocialIcons.Icons.data.attributes.alternativeText}
                     loading='lazy'
                  />
                  <img
                     src={socialitem.attributes.SocialIcons.HoverIcon.data.attributes.url}
                     alt={socialitem.attributes.SocialIcons.HoverIcon.data.attributes.alternativeText}
                     loading='lazy'
                     className='hover'
                  />
               </a>
            </li>
         ))}
      </>
   );
};

export default SocialIcons;

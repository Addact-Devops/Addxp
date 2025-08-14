"use client";
import AddXpFooter from "@/Components/Navigations/AddXpFooter";
import MainHeader from "@/Components/Navigations/MainHeader";
import UseScrollToTop from "@/Components/useScrollToTop";

import { usePathname } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";

import store from "../../store/store";

import MyComponent from "@/Components/MyComponent/MyComponent";
import KenticoPopup from "@/Components/MyComponent/KenticoPopup";
import UmbracoPopup from "@/Components/MyComponent/UmbracoPopup";
import StrapiPopup from "@/Components/MyComponent/StrapiPopup";

export interface IProps {
  bodyChildren: React.ReactNode;
  userDetailsAPI: any;
  userDetails: any;
  userFooterDetails: any;
}

const LayoutBody = (props: IProps) => {
  const { bodyChildren, userDetailsAPI, userDetails, userFooterDetails } = props;

  const pathname = usePathname();

  let PopupComponent = MyComponent;
  let bodyClass = "";

  if (pathname) {
    if (pathname.includes("kentico") && pathname.includes("umbraco")) {
      if (pathname.includes("to-umbraco")) {
        PopupComponent = UmbracoPopup;
      } else if (pathname.includes("to-kentico")) {
        PopupComponent = KenticoPopup;
      } else {
        const kenticoIndex = pathname.indexOf("kentico");
        const umbracoIndex = pathname.indexOf("umbraco");
        PopupComponent = umbracoIndex > kenticoIndex ? UmbracoPopup : KenticoPopup;
      }
    } else if (pathname.includes("umbraco")) {
      PopupComponent = UmbracoPopup;
    } else if (pathname.includes("kentico")) {
      PopupComponent = KenticoPopup;
    } else if (pathname.includes("strapi")) {
      PopupComponent = StrapiPopup;
    }

    if (
      pathname === "/brand-guidelines" ||
      pathname === "/strapi-cms-development-service" ||
      pathname === "/strapi-plugin-development-service" ||
      pathname === "/strapi-upgrade-service" ||
      pathname === "/strapi-migration-service" ||
      pathname === "/strapi-cms-consultation-service" ||
      pathname === "/strapi-support-maintenance-service" ||
      pathname === "/strapi-ui-design-service" ||
      pathname === "/hire-strapi-developer" ||
      pathname === "/blogs-insights" ||
      pathname === "/hire-umbraco-developer" ||
      pathname === "/hire-kentico-developer" ||
      pathname === "/hire-asp-net-developer" ||
      pathname === "/hire-sitecore-xm-cloud-developer" ||
      pathname === "/case-studies"
    ) {
      bodyClass = "hire-resource";
    }

    if (
      pathname === "/commerce-experience" ||
      pathname === "/content-experience" ||
      pathname === "/user-experience" ||
      pathname === "/"
    ) {
      bodyClass = "bg-dark";
    }
  }

  return (
    <body className={`${bodyClass}`} suppressHydrationWarning={true}>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe
               src='https://www.googletagmanager.com/ns.html?id=GTM-NM9VSWDF'
               height='0'
               width='0'
               style='display:none;visibility:hidden'
            ></iframe>`,
        }}
      ></noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}

      <UseScrollToTop data={pathname} />
      <Provider store={store}>
        <PopupComponent>
          <MainHeader userDetailsData={userDetails} userDetailsAPIdata={userDetailsAPI} />
          {bodyChildren}
          <AddXpFooter userFooterDetails={userFooterDetails} />
        </PopupComponent>
      </Provider>
    </body>
  );
};

export default LayoutBody;

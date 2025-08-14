"use client";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

import RichText from "../Common";
import HeaderForms from "../HeaderForm/HeaderForms";

const MainHeader = ({ userDetailsData, userDetailsAPIdata }: any) => {
  const userDetails = userDetailsData;
  const userDetailsAPI = userDetailsAPIdata;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const [width, setWidth] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const isMobile = width <= 1024;
  const [activeMenuItem, setactivemenuItem] = useState<number>();
  const toggleForm = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleBodyOverflow = () => {
    if (isMobile) {
      if (!document.documentElement.classList.contains("overflow-hidden")) {
        document.documentElement.classList.add("overflow-hidden");
      } else {
        document.documentElement.classList.remove("overflow-hidden");
      }
    }
  };

  useEffect(() => {
    const handleScrollToTop = () => {
      const navbarElement = document.querySelector(".navbar-collapse") as HTMLElement | null;
      if (navbarElement) {
        navbarElement.scrollTop = 0; // Scroll to top on click
      }
    };

    // Select all `.nav-item` inside `.navbar-collapse`
    const navItems = document.querySelectorAll(".navbar-collapse .nav-item");
    navItems.forEach((item) => item.addEventListener("click", handleScrollToTop));

    // Cleanup event listeners when component unmounts
    return () => {
      navItems.forEach((item) => item.removeEventListener("click", handleScrollToTop));
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const elements = document.getElementsByClassName("dropdown-menu");

      const elementsArray = Array.from(elements);

      elementsArray.forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.classList.contains("show")) {
            // Remove the "show" class from each element
            element.classList.remove("show");
          }
        }
      });
    } else {
      setIsOpen(false);
      setIsActive(false);
      setactivemenuItem(0);

      const navbarElement = document.getElementById("navbarScroll");
      if (navbarElement?.classList.contains("show")) {
        // Remove the "show" class from each element
        navbarElement.classList.remove("show");
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (activeMenuItem === 0) {
      const navItems = document.querySelectorAll(".nav-item.show");
      const navItemsArray = Array.from(navItems);
      navItemsArray.forEach((navItem) => {
        if (navItem.classList.contains("show")) {
          navItem.classList.remove("show");
        }
        const link = navItem.querySelector("a.nav-link.show");
        if (link) {
          link.classList.remove("show");
        }
        const dropdownMenu = navItem.querySelector(".dropdown-menu.show");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("show");
        }
      });
    }
  }, [activeMenuItem]);
  useEffect(() => {
    document.body.classList.toggle("show_form", isOpen);
  }, [isOpen]);

  const handleSubLiClick = (e: any, index: any) => {
    e.stopPropagation();
    if (isMobile) {
      setIsActive(true);
      setactivemenuItem(index);
      document.body.classList.add("toggle_slidemenu_open");
    }
  };

  const closeSubMenu = (e: any) => {
    e.stopPropagation();
    setactivemenuItem(0);
    const navItems = document.querySelectorAll(".nav-item.show");

    const navItemsArray = Array.from(navItems);
    navItemsArray.forEach((navItem) => {
      if (navItem.classList.contains("show")) {
        navItem.classList.remove("show");
      }
      const link = navItem.querySelector("a.nav-link.show");
      if (link) {
        link.classList.remove("show");
      }
      const dropdownMenu = navItem.querySelector(".dropdown-menu.show");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
    if (isMobile) {
      setIsActive(false);
      if (document.body.classList.contains("toggle_slidemenu_open"))
        document.body.classList.remove("toggle_slidemenu_open");
    }
  };

  useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    // Check if `window` is defined (browser environment) before adding the event listener
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth); // Set the initial width if `window` is defined

      window.addEventListener("resize", handleWindowSizeChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  let Headerclass = "";
  if (
    pathname == "/user-experience" ||
    pathname == "/content-experience" ||
    pathname == "/commerce-experience" ||
    pathname == "/about-us" ||
    pathname == "/contact-us" ||
    pathname == "/careers" ||
    pathname == "/blogs-insights" ||
    pathname == "/ui-ux-designer" ||
    pathname == "/case-studies"
  ) {
    Headerclass = "header-white";
  } else {
    Headerclass = "";
  }

  // condition for white header in not found page
  if (segments[0] === "__DEFAULT__") {
    Headerclass = "header-white";
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const headerElement = document.querySelector("header");

        if (headerElement) {
          if (scrollTop >= 100) {
            headerElement.classList.add("fixed-header");
          } else {
            headerElement.classList.remove("fixed-header");
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const setIsCollapsed = (e: any) => {
    e.stopPropagation();
    const isCollapsed = document.querySelectorAll(".navbar-toggler");
  };

  useEffect(() => {
    const toggleButton = document.querySelector(".navbar-toggler") as HTMLElement;
    if (!toggleButton.classList.contains("collapsed")) {
      toggleButton.click();
    }
  }, [pathname]);
  return (
    <>
      <header>
        <Navbar expand="lg" className={`navbar ${Headerclass}`}>
          {userDetails?.data.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <Container key={item.id}>
              <Navbar.Brand href="/">
                {item.attributes.Logo.data == null ? null : (
                  <img
                    src={item.attributes.Logo.data.attributes.url}
                    alt={item.attributes.Logo.data.attributes.alternativeText}
                    loading="lazy"
                  />
                )}
              </Navbar.Brand>

              <div className="nav-right">
                <Navbar.Toggle aria-controls="navbarScroll" onClick={handleBodyOverflow} />
                <Navbar.Collapse id="navbarScroll">
                  <div className="mobile-menu-desc">
                    {item.attributes.MobileView.Images.data ? (
                      <img
                        src={item.attributes.MobileView.Images.data[0].attributes.url}
                        alt={item.attributes.MobileView.Images.data[0].attributes.alternativeText}
                        // loading='lazy'
                      />
                    ) : null}

                    <RichText htmlContent={item.attributes.MobileView.Description} />
                  </div>
                  <Nav className="ms-auto mb-2 mb-lg-0" style={{ maxHeight: "100px" }}>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.SolutionTitle}
                          {isMobile ? (
                            <span className="bi bi-chevron-down pt-1" />
                          ) : (
                            <ChevronDown className="bi bi-chevron-down pt-1" />
                          )}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 1)}
                      className={`position-static ${isActive === true ? "open_slide_menu" : ""} ${
                        activeMenuItem === 1 ? "show" : ""
                      }`}
                    >
                      <div className="blog-menu ">
                        <div className="mega-content">
                          <div className="left-section">
                            <h2 className="title-text mobile-text" onClick={(e) => closeSubMenu(e)}>
                              <i className="bi bi-chevron-down pt-1"></i>
                              Solutions
                            </h2>
                            <h2 className="title-text">{item.attributes.SolutionDesc}</h2>
                          </div>

                          <div className="item-box-container">
                            {item.attributes.SolutionComponents.map((solutiondata: any) => (
                              <a
                                href={`${solutiondata.Links.href}`}
                                className="item-box"
                                key={solutiondata.id}
                                onClick={(e: any) => setIsCollapsed(e)}
                              >
                                <div className="box-title">
                                  {solutiondata.Icons.data == null ? null : (
                                    <img
                                      src={solutiondata.Icons.data.attributes.url}
                                      alt={solutiondata.Icons.data.attributes.alternativeText}
                                      loading="lazy"
                                    />
                                  )}

                                  <span>{solutiondata.Title}</span>
                                </div>

                                <RichText htmlContent={solutiondata.Description}></RichText>
                                {solutiondata.Images.data == null ? null : (
                                  <img
                                    src={solutiondata.Images.data.attributes.url}
                                    alt={solutiondata.Images.data.attributes.alternativeText}
                                    className="item-box-bg"
                                    loading="lazy"
                                  />
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.ServiceTitle}
                          {isMobile ? (
                            <span className="bi bi-chevron-down pt-1" />
                          ) : (
                            <ChevronDown className="bi bi-chevron-down pt-1" />
                          )}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 2)}
                      className={`position-static ${isActive ? "open_slide_menu" : ""} ${
                        activeMenuItem === 2 ? "show" : ""
                      }`}
                    >
                      <div className="service-menu-main">
                        <div className="row mega-content">
                          <div className="left-section d-md-none">
                            <h2 className="title-text" onClick={(e) => closeSubMenu(e)}>
                              <i className="bi bi-chevron-down pt-1"></i>
                              Services
                            </h2>

                            <p className="content">
                              Take your pick from these 6 Services and revolutionize your business.
                            </p>
                            <img src="src/images/header-services.png" alt="header-services" loading="lazy" />
                          </div>
                          {item.attributes.Services.map((service: any) => (
                            <div className="col-md-6 service-menu" key={service.id}>
                              <a href={service.Link.href} className="tech_box pb-30">
                                <img
                                  src={service.Image.data?.attributes.url}
                                  alt={service.Image.data?.attributes.url}
                                  loading="lazy"
                                  onClick={(e: any) => setIsCollapsed(e)}
                                />
                                <RichText htmlContent={service.Description}></RichText>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.CompanyTitle}
                          {isMobile ? (
                            <span className="bi bi-chevron-down pt-1" />
                          ) : (
                            <ChevronDown className="bi bi-chevron-down pt-1" />
                          )}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 3)}
                      className={`position-static ${isActive ? "open_slide_menu" : ""} ${
                        activeMenuItem === 3 ? "show" : ""
                      }`}
                    >
                      <div className="service-menu-main">
                        <div className="row mega-content company-menu">
                          <div className="col-md-5">
                            <div className="left-section">
                              <h2 className="title-text mobile-text " onClick={(e: any) => closeSubMenu(e)}>
                                <i className="bi bi-chevron-down pt-1"></i>
                                {item.attributes.CompanyTitle}
                              </h2>

                              <div className="hide-mobile">
                                {item.attributes.Company.Image.data == null ? null : (
                                  <img
                                    src={item.attributes.Company.Image.data.attributes.url}
                                    alt={item.attributes.Company.Image.data.attributes.alternativeText}
                                    loading="lazy"
                                  />
                                )}

                                <h3 className="secondary-title pt-2">{item.attributes.Company.Title}</h3>

                                <RichText htmlContent={item.attributes.Company.Description}></RichText>
                                <a
                                  href={item.attributes.Company.Link.href}
                                  className="btn-defualt"
                                  onClick={(e: any) => setIsCollapsed(e)}
                                >
                                  {item.attributes.Company.Link.label}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="row mt-md-4">
                              {item.attributes.CompanyDetails.map((details: any) => (
                                <div className="col-md-6" key={details.id}>
                                  <a
                                    href={details.Link.href}
                                    className="compnay-overview pb-30"
                                    onClick={(e: any) => setIsCollapsed(e)}
                                  >
                                    <div className="d-flex">
                                      <i className={details.ClassIcon.replaceAll("_", "-")}></i>
                                      <span className="secondary-title">
                                        {details.Detail.Title}
                                        {details.Hiring == true ? <span className="hiring-badge">Hiring</span> : ""}
                                      </span>
                                    </div>
                                    <RichText htmlContent={details.Detail.Description}></RichText>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                    <NavDropdown
                      title={
                        <span>
                          {item.attributes.InsightTitle}
                          {isMobile ? (
                            <span className="bi bi-chevron-down pt-1" />
                          ) : (
                            <ChevronDown className="bi bi-chevron-down pt-1" />
                          )}
                        </span>
                      }
                      onClick={(e: any) => handleSubLiClick(e, 4)}
                      className={`position-static ${isActive ? "open_slide_menu" : ""} ${
                        activeMenuItem === 4 ? "show" : ""
                      }`}
                    >
                      <div className="service-menu-main">
                        <div className="row mega-content blog-menu">
                          <div className="col-md-8">
                            <div className="left-section">
                              <h2 className="title-text mobile-text" onClick={(e) => closeSubMenu(e)}>
                                <i className="bi bi-chevron-down pt-1"></i>
                                {item.attributes.InsightTitle}
                              </h2>
                              {!isMobile ? (
                                <h2 className="title-text">
                                  <a
                                    href={item.attributes.Insights[0].Link.href}
                                    onClick={(e: any) => setIsCollapsed(e)}
                                  >
                                    {item.attributes.Insights[0].Link.label}
                                    <i className="chevron-right"></i>
                                  </a>
                                </h2>
                              ) : null}

                              <RichText htmlContent={item.attributes.Insights[0].Description} />
                              <span className="label">{item.attributes.Insights[0].Title}</span>
                              <div className="blog-overview">
                                {item.attributes.LatestBlogs == false ? (
                                  <ul>
                                    {item.attributes.blogs.data.map((blogs: any, index: any) =>
                                      index <= 2 ? (
                                        <li key={blogs.id}>
                                          <a
                                            href={`/blogs-insights/${blogs.attributes.Blogs.Links.href}`}
                                            onClick={(e: any) => e.stopPropagation()}
                                          >
                                            <div className="blog-image">
                                              {blogs.attributes.Blogs.HeaderImage == null ? null : (
                                                <img
                                                  src={blogs.attributes.Blogs.HeaderImage.data.attributes.url}
                                                  alt={
                                                    blogs.attributes.Blogs.HeaderImage.data.attributes.alternativeText
                                                  }
                                                  loading="lazy"
                                                />
                                              )}
                                            </div>
                                            <p className="content">{blogs.attributes.Blogs.Title}</p>
                                            <span className="blog-link">
                                              {blogs.attributes.Blogs.Links.label}
                                              <i className="arrow-right">
                                                <img
                                                  src={
                                                    "https://do7q3d8g8n6kn.cloudfront.net/blog_icon_arrow_172020ccbb.svg"
                                                  }
                                                  alt="blog-icon-arrow"
                                                  loading="lazy"
                                                />
                                              </i>
                                            </span>
                                          </a>
                                        </li>
                                      ) : (
                                        ""
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <ul>
                                    {userDetailsAPI?.data?.map((data: any, index: any) =>
                                      index <= 2 ? (
                                        <li key={index}>
                                          <a
                                            href={`/blogs-insights/${data.attributes.Blogs.Links.href}`}
                                            onClick={(e: any) => setIsCollapsed(e)}
                                          >
                                            <div className="blog-image">
                                              <img
                                                src={data.attributes.Blogs.HeaderImage.data.attributes.url}
                                                alt="blog-icon-arrow"
                                                loading="lazy"
                                              />
                                            </div>
                                            <p className="content">{data.attributes.Blogs.Title}</p>
                                            <span className="blog-link">
                                              {data.attributes.Blogs.Links.label}
                                              <i className="arrow-right">
                                                <img
                                                  src={
                                                    "https://do7q3d8g8n6kn.cloudfront.net/blog_icon_arrow_172020ccbb.svg"
                                                  }
                                                  alt="blog-icon-arrow"
                                                  loading="lazy"
                                                />
                                              </i>
                                            </span>
                                          </a>
                                        </li>
                                      ) : (
                                        ""
                                      )
                                    )}
                                  </ul>
                                  // <h1>not select latest blog</h1>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <a
                              href="/blogs-insights"
                              className="compnay-overview pb-30 mobile-blog-menu insight-menu"
                              onClick={(e: any) => setIsCollapsed(e)}
                            >
                              <div className="d-flex">
                                <i className="user-edit-icon"></i>
                                <span className="secondary-title">Blogs</span>
                              </div>
                              <p className="content">
                                Latest news, industry insights, tech advice and much more for you to explore.
                              </p>
                            </a>
                            {item.attributes.InsightsDetail.map((insight: any) => (
                              // eslint-disable-next-line react/jsx-key
                              <a
                                key={insight.id}
                                href={insight.Link.href}
                                className="compnay-overview pb-30 insight-menu"
                                onClick={(e: any) => setIsCollapsed(e)}
                              >
                                <div className="d-flex">
                                  <i className={insight.ClassIcon.replaceAll("_", "-")}></i>
                                  <span className="secondary-title">{insight.Detail.Title}</span>
                                </div>
                                <RichText htmlContent={insight.Detail.Description} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <HeaderForms data={item.attributes.contact_form_title.data.attributes.Right} />
              </div>
            </Container>
          ))}
        </Navbar>
      </header>
    </>
  );
};
export default MainHeader;

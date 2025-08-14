"use client";
import Link from "next/link";

export default function BannerNav(data: any) {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault(); // Prevent the URL from updating

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tab-menu">
      <div className="container p-0">
        {data.data.data.attributes.banner_navigation == null ? null : (
          <ul>
            {data.data.data.attributes.banner_navigation.data.attributes.NavLink.map((item: any) => (
              <li key={item.id}>
                {item.href == null ? null : (
                  <a href={item.href} onClick={(e) => handleScroll(e, item.href.replace("#", ""))}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

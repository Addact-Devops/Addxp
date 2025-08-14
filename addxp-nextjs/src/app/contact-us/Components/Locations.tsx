"use client";
import RichText from "@/Components/Common";

export default function Locations(data: any) {
  return (
    <section className="maps-component" id="maps-component">
      {data.data.locations.data.map((item: any) => (
        <div className="container" key={item.id}>
          <div className="row">
            <div className="col-md-7">
              {item.attributes.AddressLocation.map((address: any) => (
                <div className="map-desc" key={address.id}>
                  <span className="tag-line">{address.Title}</span>
                  <h2 className="sub_title_5">{address.SubTitle}</h2>
                  <RichText htmlContent={address.Body}></RichText>
                  {item.attributes.contact_infos.data.map((locationinfo: any) => (
                    <div className="phone-desc" key={locationinfo.id}>
                      {locationinfo.attributes.ContactInfo.map((iconlink: any) => (
                        <a key={iconlink.id} href={iconlink.LinkIcons[0].href} className="phone">
                          <img
                            src={iconlink.HoverIcon.data.attributes.url}
                            loading="lazy"
                            alt={iconlink.HoverIcon.data.attributes.alternativeText}
                          />
                          {iconlink.LinkIcons[0].label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="col-md-5">
              <div className="map-images">
                <iframe src={item.attributes.MapLinks[0].href} loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

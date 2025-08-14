"use client";
import RichText from "../Common";

const AddXpFooter = (props: any) => {
    const { userFooterDetails } = props;

    return (
        <footer>
            <div className='container'>
                {userFooterDetails?.data.map((item: any) => (
                    <div className='footer-main' key={item.id}>
                        <div className='footer-box'>
                            {item.attributes.FooterImg.data == null ? (
                                <img
                                    src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                                    alt='Addxp_Place_holder_4333d94906.png'
                                    loading='lazy'
                                />
                            ) : (
                                <img
                                    src={item.attributes.FooterImg.data.attributes.url}
                                    loading='lazy'
                                    alt='logo'
                                    className='circle'
                                />
                            )}

                            <p>{item.attributes.FooterTitle}</p>

                            <ul className='social-icon'>
                                {item.attributes.SocialIcons.map((icondata: any) => (
                                    <li key={icondata.id}>
                                        <a href={icondata.LinkIcons[0].href}>
                                            {icondata.Icons.data == null ? null : (
                                                <img
                                                    src={icondata.Icons.data.attributes.url}
                                                    alt={icondata.Icons.data.attributes.alternativeText}
                                                    loading='lazy'
                                                />
                                            )}
                                            {icondata.HoverIcon.data == null ? null : (
                                                <img
                                                    src={icondata.HoverIcon.data.attributes.url}
                                                    alt={icondata.Icons.data.attributes.alternativeText}
                                                    className='hover'
                                                    loading='lazy'
                                                />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className='email-main footer-email-desktop'>
                                {item.attributes.locations.data.map((address: any) => (
                                    <ul className='contct-info' key={address.id}>
                                        {address.attributes.contact_infos.data.map((addressinfo: any) =>
                                            addressinfo.attributes.ContactInfo.map((child: any) => (
                                                <li key={child.id}>
                                                    <a href={child.LinkIcons[0].href}>
                                                        {child.Icons.data == null ? null : (
                                                            <img
                                                                src={child.Icons.data.attributes.url}
                                                                alt='mail'
                                                                loading='lazy'
                                                            />
                                                        )}

                                                        {child.LinkIcons[0].label}
                                                    </a>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                ))}
                            </div>
                            {item.attributes.locations.data.map((address: any) => (
                                <div className='footer-address d-none d-md-block' key={address.id}>
                                    <div className='footer-address-title'>
                                        <RichText
                                            htmlContent={address.attributes.AddressLocation[0].Description}
                                        ></RichText>
                                    </div>
                                    <RichText htmlContent={address.attributes.AddressLocation[0].Body}></RichText>
                                </div>
                            ))}
                        </div>
                        <div className='footer-box'>
                            <span className='type1'>{item.attributes.CompanyTitle}</span>
                            <ul>
                                {item.attributes.Company.map((companydata: any) => (
                                    <li key={companydata.id}>
                                        <a href={companydata.LinkIcons[0].href}>
                                            {companydata.Icons.data == null ? null : (
                                                <img
                                                    src={companydata.Icons.data.attributes.url}
                                                    alt={companydata.Icons.data.attributes.alternativeText}
                                                    loading='lazy'
                                                />
                                            )}
                                            {companydata.HoverIcon.data == null ? null : (
                                                <img
                                                    src={companydata.HoverIcon.data.attributes.url}
                                                    alt={companydata.HoverIcon.data.attributes.alternativeText}
                                                    className='hover'
                                                    loading='lazy'
                                                />
                                            )}

                                            {companydata.LinkIcons[0].label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className='footer-address  d-none d-md-block'>
                                <RichText htmlContent={item.attributes.UsaAddress}></RichText>
                            </div>
                        </div>

                        <div className='footer-box services-list'>
                            <span className='type1'>{item.attributes.ServiceTitle}</span>
                            <div className='footer_services_parent'>
                                <ul className='footer-list'>
                                    {item.attributes.Services.map((servicedata: any) => (
                                        <li key={servicedata.id}>
                                            <a href={servicedata.LinkIcons[0].href}>
                                                {servicedata.Icons.data == null ? null : (
                                                    <img
                                                        src={servicedata.Icons.data.attributes.url}
                                                        alt={servicedata.Icons.data.attributes.alternativeText}
                                                        loading='lazy'
                                                    />
                                                )}
                                                {servicedata.HoverIcon.data == null ? null : (
                                                    <img
                                                        src={servicedata.HoverIcon.data.attributes.url}
                                                        alt={servicedata.HoverIcon.data.attributes.alternativeText}
                                                        className='hover'
                                                        loading='lazy'
                                                    />
                                                )}

                                                {servicedata.LinkIcons[0].label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='footer-box footer-box-mobile'>
                            <span className='type1'>Contact Info</span>
                            {item.attributes.locations.data.map((address: any) => (
                                <ul className='contct-info' key={address.id}>
                                    {address.attributes.contact_infos.data.map((addressinfo: any) =>
                                        addressinfo.attributes.ContactInfo.map((child: any) => (
                                            <li key={child.id}>
                                                <a href={child.LinkIcons[0].href}>
                                                    {child.Icons.data == null ? null : (
                                                        <img
                                                            src={child.Icons.data.attributes.url}
                                                            alt='mail'
                                                            loading='lazy'
                                                        />
                                                    )}

                                                    {child.LinkIcons[0].label}
                                                </a>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            ))}
                        </div>
                        <div className='footer-box footer-box-mobile'>
                            {item.attributes.locations.data.map((address: any) => (
                                <div className='footer-address' key={address.id}>
                                    <div className='footer-address-title'>
                                        <RichText
                                            htmlContent={address.attributes.AddressLocation[0].Description}
                                        ></RichText>
                                    </div>
                                    <RichText htmlContent={address.attributes.AddressLocation[0].Body}></RichText>
                                </div>
                            ))}

                            <div className='footer-address'>
                                <RichText htmlContent={item.attributes.UsaAddress}></RichText>
                            </div>
                        </div>
                    </div>
                ))}

                {userFooterDetails?.data.map((item: any) => (
                    <div className='copy-main' key={item.id}>
                        <ul>
                            {item.attributes.Copy.map((copydata: any) => (
                                <li key={copydata.id}>
                                    <a href={copydata.href}>{copydata.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className='copy'>{item.attributes.CopyTitle}</div>
                    </div>
                ))}
            </div>
        </footer>
    );
};
export default AddXpFooter;

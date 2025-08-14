import RichText from "@/Components/Common.jsx";
import DownloadForm from "./DownloadForm";

export default function Experience(data: any) {
  return (
    <section className='brand-tagline'>
      <div className='container'>
        {data.data.data.attributes.brand_taglines.data == null ? null : (
          <div className='brand-box-main'>
            {data.data.data.attributes.brand_taglines.data.map((item: any) => (
              <div className='brand-box' key={item.id}>
                {item.attributes.Description == null ? null : (
                  <RichText htmlContent={item.attributes.Description}></RichText>
                )}
                <ul>
                  {item.attributes.Tagline.map((taglist: any) => (
                    <li key={taglist.id}>{taglist.Title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <DownloadForm data={data} />
      </div>
    </section>
  );
}

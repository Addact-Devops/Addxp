import RichText from "@/Components/Common.jsx";

export default function Availability(data: any) {
  return (
    <section className='right-image-component'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='right-image-left'>
              <span className='tag-line'>
                {data.data.data.attributes.availability.data.attributes.Availability.Title}
              </span>
              <RichText
                htmlContent={data.data.data.attributes.availability.data.attributes.Availability.Description}
              ></RichText>
              <RichText
                htmlContent={data.data.data.attributes.availability.data.attributes.Availability.Body}
              ></RichText>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='right-image-right'>
              <img
                src={data.data.data.attributes.availability.data.attributes.Availability.Images.data[0].attributes.url}
                loading='lazy'
                alt={
                  data.data.data.attributes.availability.data.attributes.Availability.Images.data[0].attributes
                    .alternativeText
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

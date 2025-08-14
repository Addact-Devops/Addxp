export default function DirectorMessage(data: any) {
  return (
    <section>
      <div className='quote-component' id='overview'>
        <div className='container'>
          {data.data.DirectorMessage.map((item: any) => (
            <div className='row align-items-center' key={item.id}>
              <div className='col-md-5'>
                <div className='quote-image'>
                  <img src={item?.directorImage.data.attributes.url} loading='lazy' alt='quote-image' />
                </div>
              </div>
              <div className='col-md-7'>
                <div className='quote-desc'>
                  <>
                    <div className='type6'>{item.message}</div>
                    <small>
                      {item.directorName} - <span>{item.designation}</span>
                    </small>
                  </>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

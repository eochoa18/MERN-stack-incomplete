import { useState, useEffect } from 'react';
import svg from '../assets/img/icons.svg';
import axios from 'axios';

function Cards(props) {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let processing = true;
    getTours(processing).then((tours) => {
      if (processing) {
        setTourData(tours);
        setLoading(false);
      }
    });
    return () => {
      processing = false;
    };
  }, []);

  const getTours = async (processing) => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/tours');
      // const res = await axios.get('http://localhost:3000/');
      if (processing) {
        const data = JSON.parse(JSON.stringify(res.data.data.data));
        const tours = data.map((tour) => tour);
        return tours;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className='main'>
        <div className='card-container'>
          {tourData.map((tour) => (
            <div className='card' key={tour.id}>
              <div className='card__header'>
                <div className='card__picture'>
                  <div className='card__picture-overlay'>&nbsp;</div>
                  <img
                    src={require(`../assets/img/tours/${tour.imageCover}`)}
                    // src='../assets/img/tours/tour-1-cover.jpg'
                    alt={tour.name}
                    className='card__picture-img'
                  />
                </div>

                <h3 className='heading-tertirary'>
                  <span>{tour.name}</span>
                </h3>
              </div>
              <div className='card__details'>
                <h4 className='card__sub-heading'>{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                <p className='card__text'>{`${tour.summary}`}</p>
                <div className='card__data'>
                  <svg className='card__icon'>
                    {/* <use xlink:href="img/icons.svg#icon-map-pin"></use> */}
                    <use xlinkHref={`${svg}#icon-map-pin`}></use>
                  </svg>
                  <span>{`${tour.startLocation.description}`}</span>
                </div>
                <div className='card__data'>
                  <svg className='card__icon'>
                    <use xlinkHref={`${svg}#icon-calendar`}></use>
                  </svg>
                  <span>{`${new Date(tour.startDates[0]).toLocaleString(
                    'default',
                    { month: 'long', year: 'numeric' }
                  )}`}</span>
                </div>
                <div className='card__data'>
                  <svg className='card__icon'>
                    <use xlinkHref={`${svg}#icon-flag`}></use>
                  </svg>
                  <span>{`${tour.locations.length} stops`}</span>
                </div>
                <div className='card__data'>
                  <svg className='card__icon'>
                    <use xlinkHref={`${svg}#icon-user`}></use>
                  </svg>
                  <span>{`${tour.maxGroupSize} people`}</span>
                </div>
              </div>

              <div className='card__footer'>
                <p>
                  <span className='card__footer-value'>{`$${tour.price}`}</span>
                  <span className='card__footer-text'> per person</span>
                </p>
                <p className='card__ratings'>
                  <span className='card__footer-value'>{`${tour.ratingsAverage} `}</span>
                  <span className='card__footer-text'>{` ratings (${tour.ratingsQuantity})`}</span>
                </p>
                <a
                  href={`/tour/${tour.slug}`}
                  className='btn btn--green btn--small'
                >
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Cards;

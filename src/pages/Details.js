import axios from 'axios';
import { useState, useEffect } from 'react';
import svg from '../assets/img/icons.svg';
import ReviewCards from '../components/ReviewCard';
import Context from "../components/Context";


function Details() {
  const [tourDetails, setTourDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tourId, setTourId] = useState('');

  const tourName = window.location.href.split('http://localhost:4000/tour/');

  useEffect(() => {
    let processing = true;
    getTourDetails(processing).then((tours) => {
      if (processing) {
        setTourDetails(tours);
        setTourId(tours.id)
        setLoading(false);
      }
    });
    return () => {
      processing = false;
    };
  }, []);

  const getTourDetails = async (processing) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/tours`);
      // const res = await axios.get('http://localhost:3000/');
      //   console.log(res.data.data.data[0].name)
      if (processing) {
        const data = JSON.parse(JSON.stringify(res.data.data.data));
        // console.log('data for loop\n');

        for (let i in data) {
          if (data[i].slug === tourName[1]) {
            // console.log('the tour id is:', data[i].id);
            return data[i];
          }
        }
        console.log('done');
      }
    } catch (error) {
      console.log('errror\n', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className='section-header'>
        <div className='header__hero'>
          <div className='header__hero-overlay'>&nbsp;</div>
          <img
            src={require(`../assets/img/tours/${tourDetails.imageCover}`)}
            alt={tourDetails.name}
            className='header__hero-img'
          />
        </div>
        <div className='heading-box'>
          <h1 className='heading-primary'>
            <span>{`${tourDetails.name} tour`}</span>
          </h1>
          <div className='heading-box__group'>
            <div className='heading-box__detail'>
              <svg className='heading-box__icon'>
                <use xlinkHref={`${svg}#icon-clock`}></use>
              </svg>
              <span className='heading-box__text'>{`${tourDetails.duration} days`}</span>
            </div>
            <div className='heading-box__detail'>
              <svg className='heading-box__icon'>
                ``
                <use xlinkHref={`${svg}#icon-map-pin`}></use>
              </svg>
              <span className='heading-box__text'>{`${tourDetails.startLocation.description}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className='section-description'>
        <div className='overview-box'>
          <div>
            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
              <div className='overview-box__detail'>
                <svg className='overview-box__icon'>
                  <use xlinkHref={`${svg}#icon-calendar`}></use>
                </svg>
                <span className='overview-box__label'>Next date</span>
                <span className='overview-box__text'>{`${new Date(
                  tourDetails.startDates[0]
                ).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`}</span>
              </div>
              <div className='overview-box__detail'>
                <svg className='overview-box__icon'>
                  <use xlinkHref={`${svg}#icon-trending-up`}></use>
                </svg>
                <span className='overview-box__label'>Difficulty</span>
                <span className='overview-box__text'>{`${tourDetails.difficulty}`}</span>
              </div>
              <div className='overview-box__detail'>
                <svg className='overview-box__icon'>
                  <use xlinkHref={`${svg}#icon-user`}></use>
                </svg>
                <span className='overview-box__label'>Participants</span>
                <span className='overview-box__text'>{`${tourDetails.maxGroupSize} people`}</span>
              </div>
              <div className='overview-box__detail'>
                <svg className='overview-box__icon'>
                  <use xlinkHref={`${svg}#icon-star`}></use>
                </svg>
                <span className='overview-box__label'>Rating</span>
                <span className='overview-box__text'>{`${tourDetails.ratingsAverage} / 5`}</span>
              </div>
            </div>

            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>
              {tourDetails.guides.map((guide) => (
                <div key={guide._id} className='overview-box__detail'>
                  <img
                    src={require(`../assets/img/users/${guide.photo}`)}
                    alt={`${guide.name}`}
                    className='overview-box__img'
                  />
                  <span className='overview-box__label'>
                    {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                  </span>
                  <span className='overview-box__text'>{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='description-box'>
          <h2 className='heading-secondary ma-bt-lg'>{`About the ${tourDetails.name} tour`}</h2>
          {tourDetails.description.split('\n').map((p) => (
            <p key={p.id} className='description__text'>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className='section-pictures'>
        {tourDetails.images.map((image, index) => (
            <div key={index} className='picture-box'>
                <img 
                    className={`picture-box__img picture-box__img--${index+1}`}
                    src={require(`../assets/img/tours/${image}`)}
                    alt={`The Park Camper Tour ${index+1}`}
                />
            </div>
        ))}
      </section>

      <section className='section-map'>
        <div id='map'></div>
        {/* <script>
                    mapboxgl.accessToken =
                    'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

                    const geojson = {
                    type: 'FeatureCollection',
                    features: [
                        {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-112.987418, 37.198125]
                        },
                        properties: {
                            description: 'Zion Canyon National Park'
                        }
                        },
                        {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-111.376161, 36.86438]
                        },
                        properties: {
                            description: 'Antelope Canyon'
                        }
                        },
                        {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-112.115763, 36.058973]
                        },
                        properties: {
                            description: 'Grand Canyon National Park'
                        }
                        },
                        {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-116.107963, 34.011646]
                        },
                        properties: {
                            description: 'Joshua Tree National Park'
                        }
                        }
                    ]
                    };

                    const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h',
                    scrollZoom: false
                    });

                    const bounds = new mapboxgl.LngLatBounds();

                    geojson.features.forEach(function(marker) {
                    var el = document.createElement('div');
                    el.classNameName = 'marker';

                    new mapboxgl.Marker({
                        element: el,
                        anchor: 'bottom'
                    })
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(map);

                    new mapboxgl.Popup({
                        offset: 30,
                        closeOnClick: false
                    })
                        .setLngLat(marker.geometry.coordinates)
                        .setHTML('<p>' + marker.properties.description + '</p>')
                        .addTo(map);

                    bounds.extend(marker.geometry.coordinates);
                    });

                    map.fitBounds(bounds, {
                    padding: {
                        top: 200,
                        bottom: 150,
                        left: 50,
                        right: 50
                    }
                    });

                    map.on('load', function() {
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                            type: 'LineString',
                            coordinates: [
                                [-112.987418, 37.198125],
                                [-111.376161, 36.86438],
                                [-112.115763, 36.058973],
                                [-116.107963, 34.011646]
                            ]
                            }
                        }
                        },
                        layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                        },
                        paint: {
                        'line-color': '#55c57a',
                        'line-opacity': 0.6,
                        'line-width': 3
                        }
                    });
                    });
                </script> */}
      </section>

      <section className='section-reviews'>
        <div className='reviews'>
            <Context.Provider value={tourId}>
                <ReviewCards />
            </Context.Provider>
        </div>
      </section>

      <section className='section-cta'>
        <div className='cta'>
          <div className='cta__img cta__img--logo'>
            <img src={require('../assets/img/logo-white.png')} alt='Natours logo' className='' />
          </div>
          <img src={require(`../assets/img/tours/${tourDetails.images[1]}`)} alt='Tour-Pic' className='cta__img cta__img--1' />
          <img src={require(`../assets/img/tours/${tourDetails.images[2]}`)} alt='Tour-Pic' className='cta__img cta__img--2' />

          <div className='cta__content'>
            <h2 className='heading-secondary'>What are you waiting for?</h2>
            <p className='cta__text'>
              {`${tourDetails.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
            </p>
            <button className='btn btn--green span-all-rows'>
              Book tour now!
            </button>
          </div>
        </div>
      </section>

      {/* <section className="section-header">
            <div className="heading-box">
                <h1 className="heading-primary">
                    <span>{`${tourDetails.name} tour`}</span>
                </h1>
                <div className="heading-box__group">
                    <div className="heading-box__detail">
                        <svg className="heading-box__icon">
                            <use xlinkHref={`${svg}#icons.svg#icon-clock`}></use>
                        </svg>
                        <span className="heading-box__text">{`${tourDetails.duration} days`}</span>
                    </div>
                    <div className="heading-box__detail">
                        <svg className="heading-box__icon">
                            <use xlinkHref={`${svg}#icons.svg#icon-map-pin`}></use>
                        </svg>
                        <span className="heading-box__text">Las Vegas, USA</span>
                    </div>
                </div>
            </div>
        </section> */}
    </>
  );
}

export default Details;

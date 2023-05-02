import axios from 'axios';
import { useState, useEffect } from 'react';
import svg from '../assets/img/icons.svg';
import Context from './Context';
import { useContext } from 'react';

function ReviewCards() {
  const [reviews, setReviews] = useState([]);
  const tourId = useContext(Context);

  useEffect(() => {
    let processing = true;
    getReviews(processing).then((reviews) => {
      if (processing) {
        setReviews(reviews);
      }
    });
    return () => {
      processing = false;
    };
  }, []);

  const getReviews = async (processing) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/tours/${tourId}`
      );
      if (processing) {
         console.log(res.data.data.data.reviews);
      return res.data.data.data.reviews;
      }

    } catch (err) {
      console.log('\nerror in getReviews (reviewcard)\n', err);
    }
  };

  return (
    <>
      {reviews.map((review,i) => (
        <div key={review.user._id} className='reviews__card'>
          <div className='reviews__avatar'>
            <img
              src={require(`../assets/img/users/${review.user.photo}`)}
              // src='img/users/user-7.jpg'

              alt='Jim Brown'
              className='reviews__avatar-img'
            />
            <h6 className='reviews__user'>{`${reviews[i].user.name}`}</h6>
          </div>
          <p className='reviews__text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            dignissimos sint quo commodi corrupti accusantium veniam saepe
            numquam.
          </p>
          <div className='reviews__rating'>
            {/* for (star in [1,2,3,4,5]){' '}
            {
              <svg className={`reviews__star reviews__star--${review.rating}`}>
                <use xlinkHref={`${svg}#icon-star`}></use>
              </svg>
            } */}
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`reviews__star reviews__star--${review.rating >= star ? 'active' : 'inactive'}`}
              >
                <use xlinkHref={`${svg}#icon-star`}></use>
              </svg>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ReviewCards;

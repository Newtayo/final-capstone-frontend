import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchReservations } from '../redux/reservation/reservationSlice';

const Reservations = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { reservationsList } = useSelector((state) => state.reservations);
  const laptops = useSelector((state) => state.laptops.laptops);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [dispatch, isLoggedIn, navigate, laptops, reservationsList]);

  const sortReservations = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    let hoursA = Number(a.hour.replace(/(^\d+)(.+$)/i, '$1'));
    let hoursB = Number(b.hour.replace(/(^\d+)(.+$)/i, '$1'));

    if (a.hour.includes('pm')) {
      hoursA += 12;
    }

    if (b.hour.includes('pm')) {
      hoursB += 12;
    }

    dateA.setHours(hoursA);
    dateB.setHours(hoursB);

    return dateA - dateB;
  };

  const userReservations = reservationsList.filter((reservation) => reservation.user_id === user);
  const sortedReservations = userReservations.slice().sort(sortReservations);

  return (
    <>
      {isLoggedIn ? (
        <section className="reservations-page">
          <h1>My reservations</h1>
          {sortedReservations.length !== 0 ? (
            <>
              <p className="next-session-info">
                Your next lesson is on
                {' '}
                {((new Date(sortedReservations[0].date)).toUTCString()).substring(0, 16)}
                {' '}
                at
                {' '}
                {sortedReservations[0].hour}
                {' '}
                in
                {sortedReservations[0].city}
                {' '}
                with
                {' '}
                {laptops.find((laptop) => laptop.id === sortedReservations[0].laptop_id)?.name}
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Laptop Name</th>
                    <th>City</th>
                    <th>Date</th>
                    <th>Hour</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReservations.map((item) => (
                    <tr key={item.id}>
                      <td>{laptops.find((laptop) => laptop.id === item.laptop_id)?.name}</td>
                      <td>{item.city}</td>
                      <td>{item.date}</td>
                      <td>{item.hour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="no-items-available">
              <div>There are no reservations currently</div>
              <Link to="/reserve">
                <button type="button">Make a reservation now!</button>
              </Link>
            </div>
          )}
        </section>
      ) : (
        <div className="popup-message">
          <p>Please log in to access this page</p>
        </div>
      )}
    </>
  );
};

export default Reservations;

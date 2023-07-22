import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Reservations = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
  }, [isLoggedIn, navigate]);




  if (isLoggedIn) {
    return (
      <section className="reservations-page">
        <h1>My reservations</h1>
        {reservations.length !== 0 ? (
          <>
            <p className="next-session-info">
              Your next lesson is on
              {' '}
              {((new Date(reservations[0].date)).toUTCString()).substring(0, 16)}
              {' '}
              at
              {' '}
              {reservations[0].hour}
              {' '}
              in
              {' '}
              {reservations[0].city}
              {' '}
              with
              {' '}
              {laptops.find((laptop) => laptop.id === reservations[0].laptop_id).firstName}
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
                {reservations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {laptops.find((laptop) => laptop.id === item.laptop_id).name}
                    </td>
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
            <Link to="/reserve"><button type="button">Make a reservation now!</button></Link>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="popup-message">
      <p>Please log in to access this page</p>
    </div>
  );
};

export default Reservations;

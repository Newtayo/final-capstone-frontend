import React from 'react'
import { UseSelector } from 'react-redux/es/hooks/useSelector'

const DeleteLaptop = () => {
    const availableLaptops = useSelector((store) => store.laptops.laptops);
  return (
    <section className="delete-laptop-page">
    <h1>Delete a laptop</h1>

    {availableLaptops.length !== 0 ? (
      <ul className="available-laptops-list">
        {availableLaptops.map((item) => (
          <li className="available-laptop" key={item.id}>
            <span>
              {item.name}
            </span>
            <button
              type="button"
              name="delete"
              className="delete-btn"
              value={item.id}
              onClick={removeData}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-items-available">
        <div>There are no laptops available.</div>
        <button type="button"><Link to="/"> Go back to the home page</Link></button>
      </div>
    )}
  </section>
  )
}

export default DeleteLaptop
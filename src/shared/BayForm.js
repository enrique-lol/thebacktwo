import React from 'react'

const BayForm = ({ bay, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      required
      name="designation"
      type="text"
      placeholder="Bay A, Bay One, Bay Two..."
      value={bay.designation}
      onChange={handleChange}
    />
    <input
      required
      name="shelfCount"
      type="text"
      placeholder="number of shelves"
      value={bay.shelfCount}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default BayForm

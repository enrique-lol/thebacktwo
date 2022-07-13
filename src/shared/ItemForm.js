import React from 'react'

const ItemForm = ({ item, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      required
      name="name"
      type="text"
      placeholder="What is this?"
      value={item.name}
      onChange={handleChange}
    />
    <input
      required
      name="count"
      type="text"
      placeholder="How many units do you have?"
      value={item.count}
      onChange={handleChange}
    />
    <input
      name="notes"
      type="text"
      placeholder="Notes (Pile, Boxes on pallet, seasonal, origin, etc )"
      value={item.notes}
      onChange={handleChange}
    />
    <input
      name="clearTargetDate"
      type="text"
      placeholder="optional: target clear date"
      value={item.clearTargetDate}
      onChange={handleChange}
    />
    <input
      name="bayId"
      type="text"
      placeholder="Bay ID"
      value={item.bayId}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default ItemForm

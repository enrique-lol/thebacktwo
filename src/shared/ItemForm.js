import React from 'react'

const ItemForm = ({ item, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      required
      name="thumbnail"
      type="text"
      placeholder="Thumbnail"
      value={item.thumbnail}
      onChange={handleChange}
    />
    <input
      required
      name="title"
      type="text"
      placeholder="Title"
      value={item.title}
      onChange={handleChange}
    />
    <input
      required
      name="artist"
      type="text"
      placeholder="Artist"
      value={item.artist}
      onChange={handleChange}
    />
    <input
      required
      name="priceEther"
      type="text"
      placeholder="price in etherium"
      value={item.priceEther}
      onChange={handleChange}
    />
    <input
      name="collectionId"
      type="text"
      placeholder="Add Collection ID (opt)"
      value={item.collectionId}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default ItemForm

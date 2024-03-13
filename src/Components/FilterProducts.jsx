import React from "react";

function FilterProducts({
  setSearchInput,
  setMaxPrice,
  setSelectedCategory,
  sortProducts,
}) {
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    sortProducts(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      <input
        type="number"
        placeholder="Max Price..."
        onChange={handlePriceChange}
      />

      <select onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">fragrances</option>
        <option value="skincare">skincare</option>
        <option value="groceries">groceries</option>
        <option value="home-decoration">home-decoration</option>
        <option value="furniture">furniture</option>
        <option value="tops">tops</option>
        <option value="womens-dresses">womens-dresses</option>
        <option value="womens-shoes">womens-shoes</option>
        <option value="mens-shirts">mens-shirts</option>
        <option value="mens-shoes">mens-shoes</option>
      </select>

      <select onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="title_asc">A-Z Title</option>
        <option value="title_desc">Z-A Title</option>
        <option value="price_asc">Sort Price Ascending</option>
        <option value="price_desc">Sort Price Descending</option>
      </select>
    </div>
  );
}

export default FilterProducts;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import FilterProducts from "./Components/FilterProducts";

function ProductList() {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProductData(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [productData, searchInput, maxPrice, selectedCategory]);

  const applyFilters = () => {
    let filtered = productData.filter((product) => {
      let matchesSearch = true;
      let matchesPrice = true;
      let matchesCategory = true;

      if (searchInput) {
        matchesSearch = product.title
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }

      if (maxPrice) {
        matchesPrice = product.price <= parseFloat(maxPrice);
      }

      if (selectedCategory) {
        matchesCategory =
          product.category.toLowerCase() === selectedCategory.toLowerCase();
      }

      return matchesSearch && matchesPrice && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const sortProducts = (value) => {
    let sortedProducts = [...productData];

    switch (value) {
      case "title_asc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price_asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProductData(sortedProducts);
  };

  return (
    <div className="blog-contain card text-center">
      <div className={`${styles.BackGround} ${styles.container} card-body`}>
        <h1 className={`${styles.heading}`}>PRODUCT LIST</h1>
        <FilterProducts
          setSearchInput={setSearchInput}
          setMaxPrice={setMaxPrice}
          setSelectedCategory={setSelectedCategory}
          sortProducts={sortProducts}
        />
        <div className={`row`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`text-white col-3 position-relative ${styles.detailbox}`}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  className={`${styles.imagetag} m-3`}
                  src={product.images[0]}
                  alt={product.title}
                />
              </Link>
              <h2 style={{ color: "black" }}>{product.title}</h2>
              <p style={{ color: "black" }}>Price: ${product.price}</p>
              <p style={{ color: "black" }}>Category:{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;




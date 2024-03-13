import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // const [showSlider, setShowSlider] = useState(false);
  // const [CurrentImageIndex, setCurrentImageIndex] = useState(false);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.sliderContainer}>
        {product?.images?.length> 1 ? (
        <Slider {...sliderSettings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
        ) : (
          <>
            <img className="img" src={product?.images[0]} alt={`Image ${1}`}></img>
          </>
          )}
      </div>
      <div className={styles.detailsContainer}>
        <h2 style={{ color: "#5D001E" }}>{product.title}</h2>
        <p style={{ color: "#5D001E" }}>{product.description}</p>
        <div style={{ color: "#2A1B3D" }}>
          <p>Price: ${product.price}</p>
          <p>DiscountPercentage:{product.discountPercentage}%</p>
          <p>Rating:{product.rating}</p>
          <p>Stock:{product.stock}</p>
          <p>Brand:{product.brand}</p>
          <p>Category:{product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

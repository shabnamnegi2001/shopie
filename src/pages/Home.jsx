import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreContext from "../context";

const Home = () => {
  const [products, setProducts] = useState([]);

  const navigator = useNavigate()
  const {
    cartState
  } = useContext(StoreContext)

  const [ productsInCart, setProductsInCart] = cartState

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(" https://api.escuelajs.co/api/v1/products")
        .then((response) => {
            console.log(response)
            setProducts(response.data)
        });
    };
    fetchProducts()
  }, []);

  // useEffect(() => {
  //   console.log(products)
  //   if (products.length)
  //     products.forEach((p)=>{
  //   addToCart(p)
  // })

  // }, [products])

  const addToCart = (product) => {
        setProductsInCart((prev) => {
            const next = {
                ...prev
            };
            next[product['id']] = {
                ...(prev['id'] || {}),
                ...product,
                units : 1 + (prev?.id?.units || 0)
            }
            return next
        })
  }

  return (
    <div className="container m-auto ">
        <Navbar />
      <div className="grid  md:grid-cols-12  grid-cols-1 md:grid-flow-col grid-flow-row gap-4 px-4 py-4">
        <div className="z-3 p-4  bg-gray-100 rounded-xl md:col-span-3 sticky top-[0px] md:top-[80px] ">
        <Filters  filterProducts={setProducts} />
        </div>
        <div className="p-4 w-full bg-gray-100 rounded-xl row-span-2 md:col-span-12 row-span-2" >
        <div className="product-list flex flex-row flex-wrap gap-4 align-center justify-center">
          {products?.map((product) => {
            return <ProductCard data={product} key={product.id} addToCart = {addToCart}/>;
          })}
        </div>
        {!products.length && <h1>Not found...</h1>}

        </div>
      </div>
    </div>
  );
};

export default Home;

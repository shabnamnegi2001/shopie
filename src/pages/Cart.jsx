import React, { useContext, useEffect, useMemo } from "react";
import StoreContext from "../context";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cartState, toastState } = useContext(StoreContext);
  const [products, setProducts] = cartState;

  const [toast, setToast] = toastState;

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  const decreaseCount = (product) => {
    if (products[product?.id]) {
      setProducts((prev) => {
        const next = { ...prev };

        if (next[product.id].units <= 1) {
          delete next[product.id];
        } else {
          next[product.id].units -= 1;
        }
        return next;
      });
    }
  };

  const increaseCount = (product) => {
    setProducts((prev) => {
      const next = { ...prev };
      next[product.id].units += 1;
      return next;
    });
  };

  const totalPrice = useMemo(() => {
    const _totalPrice =
      Object.values(products)?.reduce((total, current) => {
        return total + current?.units * current?.price;
      }, 0) || 0;

    return _totalPrice;
  }, [products]);

  return (
    <div className="container mx-auto">
      <Navbar />
      {Object.values(products).length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col grid-flow-row gap-4 px-4 py-4">
            <div className="bg-gray-100 rounded-xl  p-4 row-span-12 col-span-1  md:col-span-12 md:row-span-1 ">
              <div className="flex flex-row flex-wrap gap-4 align-center justify-center">
                {Object.values(products)?.map((product) => {
                  console.log(product);
                  return (
                    <ProductCard
                      data={product}
                      key={product.id}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                    />
                  );
                })}
              </div>
            </div>
            <div className="rounded-lg  h-[100px] bg-gray-100 w-full p-4 order-first md:order-last col-span-1 md:col-span-2 sticky top-[0px] md:top-[80px]">
              <h1 className="text1">
                Subtotal
                <span className="px-4 text-lg text-green-500">
                  {totalPrice} $
                </span>
              </h1>
              <button
                className="button1 rounded-full"
                onClick={() => {

                    setProducts([])
                  setToast((prev) => {
                    return [
                      ...prev,
                      {
                        type: "info",
                        content: "Order placed successfully !",
                      },
                    ];
                  });
                }}
              >
                Proceed to Buy ({Object.values(products).length} items){" "}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="">Your Shopping Cart is empty...</div>
      )}
    </div>
  );
};

export default Cart;

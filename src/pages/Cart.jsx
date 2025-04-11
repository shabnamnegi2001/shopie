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
          <div className="grid grid-rows-1 grid-cols-12 grid-flow-col gap-4 px-4 py-4">
            <div className="col-span-12  ">
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

            <div className="my-4  row-span-2 col-span-2 sticky top-[80px]">
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

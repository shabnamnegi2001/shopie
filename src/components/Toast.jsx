import React, { useEffect, useState } from "react";
import { useContext } from "react";
import StoreContext from "../context";

const Toast = () => {
  const { toastState } = useContext(StoreContext);
  const [toastData, setToastData] = toastState;

  useEffect(() => {
    if (toastData?.length) {
      setTimeout(() => {
        setToastData((prev) => {
          let next = [...prev];
          next?.pop();
          return next;
        });
      }, 4000);
    }
  }, [toastData]);

  return toastData ? (
    <div className="flex flex-rows gap-5 fixed w-auto h-auto items-center justify-center top-[20%] left-[45%] toast-container">
      {toastData?.map((data, index) => {
        return (
          <div className={` shadow-xl px-4 py-2 rounded-xl toast-box toast-${data.type}`} key={index}>
            {data.content}
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default Toast;

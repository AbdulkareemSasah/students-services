"use client";
import { Button } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import  MySwiper from "./Swiper";
const data = [
    {
        title: "Ali",
    },
    {
        title: "Ali",
    },
    {
        title: "Ali",
    }
]
export default function MainContent() {
  return (
    <>
      <section className="flex flex-col space-y-8 justify-center min-h-[80vh] w-full px-6 text-center items-center align-middle">
        <h1 className="text-5xl font-extrabold text-transparent  bg-gradient-to-br from-blue-600 via-indigo-500 to-pink-900 bg-clip-text gap-3">
          Your Helper to the best <span className="text-blue-600">Future</span>
        </h1>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          nihil exercitationem molestias doloremque sed tempore iusto quos
          labore optio quaerat tenetur quo aliquam laudantium odit possimus
          quae, quia voluptatem reprehenderit!
        </p>
        <Button variant="shadow" color="primary">
          {" "}
          Get Started{" "}
        </Button>
      </section>
      <MySwiper
        data={data}
        classesForSlide="grid grid-col-1 gap-4 w-full  rounded-3xl place-content-center "
      />
    </>
  );
}

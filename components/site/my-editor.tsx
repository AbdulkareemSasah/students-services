"use client";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  SelectedItems,
} from "@nextui-org/react";
const colors = require("tailwindcss/colors");
const colorsCurrent = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
]

import { Input } from "../dashboard/ui/input";
const sizes = [
  { label: "9xl", value: "text-9xl" },
  { label: "8xl", value: "text-8xl" },
  { label: "7xl", value: "text-7xl" },
  { label: "6xl", value: "text-6xl" },
  { label: "5xl", value: "text-5xl" },
  { label: "4xl", value: "text-4xl" },
  { label: "3xl", value: "text-3xl" },
  { label: "2xl", value: "text-2xl" },
  { label: "xl", value: "text-xl" },
  { label: "md", value: "text-md" },
  { label: "sm", value: "text-sm" },
];

export function InputCompo() {
  const [textStyle, setTextStyle] = useState<string[]>([]);
  const [showing, setShowing] = useState(false);
  const [colorStyle, setColorStyle] = useState("slate");
  const [bgStyle, setBgStyle] = useState("slate");
  const inputRef = useRef(null);
  const handleBlur = () => {
    setShowing(false);
  };

  const handleButtonClick = (value: string) => {
    console.log(Object.keys(colors));
    if (!textStyle.includes(value)) setTextStyle([...textStyle, value]);
    else setTextStyle(textStyle.filter((e) => e !== value));
  };


  return (
    <>
      <div className="relative">
        {}
        <div
          id="menu"
          className={`flex relative ${showing ? "" : "hidden"}`}
          style={{ bottom: "100%", right: 0 }}
        >
          <ButtonGroup dir="ltr">
            <Button
              className={`font-bold ${
                textStyle.includes("font-bold") ? "shadow" : "flat"
              }`}
              isIconOnly
              color={textStyle.includes("font-bold") ? "primary" : "default"}
              // @ts-ignore
              onFocus={() => inputRef.current?.focus()}
              onClick={() => handleButtonClick("font-bold")}
            >
              B
            </Button>

            <Button
              className={`italic ${
                textStyle.includes("italic") ? "shadow" : "flat"
              }`}
              color={textStyle.includes("italic") ? "primary" : "default"}
              // @ts-ignore
              onFocus={() => inputRef.current?.focus()}
              isIconOnly
              onClick={() => handleButtonClick("italic")}
            >
              I
            </Button>
            <Popover placement="bottom" showArrow={true} onFocus={() => setShowing(true)}>
            <PopoverTrigger onFocus={() => setShowing(true)}>
              <Button onFocus={() => setShowing(true)} className={colorStyle.replace("text","bg")} isIconOnly></Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 m-0 rounded-none" onFocus={() => setShowing(true)}>
              <div className="grid grid-cols-1">
                {colorsCurrent.map((color) => (
                  <div className="grid grid-cols-11">
                    {Object.keys(colors[color]).map((degree) => (
                      <div onClick={() => setColorStyle(`text-${color}-${degree}`)} className={`h-5 w-5 bg-${color}-${degree} ${colorStyle === `text-${color}-${degree}` && "border-1 border-black"}`}></div>
                    ))}
                  </div>
                ))}
              </div>
            </PopoverContent>
            </Popover>
            <Popover placement="bottom" showArrow={true} onFocus={() => setShowing(true)}>
            <PopoverTrigger onFocus={() => setShowing(true)}>
              <Button onFocus={() => setShowing(true)} className={bgStyle} isIconOnly></Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 m-0 rounded-none" onFocus={() => setShowing(true)}>
              <div className="grid grid-cols-1">
                {colorsCurrent.map((color) => (
                  <div className="grid grid-cols-11 bg-none">
                    {Object.keys(colors[color]).map((degree) => (
                      <div onClick={() => setBgStyle(`bg-${color}-${degree}`)} className={`h-5 w-5 bg-${color}-${degree} ${bgStyle === `bg-${color}-${degree}` && "border-1 border-black"}`}></div>
                    ))}
                  </div>
                ))}
              </div>
            </PopoverContent>
            </Popover>
          </ButtonGroup>
          <Select
            size="sm"
            labelPlacement="outside"
            className="w-20  rounded-full"
            placeholder="Size"
            onFocus={() => setShowing(true)}
            onChange={(event) => handleButtonClick(event.target.value)}
          >
            {sizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </Select>

         
        </div>
        <Input
          className={`rounded-none   border-none focus:border-none py-1 bg-transparent focus:border-transparent ${textStyle.join(
            " "
          )} h-fit ${colorStyle} ${bgStyle}`}
          ref={inputRef}
          onFocus={() => setShowing(true)}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}


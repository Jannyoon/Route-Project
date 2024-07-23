import React, { Component } from "react";
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}


export function ProductNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{...style, display:'block'}}
      onClick={onClick}>
      <IoIosArrowForward class="arrows" style={{"color":"black"}}/>
    </div>
  );
}

export function ProductPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{...style, display:'block'}}
      onClick={onClick}
    ><IoIosArrowBack class="arrows" style={{"color":"black"}}/>
    </div>
  );
}

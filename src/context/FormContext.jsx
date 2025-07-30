// src/contexts/FormContext.js
import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // PostTitle
    title: "",
    description: "",

    // PostLocation
    province: "",
    district: "",
    subDistrict: "",
    address: "",

    // PostDetail
    propertyType: "",
    size: "",
    totalRooms: "",
    yearBuilt: "",
    bedrooms: "",
    bathrooms: "",
    nearbyPlaces: [],
    amenities: [],
    parking: false,

    // PostPrice
    saleOrRent: "sell", // "sell" or "rent"
    price: "",
    installmentType: "", // "owner" or "bank"
    installmentPeriod: "",
    interestRate: "",
    extraExpenses: [],

    // PostInform
    name: "",
    email: "",
    phone: "",
    line: "",
    facebook: "",
    useLine: false,
    useFacebook: false,

    // PostUpload
    housePhotos: [],
    documents: [],

    // PostConfirm
    confirm1: false,
    confirm2: false,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

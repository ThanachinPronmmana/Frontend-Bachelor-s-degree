// src/context/FormContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "postFormData";
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  // โหลดค่าจาก localStorage ตอน mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // บันทึกลง localStorage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);

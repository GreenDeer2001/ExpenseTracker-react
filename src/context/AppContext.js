import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import reducer from "../reducer/reducer";
import initialState from "../reducer/initialState";

const categoriesInit= [
  { text: "All", id: 0, active: true },
  { text: "Salary", id: 1, active: false },
  { text: "Investments", id: 2, active: false },
  { text: "Home", id: 3, active: false },
  { text: "Food", id: 4, active: false },
  { text: "Clothes", id: 5, active: false },
  { text: "Bills", id: 6, active: false },
  { text: "Entertainment", id: 7, active: false },
]

const ContextProvider = createContext();

export const AppContext = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showCat, setShowCat] = useState(false);
  const [categories, setCategories] = useState(categoriesInit);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [period, setPeriod] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    setCategories(state =>state.map(cat=>{
      return {...cat , active: currentCategory === cat.id ? true : false}
    }))
   
  }, [currentCategory])

  useEffect(()=>{
    localStorage.setItem("MONEYTRACKER", JSON.stringify(state))
  },[state])

  return (
    <ContextProvider.Provider
      value={{
        state,
        dispatch,
        showEditForm,
        setShowEditForm,
        setShowForm,
        showForm,
        period,
        categories,
        setPeriod,
        currentCategory,
        setCurrentCategory,
        showCat,
        setShowCat,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useAppContext = () => useContext(ContextProvider);

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem('language') || 'ru',
};

const languageSlice = createSlice({
  name: 'language',
  initialState: initialState.lang,
  reducers: {
    setLanguage: (state, action) => {
      const SUPPORTEDLANGUAGES = ['ru', 'ukr', 'en'];
      const newLang = action.payload;

      if (SUPPORTEDLANGUAGES.includes(newLang)) {
        localStorage.setItem('language', newLang);
        return state = action.payload;
      } else {
        return state;
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
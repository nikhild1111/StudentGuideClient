import { createSlice } from "@reduxjs/toolkit";


const initialState={
    books:[],
      loading: false,
   pagination: {
      currentPage: 1,
      totalPages: 1,
      totalBooks: 1,
      limit:1,
      },

};


const booksslice=createSlice({
    name:"book",
    initialState,
    reducers:{
        setbooks:(state,action)=>{
            state.books=action.payload;
        },
        setPagination:(state,action)=>{
            state.pagination=action.payload;
        },
        resetbooksstate:()=>initialState,
        setLoading:(state,action)=>{
            state.action=action.payload;
        }
    }
});

export const{setPagination,setbooks,resetbooksstate,setLoading}=booksslice.actions;

export default booksslice.reducer;



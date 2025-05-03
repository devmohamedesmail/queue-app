import { createSlice } from '@reduxjs/toolkit'
import Toast from 'react-native-toast-message';

const initialState = {
  items: [], 
};


export const wishlistSlice = createSlice({
 
  name: 'wishlist',
  initialState,
  reducers: {
    add_To_wishlist: (state, action) => {
      const itemToAdd = action.payload;

      // Check if the item already exists in the wishlist
      const isItemAlreadyInWishlist = state.items.some(
        (item) => item.id === itemToAdd.id
      );

      if (isItemAlreadyInWishlist) {
        // Remove item from the wishlist if it's already there
        state.items = state.items.filter((item) => item.id !== itemToAdd.id);

        // Show a toast notification for removal
        Toast.show({
          type: 'info',
          text1: 'Removed from Wishlist',
          text2: `${itemToAdd.name_en} has been removed from your wishlist.`,
          position: 'top',
        });
      } else {
        // Add item to the wishlist if it's not already there
        state.items.push(itemToAdd);

        // Show a toast notification for addition
        Toast.show({
          type: 'success',
          text1: 'Added to Wishlist',
          text2: `${itemToAdd.name_en} has been added to your wishlist.`,
          position: 'top',
        });
      }
    },
    // add_To_wishlist: (state, action) => {
    //   const itemToAdd = action.payload;

    //   // Check if the item already exists in the wishlist
    //   const isItemAlreadyInWishlist = state.items.some(
    //     (item) => item.id === itemToAdd.id 
    //   );

      
    //   if (!isItemAlreadyInWishlist) {
    //     state.items.push(itemToAdd);
       
    //   } else {
    //     console.log("Item already exists in the wishlist")
    //   }
    // },

    // Remove item from wishlist
    remove_From_wishlist: (state, action) => {
    
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      
    }

  },
})


export const { add_To_wishlist, remove_From_wishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
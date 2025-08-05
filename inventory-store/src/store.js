// store.js
import { action, thunk, createStore } from "easy-peasy";
import api from "./api/inventory_api";
import axios from "axios";

const store = createStore({
  userDetail: { fullName: "", userName: "", email: "", password: "", Cpassword: '' },

  setUserDetail: action((state, payload) => {
    state.userDetail = payload;
  }),
 

  products : [],
  setPoducts : action ((state,payload)=> {
    state.products=payload
  }),

  IsAuthenticated: false,
  setIsAuthenticated: action ((state,payload)=> {
    state.IsAuthenticated= payload
  }),

  resetUserDetail: action((state) => {
    state.userDetail = {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      Cpassword: ""
    };
  }),

userSignup: thunk(async (actions, newUser, helpers) => {
  try {
    const resp = await api.post('/signup', newUser);
    if (resp.status === 201) return { success: true };
  } catch (err) {
    if (err.response) {
      
      const message = err.response.data?.message || "Signup failed.";

      console.log("Signup error:", message);

      return { success: false, message };
    } else {
      return { success: false, message: "Network error. Please try again." };
    }
  }
}),



  userLogin: thunk(async (action, oldUser, helpers) => {
  try {
    const resp = await api.post('/login', oldUser);
   if (resp.status===201) {
       const token = resp.data.token;
        localStorage.setItem('token', token);
        action.setIsAuthenticated(true)
        return { success: true }; // return object instead of just true
   }
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || "Unknown error";

      console.log("Login error:", message);

      if (status === 405 || status === 409) {
        
        return { success: false, message };
      } else {
        const fallback = "Something went wrong. Please try again.";
        
        return { success: false, message: fallback };
      }
    } else {
      const netError = "Network Error: " + err.message;
      
      return { success: false, message: netError };
    }
  }
}),


  // ✅ CORRECTED: Google login as a thunk (not computed!)
  googleLogin: thunk(async (actions, tokenResponse, helpers) => {
    try {
      const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const googleUser = res.data;
      console.log('Google user:', googleUser);

      const backendRes = await api.post("/google-auth", googleUser);

      const responseData = backendRes.data;
      console.log('Backend response:', responseData);

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
      }

      alert(`Welcome ${googleUser.name}`);
    } catch (err) {
      console.error('Google login failed:', err);
    }
  }),
  getAllProducts: thunk (async(action) => {
      try {
        const token = localStorage.getItem('token'); // ✅ fix
        console.log(`token : ${token}`)
        const res = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}` // ✅ fix
          }
        });

        if (res.status === 200) {
          const data = res.data;
           action.setPoducts(data);
           return true
        }
        return false
      } catch (err) {
        console.log("network err", err.message);
      }
    }),

    userLogout: action ((state,payload)=> {
      localStorage.removeItem('token')
      state.IsAuthenticated=payload
    }),

    
});



export default store;

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuth = create((set)=>({
    authUser: null,
    isCheckingAuth: false,

    isSigningIn: false,
    isSigningUp: false,
    isUpdating: false,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        }
        catch(err){
            console.log("Error in checkAuth", err);
            set({authUser: null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data)=>{
        try{
            set({isSigningUp: true});
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data.details});
            toast.success(res.data.message);
        }catch(err){
            console.log("Error in signup", err);
            toast.error(err.response.data.message);
        }
        finally{
            set({isSigningUp: false});
        }
    },

    signin: async (data)=>{
        set({isSigningIn: true});
        try{
            const res = await axiosInstance.post("/auth/signin", data);
            set({authUser: res.data.details});
            toast.success(res.data.message);
        }   
        catch(err){
            console.log("Error in signin", err);
            toast.error(err.response.data.message);
        }
        finally{
            set({isSigningIn: false});
        }
    },

    signout: async ()=>{
        try{
            const res = await axiosInstance.post("/auth/signout");
            set({authUser: null});
            toast.success(res.data.message);
        }   
        catch(err){
            console.log("Error in signout", err);
            toast.error(err.response.data.message);
        }
    },

}));
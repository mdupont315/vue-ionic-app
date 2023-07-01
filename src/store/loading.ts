import {defineStore} from "pinia";

export const useLoadingStore = defineStore({
    id: 'loading',
    state: () => ({
        loading_info:{
            mode:'ios',
            message:'',
            duration:0,
        },
        loading:false,
        onDismissCallback:function () {
            return;
        },
    }),
    actions: {
       showLoading(){
           this.loading = true;
       },
       hideLoading(onDismiss:()=>void = ()=>null){
           this.onDismissCallback = onDismiss;
           this.loading = false;
       }
    }
});

import {POST} from "./connection";

import {GET} from "./connection";

export async function all_batch(token) {
    let datos =null;
     try {
        
        datos = await GET('/batch/list',token);
     } catch (error) {   
        //console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;

   }

export async function save_batch(data,token) {
    let datos =null;
     try {
        
        datos = await POST('/batch/save',data,token);
     } catch (error) {   
        console.log(error.response.data);  
        return error.response.data
     }
        return datos.data;
 }
 export async function modify_batch(data, token){
   let datos = null;
   try {
       datos = await POST('/batch/modify', data, token);
   } catch (error) {
       return error.data;
   }
   return datos.data;
}

export async function get(token, uid) {
   let datos =null;
    try {
       
       datos = await GET('batch/'+uid,token);
    } catch (error) {   
       //console.log(error.response.data);  
       return {"code":500}
    }
       return datos.data;
}
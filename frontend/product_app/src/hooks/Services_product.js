
import {POST} from "./connection";

import {GET} from "./connection";

export async function all_products(token) {
    let datos =null;
     try {
        
        datos = await GET('product/list',token);
     } catch (error) {   
        //console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;
}

export async function stock(token) {
    let datos =null;
     try {
        
        datos = await GET('/searchStock/1',token);
     } catch (error) {   
        //console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;
}

export async function save_product(data,token) {
    let datos =null;
     try {
        
        datos = await POST('/product/save',data,token);
     } catch (error) {   
        console.log(error.response.data);  
        return error.response.data
     }
        return datos.data;
 }

export async function modify_product(data, token){
    let datos = null;
    try {
        datos = await POST('/product/modify', data, token);
    } catch (error) {
        return error.data;
    }
    return datos.data;
}

 //missing get product for [external] to edit products, and load texts labels with its info

 export async function get(token, uid) {
   let datos =null;
    try {
       
       datos = await GET('product/'+uid,token);
    } catch (error) {   
       //console.log(error.response.data);  
       return {"code":500}
    }
       return datos.data;
}
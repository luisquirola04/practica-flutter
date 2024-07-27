
import {POST} from "./connection";

import {GET} from "./connection";

export async function all_person(token) {
    let datos =null;
     try {
        
        datos = await GET('/person/list',token);
     } catch (error) {   
        //console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;
}


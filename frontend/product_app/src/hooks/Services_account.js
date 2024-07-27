
import { POST } from "./connection";
import { POST_IMAGE } from "./connection";

import { GET } from "./connection";

export async function all_account(token) {
   let datos = null;
   try {

      datos = await GET('/account/list', token);
   } catch (error) {
      //console.log(error.response.data);  
      return { "code": 500 }
   }
   return datos.data;
}
export async function save(formData, token) {
   let datos = null;
   try {

      await axios.post('http://localhost:5000/account/save', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            "X-Access-Token": token

         }
      });

   } catch (error) {
      console.log(error.response.data);
      return error.response.data
   }
   return datos.data;
}

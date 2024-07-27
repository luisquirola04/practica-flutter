import {POST} from './connection';

export async function  login (data){
    let datos = null;
    try {
        datos = await POST('sesion', data);
    } catch (error) {
        //console.log(error.response.data);
        return error.response.data;
    }
    return datos.data;
}
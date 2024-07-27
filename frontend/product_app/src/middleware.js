import { NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';


async function validar(token) {
    const url = 'http://localhost:5000/validar/Token';
    try {
        console.log(`Enviando token: ${token}`);  

        const response = await axios.get(url, {
            headers: {
                'X-Access-Token': token.value,
                'Content-Type': 'application/json'
            }
        });

        console.log('Respuesta de validación:', response.data);  
        return response.data;
    } catch (error) {
        console.error('Error validando el token:', error);
        return { code: 500, message: 'Error de servidor' };
    }
}

export default async function middleware(request) {
    console.log('ESTOY EN EL MIDDLEWARE');

    const token = request.cookies.get('token');
    console.log('Token:', token);  
    
    if (!token) {
        console.log("Token no encontrado, redirigiendo a sesión");
        const nextResponse = NextResponse.redirect('http://localhost:3000/sesion');
        return nextResponse;
    }

    const validation = await validar(token);
    console.log('Validación:', validation);  

    if (validation.code != 200) {
        console.log("Token inválido o error en validación, redirigiendo a sesión");
        const nextResponse = NextResponse.redirect('http://localhost:3000/sesion');


        
        return nextResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/product',
        '/account',
        '/batch',
        '/components',
    ]
};

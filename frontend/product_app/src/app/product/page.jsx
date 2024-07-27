'use client'

import { all_products } from '@/hooks/Services_product';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import Menu from '../components/Menu';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};


export default function Product() {
    let token = Cookies.get('token');
    const router=useRouter();

    
    let [products, setProducts] = useState(null);
    let [estado, setEstado] = useState(false);
    if (!estado) {
        all_products(token).then((info) => {
            if (info.code == 200) {
                setProducts(info.datos)
            }
            else if(info.code == 401) {
                console.log(info.code)
                router.push('/dashboard')

            }
        });
        setEstado(true);
    }

    return (
        <div>
            <Menu>
            </Menu>
            <main className="form-signin text-center mt-5">
                <div>
                    <h1>LISTA DE PRODUCTOS CADUCADOS Y NO CADUCADOS</h1>
                    <hr />                </div>
                <div className="container-fluid">

                    <table className="table table-striped table-hover table-sm">

                        <thead>
                            <tr>
                                <th>NRO</th>
                                <th>NOMBRE</th>
                                <th>PRECIO</th>
                                <th>CANTIDAD</th>
                                <th>FECHA de ELABORACION</th>
                                <th>FECHA DE EXPIRACION</th>
                                <th>ESTADO</th>

                                <th>ACCIONES</th>

                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((dato, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dato.name} </td>
                                    <td>{dato.product_price}</td>
                                    <td>{dato.quantity}</td>
                                    <td>{formatDate(dato.elaborate_date)}</td>
                                    <td>{formatDate(dato.expired_date)}</td>
                                    <td>{dato.status.toString()}</td>

                                    <td>
                                        <Link href={'/product/' + dato.uid} className="btn btn-warning"> Modificar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-40">
                        <Link href="/product/new" style={{ margin: "10px" }}>
                            <button className="btn btn-dark">Ingresar nuevo producto</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
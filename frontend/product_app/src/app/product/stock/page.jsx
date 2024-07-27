'use client'

import { stock } from '@/hooks/Services_product';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import Menu from '../../components/Menu';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};


export default function ProductStock() {
    let token = Cookies.get('token');
    const router=useRouter();

    
    let [products, setProducts] = useState(null);
    let [estado, setEstado] = useState(false);
    if (!estado) {
        stock(token).then((info) => {
            if (info.code == 200) {
                setProducts(info.datos)
            }
            else {
                //para cuando no hay datos 
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
                    <h1>EN STOCK</h1>
                    
                </div>
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
                                    <td>{dato.name}</td>
                                    <td>{dato.product_price}</td>
                                    <td>{dato.quantity}</td>
                                    <td>{formatDate(dato.elaborate_date)}</td>
                                    <td>{formatDate(dato.expired_date)}</td>
                                    <td>{dato.status.toString()}</td>

                                    <td>
                                        <Link href={'/product/' + dato.external_id} className="btn btn-danger"> Modificar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
'use client'

import { all_batch } from '@/hooks/Services_batch'; // Asegúrate de tener esta función en tus servicios
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import Menu from '../components/Menu';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Batch() {
    let token = Cookies.get('token');
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/dashboard');
        }
    }, [token, router]);

    let [batches, setBatches] = useState(null);
    let [estado, setEstado] = useState(false);

    useEffect(() => {
        if (!estado && token) {
            all_batch(token).then((info) => {
                if (info.code === 200) {
                    setBatches(info.datos);
                } else if (info.code === 401) {
                    router.push('/dashboard');
                }
            });
            setEstado(true);
        }
    }, [estado, token, router]);

    return (
        <div>
            <Menu />
            <main className="form-signin text-center mt-5">
                <div>
                    <h1>LISTA DE LOTES</h1>
                    <hr />
                </div>
                <div className="container-fluid">
                    <table className="table table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>NRO</th>
                                <th>FABRICANTE</th>
                                <th>PRECIO</th>
                                <th>FECHA DE LLEGADA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches && batches.map((dato, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dato.maker}</td>
                                    <td>{dato.price_batch}</td>
                                    <td>{formatDate(dato.arrive_date)}</td>
                                    <td>
                                        <Link href={'/batch/' + dato.uid} className="btn btn-warning"> Modificar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-40">
                        <Link href="/batch/new" style={{ margin: "10px" }}>
                            <button className="btn btn-dark">Ingresar nuevo lote</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

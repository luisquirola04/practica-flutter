'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Menu from '../components/Menu';
import { all_account } from '@/hooks/Services_account';
import { all_person } from '@/hooks/Services_person';


export default function Product() {
    const router = useRouter();
    const token = Cookies.get('token');
    const [person, setPerson] = useState(null);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            all_person(token).then((info) => {
                if (info.code === 200) {
                    setPerson(info.datos);
                } 
            });

            all_account(token).then((info) => {
                if (info.code === 200) {
                    setAccount(info.datos);
                } 
            });

        }
    }, []);



    return (
        <div>
            <Menu />
            <main className="form-signin text-center mt-5">
                <div>
                    <h1>LISTA DE CUENTAS REGISTRADAS</h1>
                    <hr />
                </div>
                <div className="container-fluid">
                    <table className="table table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>NRO</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th>DNI</th>
                                <th>CORREO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {person && Array.isArray(person) && person.map((dato, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dato.name}</td>
                                    <td>{dato.last_name}</td>
                                    <td>{dato.dni}</td>
                                    <td>{account && Array.isArray(account) && account[i] && account[i].email}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="col-40">
                    <Link href="/account/gallery" style={{ margin: "10px" }}>
                            <button className="btn btn-info">Galeria de imagenes de usuario</button>
                        </Link>
                        <Link href="/account/new" style={{ margin: "10px" }}>
                            <button className="btn btn-dark">Ingresar nueva cuenta</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

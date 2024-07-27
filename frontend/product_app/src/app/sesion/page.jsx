'use client';
import { useRouter } from 'next/navigation';
//import './login.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { login } from '@/hooks/ServicesAuth';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


export default function Session() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().required('ESCRIBA SU CORREO'),
        password: Yup.string().trim().required('ESCRIBA SU CLAVE')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    let { errors } = formState;
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/product');
        }
    }, []);

    const sendInfo = (data) => {
        login(data).then((info) => {
            if (info.code == 200) {
                console.log(info);
                Cookies.set('token', info.datos.token)
                Cookies.set('usuario', info.datos.user);
                swal({
                    title: "Info",
                    text: "Bienvenido " + info.datos.user,
                    icon: "success",
                    button: "Accept",
                    timer: 4000,
                    closeOnEsc: true,
                });
                router.push('/product');
                router.refresh();
            } else {
                swal({
                    title: "Error",
                    text: info.datos.error,
                    icon: "error",
                    button: "Accept",
                    timer: 4000,
                    closeOnEsc: true,
                });
                console.log(info);
                console.log("NO");
            }
        });
    };


    return (
        <main className="form-signin text-center mt-5">
            <form onSubmit={handleSubmit(sendInfo)} className="p-4 border rounded shadow-lg" style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f8f9fa' }}>
                <h1 className="h3 mb-3 fw-normal text-primary">Inicie Sesión</h1>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        name='email'
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="floatingInput"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email</label>
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        {...register('password')}
                        name='password'
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
            </form>
        </main>
    );
};


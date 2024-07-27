'use client';

import { save_product } from '@/hooks/Services_product';
import { all_batch } from '@/hooks/Services_batch';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/Menu';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function NewProduct() {
    //const router= useRouter()
    let token = Cookies.get('token');
    const router = useRouter();
    let [batch, setbatch] = useState(null);
    let [estado, setEstado] = useState(false);
    useEffect(() => {
        if (!estado) {
            all_batch(token).then((info) => {
                if (info.code === 200) {
                    setbatch(info.datos);
                }
            });
            setEstado(true);
        }
    }, [estado, token]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required('ESCRIBA EL NOMBRE'),
        product_price: Yup.number().required('ESCRIBA EL PRECIO'),
        elaborate_date: Yup.string().trim().required('ESCRIBA LA FECHA DE ELABORACION'),
        expired_date: Yup.string().trim().required('ESCRIBA LA FECHA DE EXPIRACION'),
        quantity: Yup.number().required('ESCRIBA A CANTIDAD')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { control, register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    //const router = useRouter();


    const sendInfo = (data) => {

        //data.fecha_nac = new Date(data.fecha_nac).toISOString().split('T')[0];

        //console.log(data.fecha_nac)

        save_product(data, token).then((info) => {

            if (info.code == 200) {
                console.log(info);
                //Cookies.set('token',info.datos.token)
                //Cookies.set('usuario',info.datos.user);
                swal({
                    title: "CORRECTO",
                    text: info.datos.tag,
                    icon: "success",
                    button: "Accept",
                    timer: 4000,
                    closeOnEsc: true,
                });
                router.push('/product');
                router.refresh();
            } else {
                swal({
                    title: "ERROR",
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
        <div>
            <Menu />
            <main>
            <div className='text-center'>
                
                <h2>Agregar un nuevo producto</h2>
                <hr style={{
                    border: '10',
                    height: '1px',
                    backgroundColor: 'green', 
                    margin: '8px 0'
                }} />
            </div>
            <div className='text-center'>
            <h5>Datos del producto</h5>

            </div >
            <div className='text-center' >
                <Form onSubmit={handleSubmit(sendInfo)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Nombre</Form.Label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        {...register('name')}

                                        isInvalid={!!errors.name}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Precio Unitario</Form.Label>
                            <Controller
                                name="product_price"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="number"
                                        step="0.01"  

                                        {...register('product_price')}

                                        isInvalid={!!errors.product_price}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.product_price?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Lote</Form.Label>
                            <select className="form-control" name="batch_uid" {...register('batch_uid')}>
                                <option value="">Seleccione un lote por marca</option>
                                {batch && batch.map((dato, i) => (
                                    <option key={i} value={dato.uid}>{dato.maker}</option>
                                ))}
                            </select>
                            <Form.Control.Feedback type="invalid">
                                {errors.batch_uid?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Fecha de Elaboración</Form.Label>
                            <Controller
                                name="elaborate_date"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="date"
                                        {...register('elaborate_date')}

                                        isInvalid={!!errors.elaborate_date}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.elaborate_date?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                            <Form.Label>Fecha de Expiración</Form.Label>
                            <Controller
                                name="expired_date"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="date"
                                        {...register('expired_date')}

                                        isInvalid={!!errors.expired_date}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.expired_date?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mt-6">
                        <Form.Group as={Col} md="6" controlId="validationCustom06">
                            <Form.Label>Cantidad</Form.Label>
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        {...register('quantity')}

                                        isInvalid={!!errors.quantity}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.quantity?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="text-center">
                        <Button type="submit" className='btn btn-primary'>Registrar</Button>
                    </div>
                </Form>
                </div>
            </main>
        </div>
    );
}
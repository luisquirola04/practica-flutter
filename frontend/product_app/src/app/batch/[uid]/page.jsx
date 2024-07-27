'use client';

import { modify_batch, get } from '@/hooks/Services_batch';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/Menu';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function EditBatch({ params }) {
    const token = Cookies.get('token');
    const router = useRouter();
    const [batch, setBatch] = useState(null);

    useEffect(() => {
        if (!batch) {
            get(token, params.uid).then((info) => {
                if (info.code === 200) {
                    const datos = {
                        ...info.datos,
                        arrive_date: info.datos.arrive_date ? new Date(info.datos.arrive_date).toISOString().split('T')[0] : ''
                    };
                    setBatch(datos);
                }
            });
        }
    }, [batch, token, params.uid]);

    const validationSchema = Yup.object().shape({
        maker: Yup.string().trim().required('ESCRIBA EL NOMBRE DEL FABRICANTE'),
        price_batch: Yup.number().required('ESCRIBA EL PRECIO DEL LOTE'),
        arrive_date: Yup.string().trim().required('ESCRIBA LA FECHA DE LLEGADA'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendInfo = (data) => {
        data.uid = params.uid;
        modify_batch(data, token).then((info) => {
            if (info.code === 200) {
                swal({
                    title: "CORRECTO",
                    text: info.datos.tag,
                    icon: "success",
                    button: "Accept",
                    timer: 4000,
                    closeOnEsc: true,
                });
                router.push('/batch');
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
            }
        });
    };

    if (!batch) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Menu />
            <main>
                <div className='text-center'>
                    <h2>Modificar Lote</h2>
                    <hr style={{
                        border: '10',
                        height: '1px',
                        backgroundColor: 'green',
                        margin: '8px 0'
                    }} />
                </div>
                <div className='text-center'>
                    <h5>Datos del Lote</h5>
                </div>
                <div className='text-center'>
                    <Form onSubmit={handleSubmit(sendInfo)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Fabricante</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('maker')}
                                    defaultValue={batch.maker}
                                    isInvalid={!!errors.maker}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.maker?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Precio del Lote</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    {...register('price_batch')}
                                    defaultValue={batch.price_batch}
                                    isInvalid={!!errors.price_batch}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price_batch?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Fecha de Llegada</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register('arrive_date')}
                                    defaultValue={batch.arrive_date}
                                    isInvalid={!!errors.arrive_date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.arrive_date?.message}
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
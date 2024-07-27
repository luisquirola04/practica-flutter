'use client';

import { save_batch } from '@/hooks/Services_batch';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/Menu';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function NewBatch() {
    const validationSchema = Yup.object().shape({
        maker: Yup.string().trim().required('ESCRIBA EL NOMBRE DEL FABRICANTE'),
        price_batch: Yup.number().required('ESCRIBA EL PRECIO DEL LOTE'),
        arrive_date: Yup.date().required('ESCRIBA LA FECHA DE LLEGADA'),
    });
    const router = useRouter();

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { control, register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const token = Cookies.get('token');

    const sendInfo = (data) => {
        // Convertir la fecha a formato 'YYYY-MM-DD'
        const formattedDate = new Date(data.arrive_date).toISOString().split('T')[0];
        const payload = {
            ...data,
            arrive_date: formattedDate
        };

        save_batch(payload, token).then((info) => {
            if (info.code == 200) {
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
            }
        });
    };

    return (
        <div>
            <Menu />
            <main>
                <div className="text-center mb-4">
                    <h2>Agregar un nuevo Lote</h2>
                </div>
                <Form onSubmit={handleSubmit(sendInfo)}>
                    <Row className="justify-content-center mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Fabricante</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('maker')}
                                isInvalid={!!errors.maker}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.maker?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Precio del Lote</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('price_batch')}
                                isInvalid={!!errors.price_batch}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price_batch?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Fecha de Llegada</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('arrive_date')}
                                isInvalid={!!errors.arrive_date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.arrive_date?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="text-center">
                        <Button type="submit" className="btn btn-primary">
                            Registrar
                        </Button>
                    </div>
                </Form>
            </main>
        </div>
    );
}

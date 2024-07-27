'use client';

import { save } from '@/hooks/Services_account';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/Menu';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FormData from 'form-data';
import axios from 'axios';



const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Por favor ingrese los nombres.'),
    last_name: Yup.string().trim().required('Por favor ingrese los apellidos.'),
    dni: Yup.string().trim().required('Por favor ingrese su DNI.'),
    email: Yup.string().trim().required('Por favor ingrese su correo electrónico.').email('Ingrese un correo electrónico válido.'),
    password: Yup.string().trim().required('Por favor ingrese la contraseña.'),
});

export default function NewAccount() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('last_name', data.last_name);
        formData.append('dni', data.dni);
        formData.append('email', data.email);
        formData.append('password', data.password);

        formData.append('profile_image', selectedFile);


        try {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:5000/account/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Access-Token": token,
                }
            });

            console.log(response.data);
            if (response.data.code == 200) {
                swal({
                    title: "Correcto",
                    text: response.data.datos.tag,
                    icon: "success",
                    button: "Aceptar",
                    timer: 4000,
                    closeOnEsc: true,
                });
                router.push('/account');
                router.refresh()
            } else {
                swal({
                    title: "Error",
                    text: response.data.datos.error,
                    icon: "error",
                    button: "Aceptar",
                    timer: 4000,
                    closeOnEsc: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            swal({
                title: "Error",
                text: "Hubo un problema al guardar la cuenta.",
                icon: "error",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
        }
    };



    return (
        <div>
            <Menu />

            <div className="text-center mb-4">
                <h2>Crear nueva Cuenta</h2>
                <hr style={{
                    border: '10',
                    height: '1px',
                    backgroundColor: 'green',
                    margin: '8px 0'
                }} />
            </div>

            <div className="container">
                <div className="mb-4">
                    <h3>Información Básica</h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('name')}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('last_name')}
                                    isInvalid={!!errors.last_name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.last_name?.message}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>DNI</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('dni')}
                                    isInvalid={!!errors.dni}
                                />
                                <Form.Control.Feedback type="invalid">{errors.dni?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>

                <div>
                    <h3>Información de Cuenta</h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Correo</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        {...register('email')}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register('password')}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Label>Imagen de perfil</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleFileChange}
                                    isInvalid={!!errors.profile_image}
                                />
                                <Form.Control.Feedback type="invalid">{errors.profile_image?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <div className='text-center'>
                            <Button type="submit">Guardar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
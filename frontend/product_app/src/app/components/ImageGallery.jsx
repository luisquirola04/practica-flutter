import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import Menu from '../components/Menu';
import './MyGallery.css'; // Archivo CSS para estilos personalizados

const MyGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/media')
            .then(response => {
                const imageFiles = response.data.files;
                const imageItems = imageFiles.map(file => ({
                    original: `http://localhost:5000/media/${file}`,
                    thumbnail: `http://localhost:5000/media/${file}`,
                }));
                setImages(imageItems);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, []);

    return (
        <div>
            <Menu />
            <div className='text-center'>
                <hr className='blue-hr' />
                <h2>Galeria de Imagenes</h2>
                <hr className='blue-hr' />
            </div>
            <ImageGallery items={images} />
        </div>
    );
}

export default MyGallery;

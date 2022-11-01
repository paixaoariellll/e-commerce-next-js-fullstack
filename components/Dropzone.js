import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Suport from '../public/img/suport.svg';

export default function Dropzone() {
    const [images, setImages] = useState([]);

    function handleUpload() {
        console.log("Enviando Arquivos...")
        axios.post('http://localhost:4000/upload', { images }).then(response => {
            console.log(response.data)
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    const onDrop = useCallback((acceptedFiles, rejectFiles) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                setImages(prevState => [...prevState, reader.result]);
            };
            reader.readAsDataURL(file);
        });
        console.log("acceptedFiles", acceptedFiles);
        console.log("rejectFiles", rejectFiles);
    }, []);
    useEffect(() => {
        console.log(images);
    }, [images]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
        },
    });

    return (
        <div className='card p-5 h-fit'>
            <div {...getRootProps()}
                className='w-full shadow-md text-xl bg-sky-100 rounded-xl h-fit p-5 text-center border-dotted border-2 border-gray-600'>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <span className='flex flex-col'>
                        <Image
                            src={Suport}
                            alt="Suporte"
                            width={50}
                            height={50}
                            unoptimized></Image>
                        <span> Solte os arquivos aqui!</span>
                    </span>
                ) : (
                    <span className='flex flex-col'>
                        <Image
                            src={Suport}
                            alt="Suporte"
                            width={50}
                            height={50}
                            unoptimized></Image>
                        <span> Clique aqui ou solte suas imagens aqui!</span>
                    </span>
                )
                }
                <div className='flex gap-x-4'>
                    {images.map((image, index) =>
                        <div key={index}
                            className="flex justify-between">
                            <Image
                                src={image}
                                alt="Imagem"
                                width={100}
                                height={100}
                                className="rounded-lg"
                                unoptimized
                            />
                            <span>❌</span>
                        </div>
                    )}
                </div>
            </div>
            {
                images.length > 0 &&
                <div className='mt-5 flex'>
                    {images.length > 0 &&
                        <div className='flex items-center'>
                            <button
                                className='bg-blue-800 border text-white border-solid border-gray-300'
                                onClick={handleUpload}>Enviar imagens
                            </button>
                        </div>
                    }
                </div>
            }
        </div >
    )
}

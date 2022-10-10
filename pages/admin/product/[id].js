import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../../../components/Layout'
import { getError } from '../../../utils/error'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UPDATE_REQUEST':
        /*  return { ...state, loadingUpdate: true, errorUpdate: '' }
                case 'UPDATE_SUCCESS':
                    return { ...state, loadingUpdate: false, errorUpdate: '' }
                case 'UPDATE_FAIL':
                    return { ...state, loadingUpdate: false, errorUpdate: action.payload }
                case 'UPLOAD_REQUEST':
                    return { ...state, loadingUpload: true, errorUpload: '' }
                case 'UPLOAD_SUCCESS':
                    return {
                        ...state,
                        loadingUpload: false,
                        errorUpload: '',
                    }
                case 'UPLOAD_FAIL':
                    return { ...state, loadingUpload: false, errorUpload: action.payload } */
        default:
            return state
    }
}

export default function AdminProductEditScreen() {
    const { query } = useRouter()
    const productId = query.id
    const [{ loading, error, loadingUpdate, /* loadingUpload */ }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })
    /* const uploadHandler = async (e, imageField = 'image') => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
        try {
            dispatch({ type: 'UPLOAD_REQUEST' })
            const {
                data: { signature, timestamp },
            } = await axios('/api/admin/cloudinarySignIn')
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('signature', signature)
            formData.append('timestamp', timestamp)
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
            const { data } = await axios.post(url, formData)
            dispatch({ type: 'UPLOAD_SUCCESS' })
            setValue(imageField, data.secure_url)
            toast.success('Arquivo carregado com sucesso!')
        } catch (err) {
            dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) })
            toast.error(getError(err));
        }
    } */
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/admin/products/${productId}`)
                dispatch({ type: 'FETCH_SUCCESS' })
                setValue('name', data.name)
                setValue('slug', data.slug)
                setValue('price', data.price)
                setValue('image', data.image)
                setValue('category', data.category)
                setValue('publisher', data.publisher)
                setValue('countInStock', data.countInStock)
                setValue('description', data.description)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        fetchData()
    }, [productId, setValue])
    const router = useRouter()
    const submitHandler = async ({
        name,
        slug,
        price,
        category,
        image,
        publisher,
        countInStock,
        description,
    }) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' })
            await axios.put(`/api/admin/products/${productId}`, {
                name,
                slug,
                price,
                category,
                image,
                publisher,
                countInStock,
                description,
            })
            dispatch({ type: 'UPDATE_SUCCESS' })
            toast.success('Produto atualizado com sucesso!')
            router.push('/admin/products')
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
            toast.error(getError(err))
        }
    }

    return (
        <Layout title={`Edit Product ${productId}`}>
            <div className="grid md:grid-cols-4 md:gap-5">
                <div className='card text-2xl p-5'>
                    <ul>
                        <li>
                            <Link href="/admin/dashboard">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Visão Geral</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Pedidos</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Produtos</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users">
                                <span className="cursor-pointer text-center text-blue-700 hover:underline">Usuários</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="md:col-span-3">
                    <h1 className="mb-4 text-center py-2 card text-blue-700 text-2xl">{`Editar Produto: ${productId}`}</h1>
                    {loading ? (
                        <div>Carregando...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <form
                            className="mx-auto text-xl p-10 w-full card "
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <div className="mb-4">
                                <label htmlFor="name"
                                    className='text-2xl text-blue-700'>Nome</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    id="name"
                                    autoFocus
                                    {...register('name', {
                                        required: 'Por favor, digite o nome do produto',
                                        minLength: { value: 3, message: 'Por favor, digite um nome válido' }
                                    })}
                                />
                                {errors.name && (
                                    <div className="text-red-500">{errors.name.message}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="slug"
                                    className='text-2xl text-blue-700'>Slug</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    id="slug"
                                    {...register('slug', {
                                        pattern: {
                                            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                            message: 'É permitido apenas letras, números e dashes.',
                                        },
                                        required: 'Os slugs representam o ID nominal. Por favor, escreva-os sem espaços e sem letras maiúsculas!',
                                    })}
                                />
                                {errors.slug && (
                                    <div className="text-red-500">{errors.slug.message}</div>
                                )}
                            </div>
                            <div className='flex justify-between'>
                                <div className="mb-4">
                                    <label htmlFor="image"
                                        className='text-2xl text-blue-700'>Imagem</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="image"
                                        {...register('image', {
                                            required: 'Por favor, digite o diretório da imagem e seu tipo!',
                                        })}
                                    />
                                    {errors.image && (
                                        <div className="text-red-500">{errors.image.message}</div>
                                    )}
                                </div>
                                {/* <div className="mb-4">
                                    <label htmlFor="imageFile"
                                        className='text-2xl text-blue-700'>Carregar imagem</label>
                                    <input
                                        type="file"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="imageFile"
                                        onChange={uploadHandler}
                                    />
                                    {loadingUpload && <div>Enviando....</div>}
                                </div> */}
                            </div>
                            <div className='flex justify-between'>
                                <div className="mb-4">
                                    <label htmlFor="price"
                                        className='text-2xl text-blue-700'>Preço</label>
                                    <input
                                        type="number"
                                        className="form-control block w-fit px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="price"
                                        {...register('price', {
                                            required: 'Por favor, digite um valor válido',
                                        })}
                                    />
                                    {errors.price && (
                                        <div className="text-red-500">{errors.price.message}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category"
                                        className='text-2xl text-blue-700'>Categoria</label>
                                    <select
                                        className="form-control block w-52 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="category"
                                        {...register('category', {
                                            required: 'Por favor, escolha uma categoria',
                                        })}
                                    >
                                        <option id='category'>Xbox</option>
                                        <option id='category'>PlayStation</option>
                                    </select>
                                    {errors.category && (
                                        <div className="text-red-500">{errors.category.message}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="publisher"
                                        className='text-2xl text-blue-700'>Distribuidora</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="publisher"
                                        {...register('publisher', {
                                            required: 'Por favor, digite o nome da Distribuidora',
                                        })}
                                    />
                                    {errors.publisher && (
                                        <div className="text-red-500">{errors.publisher.message}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="countInStock"
                                        className='text-2xl text-blue-700'>Quantidade</label>
                                    <input
                                        type="number"
                                        className="form-control block w-52 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="countInStock"
                                        {...register('countInStock', {
                                            required: 'Please enter countInStock',
                                        })}
                                    />
                                    {errors.countInStock && (
                                        <div className="text-red-500">
                                            {errors.countInStock.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description"
                                    className='text-2xl text-blue-700'>descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control h-52 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                    id="description"
                                    {...register('description', {
                                        required: 'Please enter description',
                                    })}
                                />
                                {errors.description && (
                                    <div className="text-red-500">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4 flex justify-between">
                                <button onClick={() => (`/admin/products`)} className="primary-button bg-white border border-solid border-gray-300">
                                    Voltar
                                </button>
                                <button disabled={loadingUpdate} className="primary-button bg-white border border-solid border-gray-300">
                                    {loadingUpdate ? 'Carregando' : 'Atualizar'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    )
}

AdminProductEditScreen.auth = { adminOnly: true }
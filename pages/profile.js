import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import axios from 'axios'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfileScreen() {
    const router = useRouter()
    const { data: session } = useSession()
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm()
    useEffect(() => {
        setValue('name', session.user.name)
        setValue('lastName', session.user.lastName)
        setValue('email', session.user.email)
    }, [session.user, setValue])
    const submitHandler = async ({ name, image, lastName, email, password }) => {
        try {
            await axios.put('/api/auth/update', {
                name,
                image,
                lastName,
                email,
                password,
            })
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })
            toast.success('Perfil atualizado com sucesso!')
            if (result.error) {
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return (
        <Layout title={`Perfil de ${session.user.name}`}>
            {
                session.user.isAdmin ? (
                    <Link
                        onLoad={router.push('/unauthorizedProfile')} >
                    </Link>
                ) : (
                    <form
                        className="grid md:grid-cols-6 md:gap-5"
                        onSubmit={handleSubmit(submitHandler)}
                    >
                        <h1 className="col-span-6 card py-2 mb-4 text-center text-blue-800 text-4xl">Atualizar Perfil</h1>
                        <div className='col-span-3'>
                            <Image
                                src={`/imgUser/${session.user.name}.jpg`}
                                width={100}
                                height={100}
                                layout='responsive'
                            >
                            </Image>
                        </div>
                        <div className='col-span-3 flex flex-col justify-between '>
                            <div className='gap-5 flex'>
                                <div className='w-1/2 card p-10'>
                                    <div className="mb-6">
                                        <label
                                            htmlFor='name'
                                            className='text-blue-800  text-2xl'
                                        >Nome</label>
                                        <input
                                            {...register('name', {
                                                required: 'Por favor, digite seu primeiro nome',
                                                minLength: { value: 3, message: 'Por favor, digite um nome válido' }
                                            })}
                                            type="name"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                                            id="name"
                                        /> {errors.name && (<div className='text-sm text-red-500'>{errors.name.message}</div>)}
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="lastName"
                                            className='text-blue-800  text-2xl'
                                        >Sobrenome</label>
                                        <input
                                            {...register('lastName', {
                                                required: 'Por favor, digite seu último nome',
                                                minLength: { value: 3, message: 'Por favor, digite um sobrenome válido' }
                                            })}
                                            type="lastName"
                                            className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none`}
                                            id="lastName"
                                        /> {errors.lastName && (<div className='text-sm text-red-500'>{errors.lastName.message}</div>)}
                                    </div>
                                </div>
                                <div className='card p-10 w-1/2'>
                                    <div className="mb-4">
                                        <label htmlFor="email"
                                            className='text-blue-800  text-2xl'>E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                                            id="email"
                                            {...register('email', {
                                                required: 'Please enter email',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                    message: 'Please enter valid email',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <div className="text-red-500">{errors.email.message}</div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor='password'
                                            className='text-blue-800 text-2xl'
                                        >Senha</label>
                                        <input
                                            type="password"
                                            {...register('password', {
                                                required: 'Por favor, digite sua senha',
                                                pattern: {
                                                    value: /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                                                    message: 'Sua senha deve obedecer a ISO / 27000',
                                                },
                                            })}
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                                            id="password"
                                            autoFocus
                                        />{errors.password &&
                                            (
                                                <div className='text-sm flex justify-between text-red-500'>{errors.password.message}
                                                    <span onClick={() => {
                                                        toast('Sobre a ISO/IEC 27000, mínimo:     3 letras minúsculas.                        2 letras maiúsculas.                         2 números.                                         2 caracteres especiais.                     8 caracteres ou mais.', { position: "top-center" })
                                                    }}>
                                                        < i className='cursor-pointer text-xl  ri-alert-line'></i>
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor='passwordIsValid'
                                            className='text-blue-800  text-2xl'
                                        >Confirmação de Senha</label>
                                        <input
                                            type="password"
                                            {...register('passwordIsValid', {
                                                required: 'Por favor, digite sua senha novamente',
                                                validate: (value) => value === getValues('password'),
                                                pattern: {
                                                    value: /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                                                    message: 'As senhas deve ser iguais!',
                                                },
                                            })}
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                                            id="passwordIsValid"
                                        />{errors.passwordIsValid &&
                                            (
                                                <div className='text-sm flex justify-between text-red-500'>{errors.passwordIsValid.message}</div>
                                            )
                                        }
                                        {errors.passwordIsValid &&
                                            (
                                                <div className='text-sm flex justify-between text-red-500'>As senhas digitadas não são iguais!</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 w-full flex flex-col items-end">
                                <button className="primary-button text-xl bg-white">Atualizar Perfil</button>
                            </div>
                        </div>
                    </form >
                )
            }
        </Layout >
    )
}

ProfileScreen.auth = true

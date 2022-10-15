import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Register from "../public/img/Register.svg";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function RegisterScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, lastName, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        lastName,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        lastName,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Registro">
      <section className="h-full">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <Image
                src={Register}
                width={640}
                height={640}
                alt="Sample image"
              />
            </div>
            <div className="bg-sky-100 p-5 rounded-lg shadow-xl xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-5">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-xl mb-0 mr-4">Registre-se com: </p>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-white before:mt-0.5 after:flex-1 after:border-t after:border-white after:mt-0.5">
                  <p className="text-center text-4xl text-blue-700 mx-4 mb-0">
                    Ou
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="mb-6">
                    <label htmlFor="name" className="text-blue-700 text-2xl">
                      Nome
                    </label>
                    <input
                      {...register("name", {
                        required: "Por favor, digite seu primeiro nome",
                        minLength: {
                          value: 3,
                          message: "Por favor, digite um nome válido",
                        },
                      })}
                      type="name"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="name"
                      autoFocus
                    />{" "}
                    {errors.name && (
                      <div className="text-sm text-red-500">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="lastName"
                      className="text-blue-700 text-2xl"
                    >
                      Sobrenome
                    </label>
                    <input
                      {...register("lastName", {
                        required: "Por favor, digite seu último nome",
                        minLength: {
                          value: 3,
                          message: "Por favor, digite um sobrenome válido",
                        },
                      })}
                      type="lastName"
                      className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      id="lastName"
                      autoFocus
                    />{" "}
                    {errors.lastName && (
                      <div className="text-sm text-red-500">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="text-blue-700 text-2xl">
                    E-mail
                  </label>
                  <input
                    {...register("email", {
                      required: "Por favor, digite seu e-mail",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                        message: "Por favor, digite um e-mail válido",
                      },
                    })}
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    autoFocus
                  />{" "}
                  {errors.email && (
                    <div className="text-sm text-red-500">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="text-blue-700 text-2xl">
                    Senha
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Por favor, digite sua senha",
                      pattern: {
                        value:
                          /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                        message: "Sua senha deve obedecer a ISO / 27000",
                      },
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    autoFocus
                  />
                  {errors.password && (
                    <div className="text-sm flex justify-between text-red-500">
                      {errors.password.message}
                      <span
                        onClick={() => {
                          toast(
                            "Sobre a ISO/IEC 27000, mínimo:     3 letras minúsculas.                        2 letras maiúsculas.                         2 números.                                         2 caracteres especiais.                     8 caracteres ou mais.",
                            { position: "top-center" }
                          );
                        }}
                      >
                        <i className="cursor-pointer text-xl  ri-alert-line"></i>
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="passwordIsValid"
                    className="text-blue-700 text-2xl"
                  >
                    Confirmação de Senha
                  </label>
                  <input
                    type="password"
                    {...register("passwordIsValid", {
                      required: "Por favor, digite sua senha novamente",
                      validate: (value) => value === getValues("password"),
                      pattern: {
                        value:
                          /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                        message: "As senhas deve ser iguais!",
                      },
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="passwordIsValid"
                    autoFocus
                  />
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-500">
                      {errors.passwordIsValid.message}
                    </div>
                  )}
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-500">
                      As senhas digitadas não são iguais!
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="checkbox"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="checkbox"
                    >
                      Lembrar-me
                    </label>
                  </div>
                  <p className="text-md  flex font-semibold mt-2 pt-1 mb-0">
                    Já possui uma conta?&nbsp;
                    <Link href={`/login?redirect=${redirect || "/"}`}>
                      <div className="hover:text-blue-700 hover:underline text-right focus:text-red-700 cursor-pointer transition duration-200 ease-in-out">
                        Entrar
                      </div>
                    </Link>
                  </p>
                </div>
                <div className="flex justify-end">
                  <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Cadastrar-se
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

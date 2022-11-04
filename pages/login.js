import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import login from "../public/img/login.svg";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginScreen() {
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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
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
    <Layout title="Login">
      <div className="h-full">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <Image src={login} width={640} height={640} alt="Sample image" className="vertical_img" />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xl xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-5">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-xl mb-0 mr-4">Conecte-se com: </p>

                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-white before:mt-0.5 after:flex-1 after:border-t after:border-white after:mt-0.5">
                  <p className="text-center text-4xl text-blue-700 mx-4 mb-0">
                    Ou
                  </p>
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
                        /*  About ISO / IEC 27000:
                                                    (?= (.* [a - z]){ 3, })    lowercase letters. {3,} indicates that you want 3 of this group
                                                    (?=(.*[A-Z]){2,}) uppercase letters. {2,} indicates that you want 2 of this group
                                                    (?=(.*[0-9]){2,})   numbers. {2,} indicates that you want 2 of this group
                                                    (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields
                                                    {8,}  indicates that you want 8 or more
                                                 */
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
                            "Sobre a ISO/IEC 27000: 3 letras minúsculas. \n 2 letras maiúsculas. \n 2 números. \n 1 caracter especial. \n 8 caracteres ou mais",
                            { position: "top-center" }
                          );
                        }}
                      >
                        <i className="cursor-pointer text-xl ri-alert-line"></i>
                      </span>
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
                  <p className="text-md flex font-semibold mt-2 pt-1 mb-0">
                    Não possui uma conta?&nbsp;
                    <Link href={`/register?redirect=${redirect || "/"}`}>
                      <div className="hover:text-blue-700 hover:underline text-right focus:text-red-700 cursor-pointer transition duration-200 ease-in-out">
                        Registre-se
                      </div>
                    </Link>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Voltar
                  </button>
                  <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

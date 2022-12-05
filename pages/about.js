import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import TeamSvg from "../public/images/team.svg";
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import ControllerLogo from "../public/images/controller.svg";
import Ariel from "../public/imgUser/a.jpg";
import Carlos from "../public/imgUser/c.jpg";
import Joao from "../public/imgUser/j.jpg";
import Cloud from "../public/images/cloudinary.svg";
import Figma from "../public/images/figma.svg";
import Js from "../public/images/javascript.svg";
import Mdb from "../public/images/mongodb.svg";
import Next from "../public/images/nextjs.svg";
import Node from "../public/images/nodejs.svg";
import Tw from "../public/images/tailwindcss.svg";
import Git from "../public/images/github.svg";
import Ln from "../public/images/linkedin.svg";

function AboutScreen() {
  const [loopNumj, setLoopNumj] = useState(0);
  const [isDeletingj, setIsDeletingj] = useState(false);
  const [textj, setTextj] = useState('');
  const [deltaj, setDeltaj] = useState();
  const [indexj, setIndexj] = useState(2);
  const toRotatej = ["Sejam bem-vindos!      ", "Ariel Paixão      🫡   ", "Carlos Júnior      🫡   ", "João Machado      🫡   ", "GameOn    🎮   "];
  const periodj = 100;
  console.log(indexj);
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, deltaj);
    return () => { clearInterval(ticker) };
  }, [textj])
  const tick = () => {
    let j = loopNumj % toRotatej.length;
    let fullTextj = toRotatej[j];
    let updatedTextj = isDeletingj ? fullTextj.substring(0, textj.length - 1) : fullTextj.substring(0, textj.length + 1);
    setTextj(updatedTextj);
    if (!isDeletingj && updatedTextj === fullTextj) {
      setIsDeletingj(true);
      setIndexj(prevIndex => prevIndex - 1);
      setDeltaj(periodj);
    } else if (isDeletingj && updatedTextj === '') {
      setIsDeletingj(false);
      setLoopNumj(loopNumj + 1);
      setIndexj(2);
      setDeltaj(200);
    } else {
      setIndexj(prevIndex => prevIndex + 1);
    }
  }
  return (
    <Layout title="Sobre - GameOn">
      <section>
        <TrackVisibility>
          {
            ({ isVisible }) =>
              <div className={isVisible
                ? "animate__animated animate__backInLeft grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4 container"
                : "animate__animated animate__fadeOutUp grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4 container"}
              >
                <div className="col-span-1 text-center">
                  <Image
                    src={TeamSvg}
                    alt="Imagem cartunizada dos membros da equipe de desenvolvedores da plataforma GameOn."
                    className="w-full card !shadow-none vertical_img !bg-sky-100"
                    layout="responsive"
                    width={350}
                    height={350}
                  />
                </div>
                <div className="col-span-1 flex flex-col justify-between">
                  <div className="my-10">
                    <div className="mb-5">
                      <span className="text-3xl p-5">Nós somos</span>
                    </div>
                    <h1 className="flex flex-col text-5xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center text-slate-600">
                      <span> Alunos da Faculdade de Tecnologia de Guaratinguetá</span>
                      <span className="text-blue-800 text-5xl">
                        {" "}
                        e cursamos Análise e Desenvolvimento de Sistemas.
                      </span>
                    </h1>
                    <div className="text-3xl p-5">
                      Conheça um pouco mais sobre nós e também nosso projeto visitando
                      nosso repositório no{" "}
                      <a
                        href="https://github.com/machado-joao/trabalho-graduacao"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                      .
                    </div>
                    <div className="card p-5">
                      <ul>
                        <li className="mt-1 flex justify-between">
                          <Image src={Cloud} className="!p-1" width={50} height={50} alt="redes" unoptimized />
                          <Image src={Figma} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                          <Image src={Js} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                          <Image src={Mdb} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                          <Image src={Next} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                          <Image src={Node} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                          <Image src={Tw} className="!p-1" width={45} height={50} alt="redes" unoptimized />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          }
        </TrackVisibility >
      </section>
      <div className="my-5">
        <div className="container h-screen flex flex-col justify-center items-center bg-blue-100">
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__zoomInLeft animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="text-center">
                  <div className="text-blue-800 text-9xl">
                    <span>Ga</span>
                    <Image
                      src={ControllerLogo}
                      alt="Um ícone de um controle que se parece com a letra M."
                      width={80}
                      height={50}
                    />
                    <span>e</span>
                    <span className="bg-blue-800 rounded-lg text-white text-8xl">
                      On
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="!text-5xl py-2" >
                    <span className="flex-wrap">{textj}|</span>
                  </span>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5 ">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className="justify-center items-center flex">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Ariel} className="rounded-full" alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-fit flex w-full">
            {
              ({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-0s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                  <h1 className="text-5xl card p-4 text-blue-800 text-center"> Ariel Afonso Coelho Paixão </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Desenvolvedor
                    </p>
                    <p className="text-justify">
                      Desenvolvi as principais funcionalidades do sistema e implementei as regras de negócios e validações necessárias.
                      Realizei também a integração da aplicação com o PayPal e fiz o <em>deploy</em> do projeto pelo Vercel.
                    </p>
                  </div>
                  <div className="card p-5">
                    <h1 className="text-2xl">Entre em contato:</h1>
                    <div className="flex flex-wrap justify-start">
                      <Link href="https://www.github.com/paixaoariellll" target="_blank" className="cursor-pointer" >
                        <Image src={Git} className="!p-1" width={45} height={50} alt="" unoptimized />
                      </Link>
                      <Link href="https://www.linkedin.com/in/ariel-paixao" target="_blank" className="cursor-pointer">
                        <Image src={Ln} className="!p-1" width={45} height={50} alt="" unoptimized />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className="h-fit flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <h1 className="text-5xl card text-blue-800 text-center"> Carlos Marques de Oliveira Júnior</h1>
                <div className="pt-10 text-3xl card p-5">
                  <p className="text-center pb-5 text-4xl">
                    Desenvolvedor
                  </p>
                  <p className="text-justify">
                    Auxiliei na elicitação de requisitos, ajudei na codificação e na criação do banco de dados.
                  </p>
                  <p className="text-justify">
                    Além disso, fiz uma análise dos concorrentes para ajudar na criação de novas ideias que nossa equipe desenvolveu.
                  </p>
                </div>
                <div className="card p-5">
                  <h1 className="text-2xl">Entre em contato:</h1>
                  <div className="flex flex-wrap justify-start cursor-pointer">
                    <Link href="https://github.com/CarlosDevMarques">
                      <Image src={Git} className="!p-1" width={45} height={50} alt="" unoptimized />
                    </Link>
                    <Link href="https://www.linkedin.com/in/carlos-marques-4b6aa31b5/">
                      <Image src={Ln} className="!p-1" width={45} height={50} alt="" unoptimized />
                    </Link>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
          <TrackVisibility className=" justify-center items-center flex ">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Carlos} className="rounded-full" alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className=" justify-center items-center flex ">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Joao} className="rounded-full" alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-fit flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="">
                  <h1 className="text-5xl text-center card p-5 text-blue-800"> João Lucas Coelho Machado </h1>
                  <div className="pt-10 text-3xl p-5 card">
                    <p className="text-center pb-5 text-4xl">
                      Líder Técnico
                    </p>
                    <p className="text-justify">
                      Ajuda na codificação de forma geral, bem como na implementação de medidas de segurança do sistema. Ademais, elaborei as documentações e fui o responsável por manter o repositório do projeto.
                    </p>
                  </div>
                </div>
                <div className="card p-5">
                  <h1 className="text-2xl">Entre em contato:</h1>
                  <div className="flex flex-wrap justify-start">
                    <a href="https://www.github.com/machado-joao" className="cursor-pointer">
                      <Image src={Git} className="" width={45} height={50} alt="" unoptimized />
                    </a>
                    <a href="https://www.linkedin.com/in/machado-joao">
                      <Image src={Ln} className="!p-1" width={45} height={50} alt="" unoptimized />
                    </a>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className="h-fit flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-0s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="">
                  <h1 className="text-5xl text-center !bg-red-600 card p-5 text-white"> Problema </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <ul className="list-disc p-5">
                      <li>Plataforma exclusiva para <em>gamers</em>;</li>
                      <li>Interface intuitiva;</li>
                      <li>Etapas facilitadas;</li>
                      <li>Segurança.</li>
                    </ul>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-fit flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-2s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="">
                  <h1 className="text-5xl text-center !bg-blue-800 card p-5 text-white"> Objetivo </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <ul className="list-disc p-5">
                      <li>Aplicação de metodologias ágeis;</li>
                      <li>Realizar a modelagem do sistema;</li>
                      <li>Desenvolver um <em>e-commerce</em>;</li>
                      <li>Fazer a implantação do sistema.</li>
                    </ul>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
    </Layout >
  );
}

export default AboutScreen;

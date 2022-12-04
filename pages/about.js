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

function AboutScreen() {
  const [loopNumi, setLoopNumi] = useState(0);
  const [loopNumj, setLoopNumj] = useState(0);
  const [isDeletingi, setIsDeletingi] = useState(false);
  const [isDeletingj, setIsDeletingj] = useState(false);
  const [texti, setTexti] = useState('');
  const [textj, setTextj] = useState('');
  const [deltai, setDeltai] = useState();
  const [deltaj, setDeltaj] = useState();
  const [indexi, setIndexi] = useState(1);
  const [indexj, setIndexj] = useState(2);
  const toRotatei = ["GameOn", "Ariel Paixão", "Carlos Júnior", "João Machado", "Apenas uma pessoas qualquer com a capacidade de insistir... "];
  const toRotatej = ["Sejam Bem vindos!      ", "Ariel Paixão      🫡   ", "Carlos Júnior      🫡   ", "João Machado      🫡   ", "GameOn    🎮   "];

  const periodi = 1500;
  const periodj = 100;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, deltai);
    return () => { clearInterval(ticker) };
  }, [texti])

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, deltaj);
    return () => { clearInterval(ticker) };
  }, [textj])

  const tick = () => {
    let i = loopNumi % toRotatei.length;
    let j = loopNumj % toRotatej.length;
    let fullTexti = toRotatei[i];
    let fullTextj = toRotatej[j];
    let updatedTexti = isDeletingi ? fullTexti.substring(0, texti.length - 1) : fullTexti.substring(0, texti.length + 1);
    let updatedTextj = isDeletingj ? fullTextj.substring(0, textj.length - 1) : fullTextj.substring(0, textj.length + 1);

    setTexti(updatedTexti);
    setTextj(updatedTextj);

    if (isDeletingi) {
      setDeltai(prevDelta => prevDelta / 1);
    }
    if (!isDeletingi && updatedTexti === fullTexti) {
      setIsDeletingi(true);
      setIndexi(prevIndex => prevIndex - 1);
      setDeltai(periodi);
    } else if (isDeletingi && updatedTexti === '') {
      setIsDeletingi(false);
      setLoopNumi(loopNumi + 1);
      setIndexi(1);
      setDeltai(200);
    } else {
      setIndexi(prevIndex => prevIndex + 1);
    }

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
      <section className="">
        <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible
              ? "animate__animated animate__backInLeft grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4 container"
              : "animate__animated animate__fadeOutUp grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4 container"}
            >
              <div div className="col-span-1 text-center">
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
                </div>
              </div>
            </div>}
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
          <TrackVisibility className=" justify-center items-center h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Ariel} alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-0s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl card p-4 text-blue-800 text-center"> Ariel Afonso Coelho Paixão </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Desenvolvedor
                    </p>
                    <p>
                      Procurei as ferramentas necessárias para a criação do projeto e arquitetei os processos das sprints para que pudéssemos ter uma organização quanto aos prazos das entregas
                    </p>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5 ">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl card text-blue-800 text-center"> Carlos Marques de Oliveira Júnior</h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Desenvolvedor
                    </p>
                    <p>
                      Auxiliei na criação dos protótipos, programei algumas telas e preenchi o banco de dados com informações reais.
                      Além disso ajudei na criação das ideias que nossa equipe desenvolveu.
                    </p>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
          <TrackVisibility className=" justify-center items-center h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Carlos} alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className=" justify-center items-center h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <Image src={Joao} alt="Ariel Paixão" width={600} height={600} unoptimized title="Ariel" />
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-1s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl text-center card p-5 text-blue-800"> João Lucas Coelho Machado </h1>
                  <div className="pt-10 text-3xl  p-5  card">
                    <p className="text-center pb-5 text-4xl">
                      Scrum Master
                    </p>
                    <p className="">
                      Mandei, meus escravos fizeram!
                    </p>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full p-16 h-screen gap-x-10 flex justify-between items-center bg-blue-100">
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-4s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl text-center !bg-red-100 card p-5 text-blue-800"> Problema </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Resumo
                    </p>
                    <ul className="list-disc p-5">
                      <li>Jogos eletrônicos de mídia física;</li>
                      <li>Plataforma exclusiva;</li>
                      <li>Ambiente customizado para o público-alvo;</li>
                      <li>Interface intuitiva;</li>
                      <li>Segurança de ponta a ponta.</li>
                    </ul>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-4s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl text-center !bg-green-100 card p-5 text-blue-800"> Objetivo </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Resumo
                    </p>
                    <ul className="list-disc p-5">
                      <li>Jogos eletrônicos de mídia física;</li>
                      <li>Plataforma exclusiva;</li>
                      <li>Ambiente customizado para o público-alvo;</li>
                      <li>Interface intuitiva;</li>
                      <li>Segurança de ponta a ponta.</li>
                    </ul>
                  </div>
                </div>
              </div>}
          </TrackVisibility>
        </div>
      </div>
      <div className="my-5">
        <div className="container h-screen flex flex-col justify-center items-center bg-blue-100">
          <TrackVisibility className="h-full flex w-full">
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeInRight animate__delay-4s" : "animate__animated animate__fadeOutUp animate__delay-0.5s"}>
                <div className="pt-20">
                  <h1 className="text-5xl text-center !bg-green-100 card p-5 text-blue-800"> Objetivo </h1>
                  <div className="pt-10 text-3xl card p-5">
                    <p className="text-center pb-5 text-4xl">
                      Resumo
                    </p>
                    <ul className="list-disc p-5">
                      <li>Jogos eletrônicos de mídia física;</li>
                      <li>Plataforma exclusiva;</li>
                      <li>Ambiente customizado para o público-alvo;</li>
                      <li>Interface intuitiva;</li>
                      <li>Segurança de ponta a ponta.</li>
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

'use client';

import Link from 'next/link';
import { PagePaths } from '@/components/enums/page-paths-enum';
import Sun from '@/app/images/sun.png';
import Underline from '@/app/images/underline.png';
import Image from 'next/image';
import Sidebar from '@/components/component/sidebar/sidebar';
import RotatingLogo from '@/components/component/rotating-logo/rotating-logo';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

const LandingPage = () => {
    return (
        <div className="relative h-screen overflow-auto lg:overflow-hidden xl:overflow-hidden">
            <div className="flex h-full relative">
                {/* Sidebar */}
                <Sidebar />

                <div className="relative h-screen w-screen">
                    {/* Logo Component */}
                    <div
                        className="absolute inset-0 w-full top-36 hidden lg:block"
                        style={{
                            transform: 'scale(1.2) translateX(200px)',
                        }}
                    >
                        <RotatingLogo />
                    </div>
                    {/* Content Overlay */}
                    <div className="absolute top-8 left-10 z-10 p-4 md:p-8 lg:p-12">
                        {/* Your text and other content here */}
                        <h1 className="text-5xl font-bold mb-7 text-[#262626]">
                            Découvrez les{' '}
                        </h1>
                        <div className="flex items-center">
                            {/* Wrap h1 and underline image in a container */}
                            <h1 className="text-6xl font-bold mb-7 text-[#262626]">
                                entreprises familiales
                                <Image
                                    src={Sun}
                                    alt="Soleil"
                                    className="w-4 h-auto inline-block ml-2 -mt-2"
                                />
                            </h1>
                        </div>
                        <h1 className="text-5xl font-bold mb-4 text-[#262626]">
                            du Québec
                        </h1>

                        <Image
                            src={Underline}
                            alt="Underline"
                            className="w-48 h-auto mt-0 ml-2 invert"
                        />

                        <div className="flex mt-5 ml-8">
                            <div className="w-[50%] pr-2 flex items-center">
                                <Link href={PagePaths.THEMATIQUES}>
                                    <Button buttonType={ButtonType.PULSE}>
                                        <span className="text-lg text-[#000000]  transition-duration-300">
                                            <span className="mr-1">
                                                {' '}
                                                Explorez &#8594;
                                            </span>
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="text-sm mt-12 ml-1">
                            <div className="w-[500px] lg:w-[700px] xl:w-[900px] mb-2">
                                <h4>
                                    <strong>Bienvenue</strong> sur la nouvelle
                                    plateforme de Familles en affaires, une
                                    adaptation numérique et interactive de
                                    <em>
                                        {' '}
                                        L&apos;Album de familles et certaines
                                        données de l&apos;Indice
                                        entrepreneuriale 2023.
                                    </em>
                                </h4>
                            </div>
                            <div className="mb-4 text-sm w-[500px] lg:w-[700px] xl:w-[900px]">
                                <h4>
                                    Cette plateforme représente un hommage
                                    vibrant au patrimoine québécois, une
                                    véritable source de fierté, mettant en
                                    lumière les entreprises familiales qui
                                    façonnent l&apos;histoire et la culture de
                                    notre province. Grâce à son interface
                                    conviviale et ses fonctionnalités avancées,
                                    notre application permet aux utilisateurs de
                                    découvrir ces entreprises remarquables,
                                    d&apos;explorer leur histoire unique et de
                                    mener leurs propres investigations.
                                    Rejoignez-nous dans cette aventure
                                    captivante pour célébrer et soutenir
                                    l&apos;esprit d&apos;entreprise familial qui
                                    anime le Québec !{' '}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="absolute w-screen flex flex-row justify-evenly bottom-4">
                        <Image
                            src="/images/fea-full-logo.png"
                            width={100}
                            height={100}
                            alt="logo-FEA"
                        />
                        <Image
                            src="/images/Logos-civision.png"
                            width={100}
                            height={100}
                            alt="logo-FEA"
                        />
                        <Image
                            src="/images/logo-meie.jpg"
                            width={100}
                            height={100}
                            alt="logo-FEA"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

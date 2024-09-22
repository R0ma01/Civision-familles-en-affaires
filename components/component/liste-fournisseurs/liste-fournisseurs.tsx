import { Fournisseur } from '@/components/interface/fournisseur';
import useGlobalDataStore from '@/stores/global-data-store';
import React, { useEffect, useState } from 'react';
import Dropdown from '../drop-down-menu/drop-down-menu';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

import {
    AddCircleSVG,
    EditSVG,
    EmailSVG,
    GlobeSVG,
    InvisibleSVG,
    LinkedInSVG,
    PhoneSVG,
    ServiceSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { Language } from '@/components/enums/language';
import {
    SharedPromptsTranslations,
    FournisseurPromptsTranslations,
} from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';

interface ListeFournisseurProps {
    admin?: boolean;
    openEditDialog?: any;
    openDeleteDialog?: any;
    toggleFournisseurVisibility?: any;
}

const emptyFournisseur = {
    contact: {
        lastName: '',
        firstName: '',
        email: '',
        cellPhone: '',
        company: '',
        title: '',
        linkedin: '',
    },
    secteurs_geographique: [],
    services_offerts: [],
};

export default function ListeFournisseurs({
    admin = false,
    openEditDialog = () => {},
    openDeleteDialog = () => {},
    toggleFournisseurVisibility = () => {},
}: ListeFournisseurProps) {
    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
    const lang: Language = useDataStore((state) => state.lang);

    const { fournisseurData, loading } = useGlobalDataStore((state: any) => ({
        fournisseurData: state.fournisseurData,
        loading: state.loading,
    }));

    const [searchString, setSearchString] = useState<string>('');
    const [searchSecteur, setSearchSecteur] = useState<
        SecteursGeographiques | string
    >('Toutes');
    const [searchService, setSearchService] = useState<ServiceOffert | string>(
        'Toutes',
    );

    function sortAlphabetically(compagnies: Fournisseur[]): Fournisseur[] {
        return compagnies.sort((a, b) => {
            if (!a.contact.lastName) {
                return 1;
            }
            if (!b.contact.lastName) {
                return -1;
            }

            // Normalize the names to remove accents and special characters
            const normalize = (name: string) =>
                name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();

            const nameA = normalize(a.contact.lastName);
            const nameB = normalize(b.contact.lastName);

            // Regular expression to check if the first character is a letter
            const isLetter = (name: string) => /^[a-zA-Z]/.test(name);

            if (isLetter(nameA) && !isLetter(nameB)) {
                return -1; // `a` comes first
            } else if (!isLetter(nameA) && isLetter(nameB)) {
                return 1; // `b` comes first
            } else {
                return nameA.localeCompare(nameB);
            }
        });
    }

    const filterPredicate = (fournisseur: Fournisseur) => {
        let returnValue = false;

        if (
            fournisseur.contact.lastName
                .toLowerCase()
                .startsWith(searchString.toLowerCase(), 0) ||
            fournisseur.contact.firstName
                .toLowerCase()
                .startsWith(searchString.toLowerCase(), 0)
        ) {
            if (
                searchSecteur === 'Toutes' ||
                fournisseur.secteurs_geographique.includes(
                    searchSecteur as unknown as SecteursGeographiques,
                )
            ) {
                if (
                    searchService === 'Toutes' ||
                    fournisseur.services_offerts.includes(
                        searchService as unknown as ServiceOffert,
                    )
                ) {
                    returnValue = true;
                }
            }
        }
        return returnValue;
    };

    function filterSearchParams() {
        const newData = fournisseurData.filter(filterPredicate);

        setFournisseurs(sortAlphabetically(newData));
    }

    useEffect(() => {
        filterSearchParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fournisseurData, searchString, searchSecteur, searchService]);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchString(e.target.value);
    }

    function populateTable() {
        return fournisseurs.map((fournisseur, index) => {
            return (
                <FournisseurListElement
                    key={index}
                    fournisseur={fournisseur}
                    index={index}
                    admin={admin}
                    onClickEdit={openEditDialog}
                    onClickDelete={openDeleteDialog}
                    onClickVisible={toggleFournisseurVisibility}
                ></FournisseurListElement>
            );
        });
    }

    return (
        <div
            className={`w-[500px] bg-[#fefefe] dark:bg-[#2a2a2a] dark:text-white backdrop-blur-md bg-opacity-50 shadow-3xl
                    rounded-xl py-8 px-10 pointer-events-auto flex flex-col items-center space-y-6 h-auto max-h-[90%] `}
        >
            {/* Search and Filters */}
            <div className="flex flex-col w-full space-y-4">
                <h1 className="font-semibold text-xl">
                    {FournisseurPromptsTranslations.fournisseur_box_title[lang]}
                </h1>
                <div className="flex flex-col items-center justify-between">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Rechercher un fournisseur"
                        value={searchString}
                        onChange={handleSearchChange}
                        className="w-full p-3 bg-white dark:bg-[#3a3a3a] border border-logo-turquoise dark:border-[#4fc3f7] 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-logo-turquoise dark:focus:ring-[#4fc3f7] 
                               shadow-sm transition ease-in-out duration-200"
                    />

                    {/* Dropdown Filters */}
                    <div className="flex flex-row justify-evenly space-x-4 mt-2">
                        <div className="flex flex-col">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.region[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    'Toutes',
                                    ...Object.values(SecteursGeographiques),
                                ]}
                                inputValue={searchSecteur}
                                onChange={(value: any) =>
                                    setSearchSecteur(value)
                                }
                                className="hover:border-logo-turquoise focus:ring-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.service[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    'Toutes',
                                    ...Object.values(ServiceOffert),
                                ]}
                                inputValue={searchService}
                                onChange={(value: any) =>
                                    setSearchService(value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table with Suppliers */}
            {!loading ? (
                <>
                    <div className="w-full overflow-y-auto max-h-[70%] rounded-md">
                        <table className="min-w-full">
                            <tbody>{populateTable()}</tbody>
                        </table>
                    </div>
                    {admin && (
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={() =>
                                openEditDialog(
                                    emptyFournisseur as unknown as Fournisseur,
                                )
                            }
                        >
                            <AddCircleSVG></AddCircleSVG>
                        </Button>
                    )}
                </>
            ) : (
                <div className="w-full h-32 flex justify-center items-center">
                    <div className="loader-circle"></div>
                </div>
            )}
        </div>
    );
}

interface FournisseurListElementProps {
    fournisseur: Fournisseur;
    index: number;
    admin: boolean;
    onClickEdit: (fournisseur: Fournisseur) => void;
    onClickDelete: (fournisseur: Fournisseur) => void;
    onClickVisible: (fournisseur: Fournisseur) => void;
}
function FournisseurListElement({
    fournisseur,
    index,
    admin = false,
    onClickEdit,
    onClickDelete,
    onClickVisible,
}: FournisseurListElementProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleRowClick = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return (
        <tr
            key={index}
            className={`border-b border-gray-400 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-md flex items-center overflow-hidden cursor-pointer w-full relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-auto' : 'h-12'
            } group`}
            onClick={handleRowClick}
        >
            {/* Main Row */}
            <tr className="w-full flex flex-col justify-between items-center">
                {!isOpen && (
                    <td className="w-full p-2">
                        <div className="flex flex-row space-x-4 w-full">
                            {' '}
                            <p className="font-bold">
                                {fournisseur.contact.firstName +
                                    ' ' +
                                    fournisseur.contact.lastName.toUpperCase()}{' '}
                            </p>
                        </div>
                    </td>
                )}

                {isOpen && (
                    <td className="w-full flex flex-col transition-all transform duration-300 p-2">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col w-full">
                                <div className="flex w-[60%]">
                                    <p className="font-bold text-left">
                                        {fournisseur.contact.firstName +
                                            ' ' +
                                            fournisseur.contact.lastName.toUpperCase()}{' '}
                                    </p>
                                </div>
                                <p className="text-left">
                                    {fournisseur.contact.company}
                                </p>
                            </div>
                            <div className="flex flex-col w-[40%]">
                                <div className="flex flex-row justify-end space-x-2">
                                    <div className="flex flex-col">
                                        <a
                                            href={`tel:+1${fournisseur.contact.cellPhone}`}
                                            onClick={(e: any) => {
                                                handleButtonClick(e);
                                            }}
                                        >
                                            <div className="border rounded-full w-fit h-fit overflow-hidden">
                                                <PhoneSVG className="bg-black fill-white p-1"></PhoneSVG>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="flex flex-col">
                                        <a
                                            href={`mailto:${fournisseur.contact.email}`}
                                            className="text-blue-500 underline"
                                            onClick={(e: any) => {
                                                handleButtonClick(e);
                                            }}
                                        >
                                            <div className="border rounded-full w-fit h-fit overflow-hidden">
                                                <EmailSVG className="bg-black fill-white p-1"></EmailSVG>
                                            </div>{' '}
                                        </a>
                                    </div>
                                    <div className="flex flex-col">
                                        <a
                                            href={fournisseur.contact.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e: any) => {
                                                handleButtonClick(e);
                                            }}
                                        >
                                            <div className="border rounded-full w-fit h-fit overflow-hidden">
                                                <LinkedInSVG className="bg-black fill-white p-1"></LinkedInSVG>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <p className="text-right">
                                    {fournisseur.contact.cellPhone}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-1">
                            <div className="border rounded-full w-fit h-fit overflow-hidden">
                                <GlobeSVG className="bg-black fill-white p-1"></GlobeSVG>
                            </div>
                            <p className="max-h-12 overflow-auto flex flex-col">
                                {fournisseur.secteurs_geographique.map(
                                    (secteur: any) => {
                                        return <p key={index}>{secteur}</p>;
                                    },
                                )}
                            </p>
                        </div>
                        <div className="flex flex-row space-x-1">
                            <ServiceSVG></ServiceSVG>
                            <p className="max-h-12 overflow-auto flex flex-col">
                                {fournisseur.services_offerts.map(
                                    (service: any) => {
                                        return <p key={index}>{service}</p>;
                                    },
                                )}
                            </p>
                        </div>
                    </td>
                )}
            </tr>

            {/* Admin Actions */}
            <div className="absolute right-0 top-0 z-50 flex-row justify-evenly w-fit mb-4 hidden group-hover:flex">
                {admin && (
                    <>
                        {/* Edit Button */}
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={(e) => {
                                handleButtonClick(e);
                                onClickEdit(fournisseur);
                            }}
                        >
                            <EditSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey transition-all duration-200" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={(e) => {
                                handleButtonClick(e);
                                onClickDelete(fournisseur);
                            }}
                        >
                            <TrashSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey transition-all duration-200" />
                        </Button>

                        {/* Visibility Button */}
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={(e) => {
                                handleButtonClick(e);
                                onClickVisible(fournisseur);
                            }}
                        >
                            {fournisseur.visible ? (
                                <VisibleSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey transition-all duration-200" />
                            ) : (
                                <InvisibleSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey transition-all duration-200" />
                            )}
                        </Button>
                    </>
                )}
            </div>
        </tr>
    );
}

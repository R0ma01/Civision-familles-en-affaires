import { Fournisseur } from '@/components/interface/fournisseur';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';
import React, { useEffect, useState } from 'react';
import Dropdown from '../drop-down-menu/drop-down-menu';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import useGlobalUserStore from '@/stores/global-user-store';
import {
    AddCircleSVG,
    EditSVG,
    EmailSVG,
    GlobeSVG,
    InvisibleSVG,
    PhoneSVG,
    ProfessionalSVG,
    ServiceSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { Global } from 'recharts';

interface ListeFournisseurProps {
    admin: boolean;
    openEditDialog: any;
    openDeleteDialog: any;
    toggleFournisseurVisibility: any;
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
    openEditDialog,
    openDeleteDialog,
    toggleFournisseurVisibility,
}: ListeFournisseurProps) {
    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);

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
                <div className="flex flex-row items-center space-x-4 justify-between">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchString}
                        onChange={handleSearchChange}
                        className="w-full p-3 bg-white dark:bg-[#3a3a3a] border border-logo-turquoise dark:border-[#4fc3f7] 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-logo-turquoise dark:focus:ring-[#4fc3f7] 
                               shadow-sm transition ease-in-out duration-200"
                    />

                    {/* Dropdown Filters */}
                    <div className="flex flex-col space-y-2">
                        <p className="text-xs">Région</p>
                        <Dropdown
                            options={[
                                'Toutes',
                                ...Object.values(SecteursGeographiques),
                            ]}
                            inputValue={searchSecteur}
                            onChange={(value: any) => setSearchSecteur(value)}
                            className="hover:border-logo-turquoise focus:ring-2"
                        />
                        <p className="text-xs">Service Offert</p>
                        <Dropdown
                            options={[
                                'Toutes',
                                ...Object.values(ServiceOffert),
                            ]}
                            inputValue={searchService}
                            onChange={(value: any) => setSearchService(value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table with Suppliers */}
            {!loading ? (
                <>
                    <div className="w-full overflow-y-auto max-h-[70%] rounded-md shadow-inner bg-white dark:bg-[#3a3a3a]">
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
            className={`border-b border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-md flex items-center overflow-hidden cursor-pointer w-full relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-auto' : 'h-12'
            } group`}
            onClick={handleRowClick}
        >
            {/* Main Row */}
            <tr className="w-full flex flex-col justify-between items-center">
                {!isOpen && (
                    <td className="w-full">
                        <div className="flex flex-row space-x-4 w-full">
                            {' '}
                            <p>
                                {fournisseur.contact.lastName +
                                    ', ' +
                                    fournisseur.contact.firstName}{' '}
                            </p>
                            <p>{fournisseur.contact.company}</p>
                        </div>
                    </td>
                )}

                {isOpen && (
                    <td className="w-full flex flex-row transition-all transform duration-300">
                        <div className="flex flex-row items-center">
                            <ProfessionalSVG className="w-28 h-28"></ProfessionalSVG>{' '}
                            <div className="flex flex-col">
                                <div className="flex ">
                                    <p className="font-semibold">
                                        {fournisseur.contact.lastName +
                                            ', ' +
                                            fournisseur.contact.firstName}{' '}
                                    </p>
                                </div>
                                <p>{fournisseur.contact.company}</p>
                                <div className="flex flex-row space-x-1">
                                    <GlobeSVG></GlobeSVG>
                                    <p className="max-h-12 overflow-auto flex flex-col">
                                        {fournisseur.secteurs_geographique.map(
                                            (secteur: any) => {
                                                return <p>{secteur}</p>;
                                            },
                                        )}
                                    </p>
                                </div>
                                <div className="flex flex-row space-x-1">
                                    <ServiceSVG></ServiceSVG>
                                    <p className="max-h-12 overflow-auto flex flex-col">
                                        {fournisseur.services_offerts.map(
                                            (service: any) => {
                                                return <p>{service}</p>;
                                            },
                                        )}
                                    </p>
                                </div>
                                <div className="flex flex-row space-x-1">
                                    <PhoneSVG></PhoneSVG>
                                    {fournisseur.contact.cellPhone}
                                </div>
                                <div className="flex flex-row space-x-1">
                                    <EmailSVG></EmailSVG>
                                    <a
                                        href={`mailto:${fournisseur.contact.email}`}
                                        className="text-blue-500 underline"
                                        onClick={(e: any) => {
                                            handleButtonClick(e);
                                        }}
                                    >
                                        {' '}
                                        {fournisseur.contact.email}
                                    </a>
                                </div>
                                <div className="flex flex-row space-x-1">
                                    <EmailSVG></EmailSVG>
                                    <a
                                        href={fournisseur.contact.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
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

// <tr>
//     <td className="w-full flex">
//         {/* Contact Name */}
//         <td className="px-4 text-sm font-medium dark:text-white text-black transition-all ease-in-out transform duration-300 w-full">
//             <p>
//                 {fournisseur.contact.lastName +
//                     ', ' +
//                     fournisseur.contact.firstName[0] +
//                     '.'}
//             </p>
//         </td>

//         {/* Company Name */}
//         <td className="px-4 text-sm dark:text-white text-black transition-all ease-in-out transform duration-300">
//             {fournisseur.contact.company}
//         </td>
//     </td>
//     {/* Expandable Content */}
//     {isOpen && (
//         <tr className="w-full flex flex-col py-2 space-y-2">
//             <tr className="flex justify-between items-start w-full">
//                 {/* Contact Info */}
//                 <td className="px-4 text-sm dark:text-white text-black transition-all ease-in-out transform duration-300">
//                     {fournisseur.contact.cellPhone || 'N/A'}
//                 </td>
//                 <td className="px-4 text-sm dark:text-white text-blue-500 underline transition-all ease-in-out transform duration-300">
//                     <a
//                         href={`mailto:${fournisseur.contact.email}`}
//                     >
//                         {fournisseur.contact.email}
//                     </a>
//                 </td>
//                 <td className="px-4 text-sm dark:text-white text-blue-500 underline transition-all ease-in-out transform duration-300">
//                     {fournisseur.contact.linkedin && (
//                         <a
//                             href={fournisseur.contact.linkedin}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             LinkedIn
//                         </a>
//                     )}
//                 </td>
//             </tr>

//             {/* Additional Info (Secteurs Geographique & Services Offerts) */}
//             <tr className="w-full flex flex-col space-y-2">
//                 <td className="px-4 py-2 text-xs dark:text-white text-black transition-all ease-in-out transform duration-300">
//                     {fournisseur.secteurs_geographique.join(
//                         ', ',
//                     )}
//                 </td>
//                 <td className="px-4 py-2 text-xs dark:text-white text-black transition-all ease-in-out transform duration-300">
//                     {fournisseur.services_offerts.join(', ')}
//                 </td>
//             </tr>
//         </tr>
//     )}
// </tr>;

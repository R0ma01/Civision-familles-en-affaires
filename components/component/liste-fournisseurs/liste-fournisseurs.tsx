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
    EditSVG,
    InvisibleSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';

interface ListeFournisseurProps {
    admin: boolean;
    isEditDialogOpen: any;
    isDeleteDialogOpen: any;
    currentFournisseur: any;
    openEditDialog: any;
    closeEditDialog: any;
    submitEditDialog: any;
    openDeleteDialog: any;
    closeDeleteDialog: any;
    submitDeleteDialog: any;
    toggleFournisseurVisibility: any;
}

export default function ListeFournisseurs({
    admin = false,
    isEditDialogOpen,
    isDeleteDialogOpen,
    currentFournisseur,
    openEditDialog,
    closeEditDialog,
    submitEditDialog,
    openDeleteDialog,
    closeDeleteDialog,
    submitDeleteDialog,
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
    console.log([...Object.values(SecteursGeographiques), 'toutes']);
    return (
        <div
            className={`w-[500px] bg-[#fefefe] dark:bg-[#2a2a2a] dark:text-white backdrop-blur-md bg-opacity-50 shadow-3xl
                    rounded-xl py-8 px-10 pointer-events-auto flex flex-col items-center h-auto space-y-6`}
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
                <div className="w-full overflow-y-auto max-h-72 rounded-md shadow-inner bg-white dark:bg-[#3a3a3a]">
                    <table className="min-w-full">
                        <tbody>{populateTable()}</tbody>
                    </table>
                </div>
            ) : (
                <div className="w-full h-32 flex justify-center items-center">
                    <div className="loader-circle animate-spin w-8 h-8 border-t-4 border-b-4 border-logo-turquoise dark:border-[#4fc3f7] rounded-full"></div>
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
            className={`border-b hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_1px_5px_rgba(255,255,255,0.45)] flex items-center overflow-hidden cursor-pointer w-full relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-24' : 'h-10'
            } group relative`}
            onClick={handleRowClick}
        >
            <td className="px-2 text-sm dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300">
                {fournisseur.contact.lastName}
            </td>
            <td
                className={`px-2 py-2 text-xs dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300 max-w-[30%] text-wrap overflow-x-hidden overflow-y-auto max-h-20 ${
                    isOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
                }`}
            >
                {fournisseur.secteurs_geographique.join(', ')}
            </td>
            <td
                className={`px-2 py-2 text-xs dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300 max-w-[30%] text-wrap overflow-x-hidden overflow-y-auto max-h-20 ${
                    isOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
                }`}
            >
                {fournisseur.services_offerts.join(', ')}
            </td>

            <div className="flex-row justify-evenly w-fit mb-4 hidden group-hover:flex absolute right-0 top-0 z-50">
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            console.log('hello');
                            onClickEdit(fournisseur);
                        }}
                    >
                        <EditSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey"></EditSVG>
                    </Button>
                )}
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            onClickDelete(fournisseur);
                        }}
                    >
                        <TrashSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey"></TrashSVG>
                    </Button>
                )}
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            onClickVisible(fournisseur);
                        }}
                    >
                        {fournisseur.visible ? (
                            <VisibleSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey"></VisibleSVG>
                        ) : (
                            <InvisibleSVG className="hover:scale-105 hover:fill-black dark:hover:fill-white fill-gray-500 dark:fill-custom-grey"></InvisibleSVG>
                        )}
                    </Button>
                )}
            </div>
        </tr>
    );
}

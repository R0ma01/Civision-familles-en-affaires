import { Fournisseur } from '@/components/interface/fournisseur';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';
import React, { useEffect, useState } from 'react';
export default function ListeFournisseurs() {
    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);

    const { filteredFournisseurData } = useGlobalFournisseursStore(
        (state: any) => ({
            filteredFournisseurData: state.filteredFournisseurData,
        }),
    );

    const [searchString, setSearchString] = useState<string>('');

    function sortAlphabetically(compagnies: Fournisseur[]): Fournisseur[] {
        return compagnies.sort((a, b) => {
            if (!a.contact.nom) {
                return 1;
            }
            if (!b.contact.nom) {
                return -1;
            }

            // Normalize the names to remove accents and special characters
            const normalize = (name: string) =>
                name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();

            const nameA = normalize(a.contact.nom);
            const nameB = normalize(b.contact.nom);

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

    const filterPredicate = (company: Fournisseur) => {
        return company.contact.nom
            ? company.contact.nom
                  .toLowerCase()
                  .startsWith(searchString.toLowerCase(), 0)
            : false;
    };

    function filterSearchParams() {
        const newData = filteredFournisseurData.filter(filterPredicate);

        setFournisseurs(sortAlphabetically(newData));
    }

    useEffect(() => {
        filterSearchParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredFournisseurData, searchString]);

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
                ></FournisseurListElement>
            );
        });
    }
    return (
        <>
            <div className="flex flex-col space-y-4 z-10 w-full">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchString}
                    onChange={handleSearchChange}
                    className="mb-4 p-2 h-8 bg-transparent border border-logo-turquoise dark:border-logo-turquoise shadow-lg rounded cursor-pointer"
                />
                <div className="overflow-y-auto overflow-x-hidden max-h-52">
                    <table className="min-w-full max-w-full ">
                        <tbody className="overflow-x-hidden max-w-full">
                            {populateTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

interface FournisseurListElementProps {
    fournisseur: Fournisseur;
    index: number;
}
function FournisseurListElement({
    fournisseur,
    index,
}: FournisseurListElementProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <tr
            key={index}
            className={`border-b hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)] flex items-center overflow-hidden cursor-pointer w-full relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-24' : 'h-10'
            }`} 
            onClick={() => setIsOpen(!isOpen)}
        >
            <td className="px-2 text-small dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300">
                {fournisseur.contact.nom}
            </td>
            <td
                className={`px-2 py-2 text-small dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300 max-w-[30%] text-wrap overflow-x-hidden overflow-y-auto max-h-20 ${
                    isOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
                }`}
            >
                {fournisseur.secteurs_geographique.join(', ')}
            </td>
            <td
                className={`px-2 py-2 text-small dark:text-white text-black w-[30%] transition-all ease-in-out transform duration-300 max-w-[30%] text-wrap overflow-x-hidden overflow-y-auto max-h-20 ${
                    isOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
                }`}
            >
                {fournisseur.services_offerts.join(', ')}
            </td>
            <td className="px-1 py-1 mr-3 absolute right-0 flex items-center h-full">
                <span
                    className={`bg-logo-turquoise dark:text-white text-black text-medium 
                rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300`}
                    style={{ transitionTimingFunction: 'ease-in-out' }}
                >
                    &gt;
                </span>
            </td>
        </tr>
    );
}

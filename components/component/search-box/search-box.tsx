'use client';
import { CompanyInfo } from '@/components/interface/company';
import constants from '@/constants/constants';
import useGlobalDataStore from '@/stores/global-data-store';
import { useEffect, useState } from 'react';
import useMapStore from '@/stores/global-map-store';

import { MapClusterPointData } from '@/components/interface/point-data';

function SearchBox() {
    const { repertoireFilteredData } = useGlobalDataStore((state: any) => ({
        repertoireFilteredData: state.repertoireFilteredData,
    }));
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [tableData, setTableData] = useState<MapClusterPointData[]>([]);
    const { setMapPoint } = useMapStore();

    function sortAlphabetically(
        compagnies: MapClusterPointData[],
    ): MapClusterPointData[] {
        return compagnies.sort((a, b) => {
            if (!a.nom) {
                return 1;
            }
            if (!b.nom) {
                return -1;
            }

            // Normalize the names to remove accents and special characters
            const normalize = (name: string) =>
                name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();

            const nameA = normalize(a.nom);
            const nameB = normalize(b.nom);

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

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }
    async function flyToPoint(company: MapClusterPointData) {
        // Handling RepertoireData type or any other type-specific logic
        // Assuming similar properties to CompanyInfo

        if (company.coords) {
            await setMapPoint(company);
        }
    }

    const filterPredicate = (company: MapClusterPointData) => {
        return company.nom
            ? company.nom.toLowerCase().startsWith(searchTerm.toLowerCase(), 0)
            : false;
    };

    function filterSearchParams() {
        const newData = repertoireFilteredData.filter(filterPredicate);

        setTableData(sortAlphabetically(newData));
    }

    function populateTable() {
        return tableData.map((company: MapClusterPointData, index) => {
            if (company.nom)
                return (
                    <tr
                        key={index}
                        className={`border-b cursor-pointer `}
                        onClick={async () => {
                            console.log(company);
                            await flyToPoint(company);
                        }}
                    >
                        <td className="px-2 py-2 text-small dark:text-white text-black">
                            {company.nom
                                ? company.nom.toLowerCase()
                                : 'Non Disponible'}
                        </td>
                        <td className="px-1 py-1 flex justify-end mr-3">
                            <span
                                className="bg-logo-turquoise dark:text-white text-black text-medium 
                        rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                &gt;
                            </span>
                        </td>
                    </tr>
                );
        });
    }

    useEffect(() => {
        filterSearchParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, repertoireFilteredData]);

    return (
        <div
            id={constants.search_box_id}
            className="flex flex-col pb-4 h-fit-content w-[500px] dark:bg-[#262626] bg-[#f5ebe0] bg-clip-padding backdrop-filter 
    dark:bg-opacity-50 backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 border rounded-xl border-transparent 
    shadow-3xl py-3 px-3 pointer-events-auto"
        >
            <h2 className="text-smaller md:text-small dark:text-white text-black py-4">
                Liste des entreprises familiales recensées au Québec
            </h2>

            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 h-8 bg-transparent border border-logo-turquoise dark:border-logo-turquoise shadow-lg rounded cursor-pointer"
            />

            <div
                className="overflow-y-auto"
                style={{ maxHeight: '200px' }} // Ensure this is correctly sized to allow overflow
            >
                <table id="liste_entreprises_table" className="min-w-full">
                    <tbody>{populateTable()}</tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchBox;

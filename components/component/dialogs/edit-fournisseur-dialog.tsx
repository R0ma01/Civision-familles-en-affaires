'use client';

import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import ListeFournisseurs from '../liste-fournisseurs/liste-fournisseurs';
import { Fournisseur } from '@/components/interface/fournisseur';

interface EditFournisseurDialogProps {
    closeDialog: (e: any) => void;
    submitDialog: (fournisseur: Fournisseur) => void;
    fournisseur: Fournisseur;
}

export function EditFournisseurDialog({
    closeDialog,
    submitDialog,
    fournisseur,
}: EditFournisseurDialogProps) {
    const [secteursOptions, setSecteursOptions] = useState<
        SecteursGeographiques[]
    >([]);
    const [servicesOptions, setServicesOptions] = useState<ServiceOffert[]>([]);
    const [isSecteurDropdownVisible, setSecteurDropdownVisible] =
        useState(false);
    const [isServiceDropdownVisible, setServiceDropdownVisible] =
        useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const secteurDropdownRef = useRef<HTMLDivElement>(null);
    const serviceDropdownRef = useRef<HTMLDivElement>(null);

    const addSecteur = (secteur: string) => {
        if (!secteursOptions.includes(secteur as SecteursGeographiques)) {
            setSecteursOptions([
                ...secteursOptions,
                secteur as SecteursGeographiques,
            ]);
        }
        setSecteurDropdownVisible(false); // Close the dropdown after selection
    };

    const removeSecteur = (secteur: string) => {
        setSecteursOptions(secteursOptions.filter((s) => s !== secteur));
    };

    const addService = (service: string) => {
        if (!servicesOptions.includes(service as ServiceOffert)) {
            setServicesOptions([...servicesOptions, service as ServiceOffert]);
        }
        setServiceDropdownVisible(false); // Close the dropdown after selection
    };

    const removeService = (service: string) => {
        setServicesOptions(servicesOptions.filter((s) => s !== service));
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog(event);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                secteurDropdownRef.current &&
                !secteurDropdownRef.current.contains(target)
            ) {
                setSecteurDropdownVisible(false);
            }
            if (
                serviceDropdownRef.current &&
                !serviceDropdownRef.current.contains(target)
            ) {
                setServiceDropdownVisible(false);
            }

            if (
                dialogRef.current &&
                !dialogRef.current.contains(target) &&
                !(
                    secteurDropdownRef.current?.contains(target) ||
                    serviceDropdownRef.current?.contains(target)
                )
            ) {
                closeDialog(event);
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const initialFournisseurValues = {
        firstName: fournisseur.contact.firstName || '',
        lastName: fournisseur.contact.lastName || '',
        compagnie: fournisseur.contact.company || '',
        courriel: fournisseur.contact.email || '',
        telephone: fournisseur.contact.cellPhone || '',
        titre: fournisseur.contact.title || '',
        secteurs_geographiques: secteursOptions,
        services_offerts: servicesOptions,
        visible: fournisseur.visible || false,
    };

    function handleSubmit(values: any) {
        const fournisseurData = {
            contact: {
                lastName: values.lastName,
                firstName: values.firstName,
                email: values.courriel,
                cellPhone: values.telephone,
                company: values.compagnie,
                title: values.titre,
                linkedin: values.profil_linkedin,
            },
            secteurs_geographique: secteursOptions,
            services_offerts: servicesOptions,
            visible: values.visible,
        };

        console.log(fournisseurData);
        submitDialog(fournisseurData as Fournisseur);
    }

    return (
        <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[80%] h-[95%] relative space-y-8 flex flex-row justify-evenly items-center"
            >
                <div className="w-[40%] h-full flex justify-center items-center">
                    <ListeFournisseurs></ListeFournisseurs>
                </div>
                <Formik
                    initialValues={initialFournisseurValues}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 flex flex-col items-center">
                            <div className="flex gap-4 mb-3">
                                <Field
                                    name="firstName"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="First Name"
                                />
                                <Field
                                    name="lastName"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="flex gap-4 mb-3">
                                <Field
                                    name="compagnie"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Compagnie"
                                />
                                <Field
                                    name="titre"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Titre"
                                    type="text"
                                />
                            </div>
                            <Field
                                name="courriel"
                                className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                placeholder="Courriel"
                                type="email"
                            />
                            <Field
                                name="telephone"
                                className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                placeholder="Telephone"
                                type="tel"
                            />

                            {/* Secteurs Geographiques */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">
                                    Secteurs Géographiques
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {secteursOptions.map((secteur) => (
                                        <div
                                            key={secteur}
                                            className="bg-gray-200 dark:bg-gray-700 rounded-md p-2 flex items-center space-x-2"
                                        >
                                            <span className="text-sm">
                                                {secteur}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                                                onClick={() =>
                                                    removeSecteur(secteur)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                                        onClick={() =>
                                            setSecteurDropdownVisible(true)
                                        }
                                    >
                                        + Ajouter un secteur
                                    </button>
                                </div>
                                {isSecteurDropdownVisible && (
                                    <DropDownSelector
                                        ref={secteurDropdownRef}
                                        values={Object.values(
                                            SecteursGeographiques,
                                        ).filter(
                                            (secteur: string) =>
                                                !secteursOptions.includes(
                                                    secteur as SecteursGeographiques,
                                                ),
                                        )}
                                        select={addSecteur}
                                    />
                                )}
                            </div>

                            {/* Services Offerts */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">
                                    Services Offerts
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {servicesOptions.map((service) => (
                                        <div
                                            key={service}
                                            className="bg-gray-200 dark:bg-gray-700 rounded-md p-2 flex items-center space-x-2"
                                        >
                                            <span className="text-sm">
                                                {service}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                                                onClick={() =>
                                                    removeService(service)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                                        onClick={() =>
                                            setServiceDropdownVisible(true)
                                        }
                                    >
                                        + Ajouter un service
                                    </button>
                                </div>
                                {isServiceDropdownVisible && (
                                    <DropDownSelector
                                        ref={serviceDropdownRef}
                                        values={Object.values(
                                            ServiceOffert,
                                        ).filter(
                                            (service: string) =>
                                                !servicesOptions.includes(
                                                    service as ServiceOffert,
                                                ),
                                        )}
                                        select={addService}
                                    />
                                )}
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    onClick={closeDialog}
                                    buttonType={ButtonType.CANCEL}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    buttonType={ButtonType.CONFIRM}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const DropDownSelector = React.forwardRef(
    (
        {
            values,
            select,
        }: {
            values: (SecteursGeographiques | ServiceOffert)[];
            select: (value: string) => void;
        },
        ref: React.Ref<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                className="bg-white dark:bg-gray-800 shadow-md p-2 rounded-lg space-y-2 absolute z-50"
            >
                {values.map((value: string) => (
                    <div
                        key={value}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => select(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        );
    },
);

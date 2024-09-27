import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import PageTabContent from '@/components/interface/page-tabs-content';
import EditDataCard from '../edit-data-card/edit-data-card';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { AddCircleSVG } from '../svg-icons/svg-icons';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import {
    AlbumDataFields,
    DataBaseOrigin,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import { Language, Traductions } from '@/components/enums/language';
interface TabProps {
    content: TabContent;
    className?: string;
    handleInputChange?: any;
}

function dataType(length: number) {
    switch (length) {
        case 0:
            return DataCardType.SIMPLE;
        case 1:
            return DataCardType.SIMPLE_GRAPH;
    }
    return DataCardType.MULTIPLE_GRAPH;
}

//some comment
export function EditTab({
    content,
    className,
    handleInputChange = () => {},
}: TabProps) {
    const [editTabContent, setEditTabContent] = useState<TabContent>(content);

    useEffect(() => {
        setEditTabContent(content);
    }, [content]);

    const handleCardChange = (cardIndex: number, field: string, value: any) => {
        if (!editTabContent) return;

        let updatedTab = { ...editTabContent };
        const updatedCards = [...editTabContent.cards];
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            [field]: value,
        };
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
    };

    const handleGraphDataChange = (
        cardIndex: number,
        graphIndex: number,
        field: string,
        value: any,
        yValue: boolean = false,
    ) => {
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };
        const updatedCards = [...updatedTab.cards];
        const updatedGraphData = [...updatedCards[cardIndex].graphData];
        let newDonne = [...updatedGraphData[graphIndex].donnes]; // Ensure this is a new array copy

        if (field === 'donnes') {
            if (yValue) {
                newDonne[1] = value;
            } else {
                newDonne[0] = value;
            }
            updatedGraphData[graphIndex] = {
                ...updatedGraphData[graphIndex],
                donnes: newDonne,
            };
        } else if (field === 'graphType') {
            if (
                (value === GraphBoxType.STACKED_BARCHART ||
                    value === GraphBoxType.DOUBLE_HORIZONTAL_BARCHART) &&
                updatedGraphData[graphIndex].graphType !==
                    GraphBoxType.STACKED_BARCHART &&
                updatedGraphData[graphIndex].graphType !==
                    GraphBoxType.DOUBLE_HORIZONTAL_BARCHART
            ) {
                // Switching to stacked or double bar chart, add a new value if it doesn't already exist
                if (newDonne.length === 1) {
                    newDonne.push(AlbumDataFields.ANNEE_FONDATION);
                }
            } else if (
                value !== GraphBoxType.STACKED_BARCHART &&
                value !== GraphBoxType.DOUBLE_HORIZONTAL_BARCHART &&
                (updatedGraphData[graphIndex].graphType ===
                    GraphBoxType.STACKED_BARCHART ||
                    updatedGraphData[graphIndex].graphType ===
                        GraphBoxType.DOUBLE_HORIZONTAL_BARCHART)
            ) {
                // Switching from stacked or double bar chart to a single value chart, remove the second value
                if (newDonne.length > 1) {
                    newDonne.pop();
                }
            }
            updatedGraphData[graphIndex] = {
                ...updatedGraphData[graphIndex],
                donnes: newDonne,
                graphType: value,
            };
        } else {
            updatedGraphData[graphIndex] = {
                ...updatedGraphData[graphIndex],
                [field]: value,
            };
        }

        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            type: dataType(updatedGraphData.length),
            graphData: updatedGraphData,
        };
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };

        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
        //setEditPage({ ...editPage, cards: updatedCards });
    };

    const handleGraphOrderChange = (cardIndex: number, newOrder: any[]) => {
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };
        const updatedCards = [...updatedTab.cards];
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            graphData: newOrder,
            type: dataType(newOrder.length),
        };
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
        // setEditPage({ ...editPage, cards: updatedCards });
    };

    function handleGraphDelete(e: any, cardIndex: number, graphIndex: number) {
        e.preventDefault();
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };
        const updatedCards = [...updatedTab.cards];
        const updatedGraphData = updatedCards[cardIndex].graphData.filter(
            (graph, index) => index !== graphIndex,
        );
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            type: dataType(updatedGraphData.length),
            graphData: updatedGraphData,
        };
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
        //setEditPage({ ...editPage, cards: updatedCards });
    }

    function handleGraphAdd(e: any, cardIndex: number) {
        e.preventDefault();
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };
        const updatedCards = [...updatedTab.cards];
        let updatedGraphData = [...updatedCards[cardIndex].graphData];
        let mockGraphValue;
        switch (updatedTab.tabType) {
            case DataBaseOrigin.ALBUM_FAMILLE: {
                mockGraphValue = AlbumDataFields.ANNEE_FONDATION;
            }
            case DataBaseOrigin.INDEX_VOLETA: {
                mockGraphValue = IndexeDataFieldsA.GENRE;
            }
            case DataBaseOrigin.INDEX_VOLETB: {
                mockGraphValue = IndexeDataFieldsB.GENRE;
            }
        }
        if (updatedGraphData) {
            updatedGraphData.push({
                graphType: GraphBoxType.DOUGHNUT,
                dataOrigin: updatedTab.tabType,
                donnes: [mockGraphValue],
            });
        } else {
            updatedGraphData = [
                {
                    graphType: GraphBoxType.DOUGHNUT,
                    donnes: [AlbumDataFields.ANNEE_FONDATION],
                },
            ];
        }

        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            graphData: updatedGraphData,
            type: dataType(updatedGraphData.length),
        };
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
        //setEditPage({ ...editPage, cards: updatedCards });
    }

    function handleSectionDelete(e: any, cardIndex: number) {
        e.preventDefault();
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };

        let updatedCards = [...updatedTab.cards];
        if (updatedCards) {
            updatedCards = updatedCards.filter(
                (card, index) => index !== cardIndex,
            );
        } else {
            return;
        }

        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);

        //setEditPage({ ...editPage, cards: updatedCards });
    }

    function handleSectionAdd(e: any) {
        e.preventDefault();
        if (!editTabContent) return;
        let updatedTab = { ...editTabContent };

        const updatedCards = [...updatedTab.cards];

        if (updatedCards) {
            updatedCards.push({
                title: { FR: '', EN: '' },
                description: { FR: '', EN: '' },
                type: DataCardType.SIMPLE,
                graphData: [],
            });
        } else {
            return;
        }
        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
        //setEditPage({ ...editPage, cards: updatedCards });
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     submitDialog(editPage);
    // };

    const onDragEnd = (result: DropResult) => {
        let updatedTab = { ...editTabContent };
        if (!result.destination) return;

        const updatedCards = [...updatedTab.cards];

        const [reorderedItem] = updatedCards.splice(result.source.index, 1);

        updatedCards.splice(result.destination.index, 0, reorderedItem);

        updatedTab = {
            ...updatedTab,
            cards: updatedCards,
        };
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
    };

    const handleTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        lang: Language, // 'EN' or 'FR'
    ) => {
        const { name, value } = e.target;
        const updatedTab = { ...editTabContent };
        if (name === 'description') {
            updatedTab['description'][lang] = value;
        }

        // Call the parent handlers for state updates
        handleInputChange(updatedTab);
        setEditTabContent(updatedTab);
    };

    return (
        <div
            className={`p-4 space-y-6 rounded-lg shadow-sm transition-all duration-300 ${className} max-w-[600px]`}
        >
            <div className="flex flex-row items-center">
                <label className="text-black dark:text-white text-xs">
                    {Language.FR}
                </label>
                <input
                    placeholder="description"
                    type="text"
                    name="description"
                    value={editTabContent.description[Language.FR]}
                    onChange={(e) => handleTextInputChange(e, Language.FR)} // Uncomment and implement this function
                    className="rounded-md text-md m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
            </div>
            <div className="flex flex-row items-center">
                <label className="text-black dark:text-white text-xs">
                    {Language.EN}
                </label>
                <input
                    type="text"
                    placeholder="description"
                    name="description"
                    value={editTabContent.description[Language.EN]}
                    onChange={(e) => handleTextInputChange(e, Language.EN)} // Uncomment and implement this function
                    className="rounded-md text-md m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
            </div>
            {/* Render Data Cards */}
            <div className="flex flex-col items-center">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="dataCards">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-col items-center"
                            >
                                {editTabContent.cards.map((card, index) => (
                                    <Draggable
                                        key={index}
                                        draggableId={String(index)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="m-2 w-[90%] flex flex-col justify-center items-center"
                                            >
                                                <EditDataCard
                                                    key={index}
                                                    card={card}
                                                    cardIndex={index}
                                                    handleCardChange={
                                                        handleCardChange
                                                    }
                                                    handleGraphDataChange={
                                                        handleGraphDataChange
                                                    }
                                                    handleGraphDelete={
                                                        handleGraphDelete
                                                    }
                                                    handleGraphAdd={
                                                        handleGraphAdd
                                                    }
                                                    handleSectionDelete={
                                                        handleSectionDelete
                                                    }
                                                    handleGraphOrderChange={
                                                        handleGraphOrderChange
                                                    }
                                                    tabType={
                                                        editTabContent.tabType
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Button
                    onClick={handleSectionAdd}
                    buttonType={ButtonType.ICON}
                    className="w-[90%] m-[5%] mt-6 mb-8 flex justify-center items-center"
                >
                    <AddCircleSVG className="fill-black dark:fill-white"></AddCircleSVG>
                </Button>
            </div>
        </div>
    );
}

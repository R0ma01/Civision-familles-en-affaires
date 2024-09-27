import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import EditGraphCard from '@/components/component/edit-data-card/edit-graph-card';
import {
    AddCircleSVG,
    TrashSVG,
} from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';
import DataCardContent from '@/components/interface/data-card-content';
import { DataBaseOrigin } from '@/components/enums/data-types-enum';
import { Language } from '@/components/enums/language';

interface EditDataCardProps {
    card: DataCardContent;
    cardIndex: number;
    handleCardChange: (index: number, field: string, value: any) => void;
    handleGraphDataChange: (
        cardIndex: number,
        graphIndex: number,
        field: string,
        value: any,
        yValue?: boolean,
    ) => void;
    handleGraphDelete: (e: any, cardIndex: number, graphIndex: number) => void;
    handleGraphAdd: (e: any, cardIndex: number) => void;
    handleSectionDelete: (e: any, cardIndex: number) => void;
    handleGraphOrderChange: (cardIndex: number, newOrder: any[]) => void;
    tabType: DataBaseOrigin;
}

const EditDataCard: React.FC<EditDataCardProps> = ({
    card,
    cardIndex,
    handleCardChange,
    handleGraphDataChange,
    handleGraphDelete,
    handleGraphAdd,
    handleSectionDelete,
    handleGraphOrderChange,
    tabType,
}) => {
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        // If no destination, or dropped in the same place, do nothing
        if (!destination || destination.index === source.index) return;

        const reorderedGraphs = Array.from(card.graphData);
        const [movedGraph] = reorderedGraphs.splice(source.index, 1);
        reorderedGraphs.splice(destination.index, 0, movedGraph);

        handleGraphOrderChange(cardIndex, reorderedGraphs);
    };

    const handleTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        lang: Language,
        index: number,
    ) => {
        const { name, value } = e.target;
        const updatedCard = { ...card };
        let field: any = undefined;
        if (name === 'description') {
            updatedCard['description'][lang] = value;
            field = updatedCard.description;
        }
        if (name === 'title') {
            updatedCard['title'][lang] = value;
            field = updatedCard.title;
        }
        if (field) {
            handleCardChange(index, name, field);
        }
    };

    return (
        <div className="mb-8 p-2 bg-custom-turquoise bg-opacity-50 bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 rounded-xl shadow-lg w-[500px] relative">
            <form className="space-y-2">
                <div>
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleSectionDelete(e, cardIndex);
                        }}
                        className="absolute right-1 top-1 hover:scale-125"
                    >
                        <TrashSVG className="fill-red-600"></TrashSVG>
                    </Button>
                    <div className="flex flex-row items-center">
                        <label className="text-black dark:text-white text-xs">
                            {Language.FR}
                        </label>
                        <input
                            type="text"
                            value={card.title[Language.FR]}
                            placeholder="titre"
                            name="title"
                            onChange={(e) =>
                                handleTextInputChange(e, Language.FR, cardIndex)
                            }
                            className="ml-8 w-[70%] rounded-md text-sm m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="text-black dark:text-white text-xs">
                            {Language.EN}
                        </label>
                        <input
                            type="text"
                            value={card.title[Language.EN]}
                            placeholder="title"
                            name="title"
                            onChange={(e) =>
                                handleTextInputChange(e, Language.EN, cardIndex)
                            }
                            className="ml-8 w-[70%] rounded-md text-sm m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex flex-row items-center">
                        <label className="text-black dark:text-white text-xs">
                            {Language.FR}
                        </label>
                        <input
                            type="text"
                            value={card.description[Language.FR]}
                            placeholder="description"
                            name="description"
                            onChange={(e) =>
                                handleTextInputChange(e, Language.FR, cardIndex)
                            }
                            className="ml-8 w-[70%] rounded-md text-xs tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="text-black dark:text-white text-xs">
                            {Language.EN}
                        </label>
                        <input
                            type="text"
                            value={card.description[Language.EN]}
                            placeholder="description"
                            name="description"
                            onChange={(e) =>
                                handleTextInputChange(e, Language.EN, cardIndex)
                            }
                            className="ml-8 w-[70%] rounded-md text-xs tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={`droppable-${cardIndex}`}>
                            {(provided: any) => (
                                <div
                                    className="flex flex-col justify-center items-center space-y-5 broder rounded-3xl pt-2 pb-2"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <div className="w-[90%] flex flex-wrap justify-evenly items-center">
                                        {card.graphData?.map(
                                            (
                                                graph: any,
                                                graphIndex: number,
                                            ) => (
                                                <Draggable
                                                    key={graphIndex}
                                                    draggableId={`draggable-${cardIndex}-${graphIndex}`}
                                                    index={graphIndex}
                                                >
                                                    {(provided: any) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <EditGraphCard
                                                                graph={graph}
                                                                graphIndex={
                                                                    graphIndex
                                                                }
                                                                cardIndex={
                                                                    cardIndex
                                                                }
                                                                handleGraphDataChange={
                                                                    handleGraphDataChange
                                                                }
                                                                handleGraphDelete={
                                                                    handleGraphDelete
                                                                }
                                                                tabType={
                                                                    tabType
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ),
                                        )}
                                        {provided.placeholder}
                                    </div>
                                    <Button
                                        buttonType={ButtonType.ICON}
                                        onClick={(e) =>
                                            handleGraphAdd(e, cardIndex)
                                        }
                                        className="hover:scale-125"
                                    >
                                        <AddCircleSVG className="fill-black dark:fill-white"></AddCircleSVG>
                                    </Button>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </form>
        </div>
    );
};

export default EditDataCard;

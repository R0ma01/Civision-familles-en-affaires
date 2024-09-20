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

interface EditDataCardProps {
    card: DataCardContent;
    cardIndex: number;
    handleCardChange: (index: number, field: string, value: string) => void;
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

    return (
        <div className="mb-8 p-2 bg-custom-turquoise bg-opacity-50 bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 rounded-xl shadow-lg w-[500px] relative">
            <span className="text-black dark:text-white absolute">
                {cardIndex + 1}
            </span>
            <form className="space-y-2">
                <div>
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleSectionDelete(e, cardIndex);
                        }}
                        className="absolute right-0 top-0 hover:scale-125"
                    >
                        <TrashSVG className="fill-red-600"></TrashSVG>
                    </Button>
                    <input
                        type="text"
                        value={card.title}
                        name="title"
                        onChange={(e) =>
                            handleCardChange(cardIndex, 'title', e.target.value)
                        }
                        className="ml-8 w-[70%] rounded-md text-sm m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        value={
                            card.description.length > 0
                                ? card.description
                                : 'Description'
                        }
                        name="description"
                        onChange={(e) =>
                            handleCardChange(
                                cardIndex,
                                'description',
                                e.target.value,
                            )
                        }
                        className="ml-8 w-[70%] rounded-md text-xs tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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

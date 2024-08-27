import Link from 'next/link';
import {
    EditSVG,
    InvisibleSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import PageContent from '@/components/interface/page-content';

interface ThemeCardProps {
    index: string;
    page: PageContent;
    admin?: boolean;
    onClickEdit?: (e: any) => void;
    onClickDelete?: (e: any) => void;
    onClickVisible?: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
    index,
    page,
    admin = false,
    onClickEdit = (e: any) => {},
    onClickDelete = (e: any) => {},
    onClickVisible = () => {},
}) => {
    const adminArticleCss = admin ? '' : 'cursor-pointer';
    const reference = admin
        ? ''
        : `/thematiques/page-information?_id=${page._id}`;
    return (
        <Link href={reference}>
            <article
                className={`inline-block m-2 w-[245px] xl:w-[300px] rounded-xl shadow-xl bg-cover bg-center transform 
                    duration-500 hover:-translate-y-2 ${adminArticleCss} group`}
                style={{
                    backgroundImage: `url('${page.backgroundImage}')`,
                }}
            >
                <div
                    className="bg-gradient-to-b from-transparent to-black justify-end inset-0 rounded-xl px-6 flex 
                flex-wrap flex-col h-[350px] xl:h-[410px] hover:bg-black hover:bg-opacity-60 transform duration-300"
                >
                    <div
                        key={index}
                        className="group-hover:overflow-y-auto max-h-[250px] top-0"
                    >
                        <h2 className="text-white text-2xl xl:text-3xl mb-7">
                            {page.title}
                        </h2>

                        <p className="hidden mb-5 text-white text-sm xl:text-medium group-hover:block">
                            {page.description}
                        </p>
                    </div>
                    <div className="flex-row justify-evenly mb-4 hidden group-hover:flex">
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickEdit}
                            >
                                <EditSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></EditSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickDelete}
                            >
                                <TrashSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></TrashSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickVisible}
                            >
                                {page.visible ? (
                                    <VisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></VisibleSVG>
                                ) : (
                                    <InvisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></InvisibleSVG>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ThemeCard;

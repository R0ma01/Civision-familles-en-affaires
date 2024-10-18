import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PagePaths } from '@/components/enums/page-paths-enum';
import { authValidationSchemas } from '@/validations/authValidationSchemas';
import useDataStore from '@/reducer/dataStore';
import { authTranslations } from '@/constants/translations/auth';
import { Formik, Form, FormikHelpers } from 'formik';
import FormInput from '@/components/component/auth-form/form-input';
import FormStatus from '@/components/component/auth-form/form-status';
import FormButton from '@/components/component/auth-form/form-button';
import submitForm from '@/utils/form-submit-utils';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { auth } from '@/auth';
import {
    ConnectDialogProps,
    FormValues,
} from '@/components/interface/auth/connect-dialog';
import { Language } from '@/components/enums/language';
import Modal from '@/components/component/modal/modal';
import googleSignIn from '@/components/google-login/route';

import useGlobalUserStore from '@/stores/global-user-store';

const ConnectDialog: React.FC<ConnectDialogProps> = ({
    onForgotPasswordClick,
}) => {
    const { loginValidationSchema } = authValidationSchemas();
    const { lang } = useDataStore();
    const t = authTranslations[lang as Language];
    const router = useRouter();
    const { setLoginTutorials, setUserToken } = useGlobalUserStore(
        (state: any) => ({
            setLoginTutorials: state.setLoginTutorials,
            setUserToken: state.setUserToken,
        }),
    );

    useEffect(() => {
        async function something() {
            try {
                const session = await auth();
                console.log('Session:', session);
            } catch (e) {
                console.error(e);
            }
        }

        something();
    }, [googleSignIn]);

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                router.push(PagePaths.HOME);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [router]);

    const handleSettingUser = (tokenId: string, tokenValue: any) => {
        setUserToken(tokenId, tokenValue);
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, setStatus, resetForm }: FormikHelpers<FormValues>,
    ) => {
        await submitForm(
            'login',
            { email: values.email, password: values.password },
            t.loginRequestFailed,
            setSubmitting,
            setStatus,
            lang,
            resetForm,
            PagePaths.THEMATIQUES,
            router,
            handleSettingUser,
            setLoginTutorials,
        );
    };

    return (
        <Modal title="Bonjour à nouveau !">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form className="space-y-4">
                        <FormInput
                            name="email"
                            label={t.email}
                            type="email"
                            placeholder="jean@hec.qc"
                        />
                        <div>
                            <FormInput
                                name="password"
                                label={t.password}
                                type="password"
                                placeholder="******"
                            />
                            <button
                                onClick={onForgotPasswordClick}
                                type="button"
                                className="my-1 text-sm font-medium text-zinc-500 underline hover:no-underline"
                            >
                                {t.forgotPassword}
                            </button>
                        </div>

                        <div className="flex flex-row justify-evenly">
                            <Button
                                buttonType={ButtonType.CANCEL}
                                type="button"
                                onClick={() => router.push(PagePaths.HOME)}
                            >
                                Annuler
                            </Button>

                            <FormButton
                                text={isSubmitting ? t.submitting : t.submit}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                        <FormStatus status={status} />
                    </Form>
                )}
            </Formik>
            <div className="mt-4 text-center">
                <p className="text-black dark:text-gray-500">
                    Vous êtes nouveau ?
                    <Link
                        href="/signup"
                        className="mt-1 text-sm dark:text-gray-500 font-medium text-blue-500 underline hover:no-underline ml-2"
                    >
                        Inscrivez-vous!
                    </Link>
                </p>
            </div>
            <div className="flex items-center justify-center w-full">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const something = await googleSignIn(); // call the server action
                        console.log(something);
                    }}
                    className="w-full flex justify-center items-center"
                >
                    <button
                        className={`w-full bg-black gsi-material-button`}
                        type="submit"
                        disabled={false}
                    >
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    style={{ display: 'block' }}
                                >
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                    ></path>
                                    <path
                                        fill="#4285F4"
                                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                    ></path>
                                    <path
                                        fill="#FBBC05"
                                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                    ></path>
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                    ></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                            </div>
                            <span className="gsi-material-button-contents">
                                Sign in with Google
                            </span>
                            <span style={{ display: 'none' }}>
                                Sign in with Google
                            </span>
                        </div>
                    </button>
                    {/* <button type="submit">Sign In with Google</button> */}
                </form>
            </div>
        </Modal>
    );
};

export default ConnectDialog;

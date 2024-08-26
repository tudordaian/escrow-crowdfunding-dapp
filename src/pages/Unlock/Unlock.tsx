import {useNavigate} from "react-router-dom";
import {
    ExtensionLoginButton,
    ExtensionLoginButtonPropsType,
    WalletConnectLoginButton,
    WalletConnectLoginButtonPropsType,
    WebWalletLoginButton,
    WebWalletLoginButtonPropsType
} from "@multiversx/sdk-dapp/UI";
import {AuthRedirectWrapper} from "../../wrappers/AuthRedirectWarapper";

type CommonPropsType =
    | ExtensionLoginButtonPropsType
    | WebWalletLoginButtonPropsType
    | WalletConnectLoginButtonPropsType;


export const Unlock = () => {
    const navigate = useNavigate();
    const commonProps: CommonPropsType = {
        callbackRoute: "/dashboard",
        nativeAuth: true,
        onLoginRedirect: () => {
            navigate("/dashboard");
        }
    };
    return (
        <AuthRedirectWrapper requireAuth={false}>
        <div className='flex justify-center items-center'>
            <div
                className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-xl'
                data-testid='unlockPage'

            >
                <div className='flex flex-col items-center gap-1'>
                    <h2 className='text-2xl'>Login</h2>

                    <p className='text-center text-gray-400'>Choose a login method</p>
                </div>

                <div className='flex flex-col md:flex-row'>
                    <WalletConnectLoginButton
                        loginButtonText='xPortal App'
                        {...commonProps}
                    />
                    <ExtensionLoginButton
                        loginButtonText='DeFi Wallet'
                        {...commonProps}
                    />
                    <WebWalletLoginButton {...commonProps} />
                </div>
            </div>
        </div>
        </AuthRedirectWrapper>
    );
}
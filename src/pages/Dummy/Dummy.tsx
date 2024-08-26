import {useNavigate} from "react-router-dom";
import { AuthRedirectWrapper } from "../../wrappers/AuthRedirectWarapper";

export const Dummy = () => {
    const navigate = useNavigate()

    const handleDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <AuthRedirectWrapper>
            <div className='flex justify-center items-center p-4'>
                <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'>
                    <div className='text-3xl'>Dummy Page</div>
                    <button onClick={handleDashboard} className='p-2 text-xl text-gray-600 bg-gray-200 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                        Dashboard
                    </button>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};




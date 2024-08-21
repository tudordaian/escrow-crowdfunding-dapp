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
                    <div className='text-lg'>Dummy Page</div>
                    <button onClick={handleDashboard} className='p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-700'>
                        Dashboard
                    </button>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};




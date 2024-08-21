export const Home = () => {
    return (
        <div className='flex justify-center items-center'>
            <div
                className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
                data-testid='homePage'
            >
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-2xl'>Home</h1>
                </div>
            </div>
        </div>
    )
}
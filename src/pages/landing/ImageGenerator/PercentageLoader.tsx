const PercentageLoader = ({ number }: { number: number }) => {
    return (
        <div className="w-full absolute bottom-0 sm:max-w-[600px]">
            <div className="mb-2 m-auto flex items-center justify-center">
                <div className="font-normal text-light-blue">
                {number}%
                </div>
            </div>
            <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-md">
                <div
                className="bg-light-blue h-2.5 rounded-full"
                style={{
                    width: `${number}%`,
                    transition: 'width 0.3s ease',
                }}
                ></div>
            </div>
        </div>
    )

}

export default PercentageLoader
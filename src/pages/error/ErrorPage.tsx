import React from 'react'
import { TimerOutline } from 'react-ionicons'


const ErrorPage = ({ onHistoryClicked }: {
    onHistoryClicked?: (() => void) | null
}) => {
    return (
        <div className="flex justify-center items-center ">
            <div className='mx-4 my-8 flex flex-col items-center justify-center bg-yellow-300 p-4 rounded-md'>
                <b className='sm:text-3xl text-2xl'>Trenutno radimo na unapređenju AI alata, vraćamo se za par sati 🛠️</b>
                <div className='flex items-center justify-center'>
                    <p className='sm:text-2xl text-xl mt-2'>Do tada, bacite pogled na vaše prethodne kreacije </p>
                    {!!onHistoryClicked && (
                        <div id={'history-button'} onClick={onHistoryClicked} className="flex justify-center items-center bg-white border-2 m-4 p-2 rounded-sm shadow cursor-pointer h-[50px] w-[140px]">
                            <div className="mr-2 text-lg text-gray-800">Istorija</div>
                            <div>
                                <TimerOutline
                                    color={'#00000'}
                                    title={"Istorija"}
                                    height="30px"
                                    width="30px"
                                />
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}



export default ErrorPage
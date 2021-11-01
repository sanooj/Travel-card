import React from 'react'

const CommmonLayout = ({children}) => {
    return (
        <div className="min-h-full">
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between">
                        <h1 className="my-3 text-center text-3xl font-extrabold text-gray-900">Oyester card</h1>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8 ">
                {children}
            </div>
        </div>
    )
}

export default CommmonLayout;

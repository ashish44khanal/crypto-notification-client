import React from 'react'

type propsType = {
    banner_headline: string,
    banner_description: string
}
const CryptoBanner = ({ banner_headline, banner_description }: propsType) => {
    return (
        <div>
            <div className="container mx-auto my-8">
                {/* <img src="https://ifccd.net/uploads/image/learn-trade-crypto.png" alt="" className='w-[5%]' /> */}

                <div>
                    <h1 className="text-3xl font-bold my-2">
                        {banner_headline}
                    </h1>
                    <p className='text-gray-600 '>{banner_description}</p>
                </div>
            </div>
        </div>
    )
}

export default CryptoBanner
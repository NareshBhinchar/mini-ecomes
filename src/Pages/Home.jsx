import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";



export default function Home() {

    let [products, setProducts] = useState([])

    let productsitems = () => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                limit: 100,
            }
        })
            .then((productsapi) => {
                let finaldata = productsapi.data.data
                setProducts(finaldata)
            })

    }
    productsitems()

    return (
        <>
            <div>
                <section>

                    <div className='max-w-[1320px] mx-auto py-[50px] sm:pb-0 '>

                        <div className='lg:flex mt-[30px]  sm:mt-[0px] items-center '>
                            <div className='basis-[60%] sm:px-[40px] sm:py-0 '>
                                <h1 className='text-7xl font-bold sm:text-[70px]'>
                                    The experience makes all the difference.
                                </h1>
                                <p className='py-5 text-[#a49999] lg:text-[24px] sm:text-[18px]  lg:text-start sm:text-center'>
                                    From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
                                </p>

                               
                                    <div className='flex items-center gap-5 sm:justify-center lg:justify-start sm:py-[20px] lg:py-0'>
                                        <div className='flex  items-center bg-[#f45858] cursor-pointer py-3 px-3 gap-[10px] rounded'>
                                            <button className='text-white font-bold'>Get starte </button>
                                            <FaArrowRightLong className='text-white' />
                                        </div>
                                        <button className='border-[#ccc] py-3 px-5 rounded'>OFFERS</button>
                                    </div>
                               
                            </div>
                            <div className='basis-[40%] sm:mt-[50px] '>
                                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="" className='w-full' />
                            </div>
                        </div>
                    </div>
                </section>

                <section className='pt-[25px]'>
                    <h1 className='text-center text-[40px] text-[#212020] font-[600] py-[30px]'>Shop By Category</h1>
                    <div className='grid grid-cols-3 gap-[20px]'>
                        <div className='relative  group'>
                            <img src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png" alt="" className="object-center object-cover h-full w-full" />
                            <div className='absolute bottom-[10px] left-[50%] transform -translate-x-1/2 bg-white py-2 px-[40px] font-bold cursor-pointer rounded group-hover:border group-hover:border-x-[10px] group-hover:border-y-[5px] group-hover:border-[#e6dede]'>Women</div>
                        </div>
                        <div className='gap-5 h-full '>
                            <div className='h-[49%] relative group'>
                                <img src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png" alt="" className="object-center object-cover h-full
                             w-full" />
                                <div className='absolute bottom-[10px] left-[50%] transform -translate-x-1/2 bg-white py-2 px-[40px] font-bold cursor-pointer rounded group-hover:border group-hover:border-x-[10px] group-hover:border-y-[5px] group-hover:border-[#e6dede]'>Women</div>
                            </div>
                            <div className='h-[49%] relative group'>
                                <img src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png" alt="" className="object-center object-cover h-full mt-5 w-full" />

                                <div className='absolute bottom-[10px] left-[50%] transform -translate-x-1/2 bg-white py-2 px-[40px] font-bold cursor-pointer rounded group-hover:border group-hover:border-x-[10px] group-hover:border-y-[5px] group-hover:border-[#e6dede]'>Women</div>
                            </div>
                        </div>
                        <div className='relative  group'>
                            <img src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png" alt="" className='h-full w-full' />
                            <div className='absolute bottom-[10px] left-[50%] transform -translate-x-1/2 bg-white py-2 px-[40px] font-bold cursor-pointer rounded group-hover:border group-hover:border-x-[10px] group-hover:border-y-[5px] group-hover:border-[#e6dede]'>Women</div>
                        </div>
                    </div>
                </section>

                <section className='py-[25px] px-5 '>
                    <div className='max-w-[1320px]  mx-auto box-shadyo shadow-md '>
                        <h1 className='text-center lg:text-6xl font-bold py-5 sm:text-3xl '>Get difference Product</h1>
                    </div>

                    <div className='max-w-full mx-auto grid lg:grid-cols-5 sm:grid-cols-1 mt-5 gap-[10px] p-5 bg-[#f6f1f1]'>




                        {products.map((items, index) => {

                            return (
                                <Products pdata={items} key={index} />
                            )
                        })}










                    </div>
                </section>


            </div>
        </>
    )
}


function Products({ pdata }) {
    return (

        <div className=' bg-white rounded lg:p-2 shadow-md border sm:px-[30px]  '>
            <div className='relative shadow-md shadow-[#353535] '>
                <div className='absolute right-[15px] top-[10px] text-[#f35b5b]'>
                    <FaHeart className='text-3xl' />
                </div>
                <img src={pdata.image} alt="" className='h-full  mx-auto border' />
            </div>
            <div className=' p-3 mt-3 shadow-[#353535]  '>
                <h1 className='text-[18px] font-[500] items-center '>{pdata.slug}</h1>
                <p className='line-clamp-2 text-[14px] '>
                    {pdata.description}
                </p>
                <div className='flex justify-between'>

                    <h2 className='font-bold '>Rs{pdata.price} <span className='font-normal text-[12px] text-[white] bg-[#ec4343] rounded px-1'>off({pdata.discount_percentage}%)</span></h2>
                    <h2>stock({pdata.stock})</h2>
                </div>
                <div className='flex py-3 justify-between '>
                    <div className='flex items-center'> <VscStarEmpty /> <VscStarEmpty /> <VscStarEmpty /> <VscStarEmpty /><span className='text-[red]'> ({pdata.rating})</span>
                    </div>
                    <button className='bg-[blue] text-white py-1 px-2 rounded cursor-pointer'>Add</button>
                </div>
            </div>
        </div>
    )

}

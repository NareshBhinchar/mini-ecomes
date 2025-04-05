import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";
import 'react-responsive-pagination/themes/classic.css';
import ResponsivePagination from 'react-responsive-pagination';
import { countContext } from '../comman/MainContext';

import { ToastContainer, toast } from 'react-toastify';

export default function Products() {

    let [productsbrand, setproductsbrand] = useState([])

    let [productsitems, setproductsitems] = useState([])

    let [products, setProducts] = useState([])

    let [sorting, setSorting] = useState(null)

    let [Loder, setLoder] = useState(false)

    let [categorifilter, setCategorifilter] = useState([])

    let [brandefilter, setBrandefilter] = useState([])

    let [pricefilter, setPricefilter] = useState([null, null])

    let [Ratingfilter, setRatingfilter] = useState(null)

    let [discountfilter, setDiscountfilter] = useState([null])


    let [current_page, setCurrent_page] = useState(1)
    let [totalPages, settotalPages] = useState(1)



    let clearallfilter = () => {
        setSorting([])
        setLoder([])
        setCategorifilter([])
        setBrandefilter([])
        setPricefilter([])
        setRatingfilter([])
        setDiscountfilter([])
    }


    let getproductapi = () => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php', {
        })
            .then((apires) => {
                let finaldataapi = apires.data.data
                setProducts(finaldataapi)
            })
    }

    let getproductsitems = () => {
        setLoder(true)
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {

                page: current_page,

                limit: 12,

                sorting: sorting,

                name: '',

                price_form: pricefilter[0],

                price_to: pricefilter[1],

                discount_from: discountfilter[0],

                discount_to: '',

                rating: Ratingfilter,

                brands: brandefilter.toString(),

                categories: categorifilter.toString(),
            }
        })
            .then((productapi) => {

                let finalproducts = productapi.data.data
                setproductsitems(finalproducts)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
                settotalPages(productapi.data.total_pages)
                setLoder(false)

            })
    }




    let getproductsbrands = () => {
        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
            .then((productsbrandapi) => {
                let productsfinaldata = productsbrandapi.data.data
                setproductsbrand(productsfinaldata)
            })
    }


    let getCheckCategory = (e) => {
        if (e.target.checked) {
            setCategorifilter([...categorifilter, e.target.value]);
        } else {
            let finaldata = categorifilter.filter((value) => value != e.target.value);
            setCategorifilter(finaldata);
        }
    };

    let getchakeBrandes = (event) => {
        if (event.target.checked) {
            setBrandefilter([...brandefilter, event.target.value]);
        }
        else {

            brandefilter.filter((value) => value != event.target.value)

            setBrandefilter(brandefilter.filter((value) => value != event.target.value))
        }

    }


    useEffect(() => {
        getproductsitems()
    }, [sorting, categorifilter, brandefilter, Ratingfilter, pricefilter, discountfilter, current_page])



    useEffect(() => {
        getproductapi()
        getproductsbrands()
    }, [])

    return (


        <div>


            <ToastContainer />
            <section className=''>

                <div className='max-w-[1420px]  mx-auto relative'>
                    <h1 className='text-center py-[50px] text-5xl font-bold text-[#f62738]'>Products</h1>

                    <select name="" id="" className='border p-2 absolute right-[0px] top-[100px]' onChange={(event) => setSorting(event.target.value)}>
                        <option value={1}>Name : A to Z</option>
                        <option value={2}>Name : z to a</option>
                        <option value={3}>Price : Low to High</option>
                        <option value={4}>Price : High to Low</option>
                        <option value={5}>Discounted Price : Low to High</option>
                        <option value={6}>Discounted Price : High to Low</option>
                        <option value={7}>Rating : Low to High</option>
                        <option value={8}>Rating : High to Low</option>
                    </select>



                    <div className="grid grid-cols-[20%_auto] gap-5">
                        <div className=''>
                            < div className=' shadow-md shadow-[black] p-5 mb-5'>
                                <h1 className='text-center font-[600] text-2xl bg-[#cac7c7] py-2'>Categories</h1>
                                <ul className=' h-50 overflow-y-scroll py-3 '>
                                    {

                                        products.map((items, index) => {
                                            return (
                                                <li className='mt-2 items-center py-1 px-2 text-[18px] '>  <input type="checkbox" checked={categorifilter.includes(items.slug)} value={items.slug} onChange={getCheckCategory} /> {items.name} </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className=' text-center'>
                                    <button className=' border p-1 bg-[#4444f0] text-white font-[500] rounded cursor-pointer' onClick={() => setCategorifilter([])}>Remove  </button>
                                </div>
                            </div>


                            <div className='  shadow-md shadow-[black] p-5 mb-5'>
                                <h1 className='text-center font-[600] bg-[#ddd6d6] text-2xl py-2'>BRAND</h1>
                                <ul className=' h-50 overflow-y-scroll '>
                                    {


                                        productsbrand.map((items, index) => {
                                            return (
                                                <>
                                                    <li className='mt-2 items-center py-1 px-2 text-[18px] '> <input type="checkbox" checked={brandefilter.includes(items.slug)} value={items.slug} onChange={getchakeBrandes} /> {items.name} </li>
                                                </>
                                            )
                                        })

                                    }
                                </ul>
                                <div className=' text-center'>
                                    <button className=' border p-1 bg-[#4444f0] text-white font-[500] rounded cursor-pointer' onClick={() => setBrandefilter([])}>Remove </button>
                                </div>
                            </div>


                            <div className=' shadow-md shadow-[black] p-5 mb-5'>
                                <h1 className='text-center font-[600] text-2xl bg-[#ddd6d6] py-2'>PRICE</h1>
                                <ul className='px-2 gap-2'>
                                    <li className='py-1'> <input type="radio" className='me-2' name='price' onChange={() => setPricefilter([10, 250])} /> Rs. 10 to Rs. 250</li>
                                    <li className='py-1'> <input type="radio" className='me-2' name='price' onChange={() => setPricefilter([250, 500])} /> Rs. 250 to Rs. 500</li>
                                    <li className='py-1'> <input type="radio" className='me-2' name='price' onChange={() => setPricefilter([500, 1000])} /> Rs. 500 to Rs. 1000</li>
                                    <li className='py-1'> <input type="radio" className='me-2' name='price' onChange={() => setPricefilter([1000, 99999999])} /> Rs. 1000 to Above</li>
                                </ul>
                                <div className=' text-center'>
                                    <button className=' border p-1 bg-[#4444f0] text-white font-[500] rounded cursor-pointer' onClick={() => setPricefilter([])}>Remove </button>
                                </div>
                            </div>


                            <div className=' shadow-md shadow-[black] p-5 mb-5'>
                                <h1 className='text-center font-[600] text-2xl bg-[#ddd6d6] py-2'>DISCOUNT RANGE</h1>
                                <ul className='px-2 gap-2'>
                                    <li className='py-1'> <input type="radio" name='DISCOUNT' className='me-2' onChange={() => setDiscountfilter([5])} /> 5% and above</li>
                                    <li className='py-1'> <input type="radio" name='DISCOUNT' className='me-2' onChange={() => setDiscountfilter([10])} /> 10% and above</li>
                                    <li className='py-1'> <input type="radio" name='DISCOUNT' className='me-2' onChange={() => setDiscountfilter([15])} /> 15% and above</li>
                                    <li className='py-1'> <input type="radio" name='DISCOUNT' className='me-2' onChange={() => setDiscountfilter([20])} /> 20% and above</li>
                                </ul>
                                <div className=' text-center'>
                                    <button className=' border p-1 bg-[#4444f0] text-white font-[500] rounded cursor-pointer' onClick={() => setDiscountfilter([])} onChange={() => setRatingfilter('')}>Remove </button>
                                </div>
                            </div>


                            <div className=' shadow-md shadow-[black] mb-5 p-5'>
                                <h1 className='text-center font-[600] text-2xl bg-[#ddd6d6] py-2'>Rating</h1>
                                <ul className='px-2 gap-2'>
                                    <li className='py-1'> <input type="radio" name='rating' onChange={() => setRatingfilter(5)} className='me-2' /> 5★ & above</li>
                                    <li className='py-1'> <input type="radio" name='rating' onChange={() => setRatingfilter(4)} className='me-2' /> 4★ & above</li>
                                    <li className='py-1'> <input type="radio" name='rating' onChange={() => setRatingfilter(3)} className='me-2' /> 3★ & above</li>
                                    <li className='py-1'> <input type="radio" name='rating' onChange={() => setRatingfilter(2)} className='me-2' /> 2★ & above</li>
                                    <li className='py-1'> <input type="radio" name='rating' onChange={() => setRatingfilter(1)} className='me-2' /> 1★ & above</li>
                                </ul>
                                <div className=' text-center'>
                                    <button className=' border p-1 bg-[#4444f0] text-white font-[500] rounded cursor-pointer' onClick={() => setRatingfilter(null)}>Remove </button>
                                </div>
                            </div>

                            <div className='pb-5 text-center'>
                                <button className='bg-[#ff0000] px-2 py-2 text-white font-[500] rounded cursor-pointer' onClick={clearallfilter}>Clear all filte</button>
                            </div>

                        </div>


                        <div className=' bg-[#fbfafa] p-2 border border-[#ebbcbc] '>
                            <div className='grid grid-cols-4 gap-[15px]'>
                                {
                                    Loder ?
                                        <>
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />
                                            <Loderitems />

                                        </>
                                        :
                                        productsitems.map((items, index) => <Productscart params={items} />)
                                }
                            </div>

                            <div className='py-5 pt-[50px]'>
                                <ResponsivePagination
                                    current={current_page}
                                    total={totalPages}
                                    onPageChange={setCurrent_page}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section >
        </div >



    )
}



function Productscart({ params }) {
    let { cart, setCart } = useContext(countContext);
    let { name, image, price, id } = params

    let chekedCartProducts = cart.filter((items) => items.id == id)

    let [quty, setQuty] = useState((chekedCartProducts.length == 1) ? chekedCartProducts[0].quantity : 1)

    // console.log(chekedCartProducts)

    let addtocart = () => {
        let cartobj = {
            name,
            image,
            price,
            quantity: 1,
            id,
        }
        setCart([cartobj, ...cart]);
        toast.success("Product Add to cart")
    }




    return (
        <div className=' bg-white rounded p-2 shadow-md '>
            <div className='relative shadow-md shadow-[#353535]'>
                <div className='absolute right-[15px] top-[10px] text-[#f35b5b]'>
                    <FaHeart className='text-3xl' />
                </div>
                <img src={params.image} alt="" className='h-full  mx-auto' />
            </div>
            <div className=' p-3 mt-3 shadow-[#353535] '>
                <h1 className='text-[18px] font-[500] items-center '>{params.slug}</h1>
                <p className='line-clamp-2 text-[14px] '>
                    {params.description}
                </p>
                <div className='flex justify-between'>

                    <h2 className='font-bold '>Rs{params.price} <span className='font-normal text-[12px] text-[white] bg-[#ec4343] rounded px-1'>off({params.discount_percentage}%)</span></h2>
                    <h2>stock({params.stock})</h2>
                </div>
                <div className='flex py-3 justify-between '>
                    <div className='flex items-center'> <VscStarEmpty /> <VscStarEmpty /> <VscStarEmpty /> <VscStarEmpty /><span className='text-[red]'> ({params.rating})</span>
                    </div>


                    {
                        chekedCartProducts.length == 1

                            ?
                            <>
                                <div className='flex  justify-center h-5  items-center '>
                                    <button onClick={() => {


                                        setQuty(quty - 1)

                                        if (quty - 1 == 0) {

                                            let finaldata = cart.filter((items) => items.id != id)
                                            setCart(finaldata)
                                        }
                                        else {


                                            let finalqyty = cart.filter((items) => {
                                                if (items.id === id) {
                                                    items['quantity'] = quty - 1
                                                }
                                                return items
                                            })

                                            setCart(finalqyty)
                                            toast.success("quntity update in cart remove")
                                        }
                                    }
                                    }

                                        className=' p-[0px_10px] pb-1 rounded bg-[blue] cursor-pointer text-center text-white text-[20px]'>-</button>

                                    <input type="text" value={quty} className='w-[30px] text-center  h-[30px] ' />

                                    <button onClick={() => {
                                        setQuty(quty + 1)


                                        let finalqyty = cart.filter((items) => {
                                            if (items.id === id) {
                                                items['quantity'] = quty + 1
                                            }
                                            return items
                                        })

                                        setCart(finalqyty)
                                        toast.success("quntity update in cart add")


                                    }} className=' p-[0px_10px] pb-1 rounded bg-[blue] cursor-pointer text-center text-white text-[20px]'>+</button>
                                </div>
                            </>

                            :

                            <button className='bg-[blue] text-white py-1 px-2 rounded cursor-pointer ' onClick={addtocart}>Add</button>


                    }



                </div>
            </div>
        </div>
    )
}


function Loderitems() {
    return (

        <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>

    )
}
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Drawer,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";

function Konten() {
  const [data, setData] = useState(null)
  const [angka, setAngka] = useState(0)
  const [openRight, setOpenRight] = React.useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const { addItem, inCart, setCartMetadata } = useCart();

  useEffect(() => {
    axios.get("https://tes-mobile.landa.id/api/menus")
      .then((res) => {
        setData([...res.data.datas])
      })
      .catch((error) => {
        console.log("Error yee", error);
      })
  }, [])

  const products = [
    {
      "id": 1,
      "nama": "Chicken Katsu",
      "price": 11000,
      "tipe": "makanan",
      "gambar": "https://tes-mobile.landa.id/img/chicken-katsu.png"
    },
    {
      "id": 2,
      "nama": "Chicken Slam",
      "price": 9000,
      "tipe": "makanan",
      "gambar": "https://tes-mobile.landa.id/img/chicken-slam.png"
    },
    {
      "id": 3,
      "nama": "Blue Blood",
      "price": 8000,
      "tipe": "minuman",
      "gambar": "https://tes-mobile.landa.id/img/blue-blood.png"
    },
    {
      "id": 4,
      "nama": "Dark Chocolate",
      "price": 12000,
      "tipe": "minuman",
      "gambar": "https://tes-mobile.landa.id/img/dark-chocolate.png"
    }
  ];


  const notif = () => toast.success('Berhasil mengambil pesanan', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata
  } = useCart();

  return (
    <div className="container mx-auto">
      <div className="w-full p-6 mt-4 bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex">
          <div className="flex-1">
            <p className="px-5 py-2.5 text-2xl">Main Course</p>
          </div>
          <div className="">
            <button onClick={openDrawerRight} type="button" className="text-blue-700 inline-flex hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium items-center rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              Keranjang
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {totalUniqueItems}
              </span>
            </button>
          </div>
        </div>

        <p className="container mx-auto mt-4 text-xl font-bold">Makanan</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">

          {products !== null && products.map((res) => {
            const alreadyAdded = inCart(res.id);
            if (res.tipe === 'makanan') {
              return (
                <div className="container mx-auto mt-4" key={res.id}>
                  <div className="max-w-full h-100 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a>
                      <img class="max-w-lg md:w-40 md:h-24 w-80 h-60" src={res.gambar} alt="" />
                    </a>
                    <div class="p-5">
                      <a>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{res.nama}</h5>
                      </a>
                      <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">Rp. {res.price.toLocaleString('id-ID')}</p>
                      <button onClick={() => { setAngka((nilai) => nilai + 1); notif(); addItem(res); }} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                        {alreadyAdded ? "Tambah Lagi" : "Tambahkan Belanjaan Sekarang"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          })}

        </div>
        <p className="container mx-auto mt-4 text-xl font-bold">Minuman</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">

          {products !== null && products.map((res) => {
            const alreadyAdded = inCart(res.id);
            if (res.tipe === 'minuman') {
              return (
                <div className="container mx-auto mt-4">
                  <div className="max-w-full h-100 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a>
                      <img class="max-w-lg md:w-40 md:h-24 w-80 h-60" src={res.gambar} alt="" />
                    </a>
                    <div class="p-5">
                      <a>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{res.nama}</h5>
                      </a>
                      <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">Rp. {res.price.toLocaleString('id-ID')}</p>
                      <button onClick={() => { setAngka((nilai) => nilai + 1); notif(); addItem(res); }} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                        {alreadyAdded ? "Tambah Lagi" : "Tambahkan Belanjaan Sekarang"}
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              )
            }
          })}

        </div>


        <Drawer
          placement="right"
          open={openRight}
          onClose={closeDrawerRight}
          className="p-3"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Main Course
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
            >
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <hr />
         
          {items.map((item) => (
            <div className="mb-5 mt-4">
              <div className="flex items-center" key={item.id}>
                <div className="flex flex-col">
                  <img src={item.gambar} alt="" width={100} />
                </div>
                <div className="ms-3">
                  <p className="font-bold">{item.nama}</p>
                  <p className="text-sm text-gray-500">Rp. {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                <p className="py-2.5 px-5">{item.quantity}</p>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">-</button>
              </div>
              <div className="flex">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Catatan Disini" />
              </div>
            </div>
          ))}

          <hr />
          <div>
            <p className="mt-4 mb-2 text-sm">Tambah Voucher</p>
          </div>
          <div>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Voucher Disini" />
          </div>

          <div className="w-full mt-2">
            <button onClick={emptyCart} className=" inline-flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-24 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus Semua</button>
          </div>


          <div className="container mx-auto">
            <div class="w-72 fixed bottom-20 right-1 p-6 bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between">
                <div className="flex-col">
                  <p>
                    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Total : </h5>
                  </p>
                </div>
                <div>
                  <p>
                    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Rp {cartTotal.toLocaleString('id-ID')}</h5>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full fixed bottom-5">
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-24 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Buat Pesanan</button>
          </div>




        </Drawer>


      </div>

    </div>
  )
}

export default Konten
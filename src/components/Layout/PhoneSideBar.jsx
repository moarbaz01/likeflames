// import React, { useContext } from 'react'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { ThemeContext } from '../context/useTheme';
// import { MdDarkMode, MdLightMode } from 'react-icons/md';



// function PhoneSideBar({ isOpen }) {
//     const { user } = useSelector(state => state.user);
//     const { theme, handleTheme } = useContext(ThemeContext);
//     const data = [
//         {
//             name: "Home",
//             path: "/"
//         },
//         {
//             name: "Profile",
//             path: `/profile/${user?._id}`
//         },
//         {
//             name: "Chats",
//             path: "/chat/selectUser",
//         },
//         {
//             name: "Notifications",
//             path: "/notifications",
//             notification: user?.notifications?.length || null
//         },
//         {
//             name: "Explore",
//             path: "/explore"
//         },
//         {
//             name: "Feed",
//             path: "/feed"
//         },
//     ]
//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'auto'
//         }
//     }, [isOpen]);

//     if (!isOpen) return null;
//     return (
//         <div className='flex items-center justify-center  bg-white z-[9999] dark:bg-dark_main_bg fixed bottom-0 left-0 right-0 top-0 h-full w-full'>
//             <ul className='flex flex-col gap-2'>
//                 {
//                     data.map((item, index) => (
//                         <li className=' ' key={index}><Link className="text-lg dark:text-white flex items-center" to={item.path}><span>{item.name}</span>  {item.notification && <span className=" bg-main_dark_violet_color ml-2 dark:bg-white dark:text-black rounded-full h-4 w-4  text-white flex items-center justify-center text-[10px]">
//                             {item.notification}
//                         </span>}</Link></li>
//                     ))
//                 }

//                 <li onClick={handleTheme} className="md:hidden text-3xl ">
//                     {theme === "light" && (
//                         <MdDarkMode className=" cursor-pointer text-black" />
//                     )}
//                     {theme === "dark" && (
//                         <MdLightMode className=" cursor-pointer text-white" />
//                     )}
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default PhoneSideBar
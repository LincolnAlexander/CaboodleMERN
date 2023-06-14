// import airPodsImage from "./images/airpods-pro-1662573080387 1.jpg";

// function App() {
//     const call = async (e) => {
//         //e.preventDefault();
//         fetch("http://localhost:5000/Items", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         })
//             .then((response) => response.json())
//             .then((data) => console.log(data));
//     };

//     return (
//         <div className="flex flex-col items-center w-screen h-screen border-4 border-black bg-mainColors-gray">
//             <header className="border-2 h-20 w-full grid grid-cols-3 justify-items-center content-center p-4  ">
//                 <div className="justify-self-start">
//                     <p className="text-white font-medium ">Monday</p>
//                 </div>
//                 <div className="">
//                     <p className="text-xl text-white font-medium">Logo</p>
//                 </div>
//                 <div className="justify-self-end">
//                     <button className="hover:bg-slate-700 rounded hover:scale-105 transition ease-in delay-75 mr-4">
//                         <p className="text-white m-2 text-base font-medium">
//                             Sign In
//                         </p>
//                     </button>
//                     <button className="h-10 bg-mainColors-green rounded hover:scale-105 transition ease-in delay-75">
//                         <p className="text-white m-2 text-base font-medium">
//                             Create Account
//                         </p>
//                     </button>
//                 </div>
//             </header>

//             <div className="flex w-1/2 flex-col m-10 items-center">
//                 <div className="m-10">
//                     <p className="text-5xl text-mainColors-silver font-bold text-center">
//                         TIRED OF WISH LISTS{" "}
//                         <p className="text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//                             NO PROBLEM
//                         </p>
//                     </p>
//                 </div>
//                 <div className="m-4">
//                     <p className="text-mainColors-silver text-lg text-center">
//                         Keep track of all your wants and needs,
//                         <p>all in one place.</p>
//                     </p>
//                 </div>
//                 <div>
//                     <img src={airPodsImage} alt="AirPods Image" />
//                 </div>

//                 {/* <button type="button" onClick={call}>
//                     Click
//                 </button> */}
//             </div>
//         </div>
//     );
// }

// export default App;

import React from "react";
import StartUpCard from "../cards/startup-card";
import STARTUP_CARD_DATA from "@/data/startup-cards";

export default function StartupPath() {
  return (
    <>
      {STARTUP_CARD_DATA.map((item, _) => {
        return (
          <section key={item.id}>
            <div className="grid">
              <div className="mb-4 grid gap-4 lg:grid-cols-[2fr_5px_2fr] lg:m-0">
                {/* The left side of the axis */}
                <div className="text-xl lg:grid lg:content-center lg:items-center mt-4">
                  {item.id % 2 === 0 && <StartUpCard item={item} />}
                </div>
                {/* The axis itself */}
                <div className="bg-gray-500 lg:grid lg:content-center lg:items-center">
                  <div className="bg-red-500 transform lg:translate-x-[-35%] lg:h-4 lg:w-4 lg:rounded-full"></div>
                </div>
                {/* The left side of the axis */}
                <div className="mb-10 text-left lg:mb-8 lg:mx-0 lg:ml-4 lg:text-[clamp(0.75rem,1.25vw,1.5rem)] lg:grid lg:content-center">
                  {item.id % 2 !== 0 && <StartUpCard item={item} />}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
// import React from "react";
// import StartUpCard from "../cards/startup-cards";

// const data = [{}];
// export default function StartupPath() {
//   return (
//     <section className="mt-20">
//       <div className="grid">
//         <div className="mb-4 grid gap-4 lg:grid-cols-[2fr_5px_2fr] lg:m-0">
//           {/* The left side of the axis */}
//           <div className="text-xl lg:grid lg:content-center lg:items-center mt-4">
//             <StartUpCard />
//           </div>
//           {/* The axis itself */}
//           <div className="bg-gray-500 lg:grid lg:content-center lg:items-center">
//             <div className="bg-red-500 transform lg:translate-x-[-35%] lg:h-4 lg:w-4 lg:rounded-full"></div>
//           </div>
//           {/* The left side of the axis */}
//           <div className="mb-10 text-left lg:mb-8 lg:mx-0 lg:ml-4 lg:text-[clamp(0.75rem,1.25vw,1.5rem)] lg:grid lg:content-center">
//             <StartUpCard />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

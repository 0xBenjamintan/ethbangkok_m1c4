"use client";
import Link from "next/link";
import { useState } from "react";

const DashBoardIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9646 2.78381e-06C13.6841 -3.04617e-05 13.411 -6.28422e-05 13.1797 0.0188338C12.9258 0.0395857 12.626 0.0885497 12.3245 0.242213C11.9063 0.455265 11.5664 0.795222 11.3533 1.21336C11.1997 1.51494 11.1507 1.81465 11.1299 2.06864C11.111 2.29993 11.1111 2.57303 11.1111 2.85345V6.03544C11.1111 6.31587 11.111 6.58897 11.1299 6.82026C11.1507 7.07425 11.1997 7.37395 11.3533 7.67554C11.5664 8.09367 11.9063 8.43363 12.3245 8.64668C12.626 8.80035 12.9258 8.84931 13.1797 8.87006C13.411 8.88896 13.6841 8.88893 13.9645 8.88889H17.1465C17.427 8.88893 17.7001 8.88896 17.9314 8.87006C18.1854 8.84931 18.4851 8.80035 18.7866 8.64668C19.2048 8.43363 19.5447 8.09367 19.7578 7.67554C19.9115 7.37395 19.9604 7.07425 19.9812 6.82026C20.0001 6.58897 20 6.31587 20 6.03544V2.85345C20 2.57303 20.0001 2.29993 19.9812 2.06864C19.9604 1.81465 19.9115 1.51494 19.7578 1.21336C19.5447 0.795222 19.2048 0.455265 18.7866 0.242213C18.4851 0.0885497 18.1854 0.0395857 17.9314 0.0188338C17.7001 -6.28398e-05 17.427 -3.04635e-05 17.1466 2.78203e-06L13.9646 2.78381e-06Z"
        fill="currentColor"
      />
      <path
        d="M2.85345 11.1111C2.57303 11.1111 2.29993 11.111 2.06864 11.1299C1.81465 11.1507 1.51494 11.1997 1.21336 11.3533C0.795222 11.5664 0.455265 11.9063 0.242213 12.3245C0.0885497 12.626 0.0395857 12.9258 0.0188338 13.1797C-6.28398e-05 13.411 -3.04635e-05 13.6841 2.78203e-06 13.9645L2.78381e-06 17.1465C-3.04617e-05 17.427 -6.28422e-05 17.7001 0.0188338 17.9314C0.0395857 18.1854 0.0885497 18.4851 0.242213 18.7866C0.455265 19.2048 0.795222 19.5447 1.21336 19.7578C1.51494 19.9115 1.81465 19.9604 2.06864 19.9812C2.29993 20.0001 2.57303 20 2.85345 20H6.03544C6.31587 20 6.58897 20.0001 6.82026 19.9812C7.07425 19.9604 7.37395 19.9115 7.67554 19.7578C8.09367 19.5447 8.43363 19.2048 8.64668 18.7866C8.80035 18.4851 8.84931 18.1854 8.87006 17.9314C8.88896 17.7001 8.88893 17.427 8.88889 17.1466V13.9646C8.88893 13.6841 8.88896 13.411 8.87006 13.1797C8.84931 12.9258 8.80035 12.626 8.64668 12.3245C8.43363 11.9063 8.09367 11.5664 7.67554 11.3533C7.37395 11.1997 7.07425 11.1507 6.82026 11.1299C6.58897 11.111 6.31587 11.1111 6.03544 11.1111H2.85345Z"
        fill="currentColor"
      />
      <path
        d="M13.9646 11.1111C13.6841 11.1111 13.411 11.111 13.1797 11.1299C12.9258 11.1507 12.626 11.1997 12.3245 11.3533C11.9063 11.5664 11.5664 11.9063 11.3533 12.3245C11.1997 12.626 11.1507 12.9258 11.1299 13.1797C11.111 13.411 11.1111 13.6841 11.1111 13.9646V17.1465C11.1111 17.427 11.111 17.7001 11.1299 17.9314C11.1507 18.1854 11.1997 18.4851 11.3533 18.7866C11.5664 19.2048 11.9063 19.5447 12.3245 19.7578C12.626 19.9115 12.9258 19.9604 13.1797 19.9812C13.411 20.0001 13.6841 20 13.9646 20H17.1465C17.427 20 17.7001 20.0001 17.9314 19.9812C18.1854 19.9604 18.4851 19.9115 18.7866 19.7578C19.2048 19.5447 19.5447 19.2048 19.7578 18.7866C19.9115 18.4851 19.9604 18.1854 19.9812 17.9314C20.0001 17.7001 20 17.427 20 17.1465V13.9646C20 13.6841 20.0001 13.411 19.9812 13.1797C19.9604 12.9258 19.9115 12.626 19.7578 12.3245C19.5447 11.9063 19.2048 11.5664 18.7866 11.3533C18.4851 11.1997 18.1854 11.1507 17.9314 11.1299C17.7001 11.111 17.427 11.1111 17.1465 11.1111H13.9646Z"
        fill="currentColor"
      />
      <path
        d="M13.9646 20C13.6841 20 13.411 20.0001 13.1797 19.9812C12.9258 19.9604 12.626 19.9115 12.3245 19.7578C11.9063 19.5447 11.5664 19.2048 11.3533 18.7866C11.1997 18.4851 11.1507 18.1854 11.1299 17.9314C11.111 17.7001 11.1111 17.427 11.1111 17.1465V13.9646C11.1111 13.6841 11.111 13.411 11.1299 13.1797C11.1507 12.9257 11.1997 12.626 11.3533 12.3245C11.5664 11.9063 11.9063 11.5664 12.3245 11.3533C12.626 11.1997 12.9258 11.1507 13.1797 11.1299C13.411 11.111 13.6841 11.1111 13.9645 11.1111H17.1465C17.427 11.1111 17.7001 11.111 17.9314 11.1299C18.1854 11.1507 18.4851 11.1997 18.7866 11.3533C19.2048 11.5664 19.5447 11.9063 19.7578 12.3245C19.9115 12.626 19.9604 12.9257 19.9812 13.1797C20.0001 13.411 20 13.6841 20 13.9646V17.1465C20 17.427 20.0001 17.7001 19.9812 17.9314C19.9604 18.1854 19.9115 18.4851 19.7578 18.7866C19.5447 19.2048 19.2048 19.5447 18.7866 19.7578C18.4851 19.9115 18.1854 19.9604 17.9314 19.9812C17.7001 20.0001 17.427 20 17.1466 20L13.9646 20Z"
        fill="currentColor"
      />
      <path
        d="M2.85345 8.88889C2.57303 8.88893 2.29993 8.88896 2.06864 8.87006C1.81465 8.84931 1.51494 8.80034 1.21336 8.64668C0.795222 8.43363 0.455265 8.09367 0.242213 7.67554C0.0885497 7.37395 0.0395857 7.07425 0.0188338 6.82026C-6.28398e-05 6.58897 -3.04635e-05 6.31588 2.78203e-06 6.03546L2.78381e-06 2.85345C-3.04617e-05 2.57303 -6.28422e-05 2.29992 0.0188338 2.06864C0.0395857 1.81464 0.0885497 1.51494 0.242213 1.21336C0.455265 0.795221 0.795222 0.455265 1.21336 0.242212C1.51494 0.0885487 1.81465 0.0395851 2.06864 0.0188332C2.29993 -6.29425e-05 2.57303 -3.24249e-05 2.85345 1.90735e-06H6.03544C6.31587 -3.24249e-05 6.58897 -6.29425e-05 6.82026 0.0188332C7.07425 0.0395851 7.37395 0.0885487 7.67554 0.242212C8.09367 0.455265 8.43363 0.795221 8.64668 1.21336C8.80035 1.51494 8.84931 1.81464 8.87006 2.06864C8.88896 2.29991 8.88893 2.573 8.88889 2.85341V6.03544C8.88893 6.31586 8.88896 6.58898 8.87006 6.82026C8.84931 7.07425 8.80035 7.37395 8.64668 7.67554C8.43363 8.09367 8.09367 8.43363 7.67554 8.64668C7.37395 8.80034 7.07425 8.84931 6.82026 8.87006C6.58897 8.88896 6.31587 8.88893 6.03544 8.88889H2.85345Z"
        fill="currentColor"
      />
      <path
        d="M13.9646 8.88889C13.6841 8.88893 13.411 8.88896 13.1797 8.87006C12.9258 8.84931 12.626 8.80034 12.3245 8.64668C11.9063 8.43363 11.5664 8.09367 11.3533 7.67554C11.1997 7.37395 11.1507 7.07425 11.1299 6.82026C11.111 6.58897 11.1111 6.31587 11.1111 6.03544V2.85345C11.1111 2.57303 11.111 2.29992 11.1299 2.06864C11.1507 1.81464 11.1997 1.51494 11.3533 1.21336C11.5664 0.795221 11.9063 0.455265 12.3245 0.242212C12.626 0.0885487 12.9258 0.0395851 13.1797 0.0188332C13.411 -6.29425e-05 13.6841 -3.24249e-05 13.9646 1.90735e-06H17.1465C17.427 -3.24249e-05 17.7001 -6.29425e-05 17.9314 0.0188332C18.1854 0.0395851 18.4851 0.0885487 18.7866 0.242212C19.2048 0.455265 19.5447 0.795221 19.7578 1.21336C19.9115 1.51494 19.9604 1.81464 19.9812 2.06864C20.0001 2.29992 20 2.57302 20 2.85345V6.03544C20 6.31587 20.0001 6.58897 19.9812 6.82026C19.9604 7.07425 19.9115 7.37395 19.7578 7.67554C19.5447 8.09367 19.2048 8.43363 18.7866 8.64668C18.4851 8.80034 18.1854 8.84931 17.9314 8.87006C17.7001 8.88896 17.427 8.88893 17.1465 8.88889H13.9646Z"
        fill="currentColor"
      />
    </svg>
  );
};
const VaultsIcon = () => {
  return (
    <svg
      fill="none"
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="#ffffff"
      strokeWidth="0.00512"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M445.953,371.991l-73.27-73.268c5.822-13.303,8.873-27.817,8.873-42.416c0-14.602-3.051-29.115-8.873-42.417 l73.267-73.274c14.986-14.992,14.986-39.382-0.001-54.369c-7.262-7.261-16.916-11.26-27.184-11.26 c-10.268,0-19.922,3.999-27.184,11.261l-73.267,73.272c-13.299-5.823-27.814-8.874-42.417-8.874 c-14.601,0-29.117,3.051-42.418,8.874l-73.27-73.268c-7.263-7.261-16.917-11.26-27.185-11.26 c-10.268,0-19.922,3.999-27.185,11.261c-14.99,14.99-14.989,39.381,0,54.37l73.271,73.268 c-5.823,13.304-8.874,27.818-8.874,42.416c0,14.601,3.052,29.117,8.874,42.417l-73.269,73.269 c-14.984,14.991-14.984,39.38,0.002,54.367c7.262,7.262,16.917,11.262,27.185,11.262s19.923-4,27.185-11.262l73.267-73.267 c13.303,5.823,27.816,8.874,42.412,8.874c14.601,0,29.115-3.051,42.417-8.874l73.271,73.266 c7.262,7.262,16.916,11.262,27.184,11.262c10.268,0,19.923-3.999,27.183-11.258c7.264-7.261,11.266-16.915,11.266-27.185 C457.215,388.909,453.216,379.254,445.953,371.991z M431.174,411.583c-3.315,3.315-7.722,5.141-12.408,5.141 c-4.686,0-9.093-1.825-12.407-5.141l-78.517-78.512c-2.009-2.008-4.683-3.06-7.392-3.06c-1.669,0-3.35,0.399-4.895,1.218 c-12.128,6.437-25.842,9.839-39.662,9.839c-13.816,0-27.529-3.403-39.66-9.84c-4.054-2.151-9.039-1.405-12.286,1.841 l-78.51,78.512c-3.315,3.315-7.722,5.141-12.408,5.141c-4.685,0-9.093-1.827-12.407-5.141c-6.84-6.84-6.839-17.972,0-24.814 l78.513-78.513c3.247-3.248,3.994-8.233,1.84-12.288c-6.436-12.125-9.838-25.84-9.838-39.661c0-13.816,3.402-27.531,9.839-39.662 c2.151-4.054,1.404-9.039-1.842-12.286l-78.516-78.512c-6.842-6.842-6.842-17.974-0.001-24.816 c3.314-3.314,7.722-5.14,12.408-5.14c4.686,0,9.094,1.825,12.408,5.14l78.516,78.514c3.247,3.246,8.233,3.994,12.288,1.84 c12.125-6.438,25.84-9.84,39.661-9.84c13.822,0,27.536,3.403,39.661,9.84c4.056,2.154,9.043,1.406,12.288-1.841l78.513-78.517 c3.314-3.314,7.721-5.14,12.407-5.14c4.686,0,9.093,1.825,12.407,5.14c6.841,6.841,6.84,17.973,0,24.816l-78.51,78.517 c-3.247,3.246-3.994,8.232-1.841,12.287c6.436,12.127,9.838,25.841,9.838,39.662c0,13.818-3.401,27.533-9.838,39.663 c-2.151,4.055-1.404,9.039,1.842,12.286l78.514,78.513c3.314,3.314,5.14,7.722,5.14,12.408S434.492,408.269,431.174,411.583z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M275.894,236.443c-10.947,0-19.853,8.906-19.853,19.853s8.906,19.853,19.853,19.853s19.853-8.906,19.853-19.853 S286.841,236.443,275.894,236.443z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M275.894,200.916c-30.536,0-55.38,24.843-55.38,55.38c0,30.536,24.844,55.38,55.38,55.38 c30.536,0,55.38-24.844,55.38-55.38C331.273,225.76,306.43,200.916,275.894,200.916z M275.894,290.777 c-19.013,0-34.482-15.469-34.482-34.482s15.469-34.482,34.482-34.482s34.482,15.469,34.482,34.482 C310.375,275.309,294.907,290.777,275.894,290.777z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M480.653,19.174H69.694c-17.285,0-31.347,14.062-31.347,31.347v62.326H21.131C9.479,112.847,0,122.326,0,133.977v92.03 c0,11.651,9.479,21.13,21.131,21.13h17.216v18.545H21.131C9.479,265.682,0,275.161,0,286.813v92.03 c0,11.651,9.479,21.129,21.131,21.129h17.216v61.507c0,17.285,14.062,31.347,31.347,31.347h410.959 c17.285,0,31.347-14.062,31.347-31.347V50.521C512,33.236,497.938,19.174,480.653,19.174z M491.102,461.48 c0,5.762-4.687,10.449-10.449,10.449H69.694c-5.762,0-10.449-4.687-10.449-10.449v-71.956c0-5.771-4.678-10.449-10.449-10.449 H21.131c-0.131,0-0.233-0.102-0.233-0.232v-92.03c0-0.131,0.102-0.233,0.233-0.233h27.665c5.771,0,10.449-4.678,10.449-10.449 v-39.443c0-5.771-4.678-10.449-10.449-10.449H21.131c-0.131,0-0.233-0.102-0.233-0.232v-92.03c0-0.131,0.102-0.232,0.233-0.232 h27.665c5.771,0,10.449-4.678,10.449-10.449V50.521c0-5.762,4.687-10.449,10.449-10.449h410.959 c5.762,0,10.449,4.687,10.449,10.449V461.48z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M456.169,175.564c-5.771,0-10.449,4.678-10.449,10.449v4.678c0,5.771,4.678,10.449,10.449,10.449 s10.449-4.678,10.449-10.449v-4.678C466.618,180.242,461.94,175.564,456.169,175.564z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M456.169,214.045c-5.771,0-10.449,4.678-10.449,10.449v101.492c0,5.771,4.678,10.449,10.449,10.449 s10.449-4.678,10.449-10.449V224.494C466.618,218.723,461.94,214.045,456.169,214.045z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

const menus = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: <DashBoardIcon />,
  },
  {
    id: 4,
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashBoardIcon />,
  },
];

const BottomNavigation = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <div className="fixed bottom-0 z-[1000] flex h-[64px] w-full justify-around bg-[#FFFBE7] px-2 py-[10px] text-black lg:hidden">
      {menus.map((item) => (
        <Link
          href={item.href}
          onClick={() => setCurrentTab(item.id)}
          className={`flex w-1/2 flex-col items-center justify-center gap-[6px] text-sm font-normal ${
            currentTab === item.id && "text-[#FFD02B]"
          }`}
          key={item.id}
        >
          <div className={`h-6 w-6 `}>{item.icon}</div>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;

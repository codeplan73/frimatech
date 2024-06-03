import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export function loading() {
  return (
    <div>
      <div className="container flex flex-col gap-2 p-4 mx-auto rounded-xl drop-shadow-lg ">
        {/* <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Skeleton height="2rem" />
          <Skeleton height="20rem" />
        </div> */}
        <div className="flex items-center justify-center h-[40vh]">
          <Image
            src="/img/loading.gif"
            height={1000}
            width={1000}
            alt={"loader"}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default loading;

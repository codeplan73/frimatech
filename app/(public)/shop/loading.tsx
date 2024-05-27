import Skeleton from "react-loading-skeleton";

export function loading() {
  return (
    <div>
      <div className="flex flex-col max-w-sm gap-2 p-4 rounded-xl drop-shadow-lg">
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Skeleton height="2rem" />
          <Skeleton height="20rem" />
        </div>
        <div className="flex items-start justify-between py-2">
          <div className="flex flex-col space-y-1">
            <p className="font-semibold text-md">
              {" "}
              <Skeleton height="20rem" />
            </p>
            <div className="flex items-start justify-start space-x-2">
              <p className="flex">
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
              </p>
              {/* <span className="-mt-1 text-yellow-400">{rating}</span> */}
            </div>
            <h4 className="text-lg leading-tight text-balance text-slate-500 line-clamp-1">
              <Skeleton height="20rem" />
            </h4>
          </div>
          <Skeleton height="20rem" />
        </div>
      </div>
    </div>
  );
}

export default loading;

import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import https from "../../axios";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ResponsivPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(5000 / 8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const limit = 8;
  const defaultImage = "https://picsum.photos/256/227";
  const navigate = useNavigate("")
  function handleScroll(){
    navigate("/scroll")
  }
  useEffect(() => {
    setLoading(true);
    https
      .get(`/photos?_page=${currentPage}&_limit=${limit}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, [currentPage, limit]);

  return (
    <div>
      <header className=" w-full h-10 bg-sky-600 flex gap-10 items-center">
        {" "}
        <button className="text-white font-bold ml-36 uppercase" onClick={()=>{navigate('/')}}>home</button>
        <button className="text-white bordered bg-slate-400 h-8 px-7 rounded" onClick={handleScroll}>
          Scroll
        </button>
      </header>
      <div className=" w-[1440px] h-[1024px] bg-[#E82677] mx-auto p-20">
        {loading ? (
          <TailSpin className="mt-80" color="#00BFFF" height={80} width={80} />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="bg-white rounded-3xl pt-20">
            <h1 className="text-3xl font-bold mb-4 ml-[571px] ">Food Blog</h1>
            <p className=" w-[593px] text-center ml-[343px] mt-5 mb-14">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur.
            </p>
            <ul className="flex flex-wrap px-24 gap-5">
              {data.map((item) => (
                <img
                  key={item.id}
                  src={item.thumbnailUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                  className="w-64 h-52 object-cover rounded-lg "
                />
              ))}
            </ul>
            <div className="flex justify-center mt-20 w-full max-w-xs mx-auto pb-12 ">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsivPagination;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; 
import https from '../../axios';
import { useNavigate } from 'react-router-dom';

const ScrollPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const defaultImage = 'https://picsum.photos/200/300';
  const navigate = useNavigate()
  function handleHome(){
    navigate("/")
  }
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await https.get(`/photos?_page=${page}&_limit=9`);
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]); 

  
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  return (
    <div onScroll={handleScroll} className="overflow-y-scroll p-4 h-[1000px]">
      <header className=" w-full h-10  flex gap-10 items-center">
        {" "}
        <button className="text-slate-500 uppercase font-bold bg-green-200 px-4 py-1 rounded" onClick={handleHome}>home</button>
        
      </header>  
      <h1 className="text-2xl font-bold mb-4">Food Blog</h1>
      
     
      {loading && photos.length === 0 ? (
        <div className="flex justify-center items-center">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="card border rounded-lg overflow-hidden shadow-lg">
              <img 
                src={photo.thumbnailUrl} 
                alt={photo.title} 
                onError={(e) => { e.target.src = defaultImage; }} 
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </div>  
      )}

     
      {loading && photos.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <TailSpin color="#00BFFF" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default ScrollPagination;

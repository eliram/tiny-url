import { useEffect, useState } from "react";
import { api, endpoint } from "../Api";
import { IUrl } from "../Api/apiTypes";
import Table from "../Components/Table";

const UrlsList: React.FC = () => {

  const [urls, setUrls] = useState<IUrl[]>([])
  
  const onDelete = async (url: IUrl) => {
   const urls = await api.deleteUrl(url);
    setUrls(urls);
  }
  useEffect(() => {
    const fetchData = async () => {
      const urls = await api.getUrls();
      setUrls(urls);
    }
    fetchData();
  }, [])
  

  return (
    <>
      <header className="App-header">
        URL Shortener
      </header>
      <Table onDelete={onDelete} urls={urls}/>
    </>
  )
};


export default UrlsList;

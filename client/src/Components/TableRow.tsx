import { useEffect, useState } from "react";
import { endpoint } from "../Api";
import { IUrl } from "../Api/apiTypes";
import { randomID } from "../utils/misc";

interface UrlProps {
  onDelete: (row: IUrl) => void;
  row: IUrl;
}

const TableRow: React.FC<UrlProps> = ({onDelete, row }) => {

  const [tinyUrl, setTinyUrl] = useState<string>("")

  useEffect(() => {
    setTinyUrl(endpoint+"/tiny/" + row.tinyUrl);

    
  }, [row.tinyUrl])
  const deleteRow = async () => {
    onDelete(row)
  }
  return (
    <tr key={randomID()}>
      <td key={randomID()}>{ row.id }</td>
      <td key={randomID()}>{row.url}</td>
      <td key={randomID()}><a href={tinyUrl}>{row.tinyUrl}</a></td>
      <td key={randomID()}>
        {tinyUrl && (
          <button onClick={() =>  navigator.clipboard.writeText(tinyUrl)}>Copy</button>
        )}
      </td>
      <td key={randomID()}>
        <button onClick={deleteRow}>Remove</button>
      </td>

    </tr>
  )
};

export default TableRow;


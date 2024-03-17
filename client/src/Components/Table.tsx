import { api } from "../Api";
import { IUrl } from "../Api/apiTypes";
import { randomID } from "../utils/misc";
import TableRow from "./TableRow";

interface UrlsProps {
  onDelete: (url: IUrl) => void;
  urls: IUrl[];
}

const Table: React.FC<UrlsProps> = ({ onDelete, urls }) => {
  const headers = ["id", "url", "shortend", "copy", "delete"];

  const deleteUrl = async (url: IUrl) => {
    onDelete(url);
  }

  return (
    <table style={{ width: 500 }}>
      <thead>
        <tr>
          {headers.map((head) => (
            <th key={randomID()}>{head}</th>
          ))}
        </tr>
      </thead>
      {urls && (
        <tbody>
          {urls.map((rowContent) => (
            <TableRow
              onDelete={deleteUrl}
              row={rowContent}
            />
          ))}
        </tbody>
      )}
    </table>
  )
};

export default Table;

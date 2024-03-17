import { useEffect, useState } from "react";
import { api, endpoint } from "../Api";
import { IUrl } from "../Api/apiTypes";

const UrlForm: React.FC = () => {
  const [formData , setFormData ] = useState<IUrl>({url: ""})
  const [tinyUrl, setTinyUrl] = useState<string>("")

  const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    console.log(e.target);
    console.log(formData)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    setTinyUrl(endpoint+"/tiny/" + formData.tinyUrl);

    
  }, [formData.tinyUrl])

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();
    const urlInfo = await api.postUrl(formData)
    console.log("SUBMIT", urlInfo)
    setFormData(urlInfo);
  }
  return (
    <>
      <span>Enter the URL to shorten</span>
      <form onSubmit={handleSubmit}>
        <label>
          Url:
        </label>
        <label>
        <br />
        <input type="url" name="url" value={formData.url} onChange={handleInputChange}/>
        <button type="submit">Submit</button>
        </label>
        <br />
        <br />

        {formData.tinyUrl && (
          <>
            <label>
              Success! here is your shortend URL:
              <br />
              <a href={tinyUrl}>{tinyUrl}</a>
            </label>
            <button onClick={() =>  navigator.clipboard.writeText(tinyUrl)}>Copy</button>
          </>
        )}

      </form>
    </>
  )
};

export default UrlForm;


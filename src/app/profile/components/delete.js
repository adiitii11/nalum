import { useState } from "react";

export default function Delete({
  position,
  type,
  data,
  refresh,
  setRefresh,
  setData,
  email,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    let updatedData = data[type];
    let oldData = JSON.stringify(data[type]);
    updatedData.splice(position, 1);
    data[type] = updatedData;
    let bodyData = {
      email: email,
      oldData: oldData,
      category: type,
    };
    bodyData[type] = JSON.stringify(updatedData);
    let res = await fetch(`/api/edit-portfolio-item`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError(true);
    } else {
      setData(data);
      setLoading(false);
      setRefresh(!refresh);
    }
  };
  return (
    <>
      <button className="bg-[#00183F] border-2 text-white rounded-full w-10 h-10 font-bold text-3xl hover:bg-[#084a8d] mx-2 grid content-center justify-center" onClick={handleSubmit} disabled={loading}>
      <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="33px" height="33px"><path d="M 21.857422 7 C 20.282422 7 19 8.2824219 19 9.8574219 L 19 13 L 10.5 13 C 10.224 13 10 13.224 10 13.5 C 10 13.776 10.224 14 10.5 14 L 12.925781 14 L 14.292969 38.607422 C 14.399969 40.509422 15.974906 42 17.878906 42 L 32.121094 42 C 34.025094 42 35.601031 40.510375 35.707031 38.609375 L 37.074219 14 L 39.5 14 C 39.776 14 40 13.776 40 13.5 C 40 13.224 39.776 13 39.5 13 L 31 13 L 31 9.8574219 C 31 8.2824219 29.717578 7 28.142578 7 L 21.857422 7 z M 21.857422 8 L 28.142578 8 C 29.166578 8 30 8.8334219 30 9.8574219 L 30 13 L 20 13 L 20 9.8574219 C 20 8.8334219 20.832422 8 21.857422 8 z M 13.927734 14 L 36.072266 14 L 34.708984 38.552734 C 34.631984 39.924734 33.495094 41 32.121094 41 L 17.878906 41 C 16.504906 41 15.368016 39.925734 15.291016 38.552734 L 13.927734 14 z M 19.169922 19 C 18.894922 19.009 18.6775 19.241578 18.6875 19.517578 L 19.242188 35.517578 C 19.252187 35.787578 19.473188 35.998047 19.742188 35.998047 L 19.761719 35.998047 C 20.036719 35.989047 20.252188 35.758422 20.242188 35.482422 L 19.6875 19.482422 C 19.6785 19.206422 19.436922 18.962 19.169922 19 z M 25 19 C 24.724 19 24.5 19.224 24.5 19.5 L 24.5 35.431641 C 24.5 35.707641 24.724 35.931641 25 35.931641 C 25.276 35.931641 25.5 35.707641 25.5 35.431641 L 25.5 19.5 C 25.5 19.224 25.276 19 25 19 z M 30.830078 19 C 30.545078 18.98 30.3225 19.207422 30.3125 19.482422 L 29.755859 35.482422 C 29.745859 35.758422 29.963281 35.989047 30.238281 35.998047 L 30.255859 35.998047 C 30.524859 35.998047 30.745859 35.787578 30.755859 35.517578 L 31.3125 19.517578 C 31.3225 19.241578 31.105078 19.009 30.830078 19 z"/></svg></button>
      {error &&
        "Some error occured, maybe two devices are editing simultaneously"}
    </>
  );
}

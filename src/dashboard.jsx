import React, { useState } from "react";

const Dashboard = ({ title }) => {
  const [data, setData] = useState({
    symbl: "",
    lastRef: "",
    open: "",
    close: "",
    high: "",
    low: "",
    volume: "",
  });
  const [symb, setSymb] = useState("");
  const [dat, setDate] = useState("");
  const [sDate, setSdate] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showHead, setShowHead] = useState(true);

  const handleSearch = () => {
    if (symb === "" || dat === "") {
      alert("Enter the Details to search");
      return;
    }
    const Symbol = symb.toUpperCase();
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Symbol}.BSE&outputsize=full&apikey=64HSHXL9VGHLW495`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the data here
        const metaData = data["Meta Data"];
        const Time = data["Time Series (Daily)"];
        const symbol = metaData["2. Symbol"];
        const lastRef = metaData["3. Last Refreshed"];
        const date = Time[dat];
        setData({
          symbl: symbol,
          lastRef: lastRef,
          open: date["1. open"],
          close: date["4. close"],
          high: date["2. high"],
          low: date["3. low"],
          volume: date["6. volume"],
        });
        setShowHead(false);
        setShowCard(true);
        setSdate(dat);
        setSymb("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleShareEmail = () => {
    const subject = `Stock Price Information for ${data.symbl}`;
    const body = `Date: ${sDate}\n
                  Last Refreshed: ${data.lastRef}\n
                  Open Price: ₹ ${data.open}\n
                  Close Price: ₹ ${data.close}\n
                  High Price: ₹ ${data.high}\n
                  Low Price: ₹ ${data.low}\n
                  Volume: ${data.volume}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_blank", "noopener,noreferrer");
};

  return (
    <div className="mt-0">
      <div className="flex justify-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {title.tit1}
          </span>
          {title.tit2}
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center mt-10 space-x-9">
        <input
          type="text"
          className="w-1/6 h-16 rounded-lg text-center font-bold text-3xl"
          placeholder="Equity Symbol"
          value={symb}
          onChange={(e) => setSymb((e.target.value))}
        />
        <input
          type="text"
          className="w-1/6 h-16 rounded-lg text-center font-bold text-3xl pr-4"
          placeholder="yyyy-mm-dd"
          pattern="\d{4}-\d{2}-\d{2}"
          title="Please enter a date in the format yyyy-mm-dd"
          value={dat}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="button"
          className="ml-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-300 w-60 h-16 text-center font-bold text-3xl hover:ring-2 ring-red-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {showHead && (
        <div className="mt-32 flex flex-col max-w-5xl justify-items-center ml-96 pl-32">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          BSE Stock Price Tracker  
            <span className="text-blue-600 dark:text-blue-500"> Stay Informed </span>
             and Make Informed Decisions.
          </h1>
          <p className="text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-500">
                "Stay Updated with NSE Stock Prices"<br />
                "Real-Time Data for Informed Investments"<br />
                "Track, Analyze, and Plan with Confidence"
          </p>
        </div>
      )}
      {showCard && (
        <div className="flex flex-row justify-center items-center mt-20 pl-10 card">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold"></span>
              <span className="text-4xl font-extrabold tracking-tight">
                {data.symbl}
              </span>
              </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500 dark:text-gray-400">
                  Date - {sDate}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500 dark:text-gray-400">
                  Last Refreshed - {data.lastRef}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500 dark:text-gray-400">
                  Open Price - {`₹ ${data.open}`}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500 dark:text-gray-400">
                  Close Price - {`₹ ${data.close}`}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500">
                  High Price - {`₹ ${data.high}`}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500">
                  Low Price - {`₹ ${data.low}`}
                </span>
              </li>
              <li className="flex space-x-3">
                <span className="text-base font-normal leading-tight text-black-500">
                  Volume - {data.volume}
                </span>
              </li>
            </ul>
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
              onClick={handleShareEmail}
            >
              Share via Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

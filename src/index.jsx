
import React, { useEffect, useState } from "react";
import "./stocklist.css"; 

const MarketState = () => {
  const [markets, setMarkets] = useState([]);  
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketState = async () => {
      try {
        const response = await fetch("https://api.twelvedata.com/market_state?apikey=a35a774530a04884b2ec23cd0c09281a");
        const data = await response.json();
        setMarkets(data);
      } catch (err) {
        setError("Failed to fetch market data");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketState();
  }, []);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const filteredMarkets = markets.filter(market =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="market-container">
    <section className="firstdiv">
<ul>
  <a href="" className="dashboard">Dashboard</a>
  <a href="">Exchange</a>
  <a href="">Library</a>
  <a href="">Schedules</a>
  <a href="">Payouts</a>
  <a href="">Setting</a>
</ul>
<div className="roundedDiv">
  <div className="roundedcircle">
    <div className="secondcircle"></div>
  </div>
  <p className="keepSafe">Keep you safe!</p>
  <p className="pUpdate">
    Update your security password don’t ever share your API key.
  </p>
  <p className="pUpdateSecond">Update Privacy</p>
</div>
</section>
      <div className="search">
        <input
          type="text"
          placeholder="Search stock..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">Search</button>
      </div>

      <div className="empty"></div>

      
      {filteredMarkets.length > 0 ? (
        filteredMarkets.map((market, index) => (
          <div key={index} className="market-card">
            <h2 className="text-xl font-semibold">{market.name}</h2>
            <p className="text-gray-400">({market.code}) - {market.country}</p>
            <div className="mt-4">
              <p className={`text-lg font-bold ${market.is_market_open ? "text-green-400" : "text-red-400"}`}>
                {market.is_market_open ? "Market Open ✅" : "Market Closed ❌"}
              </p>
              <p className="text-sm text-gray-300">⏳ Time After Open: {market.time_after_open}</p>
              <p className="text-sm text-gray-300">⏳ Time to Close: {market.time_to_close}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No results found</p>
      )}
    </div>
  );
};
export default MarketState

import React, { useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import api from "../../apis/Api";
import { useState } from "react";
export default function WordCloud({ balanceGameIdx = 1 }) {
  const [words, setWords] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    api
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/balances/${balanceGameIdx}/word-cloud`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setWords(res.data);
      });
  }, [flag]);

  setInterval(() => {
    if (flag > 10000) {
      setFlag(0);
    } else {
      setFlag(flag + 1);
    }
  }, 180000);

  return (
    <div>
      <ReactWordcloud words={words} size={[1000, 1000]} />
    </div>
  );
}

import { useState, useEffect } from "react";
import { FaTwitter, FaTumblr, FaQuoteLeft } from "react-icons/fa";

import "./style.css";
import "./app.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("black");

  const fetchQuote = () => {
    document.getElementById("text").style.opacity = 0;
    document.getElementById("author").style.opacity = 0;

    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);

        document.getElementById("text").style.opacity = 1;
        document.getElementById("author").style.opacity = 1;
      });
  };

  const fetchColor = () => {
    const colors = [
      "#000000",
      "#0000FF",
      "#800080",
      "#008B8B",
      "#008000",
      "#4B0082",
      "#2E8B57",
      "#8B0000",
      "#D2691E",
      "#556B2F",
      "#FF0000",
      "#2E8B57",
      "#483D8B",
      "#8A2BE2",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    fetch(`https://www.thecolorapi.com/id?hex=${randomColor.slice(1)}`)
      .then((response) => response.json())
      .then((data) => {
        setColor(randomColor);
        document.body.style.backgroundColor = randomColor;
        document.getElementById("tweet-quote").style.backgroundColor =
          randomColor;
        document.getElementById("tumblr-quote").style.backgroundColor =
          randomColor;
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div id="quote-author">
          <p id="text" style={{ color: color }}>
            <FaQuoteLeft
              className="svg-quote"
              style={{ color: color, fontSize: "50px", minWidth: "50px" }}
            />

            {quote}
          </p>
          <p id="author" style={{ color: color }}>
            -{author}
          </p>
        </div>

        <div id="box-link-button">
          <div id="links">
            <a
              target="_blank"
              id="tweet-quote"
              title="Tweet this quote!"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote} ${author}`}
              style={{ color: color }}
            >
              <FaTwitter style={{ color: "#fff" }} />
            </a>
            <a
              target="_blank"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${author}&content=${quote}`}
              style={{ color: color }}
            >
              <FaTumblr style={{ color: "#fff" }} />
            </a>
          </div>

          <button
            id="new-quote"
            onClick={() => {
              fetchQuote();
              fetchColor();
            }}
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

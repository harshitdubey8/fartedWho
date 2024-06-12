import React, { useState } from "react";

import { VscChromeClose } from "react-icons/vsc";

import "./Home.css";
import Spinner from "../../components/Spinner";
import resultSound from "./../../assets/fart-sound.mp3";
import laughSound from "./../../assets/laugh.mp3";
import booSound from "./../../assets/boo.mp3";

const Home = () => {
  const initialState = {
    id: Date.now(),
    name: "",
  };
  const [data, setData] = useState([initialState]);
  const [guyFarted, setGuyFarted] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const resultAudio = new Audio(resultSound);
  const laughAudio = new Audio(laughSound);
  const booAudio = new Audio(booSound);
  const [abuse, setAbuse] = useState(false);
  const [abuseMessage, setAbuseMessage] = useState("");

  const onHandleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const length = data.length;
    if (length > 0) {
      const index = Math.floor(Math.random() * length);

      setTimeout(() => {
        setGuyFarted(data[index].name);
        setShowResults(true);
        resultAudio.play();
        setLoading(false);
      }, 2000);
    }
  };

  const addFriend = (e) => {
    e.preventDefault();
    setData((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  const removeFriend = (id) => {
    setData((prev) => prev.filter((inputField) => inputField.id !== id));
  };

  const goBack = () => {
    setShowResults(false);
    setData([initialState]);
    setGuyFarted("");
  };

  const handleLaugh = () => {
    laughAudio.play();
  };

  const handleBoo = () => {
    booAudio.play();
  };

  const disableSubmit = data.every((inputField) => inputField.name === "");

  const handleAbuse = () => {
    const abuseMessages = [
      "Whoa, what crawled up there and died?",
      "That was so foul, even the flies left the room!",
      "Seriously bro, that's weaponized!",

      "Did you eat a can of beans for breakfast?",

      "Are you trying to clear the room or summon ghosts?",
      "Next time, warn us before you launch a stink bomb!",
    ];
    const randomIndex = Math.floor(Math.random() * abuseMessages.length);
    setAbuseMessage(abuseMessages[randomIndex]);
    setAbuse(true);
  };

  return (
    <div className="home">
      <div className="header">
        <p>FartedWho.fart</p>
      </div>
      {!showResults && (
        <>
          <h2 className="home-heading">See who Farted ?</h2>
          <p className="home-sub-heading">
            Stop the blame game—let fate reveal the culprit!
          </p>

          <form onSubmit={handleSubmit} className="form-group">
            {data.map((inputField, index) => (
              <div className="input-container" key={inputField.id}>
                <input
                  name="name"
                  value={inputField.name}
                  placeholder={`Suspect number ${index + 1} `}
                  onChange={(e) => onHandleChange(index, e)}
                  className="input-field"
                  autoComplete="off"
                />
                {index > 0 && (
                  <VscChromeClose onClick={() => removeFriend(inputField.id)} />
                )}
              </div>
            ))}

            {data.length < 6 && (
              <button onClick={addFriend}>Add Suspect</button>
            )}
            <div className="bottom-button">
              <button
                type="submit"
                className="submit-button"
                disabled={disableSubmit}
              >
                {loading ? <Spinner /> : "Find Out ?"}
              </button>
            </div>
          </form>
        </>
      )}
      {showResults && (
        <div className="result">
          <h3 className="home-heading">Fellow has farted!</h3>

          <h2 className="winner-name">{guyFarted}</h2>

          <p className="home-sub-heading">{abuseMessage}</p>

          <div className="result-buttons">
            <button
              className="submit-button action-button"
              onClick={handleLaugh}
            >
              Laugh at him
            </button>
            <button className="submit-button action-button" onClick={handleBoo}>
              Boo Him/Her
            </button>
            <button
              className="submit-button action-button"
              onClick={handleAbuse}
            >
              {abuse ? "Retry Abusing" : "Abuse"}
            </button>
          </div>
          <button className="submit-button back-button " onClick={goBack}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

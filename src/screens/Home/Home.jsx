import React, { useState } from "react";

import { VscChromeClose } from "react-icons/vsc";

import "./Home.css";
import Spinner from "../../components/Spinner";
import resultSound from "./../../assets/fart-sound.mp3";

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

  const disableSubmit = data.every((inputField) => inputField.name === "");

  return (
    <div className="home">
      {!showResults && (
        <>
          <h2 className="home-heading">See who Farted ?</h2>
          <p className="home-sub-heading">
            Clear the confusion let the universe decide for you
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
              <button onClick={addFriend}>Add Another Friend</button>
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
          <h3 className="home-heading">Fellow Farted Is !</h3>

          <h2 className="winner-name">{guyFarted}</h2>
          <p className="home-sub-heading">Dude !!! Ewww Broo !! </p>
          <button className="submit-button back-button " onClick={goBack}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

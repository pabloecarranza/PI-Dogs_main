import React from "react";


export default function Tempers(props) {
  const {
    temperament,
    handleTempersChange,
    allTempers,
    temperSelect,
    handleClick,
  } = props;

  return (
    <div>
      <label>Temperaments: </label>
      <select
        name="temperament"
        value={temperament}
        onChange={handleTempersChange}
        multiple={false}
        required={true}
      >
        <option>Add temperament</option>
        {temperSelect.temperaments ? (
          temperSelect.temperaments.map((temp) => (
            <option value={temp.id} key={temp.id}>
              {temp}
            </option>
          ))
        ) : (
          <option>Loading</option>
        )}
      </select>
      <div>
        <div className="TemperContainer">
          {temperament &&
            temperament.map((id) => (
              <div className="IndividualTemper">
                {allTempers.find((t) => t === id)}
                <button className="DelTemper" value={id} onClick={handleClick}>
                  x
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* 

<div >
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} >
                {temperament.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
              <div >
                <h4>You have selected that:</h4>
                {input.temperament.map((el) => (
                  <div key={el} >
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
*/
import React from "react";
import styles from "./dogCard.module.css";
import { Link } from "react-router-dom";

function DogCard({id, img, name, image, weight, temperament, temperaments}) {



  
  if(!temperaments){
    return (

      <div className={styles.dogCard}>
      <img src={image} alt="" />
      <div>
      <Link to={"/dogs/" + id}>
      <h1>{name}</h1>
      </Link>
      
      <h4> peso entre {weight} kilos</h4>
      
      <h3>{temperament}</h3>
      </div>
      </div>
      )
    }else{
      return (
     
        
        <div className={styles.dogCard}>
      <img src={img} alt="" />
      <div>
      <Link to={"/dogs/" + id}>
      <h1>{name}</h1>
      </Link>
      
       
      
      {temperaments ? (

      <h3>{temperaments.map(temp => `${temp.name}`).join(', ')}</h3>
      ) : (

        <h1>queseyo</h1>

      ) }
      </div>
      </div>
      )
  }
    
}

export default DogCard;



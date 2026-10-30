import react from 'react';

function Button(props) {
  return (
    <button
      id={props.id}
      className={props.className}
      onClick={props.HandleClick}
    >
      {props.ButtonText}
    </button>
  );
}

export default Button;

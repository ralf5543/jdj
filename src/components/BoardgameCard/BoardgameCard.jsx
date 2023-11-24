import './BoardgameCard.scss';

const BoardgameCard = () => {
  return (
    <li className="boardgame-card">
      <h2 className="boardgame-card_title">Boardgame title</h2>
      <img
        className="boardgame-card_visual"
        src="https://picsum.photos/300/300"
        alt=""
      />
      <p className="boardgame-card_description">Boardgame description</p>
      <p className="boardgame-card_maxplayers">Nombre de joueurs MAX : 8</p>
      <p className="boardgame-card_idealplayers">Nombre de joueurs idéal : 6</p>
      <p className="boardgame-card_duration">2 heures</p>
    </li>
  );
};

export default BoardgameCard;

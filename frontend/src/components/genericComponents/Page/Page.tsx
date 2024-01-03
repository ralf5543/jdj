/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import './Page.scss';
import { ReactNode } from 'react';

const Page = ({ children }: Props) => (
  <main className="page">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;

/* children : prop spéciale, permet d'injecter des balises à l'intérieur d'un composant
Récupère automatiquement le contenu placé à l'intérieur du composant

const Modale = ({ children }) => {
  return (
    <div className="modale">
      {children}
    </div>
  )
}

=> permet d'avoir une structure et un CSS réutilisables facilement, une sorte de template

Par exemple un composant pour un message de validation :
<Modale>
  <h1>Voulez-vous supprimer l'élément ?</h1>
  <button>Oui</button>
  <button>Non</button>
<Modale>

=> la prop children contiendra 
  <h1>Voulez-vous supprimer l'élément ?</h1>
  <button>Oui</button>
  <button>Non</button>

  Et un autre composant de l'application, pour un message de bienvenue :
<Modale>
  <p>Bienvenue sur le site ! Pour t'inscrire à la newsletter :</p>
  <input />
  <button>S'abonner</button>
<Modale>
=> la prop children contiendra 
  <p>Bienvenue sur le site ! Pour t'inscrire à la newsletter :</p>
  <input />
  <button>S'abonner</button>
*/

type Props = {
  children: ReactNode;
}
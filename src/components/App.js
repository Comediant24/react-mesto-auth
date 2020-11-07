import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [isDeletteReqPopupOpen, setIsDeletteReqPopupOpen] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isDataSending, setDataSending] = useState(false);

  useEffect(() => {
    setIsCardsLoading(true);
    api
      .getInitialCards()
      .then((cardElements) => setCards(cardElements))
      .catch((err) => console.error(err))
      .finally(() => setIsCardsLoading(false));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  }

  function handleCardDeleteRequest(card) {
    setCardDelete(card);
    setIsDeletteReqPopupOpen(true);
  }

  function handleCardDelete(e) {
    setDataSending(true);
    e.preventDefault();
    api
      .removeCard(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c !== cardDelete);
        setCards(newCards);
      })
      .then(() => setIsDeletteReqPopupOpen(false))
      .finally(() => setDataSending(false));
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card, isOpen: true });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletteReqPopupOpen(false);
  }

  function handleUpdateUser(user) {
    setDataSending(true);
    api
      .setUserInfo(user)
      .then((update) => setCurrentUser(update))
      .then(() => closeAllPopups())
      .finally(() => setDataSending(false));
  }

  function handleUpdateAvatar(avatar) {
    setDataSending(true);
    api
      .changeAvatar(avatar)
      .then((update) => setCurrentUser(update))
      .then(() => closeAllPopups())
      .finally(() => setDataSending(false));
  }

  function handleAddPlaceSubmit(card) {
    setDataSending(true);
    api
      .addCard(card)
      .then((update) => setCards([update, ...cards]))
      .then(() => closeAllPopups())
      .finally(() => setDataSending(false));
  }

  useEffect(() => {
    function escFunction(e) {
      if (e.keyCode === 27) closeAllPopups();
    }
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, []);

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteRequest}
            isCardsLoading={isCardsLoading}
          />
          <Footer />

          <EditAvatarPopup
            isSending={isDataSending}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isSending={isDataSending}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isSending={isDataSending}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm
            isEnabled="true"
            name="card-delete"
            title="Вы уверены?"
            isOpen={isDeletteReqPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            buttonText={isDataSending ? 'Удаление...' : 'Да'}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;

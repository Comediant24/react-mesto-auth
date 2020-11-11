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
import Register from './Register';
import Login from './Login';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipTypeSuccess, setIsInfoTooltipTypeSuccess] = useState(
    false
  );
  const history = useHistory();

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
    setIsInfoTooltipPopupOpen(false);
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

  function handleRegisterSubmit(email, password) {
    console.log('handleRegisterSubmit -> email, password', email, password);
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipPopupOpen(true);
          setIsInfoTooltipTypeSuccess(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipTypeSuccess(false);
        console.log(err);
      });
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <main className="content">
            <Switch>
              <ProtectedRoute exact path="/">
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
              </ProtectedRoute>
              <Route path="/sign-up">
                <Register onRegister={handleRegisterSubmit} />
              </Route>
              <Route path="/sign-in">
                <Login />
              </Route>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
          </main>
          <Footer />

          <InfoTooltip
            isSuccess={isInfoTooltipTypeSuccess}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />

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

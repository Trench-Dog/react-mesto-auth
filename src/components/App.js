import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as authApi from '../utils/AuthApi';
import InfoTooltip from './InfoTooltip';

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    const [isStatusPopupOpen, setStatusPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        isOpen: false,
        link: '',
        name: ''
    });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deletedCardId, setDeletedCardId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, initialCards]) => {
                    setCurrentUser(userData);
                    setCards(initialCards);
                })
                .catch(err => alert(err));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (location.pathname !== '/sign-in') {
            navigate('/sign-in');
        }
    }, []);

    useEffect(() => {
        function onPushEsc(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (
            isAddPlacePopupOpen ||
            isConfirmationPopupOpen ||
            isEditAvatarPopupOpen ||
            isEditProfilePopupOpen ||
            selectedCard ||
            isStatusPopupOpen
        ) {
            document.addEventListener('keydown', onPushEsc);
        } else {
            document.removeEventListener('keydown', onPushEsc);
        }
    }, [
        isAddPlacePopupOpen,
        isConfirmationPopupOpen,
        isEditAvatarPopupOpen,
        isEditProfilePopupOpen,
        selectedCard,
        isStatusPopupOpen
    ]);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleDeleteButtonClick(id) {
        setDeletedCardId(id);
        setConfirmationPopupOpen(true);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({
            isOpen: false,
            link: '',
            name: ''
        });
        setConfirmationPopupOpen(false);
        setDeletedCardId('');
        setStatusPopupOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            link: card.link,
            name: card.name
        });
    }

    function handleCardLike(card, isLiked) {
        api.handleCardLike(card._id, isLiked)
            .then(newCard => {
                setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
            })
            .catch(err => alert(err));
    }

    function handleCardDelete(id) {
        setIsLoading(true);
        api.deleteCard(id)
            .then(() => {
                setCards(state => state.filter(c => c._id !== id));
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoading(false);
            });
    }
    function handleUpdateUser(name, description) {
        setIsLoading(true);
        api.editUserInfo(name, description)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoading(false);
            });
    }
    function handleUpdateAvatar(link) {
        setIsLoading(true);
        api.changeAvatar(link)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoading(false);
            });
    }
    function handleAddPlace(name, link) {
        setIsLoading(true);
        api.sendNewCard(name, link)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoading(false);
            });
    }
    function handleRegister(password, email) {
        setIsLoading(true);
        authApi
            .register(password, email)
            .then(res => {
                if (res.data) {
                    setIsSuccess(true);
                }
                setStatusPopupOpen(true);
            })
            .catch(err => {
                setIsSuccess(false);
                setStatusPopupOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function handleLogin(password, email) {
        setIsLoading(true);
        authApi
            .login(password, email)
            .then(res => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setEmail(email);
                    setIsLoggedIn(true);
                }
            })
            .catch(err => {
                setIsSuccess(false);
                setStatusPopupOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function signOut() {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            authApi.checkToken(jwt).then(res => {
                if (res) {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    navigate('/');
                }
            });
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={email}
                    isLoggedIn={isLoggedIn}
                    onSignOut={signOut}
                    location={location}
                />
                <Routes>
                    <Route
                        path="/sign-up"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/" />
                            ) : (
                                <Register isLoading={isLoading} onSubmit={handleRegister} replace />
                            )
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/" />
                            ) : (
                                <Login isLoading={isLoading} onSubmit={handleLogin} replace />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteButtonClick}
                                    cards={cards}
                                />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <ImagePopup
                    className="popup popup_type_image"
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={selectedCard.isOpen}
                    link={selectedCard.link}
                    name={selectedCard.name}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    isLoading={isLoading}
                />
                <ConfirmationPopup
                    onClose={closeAllPopups}
                    isOpen={isConfirmationPopupOpen}
                    cardId={deletedCardId}
                    onConfirmDelete={handleCardDelete}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <InfoTooltip
                    isOpen={isStatusPopupOpen}
                    onClose={closeAllPopups}
                    errorText={'Что-то пошло не так! Попробуйте ещё раз.'}
                    successText={'Вы успешно зарегистрировались!'}
                    isSuccess={isSuccess}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

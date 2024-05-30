import { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayImage.css';
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';
import disliked from '../../assets/disliked.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../auth/AuthContext';
import PropTypes from 'prop-types';

const DisplayImage = ({ imageUrl, title, description, uploadDate, userId }) => {
    const formattedDate = new Date(uploadDate).toLocaleDateString("fr-FR", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentsCount, setCommentsCount] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [visibleActionCommentId, setVisibleActionCommentId] = useState(null);
    const user = useAuth();

    const [imageLikes, setImageLikes] = useState(0);
    const [imageDislikes, setImageDislikes] = useState(0);
    const [likedImage, setLikedImage] = useState(false);
    const [dislikedImage, setDislikedImage] = useState(false);
    const [imageViews, setImageViews] = useState(0);

    useEffect(() => {
        fetchCommentsByImageUrl(imageUrl);
        fetchCommentsCountByImageUrl(imageUrl);
        fetchImageLikesDislikes(imageUrl);
        incrementImageViews(imageUrl);
    }, [imageUrl]);

    const fetchCommentsByImageUrl = async (url) => {
        try {
            const response = await axios.get(`http://localhost:5000/comments/by-image/${url}`, {
                params: { username: user.user.userName }
            });
            if (response.status === 200) {
                setComments(response.data);
            } else {
                console.error('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires !', error);
        }
    };

    const fetchCommentsCountByImageUrl = async (url) => {
        try {
            const response = await axios.get(`http://localhost:5000/comments/by-image/${url}/count`);
            if (response.status === 200) {
                setCommentsCount(response.data.count);
            } else {
                console.error('Failed to fetch comment count');
            }
        } catch (error) {
            console.error('Error fetching comment count:', error);
        }
    };

    const fetchImageLikesDislikes = async (url) => {
        try {
            const response = await axios.get(`http://localhost:5000/images/${url}/likes-dislikes`, {
                params: { username: user.user.userName }
            });
            if (response.status === 200) {
                setImageLikes(response.data.likes);
                setImageDislikes(response.data.dislikes);
                setLikedImage(response.data.liked_by_user);
                setDislikedImage(response.data.disliked_by_user);
                setImageViews(response.data.views);
            } else {
                console.error('Failed to fetch image likes/dislikes');
            }
        } catch (error) {
            console.error('Error fetching image likes/dislikes:', error);
        }
    };

    const incrementImageViews = async (url) => {
        try {
            const response = await axios.post(`http://localhost:5000/images/${url}/view`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setImageViews(response.data.views);
            } else {
                console.error('Failed to increment image views');
            }
        } catch (error) {
            console.error('Error incrementing image views:', error);
        }
    };

    const handleLike = async (commentId) => {
        try {
            const response = await axios.post(`http://localhost:5000/comments/${commentId}/like`, {
                username: user.user.userName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const updatedComments = comments.map(comment => {
                if (comment.id === response.data.id) {
                    const likedByUser = !comment.liked_by_user;
                    const dislikes = likedByUser && comment.disliked_by_user ? comment.dislikes - 1 : comment.dislikes;
                    const likes = likedByUser ? comment.likes + 1 : comment.likes - 1;
                    return { ...comment, likes, dislikes, liked_by_user: likedByUser, disliked_by_user: false };
                }
                return comment;
            });

            setComments(updatedComments);
        } catch (error) {
            console.error('Erreur lors du like du commentaire :', error);
        }
    };

    const handleDislike = async (commentId) => {
        try {
            const response = await axios.post(`http://localhost:5000/comments/${commentId}/dislike`, {
                username: user.user.userName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedComments = comments.map(comment => {
                if (comment.id === response.data.id) {
                    const dislikedByUser = !comment.disliked_by_user;
                    const likes = dislikedByUser && comment.liked_by_user ? comment.likes - 1 : comment.likes;
                    const dislikes = dislikedByUser ? comment.dislikes + 1 : comment.dislikes - 1;
                    return { ...comment, likes, dislikes, disliked_by_user: dislikedByUser, liked_by_user: false };
                }
                return comment;
            });

            setComments(updatedComments);
        } catch (error) {
            console.error('Erreur lors du dislike du commentaire :', error);
        }
    };

    const handleImageLike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/images/${imageUrl}/like`, {
                username: user.user.userName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { likes, dislikes, liked_by_user, disliked_by_user } = response.data;
            setImageLikes(likes);
            setImageDislikes(dislikes);
            setLikedImage(liked_by_user);
            setDislikedImage(disliked_by_user);
        } catch (error) {
            console.error('Erreur lors du like de l\'image :', error);
        }
    };

    const handleImageDislike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/images/${imageUrl}/dislike`, {
                username: user.user.userName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { likes, dislikes, liked_by_user, disliked_by_user } = response.data;
            setImageLikes(likes);
            setImageDislikes(dislikes);
            setLikedImage(liked_by_user);
            setDislikedImage(disliked_by_user);
        } catch (error) {
            console.error('Erreur lors du dislike de l\'image :', error);
        }
    };

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const commentData = {
            content: newComment,
            user_id: user.user.id,
            image_url: imageUrl,
            username: user.user.userName
        };

        try {
            const response = await axios.post('http://localhost:5000/comments', commentData);
            setComments(prevComments => [response.data, ...prevComments]);
            setCommentsCount(prevCount => prevCount + 1);
            setNewComment('');
        } catch (error) {
            console.error('Failed to post comment', error);
            alert('Failed to post comment. Please try again later.');
        }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            const response = await axios.put(`http://localhost:5000/comments/${commentId}`, {
                content: editingContent,
                user_id: user.user.id  // Inclure l'ID de l'utilisateur
            });
            setComments(prevComments => prevComments.map(comment =>
                comment.id === commentId ? { ...comment, ...response.data } : comment
            ));
            setEditingCommentId(null); // Réinitialisez l'état d'édition
        } catch (error) {
            console.error('Erreur lors de la mise à jour du commentaire :', error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5000/comments/${commentId}`, {
                data: { user_id: user.user.id }  // Inclure l'ID de l'utilisateur
            });
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            setCommentsCount(prevCount => prevCount - 1);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire :', error);
        }
    };

    return (
        <div className='show-image'>
            <script src="http://localhost:8097"></script>
            <img className='Displayed-img' src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <div className='show-image-info'>
                <p>{imageViews} Vues &bull; {formattedDate}</p>
                <div>
                    <span>
                        <img
                            src={likedImage ? liked : like}
                            alt="Like"
                            onClick={handleImageLike}
                            style={{ cursor: 'pointer' }}
                        />
                        {imageLikes}
                    </span>
                    <span>
                        <img
                            src={dislikedImage ? disliked : dislike}
                            alt="Dislike"
                            onClick={handleImageDislike}
                            style={{ cursor: 'pointer' }}
                        />
                        {imageDislikes}
                    </span>
                    <span><img src={share} alt="Partager" />Partager</span>
                    <span><img src={save} alt="Enregistrer" />Enregistrer</span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={jack} alt="Publisher" />
                <div>
                    <p>{userId}</p>
                    <span>2285 abonnés</span>
                </div>
                <button>S&apos;abonner</button>
            </div>
            <div className="img-description">
                <div className="description-container">
                    <p>{description}</p>
                </div>
                <hr />
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text" className="comment-input"
                        value={newComment}
                        onChange={handleInputChange}
                        placeholder="Ajoutez un commentaire..."
                        required
                    />
                </form>
                <hr />
                <h4>{commentsCount} commentaires</h4>

                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <img src={user_profile} alt="Commenter" />
                        <div className="comment-details">
                            <h3>{comment.username || 'Anonyme'} <span>{comment.created_at}</span></h3>
                            <div className='comment-content'>
                                {editingCommentId === comment.id ? (
                                    <input
                                        className='comment-edit-input'
                                        type="text"
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
                                ) : (
                                    <p>{comment.content}</p>
                                )}
                            </div>
                            <div className="comment-action">
                                <img
                                    src={comment.liked_by_user ? liked : like}
                                    alt="Like"
                                    onClick={() => handleLike(comment.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{comment.likes}</span>
                                <img
                                    src={comment.disliked_by_user ? disliked : dislike}
                                    alt="Dislike"
                                    onClick={() => handleDislike(comment.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{comment.dislikes}</span>
                            </div>

                            {comment.user_id == user.user.id && ( // Afficher les actions seulement pour l'auteur du commentaire
                                <>
                                    <button
                                        className="more-actions-button"
                                        onClick={() => setVisibleActionCommentId(visibleActionCommentId === comment.id ? null : comment.id)}
                                    >
                                        ⋮
                                    </button>
                                    {visibleActionCommentId === comment.id && (
                                        <div className='comment-actions'>
                                            {editingCommentId === comment.id ? (
                                                <>
                                                    <button onClick={() => handleUpdateComment(comment.id)}>Sauvegarder</button>
                                                    <button onClick={() => setEditingCommentId(null)}>Annuler</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => { setEditingCommentId(comment.id); setEditingContent(comment.content); }}>Modifier</button>
                                                    <button onClick={() => handleDelete(comment.id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

// PropTypes pour valider les props passées au composant
DisplayImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    uploadDate: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default DisplayImage;

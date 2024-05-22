import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayImage.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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


    useEffect(() => {
        fetchCommentsCount();
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts.



    useEffect(() => {
        axios.get('http://localhost:5000/comments')
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleLike = (commentId) => {
        axios.post(`http://localhost:5000/comments/${commentId}/like`)
            .then(response => {
                const updatedComments = comments.map(comment => {
                    if (comment.id === response.data.id) {
                        return { ...comment, likes: response.data.likes }; // Update with the new likes count
                    }
                    return comment;
                });
                setComments(updatedComments);
            })
            .catch(error => {
                console.error('Error liking the comment:', error);
            });
    };

    const handleDislike = (commentId) => {
        axios.post(`http://localhost:5000/comments/${commentId}/dislike`)
            .then(response => {
                const updatedComments = comments.map(comment => {
                    if (comment.id === response.data.id) {
                        return { ...comment, dislikes: response.data.dislikes }; // Update with the new dislikes count
                    }
                    return comment;
                });
                setComments(updatedComments);
            })
            .catch(error => {
                console.error('Error disliking the comment:', error);
            });
    };

    const fetchCommentsCount = async () => {
        axios.get('http://localhost:5000/comments/count')
            .then(response => {
                setCommentsCount(response.data.count); // Set the comments count state
            })
            .catch(error => {
                console.error('Error fetching comments count:', error);
            });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newComment.trim()) return;  // Assurez-vous que le commentaire n'est pas juste des espaces blancs
        axios.post('http://localhost:5000/comments', { content: newComment })
            .then(response => {
                setComments(prevComments => [response.data, ...prevComments]); // Use a functional update
                setCommentsCount(prevCount => prevCount + 1);  // Increment the comments count
                setNewComment(''); // Reset the input after submission
            })
            .catch(error => {
                console.error('Failed to post comment', error);
            });
    };

    const handleUpdateComment = (commentId) => {
        axios.put(`http://localhost:5000/comments/${commentId}`, { content: editingContent })
            .then(response => {
                setComments(prevComments => prevComments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, ...response.data };
                    }
                    return comment;
                }));
                setEditingCommentId(null);  // Reset editing state
            })
            .catch(error => {
                console.error('Error updating comment:', error);
            });
    };

    const handleDelete = (commentId) => {
        // Envoi d'une requête DELETE au serveur
        axios.delete(`http://localhost:5000/comments/${commentId}`)
            .then(response => {
                const updatedComments = comments.filter(comment => comment.id !== commentId);
                setComments(updatedComments);
                setCommentsCount(prevCount => prevCount - 1);
                console.log(response.data.message);
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    };

    return (
        <div className='show-image'>
            <img className='Displayed-img' src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <div className='show-image-info'>
                <p>1525 Vues &bull; {formattedDate}</p>
                <div>
                    <span><img src={like} alt="" /> 125</span>
                    <span><img src={dislike} alt="" />0</span>
                    <span><img src={share} alt="" />Partager</span>
                    <span><img src={save} alt="" />Enregistrer</span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={jack} alt="" />
                <div>
                    <p>Utilisateur N° {userId}</p>
                    <span>2285 abonnés</span>
                </div>
                <button>S'abonner</button>
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
                <h4>{commentsCount} commentaires </h4>


                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <img src={user_profile} alt="" />
                        <div className="comment-details">
                            <h3>{comment.username || 'Anonymous'} <span>{comment.created_at}</span></h3>
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
                                <img src={like} alt="Like" onClick={() => handleLike(comment.id)} />
                                <span>{comment.likes}</span>
                                <img src={dislike} alt="Dislike" onClick={() => handleDislike(comment.id)} />
                                <span>{comment.dislikes}</span>
                            </div>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayImage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayImage.css';
import Image from '../../assets/DisplayedPicture.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';

const DisplayImage = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newComment.trim()) return;  // Assurez-vous que le commentaire n'est pas juste des espaces blancs
        axios.post('http://localhost:5000/comments', { content: newComment })
            .then(response => {
                setComments([response.data, ...comments]); // Préfixez le nouveau commentaire
                setNewComment(''); // Réinitialiser l'input après l'envoi
            })
            .catch(error => {
                console.error('Failed to post comment', error);
            });
    };


    return (
        <div className='show-image'>
            <img className='Displayed-img' src={Image} alt="" />
            <h3>Image Description</h3>
            <div className='show-image-info'>
                <p>1525 Views &bull; 2days ago</p>
                <div>
                    <span><img src={like} alt="" /> 125</span>
                    <span><img src={dislike} alt="" />0</span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={jack} alt="" />
                <div>
                    <p>Channel Name</p>
                    <span>100K Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="img-description">
                <div className="description-container">
                    <p>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <hr />
                {/* <h4>Ajouter un commentaire</h4> */}
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text" className="comment-input"
                        value={newComment}
                        onChange={handleInputChange}
                        placeholder="Votre commentaire ici"
                        required
                    />
                </form>
                <hr />
                <h4>Comments</h4>
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <img src={user_profile} alt="" />
                        <div>
                            <h3>{comment.username || 'Anonymous'} <span>{comment.created_at}</span></h3>
                            <p>{comment.content}</p>
                            <div className="comment-action">
                                <img src={like} alt="Like" onClick={() => handleLike(comment.id)} />
                                <span>{comment.likes}</span>
                                <img src={dislike} alt="Dislike" />
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default DisplayImage;

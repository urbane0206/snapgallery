import React from 'react'
import './DisplayImage.css'
import Image from '../../assets/DisplayedPicture.png'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

const DisplayImage = () => {
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
                <p>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <hr />
            <h4>130 Comments</h4>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Username <span>1 day ago</span></h3>
                    <p>commentaire 1</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>250</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Username <span>1 day ago</span></h3>
                    <p>commentaire 1</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>250</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Username <span>1 day ago</span></h3>
                    <p>commentaire 1</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>250</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Username <span>1 day ago</span></h3>
                    <p>commentaire 1</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>250</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Username <span>1 day ago</span></h3>
                    <p>commentaire 1</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>250</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DisplayImage
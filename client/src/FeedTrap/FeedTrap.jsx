import { useEffect, useState } from 'react';
import styles from './FeedTrap.module.css'
import axios from 'axios'

function FeedTrap ({URL}){
    const [feed, setFeed] = useState([]);
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState("");

    // Loads Feedback content
    useEffect(() => {

        async function fetchComments (){
            try{
                const res = await axios.get(`${URL}/feed`);
                setFeed(res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchComments();
        
    }, [feed]);

    // Handle submit new feedback button
    async function handleSubmit(e){
        e.preventDefault();

        let data = {"username": username,
                    "comment": comment,
                    "likes": 0};

        if(comment.length <= 200){
            try{
                await axios.post(`${URL}/comment`, data);
                setFeed(f => [...f, data]);
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            window.alert("Maximum of 200 characters only");
        }
        setUsername("");
        setComment("");
    }
    // Handle like button
    async function handleLike(commentId, prevLikes) {
        const newLikes = prevLikes + 1;
        try{
            await axios.patch(`${URL}/like/${commentId}`, {"likes": newLikes});
            setFeed(f => f.map((f) => f.id === commentId ? {...f, likes: newLikes} : f));
        }
        catch(error){
            console.log(error);
        }
    }
    return(<>
        <div className={styles.liveFeedCont}>
        <h1>What&apos;s on your mind?</h1>
            <form className={styles.submitFeedback} onSubmit={handleSubmit}> 
                <input 
                    className={styles.username} 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Type your name" maxLength={25} 
                    required>
                </input>
                <textarea 
                    className={styles.newFeedbackText} 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Type a comment" 
                    required>
                </textarea>
                <div className={styles.charCount}>
                    <button type="submit">Submit</button>
                    <h3>Characters Left: {200 - (comment.length)}</h3>
                </div>
            </form>
        <div className={styles.feedContainer}>
            {feed.map((feed, index) => 
                <div key={index} className={styles.commentContainer}>
                    <h2>{feed.username} said...</h2>
                        <p className={styles.feedComments}>{feed.comment}</p>
                        <div className={styles.btnContainer}>
                            <button 
                                onClick={() => handleLike(feed.id, feed.likes)} 
                                className="material-symbols-outlined">favorite
                            </button>
                            <span>{feed.likes || 0}</span>
                        </div>
                </div>
            )}
        </div>
        
    </div>
    </>);
}

export default FeedTrap
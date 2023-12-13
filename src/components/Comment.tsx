import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

interface CommentProps {
    content: string
    deleteComment: (content: string) => void
}

export function Comment(props: CommentProps) {

    const [like, setLike] = useState(0)

    function handleDeleteComment() {
        props.deleteComment(props.content)
    }

    function handleLike() {
        setLike((state) => {
            return state + 1
        })
    }
    return (
        <>
            <div className={styles.comment}>
                <Avatar hasBorder={false} src='https://github.com/verezeeee.png' />

                <div className={styles.commentBox}>

                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>Matheus Henrique</strong>
                                <time dateTime={
                                    new Date().toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                }>{
                                        'Cerca de 1h atrás'
                                    }</time>
                            </div>
                            <button onClick={handleDeleteComment} title='Deletar comentário'>
                                <Trash size={24} />
                            </button>
                        </header>

                        <p>
                            {props.content}
                        </p>
                    </div>


                    <footer>
                        <button onClick={handleLike}>
                            <ThumbsUp size={20} />
                            Aplaudir <span>{like}</span>
                        </button>
                    </footer>
                </div>
            </div>
        </>
    )
}
import { useState } from 'react'

import { format, formatDistanceToNow, set } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'


interface Author {
    name: string
    avatarUrl: string
    role: string
}

interface Content {
    type: "paragraph" | "link"
    content: string
}

interface PostProps {
    author: Author;
    content: Content[];
    publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {

    const [comments, setComments] = useState([
        "Post bacana hein!!!"
    ])

    const [newComment, setNewComment] = useState('')

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true
    })

    function handleCreateComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setComments([...comments, newComment])
        setNewComment('')
    }

    function handleNewCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('')
        setNewComment(e.target.value)
    }

    function handleNewCommentInvalid(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(comment: string) {
        const filteredComments = comments.filter((item) => {
            return item !== comment
        })

        setComments(filteredComments)
    }

    const isNewCommentInputEmpty = newComment.length === 0

    return (
        <>
            <article className={styles.post}>
                <header>
                    <div className={styles.author}>
                        <Avatar src={author.avatarUrl} />
                        <div className={styles.authorInfo}>
                            <strong>{author.name}</strong>
                            <span>{author.role}</span>
                        </div>
                    </div>

                    <time title={publishedAt.toString()} dateTime={publishedAt.toISOString()}>{
                        publishedDateFormated
                    }</time>
                </header>

                <div className={styles.content}>
                    {content.map((item) => {
                        if (item.type === 'paragraph') {
                            return <p key={item.content}>{item.content}</p>
                        }

                        else if (item.type === 'link') {
                            return <p key={item.content}><a href='#'>{item.content}</a></p>
                        }
                    })}
                </div>

                <form onSubmit={handleCreateComment} className={styles.commentForm}>
                    <strong>Deixe seu comentário</strong>

                    <textarea
                        onInvalid={handleNewCommentInvalid}
                        name='comment'
                        value={newComment}
                        placeholder="Comentário"
                        onChange={handleNewCommentChange}
                        required
                    />

                    <footer>
                        <button disabled={isNewCommentInputEmpty} type="submit">Publicar</button>
                    </footer>

                </form>
                <div className={styles.commentList}>
                    {comments.map((comment) => {
                        return <Comment key={comment} content={comment} deleteComment={deleteComment} />
                    })}
                </div>
            </article>
        </>
    )
}
import ptBR from "date-fns/locale/pt-BR";
import { format, formatDistanceToNow } from "date-fns";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}
interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana, hein?!"]);
  const [newCommentText, setNewCommentText] = useState("");

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");

    // Remove espaço em branco do inicio do texto
    const textNoWhiteSpace = event.target.value.replace(/^\s+/, "");

    setNewCommentText(textNoWhiteSpace);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function handleDeleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(
      (comment) => comment !== commentToDelete
    );

    setComments(commentsWithoutDeleteOne);
  }

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const isNewCommentTextEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return <p key={item.content}>{item.content}</p>;
          } else if (item.type === "link") {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form
        onSubmit={(e) => handleCreateNewComment(e)}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          value={newCommentText}
          placeholder="Deixe um comentário"
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentTextEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            author={author}
            content={comment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  );
}

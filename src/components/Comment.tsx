import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar } from "./Avatar";

import { Trash, ThumbsUp } from "phosphor-react";
import styles from "./Comment.module.css";
import { useState } from "react";

interface CommentProps {
  content: string;
  handleDeleteComment(commentToDelete: string): void;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export function Comment({
  content,
  author,
  handleDeleteComment,
}: CommentProps) {
  const dateNow = new Date(Date.now());
  const [likeCount, setLikeCount] = useState(0);

  const commentDateFormatted = format(dateNow, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const commentDateRelativeToNow = formatDistanceToNow(dateNow, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleLikeComment() {
    setLikeCount((prevState) => prevState + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title="11 de Janeiro às 11:37h"
                dateTime="2023-01-11 11:27:30"
              >
                {commentDateRelativeToNow}
              </time>
            </div>
            <button
              title="Deletar comentário"
              onClick={() => handleDeleteComment(content)}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer className={styles.commentFooter}>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

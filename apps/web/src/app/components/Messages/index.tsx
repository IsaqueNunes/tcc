import { MessageWithUser } from 'libs/models/message-with-user';
import { ConvertDate } from '../../util/validate';
import Message from './Message';
import './messages.css';

type Props = {
    messages: MessageWithUser[]
}

export default function Messages({messages}: Props) {
    return(
        <div className="message-list" id="message-list">
            {messages?.map((message: MessageWithUser) => (
              <Message
                key={message.id}
                messageContent={message.content}
                messageCreatedDate={ConvertDate(message?.time?.toString() || '')}
                messageAuthorName={message?.user?.name || ''}
                messageEmailAuthor={message?.user?.email || ''}
              />
            ))}
          </div>
    )
}

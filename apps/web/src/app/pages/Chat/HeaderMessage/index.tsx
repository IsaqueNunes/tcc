import './header-message.css';

type Props = {
    name: string,
    email: string,
    data: string,
    content: string,
}

export default function HeaderMessage({name, email, data, content}: Props) {
    return (
        <div className="first-message">
              <div className="top-content">
                <div className="name-email">
                  <h3><strong>{name}</strong></h3>
                  <span>{email}</span>
                </div>
                <h5 className="no-wrap">{data}</h5>
              </div>
              <div className="body-content">
                <strong>
                  {content}
                </strong>
              </div>
            </div>
    )
}

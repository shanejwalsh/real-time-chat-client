import React from 'react';

type LogOutProps = {
  username: string;
  setUsername: (username: string | null) => void;
};

class LogOut extends React.Component<LogOutProps> {
  constructor(props: LogOutProps) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.setUsername(null);
  }

  render() {
    return (
      <div>
        <p>Hi, {this.props.username}!</p>
        <button
          onClick={() => {
            this.handleLogOut();
          }}
        >
          Log out
        </button>
      </div>
    );
  }
}

export default LogOut;

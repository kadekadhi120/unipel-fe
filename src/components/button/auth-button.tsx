//button auth
import React from 'react';

interface AuthButtonProps {
  onClick: () => void;
  name?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, name }) => {
    return (
        <button
            onClick={onClick}
            className="btn-auth-split text-sm"
        >
            {name}
        </button>
    );
}

export default AuthButton;
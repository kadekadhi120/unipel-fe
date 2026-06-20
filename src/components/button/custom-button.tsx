import react from "react";

interface CustomButtonProps{
    onclick: () => void;
    name?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({onclick, name}) => {
    return (
        <button
        onClick={onclick}
        className="btn-auth-split text-sm"
        > {name}
        </button>
    );
}

export default CustomButton;
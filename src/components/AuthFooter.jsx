import { Link } from "react-router-dom";

export default function AuthFooter({ text, linkText, linkTo }) {
  return (
    <p className="w-full text-center text-gray-300 text-sm">
      {text}
      <Link
        to={linkTo}
        className="text-black ml-1 font-medium inline-flex flex-col items-center"
      >
        {linkText}
        <img
          src="/Vector.png"
          alt="Decorative vector"
          className="w-11 h-2 mt-1"
        />
      </Link>
    </p>
  );
}

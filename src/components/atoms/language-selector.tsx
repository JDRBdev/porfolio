import EnglishIcon from "./icons/english";
import SpanishIcon from "./icons/spain";

export function LanguageSelector({ className = "" }) {
  return (
    <div className={`language-selector text-white content-center ${className}`}>
      <input type="radio" name="language" id="default" defaultChecked className="hidden" />
      <input type="radio" name="language" id="spanish" className="hidden" />
      <input type="radio" name="language" id="english" className="hidden" />
      <input type="checkbox" id="language-checkbox" className="hidden" />
      
      <label htmlFor="language-checkbox" className="language-selector__button inline-flex items-center border-0 leading-8 gap-1.5 cursor-pointer">
        <span>Language</span>
        <span className="language-selector__icon-container w-4 h-4 flex justify-center items-center transition-transform transform-gpu group-hover:translate-x-3 duration-500">
          <i className="fa-solid fa-globe default-icon"></i>
          <SpanishIcon className="spanish-icon hidden rounded-2xl" />
          <EnglishIcon className="english-icon hidden rounded-2xl" />
        </span>
      </label>
      
      <div className="language-selector__list-container absolute left-0 mt-2 z-10 hidden">
        <ul className="language-selector__list">
          <li>
            <label htmlFor="spanish" className="flex items-center gap-2">
              <span className="min-w-18.25">Spanish</span>
              <SpanishIcon className="rounded-xl w-4 h-4" />
            </label>
          </li>
          <li>
            <label htmlFor="english" className="flex items-center gap-2">
              <span className="min-w-18.25">English</span>
              <EnglishIcon className="rounded-xl w-4 h-4" />
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
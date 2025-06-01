/* átomo encargado de mostrar con una animación de escritura las capacidades */

import Typewriter from 'typewriter-effect';
import { useLanguage } from '../../hooks/useLanguage';

function TypewriterText({ className = '' }) {
  const { lang, t } = useLanguage();
  return (
    <div className={`text-white text-[20px] md:text-[40px] caslon items-end ${className}`}>
      <Typewriter
        options={{
          strings: ["José David",t("typewriter.web_developer"), t("typewriter.web_designer"), t("typewriter.programmer")],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}

export default TypewriterText;

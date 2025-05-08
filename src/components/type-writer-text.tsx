/* átomo encargado de mostrar con una animación de escritura las capacidades */

import Typewriter from 'typewriter-effect';

function TypewriterText({ className = '' }) {
  return (
    <div className={`text-white text-4 ${className}`}>
      <Typewriter
        options={{
          strings: ['Desarrollador Web', 'Diseñador Web', 'Programador'],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}

export default TypewriterText;

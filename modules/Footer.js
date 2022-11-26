import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pt-32 text-gray-300 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-100"
          href="https://www.licenka.space/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image src="/Logo.svg" width={140} height={40} alt="logo"></Image>
        </a>
        <p className="text-sm text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          <a
            href="https://github.com/MaximePremont/Licenka"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            © 2022 Licenka —
          </a>
          <a
            href="https://github.com/AhmedFr"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Ahmed
          </a>
          <a
            href="https://github.com/MrSIooth"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Victor
          </a>
          <a
            href="https://github.com/Mikatech"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Mikael
          </a>
          <a
            href="https://github.com/MaximePremont"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Maxime
          </a>
          <a
            href="https://github.com/Nolann71"
            className="text-gray-300 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Nolann
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          Contact us on
          <a
            className="ml-3 text-gray-200"
            href="https://www.linkedin.com/in/ahmed-abouelleil-9817071b7/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

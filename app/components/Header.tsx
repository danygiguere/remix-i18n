import { Link, useLocation, useParams } from "@remix-run/react";
import { getTranslations, getTranslatedUrls } from "~/services/i18n";

function Header() {
  const params = useParams()
  let urls = getTranslatedUrls(useLocation());
  let strings = getTranslations(params.lang, langs);
  return (
    <header>
      <div>
        <Link to={urls.en}>{ strings.english }</Link> 
      </div>
      <div>
        <Link to={urls.fr}>{ strings.french }</Link>
      </div>
      <div>
        -----
      </div>
      <div>
        <Link to={`/${params.lang}`}>Index</Link>
      </div>
      <div>
        <Link to={`/${params.lang}/about`}>About</Link>
      </div>
    </header>
  );
};

export default Header;

const langs = {
  "en": {
    "english": "English",
    "french": "French"
  },
  "fr": {
    "english": "Anglais",
    "french": "Français"
  }
}
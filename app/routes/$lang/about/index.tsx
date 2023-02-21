import { useParams } from "@remix-run/react";
import { getTranslations } from "~/services/i18n";

export default function IndexPage() {
  const params = useParams()
  let strings = getTranslations(params.lang, langs);
  return (
    <h1>{ strings.title }</h1>
  );
}

const langs = {
  "en": {
    "title": "About page"
  },
  "fr": {
    "title": "Page à propos"
  }
}
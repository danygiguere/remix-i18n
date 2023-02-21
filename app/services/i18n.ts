import { createCookie } from "@remix-run/node";
import type { Location } from "@remix-run/react";

export const supportedLocales: string[] = ["en", "fr"]
export const defaultLocale: string = "en"

export const langCookie = createCookie("lang");

export function getTranslations(lang: string | undefined, langs: any) {
  if(lang === 'fr') {
    return langs.fr
  } 
  return langs.en
}

export function getTranslatedUrls(location: Location) {
  let pathname = ''
  if (typeof window !== 'undefined') {
    pathname = window.location.pathname
  } else {
    pathname = location.pathname
  }
  const data: { [key: string]: string } = {}
  for(let lang of supportedLocales) {
    data[lang] =`/${lang}${pathname.substring(3)}`
  }
  return data
}

// @todo: create a static interpolation function that can translate a string and replace the arguments that are passed to it.
// for instance say: strings.title="Hi {username} !"
// const string = I18n.translate(strings.title, { username: 'John Doe'})
// would return: 'Hi John Doe !'

// @to be used later, maybe
// public static async getTranslations(locale: string | undefined) {
//     const directory = fs.readdirSync(`./locales/${locale}/`, 'utf-8')
//     const data: { [key: string]: string | any } = {}
//     for(let file of directory) {
//       data[file.slice(0, -5)] = JSON.parse(await fs.readFileSync(`./locales/${locale}/${file}`, 'utf-8'))
//     }
//     return data;
//   }
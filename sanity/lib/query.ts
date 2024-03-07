import { Language } from "@/types/language";
import { groq } from "next-sanity";

export type QueryOptions = {
  schemaType: string;
  slug?: string;
  language?: Language;
  firstOnly?: boolean;
  sort?: string;
  fields?: string;
  translatedFields?: string;
};

function queryString(options: QueryOptions) {
  const {
    schemaType,
    slug,
    language,
    firstOnly,
    sort,
    fields,
    translatedFields,
  } = options;
  return `*[_type == "${schemaType}"${
    language ? ` && language == "${language}"` : ""
  }${slug ? ` && slug.current == "${slug}"` : ""}]${
    firstOnly ? `[0]` : sort ? ` | order(${sort})` : ""
  }{
        ...,
        ${
          translatedFields
            ? `"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
            language,
            ${translatedFields}
          },`
            : ""
        }
        ${fields ? fields : ""}
    }`;
}

export function query(query: QueryOptions) {
  return groq`${queryString(query)}`;
}

export function multiQuery(query: { [key: string]: QueryOptions }) {
  return groq`{${Object.keys(query).map((key) => {
    return `\n"${key}": ${queryString(query[key])},`;
  })}
    }`;
}

export function translationQuery(_id: string) {
  return groq`
    *[_id == "${_id}"][0]{
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        ...,
      },
    }
`;
}
